import React, {FC} from "react";
import styled from "styled-components";
import {Pagination} from "../../ui/Pagination";
import {colors} from "../../../../assests/styles/colors";
import {SelectStyles} from "../../ui/select/Selectstyle";
import Select from "react-select";

type PropsType = {
    paginationPage?: number,
    updatePageSize: (newPageSize: number) => void
    updatePageSelect: (newPageSelect: number) => void
}

const options = [
    {value: 6, label: "6"},
    {value: 12, label: "12"},
    {value: 24, label: "24"},
];


export const CardsFooter: FC<PropsType> = ({paginationPage, updatePageSize, updatePageSelect}) => {
    return (
        <ContentWrapper>
            <Pagination updatePageSelect={updatePageSelect} paginationPage={paginationPage}/>
            <SelectStyles>
                <Select
                    name={''}
                    options={options}
                    isMulti={false}
                    defaultValue={options && options[0]}
                    classNamePrefix={"react-select"}
                    onChange={(newValue) => updatePageSize(newValue ? newValue.value : 6)}
                    menuPlacement={"top"}
                />
            </SelectStyles>
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
