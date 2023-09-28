import React from "react";
import styled from "styled-components";
import Select from "../../common/components/ui/select/select";
import {Pagination} from "../../common/components/ui/Pagination";
import {colors} from "../../assests/styles/colors";
// import { Select, SelectProps } from "./ui/Select/Select";
// import { Pagination } from "./Pagination";

const options = [
    { value: "6", label: "6" },
    { value: "12", label: "12" },
    { value: "24", label: "24" },
];


export const CardsFooter = () => {
    return (
        <ContentWrapper>
            <Pagination  />
            <SelectWrapper>
                <Select
                    name={"6"}
                    options={options}
                />
            </SelectWrapper>
        </ContentWrapper>
    );
};

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SelectWrapper = styled.div`
  max-width: 88px;
  width: 100%;
  border: 0.5px solid ${colors.lightestGrey};
  border-radius: 4px;
`;
