import React, {FC} from "react";
import styled from "styled-components";
import {Pagination} from "../../ui/Pagination";
import Select from "../../ui/select/select";
import {colors} from "../../../../assests/styles/colors";
import Select1 from "../../ui/select/select";

type PropsType = {
    paginationPage?: number
}

const options = [
    { value: "6", label: "6" },
    { value: "12", label: "12" },
    { value: "24", label: "24" },
];


export const CardsFooter: FC<PropsType> = ({paginationPage}) => {
    return (
        <ContentWrapper>
            <Pagination  paginationPage={paginationPage}/>
            <SelectWrapper>
                <Select1
                    isMulti={false}
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
