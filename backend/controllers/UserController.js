
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


module.exports = class UserController {

    static securePassword = (password) =>  {
        var passwordHash =  bcrypt.hashSync(password, 10)
        return passwordHash;
    }
    static addUser = async (req, resp) => {
        // let data = await User.build({name:'Test',email:'test@gmail.com'});
        // data.save();

        let file = req.files.profilepic
        let password = this.securePassword(req.body.password);
        let data = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            profilepic: file.name
        })
        data.save();
        file.mv(process.env.PROFILE_PIC_FOLDER + data.id + '_' + file.name, (err) => {
            if (err) {
                msg = err + "file not moved | " + file.filename;
                console.log(msg);
                throw msg;
            }
        })
        // data.destroy();
        // data.reload()
        let response = {
            data: data
        }
        resp.status(200).json(response);
    }

    static async login(req, res) {
        try{
            var email = req.body.email
            var password = req.body.password
            var message = "Login Succesfully"
            const user = await User.findOne({
                where: { email: email}
            })
            if(user == null){
                throw new Error("Invalid Login Details")
            }
            bcrypt.compare(password,user.password).then(isMatch => {
                if(isMatch){
                    const token  = jwt.sign({id:user.id},"overthinking")
                    res.cookie('jwt',token,{
                        expires: new Date(Date.now() + 3000000),
                        httpOnly: true,
                        secure: true
                    })
                    req.session.user = user;
                    res.status(201).render('index')
                }else{
                    res.send("wrong credentials")                
                }
            }).catch(err => {
                res.status(500).send('Internal Server Error')
            })
        }catch(error){
            message = error.message
            res.status(400).json({'message': message})
        }

    }

    // var update = async(req,resp)=>{
    //     let data = await User.update({name: 'update',email:'update'},{
    //         where:{
    //             id:2
    //         }
    //     })
    //     let response = {
    //         data: data
    //     }
    //     resp.status(200).json(response)
    // }
    // var deleteOp = async (req,resp)=>{
    //     let data = await User.destroy({
    //         where:{id:15}
    //     })
    //     let response = {
    //         data:data
    //     }
    //     resp.status(200).json(response)
    // }
}
