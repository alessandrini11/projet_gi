const express = require('express')
const router = express.Router()
const candidateController = require('../../controllers/candidate.controller')

router
    .route('/')
    .get(candidateController.getCandidates)
    .post(candidateController.createCanditate)

router
    .route('/editposition')
    .patch(candidateController.editCandidatePosition)
module.exports = router