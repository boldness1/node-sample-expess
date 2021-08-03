var express = require('express');
var router = express.Router();
const { Op } = require("sequelize");
const moment = require('moment');
const env = require('dotenv').config();
const {User,Case, Defendant, Prosecutor} = require('../models');


/* GET users listing. */
router.post('/', function (req, res, next) {
    // res.send('user route');
    //   const {name,email} = req.body.params;
    // console.log(name,email);
    // console.log(req.body.params);
});

router.get('/all', async function (req, res, next) {
    try {
        const cases = await Case.findAll({
            where: {
                status: 1,
                UserId:req.user.user_id,
            },
            include: [{
                all: true, nested: true
            }]
        });
        res.send(cases);
    } catch (err) {
        console.log(err);
    }
});

router.post('/create', async function (req, res, next) {
    const {case_data} = req.body.params;

    try {

        const relatedCase = await Case.create({
            status: 1,
            location: case_data.location,
            case_no: case_data.case_no,
            case_date: case_data.case_date,
            UserId:req.user.user_id,
            Prosecutor:{
                name: case_data.prosecutor.name,
                email: case_data.prosecutor.email,
                advocate: case_data.prosecutor.advocate,
                phone_number: case_data.prosecutor.phone_number,
                address: case_data.prosecutor.address,
            },
            Defendant:{
                name: case_data.defendant.name,
                email: case_data.defendant.email,
                advocate: case_data.defendant.advocate,
                phone_number: case_data.defendant.phone_number,
                address: case_data.defendant.address,
                hukum: case_data.defendant.hukum,
                icra: case_data.defendant.icra,
                hapislik: case_data.defendant.hapislik,
                taksit_orani: case_data.defendant.taksit_orani,
            },

        }, {
            include: [{
                all: true, nested: true,

            }]
        });

        res.send(relatedCase);

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
                id: caseId,
                UserId:req.user.user_id,
            },
            include: [{all: true, nested: true}]
        });

        res.send(caseDetail);

    } catch (error) {
        console.log(error);
    }

});

router.get('/upcoming', async function (req, res, next) {

    const response = {};
    const dateTomorrow = moment().startOf('day').add(1,'day').set({hour:3,minute:0,second:0,millisecond:0});
    const dateToday = moment().set({hour:3,minute:0,second:0,millisecond:0});

    //Cases Today
    try {
        response.todayCases = await Case.findAll({

            where: {
                case_date: {
                    [Op.gt]: dateToday,
                    [Op.lt]:  dateTomorrow,
                },
                UserId:req.user.user_id,
            },
            include: [{all: true, nested: true}]

        });

    } catch (error) {
        console.log(error);
    }

    //Cases Coming Soon
    try {
        response.upcomingCases = await Case.findAll({

            where: {
                case_date: {
                    [Op.gt]: dateToday,
                    [Op.lt]: moment().add(2,'day'),
                },
                UserId:req.user.user_id,
            },
            include: [{all: true, nested: true}]

        });

    } catch (error) {
        console.log(error);
    }

    res.send(response);

});

router.delete('/delete', async function (req, res, next) {

    const caseId = req.params.id;
    
    await Case.destroy({
        where: {
            id: caseId,
            UserId:req.user.user_id,
        }
    });
});

module.exports = router;

