const {Case,Prosecutor,Defendant} = require("../../models");

  async function updateCase(case_data,userId) {
    try {

         await Case.update({
            status: 1,
            location: case_data.location,
            case_no: case_data.case_no,
            case_date: case_data.case_date,
        }, {
            where: {
                id: case_data.id,
                UserId:userId
            },

        });

         await Prosecutor.update({
                 name: case_data.Prosecutor.name,
                 email: case_data.Prosecutor.email,
                 advocate: case_data.Prosecutor.advocate,
                 phone_number: case_data.Prosecutor.phone_number,
                 address: case_data.Prosecutor.address,
        }, {
            where: {
                id: case_data.id,
            },

        });

         await Defendant.update({
             name: case_data.Defendant.name,
             email: case_data.Defendant.email,
             advocate: case_data.Defendant.advocate,
             phone_number: case_data.Defendant.phone_number,
             address: case_data.Defendant.address,
             hukum: case_data.Defendant.hukum,
             icra: case_data.Defendant.icra,
             hapislik: case_data.Defendant.hapislik,
             taksit_orani: case_data.Defendant.taksit_orani,
        }, {
            where: {
                id: case_data.id,
            },

        });

         return await Case.findOne({
             where: {
                 id: case_data.id,
                 UserId:userId,
             },
             include: [{all: true, nested: true}]
         });

    } catch (err) {
        console.log(err);
    }
}


module.exports = {updateCase}