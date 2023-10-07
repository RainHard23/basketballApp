import styled from "styled-components";
import React, { FC, ReactNode } from "react";
import {CardsHeader} from "../components/dashboard/entities/HeaderCards";
import {CardsFooter} from "../components/dashboard/entities/FooterCards";

type PropsType = {
    children: ReactNode
    paginationPage?: number,
    updatePageSize: (newPageSize: number) => void
    updatePageSelect: (newPageSelect: number) => void
}

export const CardsdLayouts: FC<PropsType> = ({ children, paginationPage, updatePageSize, updatePageSelect }) => {
    return (
        <CardsContainer>
            <CardsHeader />
            <ContentWrapper>{children}</ContentWrapper>
            <CardsFooter
                updatePageSize={updatePageSize}
                paginationPage={paginationPage}
                updatePageSelect={updatePageSelect}
            />
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
  min-height: 784px;
`;
