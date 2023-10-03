import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {DashboardLayout} from "../layouts/DashboardLayout";
import {DetailTeam} from "../../pages/dashboard/team/DetailTeam";
import {ListTeam} from "../../pages/dashboard/team/ListTeam";
import {AddTeam} from "../../pages/dashboard/team/AddTeam";
import {AddPlayer} from "../../pages/dashboard/player/AddPlayer";
import AuthLayout from "../layouts/AuthLayout";
import {Login} from "../../pages/auth/Login";
import {Register} from "../../pages/auth/Register";
import {NotFound} from "../../pages/NotFound";
import {TeamsPage} from "../components/dashboard/entities/teams/components/teams/TeamsPage";


export const MainRoutes = () => {




    return (
        <BrowserRouter>
            <Routes>

                <Route element={<DashboardLayout/>}>
                    <Route path="/" element={<TeamsPage/>} index/>

                    <Route path="/team/:teamId" element={<DetailTeam/>}/>
                    <Route path="/teams/create" element={<AddTeam/>}/>

                    <Route path="/team/:teamId/:playerId" element={<DetailTeam/>}/>
                    <Route path="/team/:teamId/players/create" element={<AddPlayer/>}/>
                </Route>

                <Route element={<AuthLayout/>}>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                </Route>

                <Route path="/404" element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    );
};
