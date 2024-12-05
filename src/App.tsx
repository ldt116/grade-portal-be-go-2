import React from 'react';
import routes from './routes';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DefaultLayout from './components/Layout/Layout';
import { Fragment } from 'react';
import AdminSearch from './pages/AdminPages/Admin_Search';
import HomePage from './pages/AdminPages/HomePage';


function App() {
    return (
        // <BrowserRouter>
        //     <Routes>
        //         {routes.map((route, index) => {
        //             const Page = route.page;
        //             const Layout = route.layout ? DefaultLayout : Fragment;
        //             return (
        //                 <Route
        //                     key={index}
        //                     path={route.path}
        //                     element={
        //                         <Layout>
        //                             <Page />
        //                         </Layout>
        //                     }
        //                 />
        //             );
        //         })}
        //     </Routes>
        // </BrowserRouter>
        <>
        <AdminSearch />
        </>
    );
}

export default App;
