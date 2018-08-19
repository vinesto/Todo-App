const Model = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const axios = require('axios')
const saltRounds = 10 


const signUp = (req, res) => {
    // console.log('masuk signup');
    
    var salt = bcrypt.genSaltSync(saltRounds);
    var hash = bcrypt.hashSync(req.body.password, salt);
    // console.log('mmasusususus');
    
    Model.findOne({
        email: req.body.email
    })
        .then(dataUser => {
            if (!dataUser) {
                // console.log('==datauser===',dataUser);
                // console.log('===req.body==',req.body);
                
                let { name, email, facebookID } = req.body
                Model.create({
                    name: name,
                    email: email,
                    password: hash,
                    facebookID: facebookID
                })
                    .then(function (data) {
                        res.status(200).json({ msg: 'new user added', data: data })
                    })
                    .catch(function (err) {
                        res.status(500).json({ msg: 'add user failed' })
                    })
            } else {
                res.json({ msg: 'email has already taken' })
            }
        })

}

const signIn = (req, res) => {
    Model.findOne({
        email: req.body.email
    })
        .then(function (dataUser) {
            if (dataUser) {
                let token = jwt.sign({ name: dataUser.name, email: dataUser.email }, 'secretkey')
                let decodedPass = bcrypt.compare(req.body.password, dataUser.password)
                if (decodedPass) {
                    res.status(200).json({ token })
                } else {
                    res.status(400).json({ msg: "email/password is wrong" })
                }
            }
        })
        .catch(function (err) {
            res.status(500).json({ msg: 'email not found', err: err })
        })
}

const loginFb = (req, res) => {
    console.log('masuuuuuk');

    let authResponse = req.body
    console.log('=====authrepons====', authResponse);

    let urlUserInfo = `https://graph.facebook.com/me?fields=id,name,email&access_token=${authResponse.accessToken}`

    axios.get(urlUserInfo)
        .then(function (dataFb) {
            console.log('==========datafb.data=======', dataFb.data);
            Model.findOne({
                email:dataFb.data.email
            })
            .then(function(result){
                if (!result) {
                    Model.create({
                        name: dataFb.data.name,
                        email: dataFb.data.email,
                        facebookID: dataFb.data.id
                    })
                        .then(function (newUser) {
                            let token = jwt.sign({ name: newUser.name, email: newUser.email }, 'secretkey')
                            // res.json({ newUser, token })
                            res.status(200).json({ msg: 'new user added', newUser, token })
                            console.log('=======newUser======', newUser);
                        })
                        .catch(function (err) {
                            res.status(500).json({ msg: 'add new user failed', err })
                        })
                } else {
                    let token = jwt.sign({ name: dataFb.data.name, email: dataFb.data.email }, 'secretkey')
                    // res.json({ dataFb, token })
                    res.status(200).json({ token })
                }
            })
        })
        .catch(function (err) {
            console.log('err bro', err);
        })
}



module.exports = { signIn, signUp, loginFb }