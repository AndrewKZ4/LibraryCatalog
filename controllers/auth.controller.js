const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require("../models");
const keys = require("../config/keys")
const User = db.users;

//const errorHandler = require('../utils/errorHandler')

module.exports.login = async function(req, res) {

    const userdb = await  User.findOne({ where: { email: req.body.email } });


    if (userdb)
    {
        const isRulePassw = bcrypt.compareSync(req.body.password, userdb.password)
        if (isRulePassw)
        {

            const token = jwt.sign({
                email: userdb.email,
                id: userdb.id
            }, keys.jwt, {expiresIn: 60*60})

            res.status(200).json({
                token: `Bearer ${token}`
            })
        }
        else{
            res.status(401).json({
                mes: 'Пароль неверный'
            })
        }
    }
    else
    {
        res.status(404).json({
            mes: 'Пользователь не регистрирован!'
        })
    }
}

module.exports.register = async function(req, res) {

    const userdb = await  User.findOne({ where: { email: req.body.email } });

    if (userdb)
    {
        res.status(409).json({
            message: 'Такой e-mail уже существует!!!'
        })
    }
    else
    {
        const salt = bcrypt.genSaltSync(10)
        const passw = bcrypt.hashSync(req.body.password, salt)

        const user = {
            email: req.body.email,
            password: passw
        }
        User.create(user)
            .then(data => {
                res.status(200).json(user)
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the User."
                });
            });
    }

}