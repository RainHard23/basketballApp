import { MenuNavBar } from "../common/components/navigation/menu/MenuNavBar";
import React from "react";
import { AppLayout } from "../common/components/layouts/MainLayout";
import {Route, Routes} from "react-router-dom";
import { TeamsPage } from "../modules/teams/components/teams/TeamsPage";

export const MainRoutes = () => {
    return (
        <AppLayout>
            <Routes>
                <Route path="*" element={ <TeamsPage />}/>
            </Routes>

                {/* Другие пути и соответствующие им компоненты */}
            {/*<MenuNavBar />*/}
        </AppLayout>
    );
};
