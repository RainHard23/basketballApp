import React, { FC } from 'react';
import Select from 'react-select';
import styled from 'styled-components';
import { colors } from '../../../../assests/styles/colors';
import { SelectStyles } from './selectstyle';
import { Controller } from 'react-hook-form';

export type OptionType = {
    value: string | number;
    label: string;
};

type SelectPropsType = {
    options?: OptionType[];
    label?: string;
    isMulti?: boolean;
    name: string;
    long?: boolean;
    control?: any;
};

export const Select1: FC<SelectPropsType> = ({
                                                 options,
                                                 isMulti,
                                                 label,
                                                 name,
                                                 control,
                                             }) => {

    return (
        <SelectWrapper>
            <Title>{label}</Title>
            <SelectStyles long>
                <Controller
                    name={name}
                    control={control}
                    render={({ field }) => (
                        <Select
                            {...field}
                            options={options}
                            isMulti={isMulti}
                            value={options && options.find((option) => option.value === field.value)}
                            onChange={(selectedOption: any) => {
                                field.onChange(selectedOption?.value);
                            }}
                            classNamePrefix="react-select"
                            maxMenuHeight={300}
                            menuPlacement={options && options.length > 3 ? 'bottom' : 'top'}
                        />
                    )}
                />
            </SelectStyles>
        </SelectWrapper>
    );
};

const SelectWrapper = styled.div``;
const Title = styled.h4`
  font-size: 14px;
  line-height: 24px;
  font-weight: 500;
  color: ${colors.grey};
`;

export default Select1;
