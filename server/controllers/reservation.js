const prisma = require('../utils/prisma')

const getUserReservations = async (req,res) => {
    try {
        const {id} = req.params

        if(!id){
            return res.status(400).json({message:"User id is required!"})
        }

        const reservations = await prisma.reservation.findMany({
            where:{
                user_id:id,
            },
            include:{
                trajet: {
                    include: {
                        car:true,
                        position_start:true,
                        position_end:true,
                    }
                },
                user:true,
                
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
        let {userId,nb_places} = req.body


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

        if(nb_places > reservation.trajet.nb_place){
            return res.status(400).json({message:"Your number of places is grater then rest of trajets left!"})
        }


        const trajet = await prisma.trajet.findUnique({
            where:{
                id:reservation.trajet_id
            },
            include:{
                reservations:true
            }
        })

        if(!trajet){
            return res.status(404).json({message:"Trajet of this reservation does not exists!"})
        }

        const updatedReservation = await prisma.reservation.update({

            where:{
                id
            },
            data:{
                nb_place: nb_places,
                user_id:userId,
            }
        })


        await prisma.trajet.update({
            where:{
                id:trajet.id
            },
            data:{
                reservations:trajet.reservations.map((item)=>item.id === reservation.id ? updatedReservation : item)
            }
        })

        return res.status(200).json(reservation)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

const deleteReservation = async (req,res) => {
    try {
        const {id} = req.params
        const {userId} = req.body

        if(!id){
            return res.status(400).json({message:"Reservation is required"})
        }

        if(!userId){
            return res.status(400).json({message:"User who will delete this trajet is required"})
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
            return res.status(404).json({message:"Reservation does not exists!"})
        }

        const user = await prisma.user.findUnique({
            where:{
                id:userId
            }
        })

        if(!user){
            return res.status(404).json({message:"User does not exists!"})
        }

        const trajet = await prisma.trajet.findUnique({
            where:{
                id:reservation.trajet_id
            },
            include:{
                reservations:true
            }
        })

        if(reservation.user_id !== userId || reservation.user_id !== trajet.chauffeur_id){
            return res.status(401).json({message:'UnAuthorized'})
        }

        await prisma.trajet.update({
            where:{
                id:reservation.trajet_id
            },
            data:{
                nb_place:+ reservation.nb_place,
                reservations:trajet.reservations.filter((item)=>item.id !== reservation.id)
            }
        })

        await prisma.reservation.delete({
            where:{
                id
            }
        })

        return res.status(200).json({message:"Reservation is deleted"})

    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

module.exports = {
    getUserReservations,
    updateReservations,
    deleteReservation
}