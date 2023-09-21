const express = require("express");
const router = express.Router();
const User = require("../models/User")
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const fetchuser = require("../middleWare/fetchuser")
const jwt = require("jsonwebtoken");
const JWT_SECRET = "Mihirisgoodb$oy"
// ROUTE 1 Create a User using :POST "/api/auth/createuser"
router.post('/createuser', [
    body('email', "Enter valid email ").isEmail(),
    body('name', "Enter valid name ").isLength({ min: 3 }),
    body('password', "Enter password more than 5 characters").isLength({ min: 5 }),
], async (req, res) => {
    // console.log(req.body)
    // const user = User(req.body)
    // user.save()
    // If there are errors, return bad request & the errors
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }
    //Check weather this email exist already
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({success, error: "Sorry The email exist already" })
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt)
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })
        
        const data = {
            user: {
                id: user.id
            }
        }
        const justData = jwt.sign(data,JWT_SECRET);
        success = true
        res.json({success,justData})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured")
    }

    //   .then(user => res.json(user))
    //   .catch(err => {console.log(err)
    //   res.json({error:"Please enter unique value for Email", message:err.message})})

})
//ROUTE 2 Authenticate a User using :POST "/api/auth/login"
router.post('/login', [
    body('email', "Enter valid email ").isEmail(),
    body('password', "Password is blank").exists(),
], async (req, res) => {
    // If there are errors, return bad request & the errors
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {email,password} = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            success = false
            return res.status(400).json({ error: "Sorry Please enter correct credentials" })
        }
        const passwordCompare = await bcrypt.compare(password,user.password);
        if(!passwordCompare){
            success = false
            return res.status(400).json({success, error: "Sorry Please enter correct credentials" })
        }
        
        const data = {
            user: {
                id: user.id
            }
        }
        const justData = jwt.sign(data,JWT_SECRET);
        success = true
        res.json({success,justData})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal error happened")
    }

})
//ROUTE 3 Get loggedin user details :POST "/api/auth/getuser" login required
router.post('/getuser', fetchuser, async (req, res) => {
    // If there are errors, return bad request & the errors
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user)
    } catch (error) {
        res.status(500).send("Internal error happened")
    }

})

module.exports = router