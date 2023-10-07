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
};

export const Select1: FC<SelectPropsType> = ({options, isMulti, label, name}) => (


    // <Select
    //     isMulti
    //     options={options}
    //     maxMenuHeight={300}
    //     classNamePrefix={"react-select"}
    // />
    <SelectWrapper>
        <SelectStyles>
            <Select
                name={name}

                options={options}
                isMulti={isMulti}
                defaultValue={options && options[0]}
                classNamePrefix={"react-select"}

                maxMenuHeight={300}
                menuPlacement={"top"}
            />
        </SelectStyles>
    </SelectWrapper>
);

const SelectWrapper = styled.div`
  
`;


export default Select1;
