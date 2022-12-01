const httpStatus = require('http-status')
const ApiError = require('../utils/ApiError')
const catchAsync = require('../utils/catchAsync')
const { candidateService } = require('../services')
const csv = require('csvtojson')
const {Candidate} = require('../models')

const getCandidates = catchAsync(async (req, res) => {
    const candidates = await candidateService.getOrderByAverage()
    res.send(candidates)
})
const createCanditate = catchAsync(async (req, res) => {
    const csvPath = "glo.csv"
    csv({delimiter: ";"})
        .fromFile(csvPath)
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


const exportCandidateCsv = catchAsync(async (req, res) => {

})

module.exports = {
    getCandidates,
    createCanditate,
    editCandidatePosition
}