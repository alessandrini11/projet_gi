const express = require('express')
const router = express.Router()
const candidateController = require('../../controllers/candidate.controller')
const {fileUpload} = require('../../config/multer')

router
    .route('/')
    .get(candidateController.getCandidates)
    .post(fileUpload, candidateController.createCanditate)

router
    .route('/editposition')
    .patch(candidateController.editCandidatePosition)
router
    .route('/deleteall')
    .delete(candidateController.deleteAllCandidates)

module.exports = router