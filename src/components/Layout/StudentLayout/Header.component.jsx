import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/img/logo.svg';
function Header({isLogin = false}) {
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate('/login');
    }

   return (
    <div className='bg-[#0388B4] h-[109px] px-16 flex justify-between py-2 items-center fixed top-0 w-full z-50' >
        <div className='w-[402px] h-[93px]'>
            <img src={logo} alt="logo"></img>
        </div>
        {!isLogin ?
        <div className='bg-[#FFFFFF] h-[60px] w-[160px] flex items-center justify-center px-6 py-6 rounded-[36px] text-[#002699] 
        font-bold text-[18px] cursor-pointer' onClick={handleLogin}>
            Đăng nhập
        </div> : 
        <div></div>}
    </div>
   )
}
export default Header;
