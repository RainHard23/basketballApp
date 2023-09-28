import React from 'react';
import {TeamsPage} from "../modules/teams/components/teams/TeamsPage";
import {Header} from "../common/components/Header/header";
import {MenuNavBar} from "../common/components/navigation/menu/MenuNavBar";
import {BrowserRouter, Router} from "react-router-dom";
import {MainRoutes} from "./MainRoutes";

export const PagesRouter = () => {
    return (
        <BrowserRouter>
           <MainRoutes />
        </BrowserRouter>
    );
};

