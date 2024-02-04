const prisma = require('../utils/prisma')

const createTrajet = async (req,res) => {
    try {
        let {
          start_date,
          hour_start,
          nb_place,
          chauffeur_id,
          start_lat,
          start_long,
          start_name,
          end_lat,
          end_long,
          end_name,
          price,
        } = req.body;

        if (!start_date  || !hour_start || !nb_place || !chauffeur_id ||!start_lat || !start_long || !start_name || !end_name || !end_lat || !end_long || !price) {
          return res.status(400).json({ message: "Make sure to fill all trajets informations!" });
        }

        nb_place = parseInt(nb_place)
        start_lat = parseFloat(start_lat)
        start_long = parseFloat(start_long)
        end_lat = parseFloat(end_lat)
        end_long = parseFloat(end_long)
        price = parseFloat(price)


        const user = await prisma.user.findUnique({
            where:{
                id: chauffeur_id
            },
            include:{
                car:true
            }
        })

        if(!user){
            return res.status(404).json({message:"Chauffeur does not exists!"})
        }

        if(user.type !=="CHAUFFEUR"){
            return res.status(400).json({message:"You have to be chauffeur to create trajet!"})
        }
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
            const day = currentDate.getDate().toString().padStart(2, '0');
            const formattedDate = year + "-" + month + "-" + day;

        if(formattedDate>start_date){
            return res.status(400).json({message:"You can't pick day that is gone!"})
        }

        if(nb_place >user.car.max_places){
            return res.status(400).json({message:`nb places must be ${user.car.max_places}`})
        }

        if(price < 0){
            return res.status(400).json({message:`price cant be < 0`})
        }

        const start_position = await prisma.position.create({
            data:{
                latitude: start_lat,
                longitude: start_long,
                name: start_name
            }
        })
        const end_position = await prisma.position.create({
            data:{
                latitude: end_lat,
                longitude:end_long,
                name: end_name
            }
        })
        

       await prisma.trajet.create({
        data:{
            start_date,
            hour_end:"18:00",
            hour_start,
            nb_place,
            price,
            chauffeur_id,
            position_startId:start_position.id,
            position_endId:end_position.id,
            car_id:user.car.id
        }
       })

       return res.status(201).json({message:"Trajet created successfully!"})

    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

const reserverTrajet = async (req,res) => {
    try {
        const {id} = req.params
        if(!id){
            return res.status(400).json({message:'Trajet is required!'})
        }

        let {userId,nb_places} = req.body

        if(!userId){
            return res.status(400).json({message:"User is required!"})
        }

        nb_places = parseFloat(nb_places);

        if(nb_places === 0){
            return res.status(400).json({message:"You have to select number of places"})
        }

        const trajet = await prisma.trajet.findUnique({
            where:{
                id
            }
        })

        if(!trajet){
            return res.status(404).json({message:"Trajet does not exists!"})
        }

        if(nb_places > trajet.nb_place){
            return res.status(400).json({message:"Your number of places is grater then rest of trajets left!"})
        }

        await prisma.reservation.create({
            data:{
                nb_place:nb_places,
                user_id:userId,
                trajet_id:id
            }
        })

        await prisma.trajet.update({
            where:{
                id
            },
            data:{
                nb_place:trajet.nb_place - nb_places
            }
        })

        return res.status(200).json({message:"Reservation has been created successfully!"})


    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}


const getCloseTrajets = async (req,res) => {
    try {
        let {lat,long} = req.body

        const min_shape_lat = lat -1
        const max_shape_lat = lat +1

        const min_shape_long = long -1
        const max_shape_long = long +1
        
    const close_trajets = await prisma.trajet.findMany({
        where:{
            position_start:{
                latitude:{
                    lte:max_shape_lat,
                    gte:min_shape_lat
                },
                longitude:{
                    lte:max_shape_long,
                    gte:min_shape_long
                }
            }
        },
        include:{
            reservations:true,
            chauffeur:true,
            car:true,
            position_start:true,
            position_end:true 
         }
    })
    return res.status(200).json(close_trajets)
    } catch (error) {
        return res.status(500).json({message:error.messaeg})
    }
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}


const researchTrajet = async (req, res) => {

   

    try {
        let whereConditions = {};

        const { depart_lat, depart_long, dest_lat, dest_long, date, start_hour } = req.query;
        const limit = 0.02;

        // Add location conditions if provided
        if (depart_lat && depart_long) {
            whereConditions.position_start = {
                latitude: {
                    lte: parseFloat(depart_lat) + limit,
                    gte: parseFloat(depart_lat) - limit
                },
                longitude: {
                    lte: parseFloat(depart_long) + limit,
                    gte: parseFloat(depart_long) - limit
                }
            };
        }

        if (dest_lat && dest_long) {
            whereConditions.position_end = {
                latitude: {
                    lte: parseFloat(dest_lat) + limit,
                    gte: parseFloat(dest_lat) - limit
                },
                longitude: {
                    lte: parseFloat(dest_long) + limit,
                    gte: parseFloat(dest_long) - limit
                }
            };
        }

        // Add date and start hour conditions if provided
        if (date) {
            whereConditions.start_date = {
                gt: date // Filter for start dates greater than the provided date
            };
        }

        if (start_hour) {
            whereConditions.hour_start = {
                gt: start_hour // Filter for start dates greater than the provided date
            };
        }


        const trajets = await prisma.trajet.findMany({
            where: whereConditions,
            include:{
                reservations:true,
                chauffeur:true,
                car:true,
                position_start:true,
                position_end:true,
             }
        });


        const sortedTrajets = trajets.map(trajet => {
            const distance = calculateDistance(depart_lat, depart_long, trajet.position_start.latitude, trajet.position_start.longitude);
            return { trajet, distance };
        }).sort((a, b) => a.distance - b.distance);

        // Extract only the trajets without the distance property
        const resultTrajets = sortedTrajets.map(item => item.trajet);

        return res.status(200).json(trajets);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
const updateTrajet = async (req,res) => {

    try {
        const {id} = req.params

        let {userId,price,end_long,end_lat,start_long,start_lat,nb_place,start_date,hour_start} = req.body

        

        price = parseFloat(price);
        nb_place = parseInt(nb_place);

        if(!id){
            return res.status(400).json({message:"Trajet id is required"})
        }

    const trajet = await prisma.trajet.findUnique({
        where:{
            id,
        }
    })

    if(!trajet){
        return res.status(404).json({message:"Trajet does not exists!"})
    }

    if(trajet.chauffeur_id !== userId){
        return res.status(400).json({message:"You can't update trajet that's not yours!!"})
    }

    if(start_date){
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
        const day = currentDate.getDate().toString().padStart(2, '0');
        const formattedDate = year + "-" + month + "-" + day;

        if(formattedDate>start_date){
            return res.status(400).json({message:"You can't pick day that is gone!"})
        }
    }

    if(req.body.hour_start || req.body.hour_end){
        if((req.body.hour_start>req.body.hour_end) || (req.body.hour_start > trajet.hour_end) || (req.body.hour_end < trajet.hour_start)){
            return res.status(400).json({message:"Confirm your hours trajet!"})
        }
    }

    const getPositionStart = await prisma.position.findFirst({
        where:{
            longitude:start_long,
            latitude:start_lat
        }
    })

    let newPositionStart

    if(!getPositionStart){
        newPositionStart = await prisma.position.create({
            data:{
                longitude:start_long,
                latitude:start_lat
            }
        })
    }else{
        newPositionStart = await prisma.position.update({
            where:{
                longitude:start_long,
                latitude:start_lat
            },data:{
                longitude:start_long,
                latitude:start_lat
            }
        })
    }

    const getPositionEnd = await prisma.position.findFirst({
        where:{
            longitude:end_long,
            latitude:end_lat
        }
    })

    let newPositionEnd

    if(!getPositionEnd){
        newPositionEnd = await prisma.position.create({
            data:{
                longitude:end_long,
                latitude:end_lat
            }
        })
    }else{
        newPositionEnd = await prisma.position.update({
            where:{
                longitude:end_long,
                latitude:end_lat
            },data:{
                longitude:end_long,
                latitude:end_lat
            }
        })
    }

    const updatedTrajet = await prisma.trajet.update({
        where:{
            id
        },
        data : {
            ...req.body,
            start_date: start_date,
            hour_start: hour_start,
            position_startId:newPositionStart.id,
            position_endId:newPositionEnd.id,
            price: price,
            nb_place: nb_place,
        }
    })

    return res.status(200).json(updatedTrajet)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

const getAllTrajets = async (req,res) => {
    try {
        const trajets = await prisma.trajet.findMany({
            include:{
                reservations:true,
                car:true,
                position_start:true,
                position_end:true,
                chauffeur:true
             }
         })
         return res.status(200).json(trajets)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

const getTrajet = async (req,res) => {
    
    try {
        const {id} = req.params

    if(!id){
        return res.status(400).json({message:"Trajet id is required"})
    }
    const trajet = []

    if(!trajet){
        return res.status(404).json({message:"Trajet does not exists!"})
    }

    return res.status(200).json(trajet)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

const getUserTrajets = async (req,res) => {
    try {
        const {id} = req.params

        if(!id){
            return res.status(400).json({message:"User id is required!"})
        }

        const trajets = await prisma.trajet.findMany({
            where:{
                chauffeur_id:id
            },
            include:{
               reservations:true,
               chauffeur:true,
               car:true,
               position_start:true,
               position_end:true,
            }
        })



        return res.status(200).json(trajets)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

const deleteTrajet = async (req,res) => {
    try {
        const {id} = req.params

        if(!id){
            return res.status(400).json({message:"Trajet id is required"})
        }

        const {userId} = req.body

        if(!userId){
            return res.status(400).json({message:"Owner of this trajet is required!"})
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
                id,
            },
            include:{
                position_start:true,
                position_end:true,
                reservations:true,
            }
        })

        if(!trajet){
            return res.status(401).json({message:"Trajet does not exists!"})
        }

        if(trajet.chauffeur_id !== userId){
            return res.status(400).json({message:"You can't delete trajet that's you are not the owner!"})
        }

        const deletePromises = trajet.reservations.map(async (reservation) => {
            await prisma.reservation.delete({
              where: {
                id: reservation.id
              }
            });
          });
            await Promise.all(deletePromises);

        await prisma.trajet.delete({
            where:{
                id
            },
        })

       
        // await prisma.position.delete({
        //     where: {
        //         id:trajet.position_start.id
        //     },
        //   });
        
        //   await prisma.position.delete({
        //     where: {
        //         id:trajet.position_end.id    
        //     },
        //   });
        
        return res.status(200).json({message:'Trajet has been deleted successfully!'})

    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}



module.exports = {
    createTrajet,
    getCloseTrajets,
    getAllTrajets,
    getTrajet,
    updateTrajet,
    deleteTrajet,
    reserverTrajet,
    getUserTrajets,
    researchTrajet
}