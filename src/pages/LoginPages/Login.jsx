import logo from '../../assets/img/logo-notext.svg';
function Login() {
    return (
        <div className="mt-[7rem] flex justify-center items-center py-20">
            <div className="w-[33rem] h-[39rem] border border-black rounded-lg flex flex-col items-center py-5 gap-8">
                <img src={logo} alt='logo' className='w-[13rem] h-[13rem]'></img>
                <div className='w-[23rem] h-[17rem] rounded-3xl shadow-xl flex flex-col items-center py-7 gap-12'>
                    <div className='text-[#044CC8]'>Login Using your account on:</div>
                    <div className='flex flex-col gap-5 text-center'>
                        <div className='py-2 px-5 bg-[#0388B4] rounded-3xl text-white cursor-pointer'>Sinh viên/Giảng viên</div>
                        <div className='py-2 px-5 bg-[#0388B4] rounded-3xl text-white cursor-pointer'>Quản trị viên</div>
                    </div>
                </div>
                <div className='text-[#044CC8] underline decoration-solid cursor-pointer'>
                    Bạn gặp vấn đề?
                </div>
            </div>
        </div>
    );
}

export default Login;