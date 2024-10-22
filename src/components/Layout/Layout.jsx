import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import logo from '../../assets/img/hcmut.png';

function Header() {
    useEffect(() => {
        const items = document.querySelectorAll('.headerNav li');
        items.forEach((item) => {
            item.addEventListener('click', () => {
                items.forEach((i) => i.classList.remove('bg-white'));
                item.classList.add('bg-white');
            });
        });
    }, []);

    return (
        <div className="flex h-[60px] items-center justify-between rounded-full bg-primary px-12">
            <div className="flex items-center">
                <img src={logo} alt="Logo" className="size-[35px]" />
            </div>
            <ul className="headerNav flex text-textColor gap-4 font-medium">
                <li className="rounded-full bg-white px-4 py-1 hover:bg-white">
                    <Link to="/">Trang chủ</Link>
                </li>
                <li className="rounded-full px-4 py-1 hover:bg-white">
                    <Link to="/">Khóa học của tôi</Link>
                </li>
                <li className="rounded-full px-4 py-1 hover:bg-white">
                    <Link to="/">Vinh danh</Link>
                </li>
            </ul>
            <div className="flex items-center">
                <i class="fa-solid fa-bell mr-4 text-xl"></i>
                <img src={logo} alt="logo" className="size-[35px]" />
            </div>
        </div>
    );
}

function Layout({ children }) {
    return (
        <div className="bg-bgColor p-4">
            <Header />
            <main className="px-12">{children}</main>
        </div>
    );
}

export default Layout;
