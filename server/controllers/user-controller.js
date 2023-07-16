/* 
    From CSE 316 Top 5 Lister Project.
*/

/*
    This is our application's top-level component.
    
    @author McKilla Gorilla
*/

const auth = require('../auth')
const User = require('../models/user-model')
const bcrypt = require('bcryptjs')

getLoggedIn = async (req, res) => {
    try {
        auth.verify(req, res, async function () {
            const loggedInUser = await User.findOne({ email: req.userEmail });
            return res.status(200).json({
                loggedIn: true,
                user: {
                    email: loggedInUser.email
                }
            }).send();
        })
    } catch (err) {
        res.status(500).json({error:err}).send();
    }
}

logInUser = async (req, res) => {
    try {
        const loggedInUser = await User.findOne({ email: req.body.email});
        let isPassword = false;
        isPassword = await bcrypt.compare(req.body.password, loggedInUser.passwordHash);
        if(!isPassword) {
            return res.status(400).json({
                success: false,
                errorMessage: "Password is incorrect."
            }).send(); 
        }
        if (loggedInUser) {
            // LOGIN THE USER
            const token = auth.signToken(loggedInUser);
            await res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "none"
            }).status(200).json({
                success: true,
                user: {
                    firstName: loggedInUser.firstName,
                    lastName: loggedInUser.lastName,
                    username: loggedInUser.username,
                    email: loggedInUser.email
                }
            }).send();
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({error:err}).send();
    }
}

logOutUser = async (req, res) => {
    try {
        res.clearCookie("token").status(200).json({
            success: true
        }).send()
    } catch (err) {
        res.status(500).send();
    }
}

registerUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if ( !email || !password) {
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields." });
        }
        /*if (password.length < 8) {
            return res
                .status(400)
                .json({
                    errorMessage: "Please enter a password of at least 8 characters."
                });
        }*/
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res
                .status(400)
                .json({
                    success: false,
                    errorMessage: "An account with this email address already exists."
                })
        }
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            email: email, passwordHash: passwordHash, problems: []
        });
        const savedUser = await newUser.save();

        // LOGIN THE USER
        const token = auth.signToken(savedUser);

        await res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        }).status(200).json({
            success: true,
            user: {
                email: savedUser.email
            }
        }).send();
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

module.exports = {
    getLoggedIn,
    registerUser,
    logInUser,
    logOutUser
}