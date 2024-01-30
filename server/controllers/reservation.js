const prisma = require('../utils/prisma')

const getUserReservations = async (req,res) => {
    try {
        const {id} = req.params

        if(!id){
            return res.status(400).json({message:"User id is required!"})
        }

        const reservations = await prisma.reservation.findMany({
            where:{
                user_id:id
            },
            include:{
                trajet:true,
                user:true
            }
        })
        return res.status(200).json(reservations)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

const updateReservations = async (req,res) => {
    try {
        const {id} = req.params
        const {userId} = req.body

        

        if(!id){
            return res.status(400).json({message:"reservetion id is required!"})
        }

        const reservation = await prisma.reservation.findUnique({
            where:{
                id
            },
            include:{
                trajet:true,
                user:true
            }
        })

        if(!reservation){
            return res.status(404).json({message:"reservation does not exists"})
        }

        const user = await prisma.user.findUnique({
            where:{
                id:userId
            }
        })

        if(!user){
            return res.status(404).json({message:"User does not exists"})
        }

        if(reservation.user_id !== userId || reservation.trajet.chauffeur_id !== userId){
            return res.status(401).json({message:"UnAuthorized"})
        }

        if(req.body.nb_places > reservation.trajet.nb_place){
            return res.status(400).json({message:"Your number of places is grater then rest of trajets left!"})
        }

        await prisma.reservation.update({
            where:{
                id
            },
            data:{
                ...req.body
            }
        })

        return res.status(200).json(reservation)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

module.exports = {
    getUserReservations,
    updateReservations
}