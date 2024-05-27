const Service = require("../models/Services")

const createService = async (req,res) =>{
    try{
        const { title, numberOfClients, numberOfProjects, images } = req.body;
        if (!title || !images || !images.length) {
            return res.status(400).json({ error: 'Invalid request body' });
        }
        const serviceData = {
            title: title,
            numberOfClients:numberOfClients,
            numberOfProjects:numberOfProjects,
            images: images.map(img => ({ // Map each image object from req.body to the required format
                url: img.url,
                description: img.description
            })),
            relatedProjects: [] // Empty array initially, can be populated later
          };
          const service = await Service.create(serviceData);
          res.status(200).json({ message: "Service created successfully", service });
    }catch(err){
        console.log(err)
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getAllService =async (req,res) => {
    try{
    const services = await Service.find();
    res.status(200).json(services)
    }catch(err){
        console.log(err)
        res.status(500).json({ error: 'Internal server error' });
    }
    
}

module.exports = {
    createService,
    getAllService
}