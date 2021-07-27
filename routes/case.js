var express = require('express');
var router = express.Router();

const env = require('dotenv').config();
const {User, Case, Defendant, Prosecutor} = require('../models');

/* GET users listing. */
router.post('/', function (req, res, next) {
    // res.send('user route');
    //   const {name,email} = req.body.params;
    // console.log(name,email);
    // console.log(req.body.params);
});

router.get('/all', async function (req, res, next) {
    try {
        const cases = await Case.findAll({include: [{all: true, nested: true}]});
        res.send(cases);
    } catch (err) {
        console.log(err);
    }
});

router.post('/create', async function (req, res, next) {
    const {case_data} = req.body.params;
    console.log(req.body.params);
    try {
        const relatedCase = await Case.create({
            status: 1,
            location: case_data.location,
            case_no: case_data.case_no,
            case_date: case_data.case_date,
        });

        const defendant = await Defendant.create({
            name: case_data.defendant.name,
            email: case_data.defendant.email,
            advocate: case_data.defendant.advocate,
            phone_number: case_data.defendant.phone_number,
            address: case_data.defendant.address,
            hukum: case_data.defendant.hukum,
            icra: case_data.defendant.icra,
            hapislik: case_data.defendant.hapislik,
            taksit_orani: case_data.defendant.taksit_orani,
            CaseId: relatedCase.id
        });
        const prosecutor = await Prosecutor.create({
            name: case_data.prosecutor.name,
            email: case_data.prosecutor.email,
            advocate: case_data.prosecutor.advocate,
            phone_number: case_data.prosecutor.phone_number,
            address: case_data.prosecutor.address,
            CaseId: relatedCase.id
        });

        await relatedCase.update({defendant_id: defendant.id, prosecutor_id: prosecutor.id})
    } catch (err) {
        console.log(err);
    }

    // res.send(user);
});

router.get('/detail/:id', async function (req, res, next) {

    const caseId = req.params.id;
    try {
        const caseDetail = await Case.findOne({
            where: {
                id: caseId
            },
            include: [{all: true, nested: true}]
        });

        res.send(caseDetail);

    } catch (error) {
        console.log(error);
    }

});

module.exports = router;

