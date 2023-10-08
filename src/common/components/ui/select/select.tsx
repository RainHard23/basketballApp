import React, {FC} from 'react';
import Select from 'react-select';
import styled from "styled-components";
import {colors} from "../../../../assests/styles/colors";
import {SelectStyles} from "./selectstyle";


export type OptionType = {
    value: string | number;
    label: string;
};


type SelectPropsType = {
    options?: OptionType[];
    label?: string;
    isMulti?: boolean;
    name: string
    long?: boolean
};

export const Select1: FC<SelectPropsType> = ({options, isMulti, label, name}) => (

    <SelectWrapper>
        <Title>{label}</Title>
        <SelectStyles long>
            <Select
                name={name}
                options={options}
                isMulti={isMulti}
                defaultValue={options && options[0]}
                classNamePrefix={"react-select"}
                maxMenuHeight={300}
                menuPlacement={options && options.length > 3 ? "bottom" : "top"}
            />
        </SelectStyles>
    </SelectWrapper>
);

const SelectWrapper = styled.div`
  
`;
const Title = styled.h4`
  font-size: 14px;
  line-height: 24px;
  font-weight: 500;
  color: ${colors.grey};
`

export default Select1;
