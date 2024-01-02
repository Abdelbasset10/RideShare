const jwt = require('jsonwebtoken')

const isSignIn = async (req,res,next) => {
    try {
        const token = req.headers.Authorization || req.headers.authorization
        if(!token){
            return res.status(401).json({message:"UnAuthenticated!"})
        }
        const paylaod = token.split(" ")[1]
        const decodedToken = jwt.decode(paylaod,process.env.JWT_SECRET)    
        req.userId = decodedToken.user.id
        req.role = decodedToken.user.type
        next()
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}


const isAdmin = async (req,res,next) => {
    try {
        isSignIn(req,res,()=>{
            if(req.role !=="ADMIN"){
                return res.status(401).json({message:"UnAuthorized! you are not admin!"})
            }
        next()
        })
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

const isChauffeur = async (req,res,next) => {
    try {
        isSignIn(req,res,()=>{
            if(req.role!=="CHAUFFEUR"){
                return res.status(400).json({message:"You have to be chauffeur to do this process!"})
            }
        })
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

module.exports = {
    isSignIn,
    isAdmin,
    isChauffeur
}