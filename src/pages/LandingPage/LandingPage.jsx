import { Link } from 'react-router-dom';

import landingImg from '../../assets/img/landingPic.png';


function LandingPage() {
    return (
        <div className="p-4">
            
            <main className="flex px-12">
                <div className="flex flex-1 flex-col justify-center pl-11 pr-36">
                    <p className="text-3xl font-bold">HỆ THỐNG TRA CỨU ĐIỂM DÀNH CHO</p>
                    <p className="text-3xl font-bold">
                        SINH VIÊN ĐẠI HỌC <span className="text-fourth">BÁCH KHOA</span>
                    </p>
                    <p className="mt-10">
                        <span className="text-lg font-bold text-fourth">#</span> Hệ thống được phát triển dựa trên
                        nhu cầu sử dụng của sinh viên toàn trường. Chúng tôi luôn mang lại trải nghiệm tốt nhất cho sinh
                        viên.
                    </p>
                    <Link to="/home" className="mt-6 size-fit">
                        <button className="mr-auto rounded-xl bg-primary px-4 py-2 font-medium text-white shadow-inner hover:shadow-white">
                            Tra cứu điểm
                        </button>
                    </Link>
                </div>
                <div className="mt-10 flex flex-1 justify-center">
                    <img src={landingImg} alt="" className="w-4/5 object-contain" />
                </div>
            </main>
        </div>
    );
}

export default LandingPage;
