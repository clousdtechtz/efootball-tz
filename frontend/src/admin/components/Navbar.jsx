import { Menu, LogOut } from 'lucide-react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SideNavContext } from '../../contexts/Sidenavontext'; // Kept your exact context path
import axios from 'axios';

// Directly targeting your live Render backend
const API_URL = 'https://efootball-tz.onrender.com';

const Navbar = () => {
  const navigate = useNavigate();
  const { toggleSidenav } = useContext(SideNavContext);

  const handleLogoutSession = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      await axios.delete(`${API_URL}/logout`, { data: user });
      localStorage.removeItem('user');
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert('Cannot log out');
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="flex items-center gap-2">
          <button className="cursor-pointer flex items-center justify-center p-1 hover:opacity-80" onClick={toggleSidenav}>
            <Menu size={24} />
          </button>
          <h3 className="text-2xl">Admin Dashboard</h3>
        </div>
        <button className="flex items-center gap-2 cursor-pointer hover:opacity-80" onClick={handleLogoutSession}>
          <LogOut size={20} /> logOut
        </button>
      </nav>
    </>
  );
};

export default Navbar;
