import styled from "styled-components";
import Input from "./ui/input/input";
import Button from "./ui/button/button";


export const CardsHeader = () => {

    return (
        <Wrapper>
            <FilterContainer>
                <Input
                    type={'search'}
                    placeholder={'Search'}
                    name={''}
                    disabled={false}
                />
            </FilterContainer>
                <Button addBtn>Add +</Button>
        </Wrapper>
    );
};

const Wrapper = styled.div`
  display: flex;
  //flex-direction: column;
  
    flex-direction: row;
    justify-content: space-between;
`;

const FilterContainer = styled.div`
  width: 100%;
`;


