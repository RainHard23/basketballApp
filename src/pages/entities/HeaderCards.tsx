import styled from "styled-components";
import Input from "../../common/components/ui/Input";
import Button from "../../common/components/ui/Button";


export const CardsHeader = () => {

    return (
        <Wrapper>
            <FilterContainer>
                <Input
                    type={'search'}
                    placeholder={'Search'}
                    name={''}
                />
            </FilterContainer>
                <Button isAdd>Add +</Button>
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

