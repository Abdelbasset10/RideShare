import { Link } from 'react-router-dom';
import rideshareLogo from '../assets/img/logo.png'
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const Navbar = () =>  {

    const {user} = useContext(AuthContext)

    return (
        <nav className="navbar ">
            <div className="navbar-wrapper">

            <Link to='/' className="navbar-logo-wrapper">
                <img src={rideshareLogo} alt="Logo Rideshare" />
                <p>RideShare</p>
            </Link>

            <div className="navbar-right">
                    <Link to="/" >Acceuil</Link>
                    <Link to="/routes/search">Rechercher Trajet</Link>
                    <Link to="/routes/add">Ajouter Trajet</Link>
                    {!user.id && <>
                        <Link className='btn-register' to="/register">S'inscrire</Link>
                        <Link className='btn-login' to="/login">Se Connecter</Link>
                    </>}

                    {user.id && 
                        <Link to='profile' className='profile-btn'>Profile</Link>
                    }
                    
                </div>
            </div>
        </nav>
    );
}
 
export default Navbar;