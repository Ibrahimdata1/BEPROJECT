const jwt = require('jsonwebtoken')

const verifyToken = (req,res,next)=>{
    const token = req.cookies.token
    console.log(token)
    if(!token){
        return res.status(401).send('You are not authenticed!')
    }
    jwt.verify(token,process.env.SECRETKEY,async(error,data)=>{
        if(error){
            return res.status(403).send('Token not Valid!')
        }
        next()
    })
}

module.exports = verifyToken