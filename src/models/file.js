const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const  fileSchema = mongoose.Schema({
    nom: {
        type: String
    }
},
{
    timestamps: true
})
fileSchema.plugin(toJSON);
fileSchema.plugin(paginate);
const File = mongoose.model('File', fileSchema)

module.exports = File