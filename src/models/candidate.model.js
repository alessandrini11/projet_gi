const mongoose = require('mongoose')
const validator = require('validator')
const { toJSON, paginate } = require('./plugins')

const candidateSchema = mongoose.Schema(
    {
        nom: {
            type: String,
            trim: true
        },
        prenom: {
            type: String,
            trim: true
        },
        lieu_nais: {
            type: String,
            trim: true
        },
        sexe: {
            type: String,
        },
        nationalite: {
            type: String
        },
        cursus: {
            type: String
        },
        niveau: {
            type: Number
        },
        note1: {
            type: Number
        },
        note2: {
            type: Number
        },
        note3: {
            type: Number
        }
    },
    {
        timestamps: true
    }
)

const Candidate = mongoose.model('Candidate', candidateSchema)

module.exports = Candidate