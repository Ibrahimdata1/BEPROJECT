const jwt = require('jsonwebtoken')

const verifyTokenEmp = (req,res,next)=>{
    const token = req.cookies['tokenEmp']
    if(!token){
        return res.status(401).json({error:'You are not authenticed!'})
    }
    jwt.verify(token,process.env.SECRETKEY,async(error,decoded)=>{
        if(error){
            return res.status(403).json('Token not Valid!')
        }
        req.id = decoded.id
        next()
    })
}

module.exports = verifyTokenEmp