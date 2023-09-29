import React from "react";
import { AppLayout } from "../../common/components/MainLayout";
import { Routes, Route } from "react-router-dom";
import { TeamsPage } from "../entities/teams/components/teams/TeamsPage";
import TeamRoster from "../entities/teams/components/teamCard/TeamRosterPage/TeamRoster";
import TeamDetailsPage from "../entities/teams/components/teamCard/TeamDetailsPage";

const MainRoutes = () => {
    return (
        <AppLayout>
            <Routes>
                <Route path="*" element={<TeamDetailsPage />} />
            </Routes>
        </AppLayout>
    );
};

export default MainRoutes;
