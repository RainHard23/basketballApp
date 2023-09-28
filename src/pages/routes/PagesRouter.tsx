import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Login} from "../authorization/authLogin/Login";

export const PagesRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={'*'} element={<Login />} />
            </Routes>
           {/*<MainRoutes />*/}
        </BrowserRouter>
    );
};

