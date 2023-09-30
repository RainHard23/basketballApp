import React from "react";
import {AppLayout} from "../../common/components/MainLayout";
import {Route, Routes} from "react-router-dom";
import {TeamDetailsPage} from "../entities/teams/components/teamCard/TeamDetailsPage";
import {TeamForm} from "../entities/teams/components/teamCard/teamAdd/TeamAdd";

const MainRoutes = () => {
    return (
        <AppLayout>
            <Routes>
                <Route path="*" element={<TeamForm />} />
            </Routes>
        </AppLayout>
    );
};

export default MainRoutes;
