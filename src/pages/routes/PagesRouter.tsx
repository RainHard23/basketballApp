import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Login} from "../authorization/authLogin/Login";
import {Registration} from "../authorization/authRegistration/Registration";
import MainRoutes from "./MainRoutes";

export const PagesRouter = () => {
    return (
        <BrowserRouter>
            {/*<Routes>*/}
            {/*    /!*<Route path={'*'} element={<Login />} />*!/*/}
            {/*    <Route path={'*'} element={<Registration />} />*/}
            {/*</Routes>*/}
           <MainRoutes />
        </BrowserRouter>
    );
};

