import React from 'react'
import ProfileUserBox from "./ProfileUserBox.tsx";

const ProfileEdit = () => {
  return (
    <div className='flex justify-center sm:flex-col lg:flex-row'>
    <ProfileUserBox/>
     <div className="mr-5"></div>
    
    <form
          className="profile-account-form"
        >
         
            <div className="account-profile-informations-wrapper ">
              <div className="w-full">
              <div className="account-profile-img-wrapper">
                  <label htmlFor="profilePicture">Profile Picture:</label>
                  <input type="file" id="profilePicture" accept="image/*" />
                </div>
            
                <div className="form-row grid-cols-2">
                  <div className="form-group">
                    <label htmlFor="first_name">Nom</label>
                    <input
                      id="first_name"
                      type="text"
                     
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="last_name">Prénom:</label>
                    <input
                      id="last_name"
                      type="text"
                      
                    />
                  </div>
                </div>

                <div className="form-row grid-cols-2">
                  <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input id="email" type="email" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="Mot_passe">Mot de passe:</label>
                    <input type="text" id="Mot_passe"/>
                  </div>

                 
                </div>
                <div className="form-row grid-cols-2">
                <div className="form-group">
                    <label htmlFor="n_tlph">Phone Number:</label>
                    <input type="text" id="n_tlph"/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="matricule">Matricule:</label>
                    <input
                      type="text" id="matricule" />
                  </div>
                </div>
                <div className="form-row grid-cols-2">
                  <div className="form-group">
                    <label htmlFor="mat_vehi">Matricule de Vehicule:</label>
                    <input id="mat_vehi" type="text" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="mod_veh">Modèle de Vehicule:</label>
                    <input type="text" id="mod_veh"/>
                  </div>
                  

                 
                </div>
                <div className="form-row grid-cols-2">
                  <div className="form-group">
                    <label htmlFor="annee_vehi">Année de Vehicule:</label>
                    <input id="annee_vehi" type="text" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="couleur_veh">Couleur de Vehicule:</label>
                    <input type="text" id="couleur_veh"/>
                  </div>
                  

                </div>
              

                <div className="form-row grid-cols-2">
                  <div className="form-group">
                    <label htmlFor="type">Account Type:</label>
                    <select
                      id="type"
                     
                    >
                      <option value="">Chosissez votre type de compte</option>
                      <option value="CHAUFFEUR">Chauffeur</option>
                      <option value="VOYAGEUR">Voyageur</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="gender">Sexe</label>
                    <div className="error-msg">
                     
                    </div>

                    <select id="gender" >
                      <option value="">Chosissez votre genre</option>
                      <option value="MALE">Homme</option>
                      <option value="FEMALE">Femme</option>
                    </select>
                  </div>

                </div>
                <div className="form-row grid-cols-2">
                  <div className="form-group">
                    <label htmlFor="nb_max">Nombre max de places:</label>
                    <input id="nb_max" type="text" />
                  </div>

                </div>

               
              </div>

              <button
                className="bg-orange text-white rounded-md px-2.5 py-1"
                type="submit"
              >
                Modifier
              </button>
            </div>
            </form>
            </div>
  )
}

export default ProfileEdit