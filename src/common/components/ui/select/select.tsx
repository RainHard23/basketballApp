import React, { FC } from 'react';
import Select from 'react-select';
import styled from "styled-components";
import {colors} from "../../../../assests/styles/colors";
import {SelectStyles} from "./selectstyle";




export type OptionType = {
    value: string;
    label: string;
};



type SelectPropsType = {
    options?: OptionType[];
    label?: string;
    isMulti?: boolean;
    name: string
};

export const Select1: FC<SelectPropsType> = ({ options, isMulti, label, name }) => (



    // <Select
    //     isMulti
    //     options={options}
    //     maxMenuHeight={300}
    //     classNamePrefix={"react-select"}
    // />
    <SelectWrapper>
        <SelectStyles >
    <Select
        name={name}
        options={options}
        isMulti
        isClearable={true}
        defaultValue={options}
        classNamePrefix={"react-select"}
        menuPlacement={"top"}
    />
        </SelectStyles>
    </SelectWrapper>
);

const SelectWrapper = styled.div`
  max-width: 365px;
  max-height: 40px;
  width: 100%;
  border: 0.5px solid ${colors.lightestGrey};
  border-radius: 4px;
`;


export default Select1;
