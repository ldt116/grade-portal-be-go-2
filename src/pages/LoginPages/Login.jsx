import logo from '../../assets/img/logo-notext.svg';
import { ADMIN_LOGIN } from '../../constants/api.js'
function Login() {
    const handleLogin = () => {
        fetch(ADMIN_LOGIN, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({idToken: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjM2MjgyNTg2MDExMTNlNjU3NmE0NTMzNzM2NWZlOGI4OTczZDE2NzEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI4NjY4MzQxNTc5Ny1hcTZuNzRqOWdka3JkN3BkM3U2YTJkNTVmaDU4N2NkMy5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsImF1ZCI6Ijg2NjgzNDE1Nzk3LWFxNm43NGo5Z2RrcmQ3cGQzdTZhMmQ1NWZoNTg3Y2QzLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTE2MjI1OTI1ODY1NjM1NjgzNTUwIiwiaGQiOiJoY211dC5lZHUudm4iLCJlbWFpbCI6ImRhbmcubmd1eWVuMjIxMDczN2NzQGhjbXV0LmVkdS52biIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYmYiOjE3MzI1NTAyOTgsIm5hbWUiOiLEkMSCTkcgTkdVWeG7hE4gSFXhu7JOSCBI4bqiSSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NJSnFDNTV3a3JadWx1amhzWldhdlA4eE5xaFRYTUltSVhEZTEyNTRkVmJZd3U4UFV3PXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IsSQxIJORyIsImZhbWlseV9uYW1lIjoiTkdVWeG7hE4gSFXhu7JOSCBI4bqiSSIsImlhdCI6MTczMjU1MDU5OCwiZXhwIjoxNzMyNTU0MTk4LCJqdGkiOiI3MmFjMzAwMWMxMzJhYTE5YzMzZjhkNzBlZmRmOGNkYTNiZjJmYTZlIn0.cdHC2U6uqyWK0Vx2u-AwDR1ohrowMw7t6xABmo-O3xab1p5obO2MD6n7K6U34nH2fmwL4Nibo28f0ZMupu3QQK9cwrgn479RF0dMvI6AQdSmSo55Vpr1vW49JTqAt2JvReY--pUsQCO1Hu2U48-fI-62RHe1m_pIeILv44fkb_XAT5LW6N4yiTzRRr1dhZOIi4q6445f1TWM0UisREn_rWhZMLhjIpiF0yxAca6xhBh2vsha1g-dq80pyQW8_Qg43Bq5X4-dSFtilNAImdoByoSldXa27dalEjczbpGWjPnFwhVI2C-LNSpHLYabL-VzM4g9NeAomY45yn0O9Aeh8Q'}) })
        .then(response => console.log(response))
}
    return (
        <div className="mt-[7rem] flex justify-center items-center py-20">
            <div className="w-[33rem] h-[39rem] border border-black rounded-lg flex flex-col items-center py-5 gap-8">
                <img src={logo} alt='logo' className='w-[13rem] h-[13rem]'></img>
                <div className='w-[23rem] h-[17rem] rounded-3xl shadow-xl flex flex-col items-center py-7 gap-12'>
                    <div className='text-[#044CC8]'>Login Using your account on:</div>
                    <div className='flex flex-col gap-5 text-center'>
                        <div className='py-2 px-5 bg-[#0388B4] rounded-3xl text-white cursor-pointer' onClick={handleLogin}>Sinh viên/Giảng viên</div>
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