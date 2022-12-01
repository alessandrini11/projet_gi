const httpStatus = require('http-status')
const { Candidate } = require('../models')
const ApiError = require('../utils/ApiError')

const getCandidateById = async (candidateId) => {
    const candidate = await Candidate.findById(candidateId)
    if (!candidate){
        throw new ApiError(httpStatus.NOT_FOUND, 'not found')
    }
    return candidate
}

const createCandidates = async (candidateArray) => {
    return await Candidate.insertMany(candidateArray)
}
const getOrderByAverage = async () => {
    const candidates = await Candidate.find()
    let candidateAvegerage = []
    candidates.map(candidate => {
        const candidateAv = {
            ...candidate._doc,
            average: getAverage(candidate.note1, candidate.note2, candidate.note3)
        }

        candidateAvegerage.push(candidateAv)
        Math.round()
    })
    return sortByAvegerage(candidateAvegerage)
}
const sortByAvegerage = candidateArray => {
    return candidateArray.sort((a, b) => {
        return b.average - a.average
    })
}

const editCandidateMarks = async (newPosition, candidateId) => {
    let note1,note2,note3
    switch (newPosition) {
        case 1:
            note1 = randomAverage(positions.second, positions.first)
            note2 = randomAverage(positions.second, positions.first)
            note3 = randomAverage(positions.second, positions.first)
            break;
        case 2:
            note1 = randomAverage(positions.third, positions.second)
            note2 = randomAverage(positions.third, positions.second)
            note3 = randomAverage(positions.third, positions.second)
            break
        case 3:
            note1 = randomAverage(positions.forth, positions.third)
            note2 = randomAverage(positions.forth, positions.third)
            note3 = randomAverage(positions.forth, positions.third)
            break
        case 4:
            note1 = randomAverage(positions.fifth, positions.forth)
            note2 = randomAverage(positions.fifth, positions.forth)
            note3 = randomAverage(positions.fifth, positions.forth)
            break
        case 5:
            note1 = randomAverage(0, positions.fifth)
            note2 = randomAverage(0, positions.fifth)
            note3 = randomAverage(0, positions.fifth)
            break
        default:
            break;
    }

    return await Candidate.findByIdAndUpdate(candidateId, {note1, note2, note3}, {new: true})

}

const positions = {
    "first": 10,
    "second": 8,
    "third": 6,
    "forth": 4,
    "fifth": 2,
}
const getAverage = (note1, note2, note3) => {
    const av = (note1 + note2 + note3) / 3
    return parseFloat(av.toFixed(2))
}
const randomAverage = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)

    return Math.floor(Math.random() * (max - min) + min)
}

module.exports = {
    createCandidates,
    getOrderByAverage,
    editCandidateMarks
}