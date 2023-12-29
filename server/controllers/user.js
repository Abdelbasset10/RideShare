const prisma = require('../utils/prisma')

const updateUser = async (req,res) => {
    try {
        const {id} = req.params

        if(!id){
            return res.status(400).json({message:"User id is required!"})
        }

        const user = await prisma.user.findUnique({
            where:{
                id
            }
        })

        if(!user){
            return res.status(404).json({message:"User does not exists!"})
        }

        if(id !== req.userId && req.role !=="ADMIN") {
            return res.status(401).json({message:"You can't modify an account that's not yours!"})
        }

        const updatedUser = await prisma.user.update({
            where:{
                id
            },
            data:{
                ...req.body
            }
        })

        return res.status(200).json(updatedUser)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

const deleteUser = async (req,res) => {
    try {
        const {id} = req.params

        if(!id){
            return res.status(400).json({message:"User id is required!"})
        }

        const user = await prisma.user.findUnique({
            where:{
                id
            }
        })

        if(!user){
            return res.status(404).json({message:"User does not exists!"})
        }

        if(id !== req.userId && req.role !=="ADMIN") {
            return res.status(401).json({message:"You can't delete an account that's not yours!"})
        }

        await prisma.trajet.deleteMany({
            where:{
                chauffeur_id:id
            }
        })

        await prisma.user.delete({
            where:{
                id
            },
        })

        return res.status(200).json({message:"User has been deleted"})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

const getUsers = async (req,res) => {
    try {
        const users = await prisma.user.findMany({})
        return res.status(200).json(users)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

const getUser = async (req,res) => {
    try {
        const {id} = req.params

        if(!id){
            return res.status(400).json({message:"User id is required!"})
        }

        const user = await prisma.user.findUnique({
            where:{
                id
            }
        })

        if(!user){
            return res.status(404).json({message:"User does not exists!"})
        }

        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}


module.exports = {
    updateUser,
    deleteUser,
    getUsers,
    getUser
}