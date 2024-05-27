const Project = require("../models/Projects")
const Service = require("../models/Services")
const createProject = async (req,res) =>{
    try{
        const { title, clientName, constructionValue, images, service } = req.body;
        if (!title || !images || !images.length) {
            return res.status(400).json({ error: 'Invalid request body' });
        }
        const projectData = {
            title: title,
            clientName:clientName,
            constructionValue:constructionValue,
            images: images.map(img => ({ // Map each image object from req.body to the required format
                image: img.image,
                description: img.description
            })),
            service: service
          };
          console.log(projectData)
          const project = new Project(
            projectData, 
          );
          await project.save();
          await Service.findByIdAndUpdate(service, { $push: { relatedProjects: project._id } });

          console.log('Project added and associated with service');
          res.status(200).json({ message: "Project created successfully", project });
    }catch(err){
        console.log(err)
        res.status(500).json({ error: 'Internal server error' });
    }
}

const allProjects = async(req,res) =>{
    try {
        
        const page = parseInt(req.query.page) || 1; 
        const pageSize = parseInt(req.query.limit) || 9; 
        let projects;
        let totalCount;
        [projects, totalCount] = await Promise.all([
                Project.find()
                .populate('service')
                    .skip((page - 1) * pageSize)
                    .limit(pageSize),
                Project.countDocuments()
        ]);
        

        const totalPages = Math.ceil(totalCount / pageSize);

        res.status(200).json({
            data: projects,
            currentPage: page,
            totalPages: totalPages,
            pageSize: pageSize,
            totalCount: totalCount
        });
    } catch (err) {
        console.error(err);
        throw err;
    }
}

const getProjectsByService = async (req,res) => {
    try {
        const selectedServiceId  = req.query.serviceId;
        const page = parseInt(req.query.page) || 1; 
        const pageSize = parseInt(req.query.limit) || 9; 

        let projects;
        let totalCount;

        if (selectedServiceId) {
            const service = await Service.findById(selectedServiceId);
            if (!service) {
                res.status(404).json({message:"Service Not Found"});
                throw new Error('Service not found');
            }

            [projects, totalCount] = await Promise.all([
                Project.find({ service: selectedServiceId })
                    .skip((page - 1) * pageSize)
                    .limit(pageSize),
                Project.countDocuments({ service: selectedServiceId })
            ]);
        } else {
            [projects, totalCount] = await Promise.all([
                Project.find()
                    .skip((page - 1) * pageSize)
                    .limit(pageSize),
                Project.countDocuments()
            ]);
        }

        const totalPages = Math.ceil(totalCount / pageSize);

        res.status(200).json({
            data: projects,
            currentPage: page,
            totalPages: totalPages,
            pageSize: pageSize,
            totalCount: totalCount
        });
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const deleteProject = async (req, res) => {
    try {
        const projectId = req.params.id;
        
        // Find the project by ID and delete it
        const deletedProject = await Project.findByIdAndDelete(projectId);
        
        if (!deletedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }
        
        res.status(200).json({ message: 'Project deleted successfully', data: deletedProject });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

const updateProject = async (req,res) => {
    const projectId = req.params.id;
    const updateProjectInfo = req.body;
    const updatedProject = await Project.findByIdAndUpdate(
        projectId,
        updateProjectInfo,
        {
          new: true,
        },
      );
      if (!updatedProject) {
        return res
          .status(404)
          .json({ status: 'FAIL', message: 'Project not found' });
      }
      res.status(200).json({
        status: 'SUCCESS',
        message: 'Project updated successfully',
        data: updatedProject
    });
}

module.exports = {
    createProject,
    getProjectsByService,
    allProjects,
    deleteProject,
    updateProject
} 