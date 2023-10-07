import {BrowserRouter, Route, Routes} from "react-router-dom";
import {DashboardLayout} from "../layouts/DashboardLayout";
import AuthLayout from "../layouts/AuthLayout";
import {Login} from "../../pages/auth/Login";
import {Register} from "../../pages/auth/Register";
import {NotFound} from "../../pages/NotFound";
import {TeamsPage} from "../../pages/dashboard/team/TeamsPage";
import {TeamFormAdd} from "../../pages/dashboard/team/TeamAdd";
import {TeamDetailsPage} from "../../pages/dashboard/player/DetailPlayer";
import {PlayerFormAdd} from "../../pages/dashboard/player/AddPlayer";


export const MainRoutes = () => {




    return (
        <BrowserRouter>
            <Routes>

                <Route element={<DashboardLayout/>}>
                    <Route path="/" element={<TeamsPage/>} index/>

                    <Route path="/team/:teamId" element={<TeamDetailsPage/>}/>
                    <Route path="/teams/create" element={<TeamFormAdd/>}/>

                    <Route path="/team/:teamId/:playerId" element={<TeamDetailsPage/>}/>
                    <Route path="/team/:teamId/players/create" element={<PlayerFormAdd/>}/>
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
