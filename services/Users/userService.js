const {User} = require('../../models');

 async function addUser(name,email,password,company){

    try{
        const userExists = await User.findOne({
            where: {
                email: email
            },
        });

        if(userExists){
            return {
                error:true,
                message:'User already exists!'

            };
        }

    }catch (err){
        console.log(err);
    }

    try{

        const user =  await User.create({name,email,password,company})

        return {
            success:true,
            message:'User created successfully',
            user:user
        }
    }catch (err){
        console.log(err);
    }
}
 



module.exports = {addUser}