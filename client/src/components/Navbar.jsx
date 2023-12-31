import { Link } from 'react-router-dom';
import rideshareLogo from '../assets/img/logo.png'

const Navbar = () =>  {
    return (
        <nav className="navbar w-full">
            <div className="navbar-logo-wrapper">
                <img src={rideshareLogo} alt="Logo Rideshare" />
                <p>RideShare</p>
            </div>

            <div className="navbar-right">
                <div className="links-wrapper">
                    <Link to="/" >Acceuil</Link>
                    <Link to="/routes/search">Rechercher Trajet</Link>
                    <Link to="/routes/add">Ajouter Trajet</Link>
                    
                    <Link className='btn-register' to="/register">S'inscrire</Link>
                    <Link className='btn-login' to="/login">Se Connecter</Link>

                </div>
            </div>
        </nav>
    );
}
 
export default Navbar;