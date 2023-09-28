import {FC, ReactNode, useState} from "react";

import styled from "styled-components";
import {colors} from "../../assests/styles/colors";
import {MenuNavBar} from "./navigation/MenuNavBar";
import {Header} from "./navigation/Header";

type AppLayoutProps = {
    children: ReactNode;
}
export const AppLayout: FC<AppLayoutProps> = ({ children }) => {




    return (
        <Layout>
            <Header />
            <ContentWrapper>
                <MenuNavBar />
                <Content>{children}</Content>
            </ContentWrapper>
        </Layout>
    );
};

const Layout = styled.div`
  background: ${colors.lightestGrey1};
  height: 100vh;
  position: relative;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
`;

const Content = styled.div`
  width: 100%;
  overflow-y: auto;
    padding: 32px 80px;
    height: calc(100vh - 80px);
`;

