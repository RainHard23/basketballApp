import { FC } from 'react'
import ReactPaginate from 'react-paginate'

import { colors } from '../../../assests/styles/colors'
import styled from 'styled-components'

type PropsType = {
  paginationPage?: number
  updatePageSelect: any
}

export const Pagination: FC<PropsType> = ({ paginationPage, updatePageSelect }) => (
  <PaginationContainer>
    <ReactPaginate
      breakLabel={'...'}
      containerClassName={'pagination'}
      marginPagesDisplayed={1}
      nextLabel={'>'}
      onPageChange={selectedItem => updatePageSelect(selectedItem ? selectedItem.selected + 1 : 1)}
      pageCount={paginationPage || 1}
      pageLinkClassName={'page-link'}
      pageRangeDisplayed={4}
      previousLabel={'<'}
    />
  </PaginationContainer>
)

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
`
