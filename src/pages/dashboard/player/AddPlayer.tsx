import styled from "styled-components";

// @ts-ignore
import test from '../../../assests/images/iconPlayer.png'
import {CustomInputFile} from "../../../common/components/ui/CustomInputFile";

import Button from "../../../common/components/ui/Button";
import {colors} from "../../../assests/styles/colors";
import {Input} from "../../../common/components/ui/Input";
import Select from "../../../common/components/ui/select/select";


export const PlayerFormAdd = () => {
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
                        <Select
                            name="position"
                            label="Position"
                            isMulti={true}
                        />
                        <Select
                            name="team"
                            label="Team"
                            isMulti={true}
                        />
                        <ContainerInputDetail>
                            <Input
                                type='text'
                                name='height'
                                label='Height (cm)'
                            />
                            <Input
                                type='text'
                                name='weight'
                                label='Weight (kg)'
                            />
                            <Input
                                type='text'
                                name='birthday'
                                label='Birthday (cm)'
                            />
                            <Input
                                type='text'
                                name='number'
                                label='Number (cm)'
                            />

                        </ContainerInputDetail>
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

const ContainerInputDetail = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 12px;

  & > div {
    margin-bottom: 12px;
    width: 50%; /* Two items in a row */
    padding-right: 10px; /* Some spacing between inputs */
  }
`;

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
