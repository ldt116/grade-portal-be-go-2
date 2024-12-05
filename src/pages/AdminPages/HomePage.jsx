import React from 'react';
import './admin_homepage.css';
function HomePage() {
    return (
        <div>
            <h1>HomePage</h1>
            <div className="container">
                <div className="header"></div>
                <div className="logo-container">
                    <img src="logo" alt="University Logo" />
                    <div className="title">
                        ĐẠI HỌC QUỐC GIA TP.HCM<br />
                        TRƯỜNG ĐẠI HỌC BÁCH KHOA
                    </div>
                </div>
                <div className="admin-container">
                    <div className="admin-text">Admin</div>
                    <div className="dropdown">
                        <img src="https://via.placeholder.com/40x40" alt="User Avatar" />
                        <div className="dropdown-content">
                            <a href="#">Hồ sơ</a>
                            <a href="#">Thoát</a>
                        </div>
                    </div>
                </div>
                <div className="nav-bar">
                    <a href="#">Trang chủ</a>
                    <a href="#">Tìm kiếm</a>
                    <div className="dropdown">
                        <a href="#">Quản lý <i className="fa fa-caret-down"></i></a>
                        <div className="dropdown-content">
                            <a href="#">Tạo lớp học</a>
                            <a href="#">Quản lý thành viên</a>
                            <a href="#">Thêm khóa học</a>
                            <a href="#">Chỉnh sửa</a>
                        </div>
                    </div>
                </div>

                <div className="footer"></div>
            </div>
        </div>
    );
}

export default HomePage;