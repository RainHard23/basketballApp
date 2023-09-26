import React, { FC } from 'react';
import Select from 'react-select';




export type OptionType = {
    value: string;
    label: string;
};



type SelectPropsType = {
    options?: OptionType[];
    label?: string;
    isMulti?: boolean;
};

export const Select1: FC<SelectPropsType> = ({ options, isMulti, label }) => (



    // <Select
    //     isMulti
    //     options={options}
    //     maxMenuHeight={300}
    //     classNamePrefix={"react-select"}
    // />
    <Select
        options={options}
        isMulti
        // isLoading={true}
        isClearable={true}
        defaultValue={options}
        classNamePrefix={"react-select"}
        // menuPlacement={selectPageSize ? "top" : "bottom"}
    />
);

export default Select1;
