import styled from "styled-components";

import Button from "../../../common/components/ui/Button";
import {colors} from "../../../assests/styles/colors";

import {Select1} from "../../../common/components/ui/select/select";
import {Input} from "../../../common/components/ui/controlledInput/Input";


const options = [
    {value: "Center Forward", label: "Center Forward"},
    {value: "Guard Forward", label: "Guard Forward"},
    {value: "Forward", label: "Forward"},
    {value: "Center", label: "Center"},
    {value: "Guard", label: "Guard"},
];

export const PlayerFormAdd = () => {
    return (
        <Container>
            <Form>
                <AddImg>
                    {/*<CustomInputFile  image={test}*/}
                    {/*/>*/}
                </AddImg>
                <ContainerInput>
                    <WrapperItem>
                        <Input
                            name="name"
                            label="Name"
                            type="text"

                        />
                        <ContainerSelect>
                            <Select1
                                options={options}
                                name="position"
                                label="Position"
                                isMulti={false}
                            />
                        </ContainerSelect>
                        <ContainerSelect>
                            <Select1
                                name="team"
                                label="Team"
                                isMulti={false}
                            />
                        </ContainerSelect>
                        <ContainerInputDetail>
                            <Input
                                type='number'
                                name='height'
                                label='Height (cm)'
                            />
                            <Input
                                type='number'
                                name='weight'
                                label='Weight (kg)'
                            />

                            <Input


                                type='date'
                                name='birthday'
                                label='Birthday (cm)'
                                placeholder={'sss'}
                            />
                            <Input
                                type='number'
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


const ContainerSelect = styled.div`
  margin-top: 24px; 
`;

const ContainerInputDetail = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0 24px;

  & > div {
    max-width: 171px;
    width: 100%;
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

  

`;

const ButtonsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  width: 100%;
  margin-top: 24px;
`;
