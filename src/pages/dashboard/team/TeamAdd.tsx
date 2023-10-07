import styled from "styled-components";

// @ts-ignore
import test from '../../../assests/images/iconPlayer.png'
import {CustomInputFile} from "../../../common/components/ui/CustomInputFile";

import Button from "../../../common/components/ui/Button";
import {colors} from "../../../assests/styles/colors";
import {Input} from "../../../common/components/ui/Input";


export const TeamFormAdd = () => {
    return (
        <Container>
            <Form>
                <AddImg>
                    <CustomInputFile image={test}
                    />
                </AddImg>
                <ContainerInput>
                    <WrapperItem>
                        <Input

                            name="name"
                            label="Name"
                            type="text"

                        />
                        <Input
                            name="division"
                            label="Division"
                            type="text"
                        />
                        <Input
                            name="conference"
                            label="Conference"
                            type="text"
                        />
                        <Input
                            name="foundationYear"
                            label="Year of foundation"
                            type='text'
                        />
                        <ButtonsWrapper>
                            <Button type="reset" isCancel={true}>
                                Cancel
                            </Button>
                            <Button>Save</Button>
                        </ButtonsWrapper>
                    </WrapperItem>
                </ContainerInput>
            </Form>
        </Container>
    );
};

const Container = styled.div`
  background-color: ${colors.white};
`
const ContainerInput = styled.div`
  display: flex;
  width: 130%;
`
const Form = styled.form`
  display: flex;
  padding: 48px 24px;
  height: 100%;

`;

const AddImg = styled.div`
  display: flex;
  justify-content: center;
  max-width: 100%;
  width: 100%;
  height: 100%;
`;


const WrapperItem = styled.div`
  max-width: 366px;
  width: 100%;

  & div {
    margin-bottom: 24px;
  }

`;

const ButtonsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  width: 100%;
`;
