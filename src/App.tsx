import React from 'react';
import routes from './routes';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Fragment } from 'react';
import GradeInput from './pages/TeacherPages/GradeInput';
import AddMember from './pages/TeacherPages/AddMember';
import Login from './pages/LoginPages/Login';
import TeacherLogin from './pages/LoginPages/TeacherLogin/TeacherLogin';
// import Login from './pages/LoginPages/Login/Login';
import LoginForm from './pages/LoginPages/Login/LoginForm';
import avt from './assets/img/bababananana.png'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* {routes.map((route, index) => {
                    const Page = route.page;
                    const Layout = route.layout ? route.layout : Fragment;
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout>
                                    <Page />
                                </Layout>
                            }
                        />
                    );
                })} */}
                <Route path="/" element={<Login />} />
                <Route path="/teacher/gradeinput" element={<GradeInput />} />
                <Route path="/teacher/addMember" element={<AddMember />} />
            </Routes>
        </BrowserRouter>

    );
}

export default App;
