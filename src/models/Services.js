const mongoose = require('mongoose');
const { Schema } = mongoose;
const serviceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    numberOfClients : { type: Number, required: false },
    numberOfProjects :{ type: Number, required: false },
    images: [
        {
            url: { type: String, required: true },
            description: { type: String, required: true }
        }
    ],
    relatedProjects: [{ type: Schema.Types.ObjectId, ref: 'Project' }]
  });
const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;