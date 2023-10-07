import styled from "styled-components";
import React, { FC, ReactNode } from "react";
import {CardsHeader} from "../components/dashboard/entities/HeaderCards";
import {CardsFooter} from "../components/dashboard/entities/FooterCards";

type PropsType = {
    children: ReactNode
    paginationPage?: number
}

export const CardsdLayouts: FC<PropsType> = ({ children, paginationPage }) => {
    return (
        <CardsContainer>
            <CardsHeader />
            <ContentWrapper>{children}</ContentWrapper>
            <CardsFooter paginationPage={paginationPage}/>
        </CardsContainer>
    );
};

const CardsContainer = styled.section`
  display: flex;
  flex-direction: column;
  padding: 0 12px;
`;

const ContentWrapper = styled.div`
  margin: 0;
  min-height: 718px;
`;
