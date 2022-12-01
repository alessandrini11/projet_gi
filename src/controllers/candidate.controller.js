const httpStatus = require('http-status')
const ApiError = require('../utils/ApiError')
const catchAsync = require('../utils/catchAsync')
const { candidateService } = require('../services')
const csv = require('csvtojson')
const {Candidate, File} = require('../models')
const {clearOldFiles} = require('../utils/fileManagement')

const getCandidates = catchAsync(async (req, res) => {
    const candidates = await candidateService.getOrderByAverage()
    res.send(candidates)
})
const createCanditate = catchAsync(async (req, res) => {
    const files = await File.find()
    if(files.length !== 0){
        clearOldFiles(files)
        await Candidate.deleteMany()
    }

    const fileName = req.file.filename
    const filePath = './public/files/' + fileName
    File.create({nom: fileName})
    csv({delimiter: ";"})
        .fromFile(filePath)
        .then(jsonObject => {
            candidateService.createCandidates(jsonObject)
            res.status(httpStatus.CREATED).json({
                message: "candidates creates",
            })
        })
})

const editCandidatePosition = catchAsync(async (req, res) => {
    const candidateId =  req.body.candId
    const position = req.body.position

    const candidate = await candidateService.editCandidateMarks(position, candidateId)

    res.status(httpStatus.OK).json({
        message: "candidate updated",
        candidate
    })
})

const deleteAllCandidates = catchAsync( async (req, res) => {
    await Candidate.deleteMany()
    res.send({
        message: "Candidates Deleted"
    })
})
const exportCandidateCsv = catchAsync(async (req, res) => {

})

module.exports = {
    getCandidates,
    createCanditate,
    editCandidatePosition,
    deleteAllCandidates
}