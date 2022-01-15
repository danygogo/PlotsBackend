const{response} = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs")



const newUser = async (req, resp = response) =>{

    const {name, email, phone, password} = req.body

    try{

        const user = await User.findOne({email : email})

        if(user){
            return resp.status(400).json(
                {
                    ok: false,
                    msg: "This email is already registered in our database "
                }
            );
        }

        const dbUser = new User(req.body);

        const salt = bcrypt.genSaltSync();

        dbUser.password = bcrypt.hashSync(password, salt);

        await dbUser.save();

        return resp.status(201).json(
            {
                ok: true,
                uid: dbUser.id,
                name: dbUser.name
            }
        )

    }catch(error){
        console.log(error)
        return resp.status(500).json(
            {
                ok: false,
                msg: "Error, please contact the admin"
            }
        )
    }

}






const login = async(req, resp = response) =>{

    const {email, password} = req.body

    try{
        const dbUser = await User.findOne({email:email})

        if(!dbUser){
            return resp.status(400).json(
                {
                    ok: false,
                    msg: "The password or email is wrong"
                }
            );
        }

        const validPassword = bcrypt.compareSync( password, dbUser.password );

        if(!validPassword){
            return resp.status(400).json(
                {
                    ok: false,
                    msg: "Wrong e-mail or password"
                }
            );
        }

        return resp.status(201).json(
            {
                ok: true,
                uid: dbUser.id,
                name: dbUser.name
            }
        )


        
    }catch(error){
        console.log(error)
        return resp.status(500).json(
            {
                ok: false,
                msg: "Error, please contact the admin"
            }
        )
    }
}

module.exports ={
    newUser,
    login
}