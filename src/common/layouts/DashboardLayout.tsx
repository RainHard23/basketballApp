import {Outlet} from "react-router-dom";
import {Header} from "../components/dashboard/header/Header";
import {MenuNavBar} from "../components/dashboard/header/MenuNavBar";
import styled from "styled-components";
import {colors} from "../../assests/styles/colors";



export const DashboardLayout = () => {
    return (
        <Layout>
            <Header/>
            <ContentWrapper>
                <MenuNavBar/>
                <Content><Outlet/></Content>
            </ContentWrapper>
        </Layout>
    )

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

