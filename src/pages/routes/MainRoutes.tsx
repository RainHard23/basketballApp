import React from "react";
import { AppLayout } from "../../common/components/MainLayout";
import { Routes, Route } from "react-router-dom";
import { TeamsPage } from "../entities/teams/components/teams/TeamsPage";

const MainRoutes = () => {
    return (
        <AppLayout>
            <Routes>
                <Route path="*" element={<TeamsPage />} />
            </Routes>
        </AppLayout>
    );
};

export default MainRoutes;
