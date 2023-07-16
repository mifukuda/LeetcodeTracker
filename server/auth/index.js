/* 
    From CSE 316 Top 5 Lister Project.
*/

/*
    This is our application's top-level component.
    
    @author McKilla Gorilla
*/

const jwt = require("jsonwebtoken")

function authManager() {
    verify = function (req, res, next) {
        try {
            const token = req.cookies.token;
            if (!token) {
                return res.status(401).json({
                    loggedIn: false,
                    user: null,
                    errorMessage: "Unauthorized"
                })
            }

            const verified = jwt.verify(token, process.env.JWT_SECRET);
            req.userEmail = verified.userEmail;

            next();
        } catch (err) {
            console.error(err);
            return res.status(401).json({
                errorMessage: "Unauthorized"
            });
        }
    }

    signToken = function (user) {
        return jwt.sign({
            userEmail: user.email
        }, process.env.JWT_SECRET);
    }

    return this;
}

const auth = authManager();
module.exports = auth;