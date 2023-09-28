import styled from "styled-components";
import {colors} from "../../../../assests/styles/colors";

export const SelectStyles = styled.div`
  .react-select__value-container {
    padding: 0 12px;
    height: 100%;
  }
  .react-select__control {
    width: 100%;
    min-height: 40px;
    border-radius: 4px;
    box-shadow: none;
    border: none;
    background: ${colors.lightestGrey1};

    &:hover {
      background: ${colors.lightestGrey};
      transition: all 0.2s ease-in-out;
    }

    &:active {
      box-shadow: 0 0 5px #d9d9d9;
    }
  }

  .react-select__value-container--has-value {
    flex-wrap: nowrap;
  }

  .react-select__control .react-select__multi-value {
    padding: 4px 0;
    background: ${colors.red};
    color: ${colors.white};
    border-radius: 4px;
  }

  .react-select__multi-value__remove {
    &:hover {
      background: ${colors.lightestRed};
      color: ${colors.white};
    }
  }

  .react-select__loading-indicator span {
    font-size: 8px;
    color: ${colors.red};
  }

  .react-select__multi-value__label {
    color: ${colors.white};
  }

  .react-select__menu {
    color: ${colors.lightGrey};
    border-radius: 4px;
    border: 0.5px solid ${colors.lightestGrey};
  }

  .react-select__menu div {
    padding: 0;
    border-radius: 4px;
  }

  .react-select__option--is-focused {
    color: ${colors.white};
  }

  .react-select__option {
    cursor: pointer;
    border-bottom: 0.5px solid ${colors.lightestGrey};
    &:last-child {
      border-bottom: none;
    }

    &:hover {
      color: ${colors.white};
    }
  }

  .react-select_is-open .react-select__control {
    border: 0.5px solid ${colors.lightGrey};
  }
`;


