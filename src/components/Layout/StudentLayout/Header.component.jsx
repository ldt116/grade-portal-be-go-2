import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import logo from '../../../assets/img/hcmut.png';
function Header() {
    useEffect(() => {
        const items = document.querySelectorAll('.headerNav li');
        items.forEach((item) => {
            item.addEventListener('click', () => {
                items.forEach((i) => i.classList.remove('bg-primary'));
                item.classList.add('bg-primary');
            });
        });
    }, []);

    return (
        <div className="mx-6 mt-[10px] flex h-[60px] items-center rounded-2xl bg-opacity-10 bg-gradient-to-r from-[#DBE2EF] to-[#64768C] px-6">
            <div className="mr-auto flex items-center">
                <img src={logo} alt="Logo" className="size-[45px]" />
                <p className="ml-4 text-xl font-semibold">BK Tra cứu</p>
            </div>
            <ul className="headerNav mr-6 flex gap-4 font-medium text-textColor">
                <Link to="/home">
                    <li className="cursor-pointer rounded-lg bg-primary px-4 py-1 text-white hover:bg-primary">
                        Trang chủ
                    </li>
                </Link>
                <Link to="/course">
                    <li className="cursor-pointer rounded-lg px-4 py-1 text-white hover:bg-primary">
                        Khóa học của tôi
                    </li>
                </Link>
                <Link to="/frames">
                    <li className="cursor-pointer rounded-lg px-4 py-1 text-white hover:bg-primary">Vinh danh</li>
                </Link>
            </ul>
            <div className="flex items-center">
                <img
                    src="https://c4.wallpaperflare.com/wallpaper/821/698/393/anime-naruto-akatsuki-naruto-deidara-naruto-wallpaper-preview.jpg"
                    alt="avatar"
                    className="size-[45px] rounded-full object-cover"
                />
            </div>
        </div>
    );
}
export default Header;
