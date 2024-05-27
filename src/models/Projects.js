const mongoose = require('mongoose');
const { Schema } = mongoose;

const projectSchema = new Schema({
  title: { type: String, required: true },
  clientName:{type:String,required:true},
  constructionValue : {type:String},
  images: [
    {
      image: { type: String, required: true },
      description: { type: String, required: true }
    }
  ],
  service: { type: Schema.Types.ObjectId, ref: 'Service', required: true }
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;