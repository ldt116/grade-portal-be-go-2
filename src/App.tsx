import React from 'react';
import routes from './routes';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Fragment } from 'react';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {routes.map((route, index) => {
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
                })}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
