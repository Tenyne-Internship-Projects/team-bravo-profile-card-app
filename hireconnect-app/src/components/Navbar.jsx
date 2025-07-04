
import logo from '../assets/kconnect.png';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
  
  const navigate = useNavigate();
  

  return (
    <div className='w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0'>
      <img
        onClick={() => navigate('/')}
        src={logo}
        alt="KConnect Logo"
        className='w-1/4 sm:w-1/5 cursor-pointer'
      />

    </div>
  );
};

export default Navbar;
