import ReactPaginate from "react-paginate";
import styled from "styled-components";
import { colors } from "../../../assests/styles/colors";
import {FC} from "react";
type PropsType = {
    paginationPage?: number,
    updatePageSelect: any
}

export const Pagination: FC<PropsType> = ({paginationPage, updatePageSelect}) => (
    <PaginationContainer>
        <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            marginPagesDisplayed={1}
            pageRangeDisplayed={4}
            containerClassName={"pagination"}
            pageLinkClassName={"page-link"}
            pageCount={paginationPage || 1}
            onPageChange={(selectedItem) => updatePageSelect(selectedItem ? selectedItem.selected + 1 : 1)}

        />
    </PaginationContainer>
);

const PaginationContainer = styled.div`
  .pagination li {
    display: inline-block;
    padding-left: 0;
    list-style: none;
  }

  .pagination li a {
    position: relative;
    float: left;
    padding: 5px 14px;
    text-decoration: none;
    color: ${colors.grey};
    border-radius: 4px;
    cursor: pointer;
    font-size: 18px;
    background-color: transparent;
  }

  .pagination .selected a {
    color: ${colors.white};
    background-color: ${colors.red};
    border: none;
    outline: none;
    box-shadow: none;
  }

  .pagination .page-link:hover {
    background-color: ${colors.lightestRed};
    color: ${colors.white};
  }

  .pagination .previous a {
    background: none;
    color: ${colors.grey};
  }

  .pagination .next a {
    background: none;
    color: ${colors.grey};
  }
`;


