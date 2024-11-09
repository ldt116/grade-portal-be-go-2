import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/img/logo.svg';
function Header({isLogin = false}) {
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate('/login');
    }

   return (
    <div className='bg-[#0388B4] h-[7rem] px-16 flex justify-between py-2 items-center fixed top-0 w-full z-50' >
        <div className='w-[25rem] h-24'>
            <img src={logo} alt="logo"></img>
        </div>
        {!isLogin ?
        <div className='bg-[#FFFFFF] h-16 w-[10rem] flex items-center justify-center px-6 py-6 rounded-[2.25rem] text-[#002699] 
        font-bold text-[1..125rem] cursor-pointer' onClick={handleLogin}>
            Đăng nhập
        </div> : 
        <div></div>}
    </div>
   )
}
export default Header;
