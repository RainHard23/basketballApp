import styled from "styled-components";
import Button from "../../../common/components/ui/Button";
import {colors} from "../../../assests/styles/colors";
import {Select1} from "../../../common/components/ui/select/Select";
import {Input} from "../../../common/components/ui/controlledInput/Input";
import {CustomInputFile} from "../../../common/components/ui/CustomInputFile";
import {useNavigate} from "react-router-dom";
import {useActions} from "../../../api/common/hooks/useActions";
import * as yup from "yup";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {playersThunks} from "../../../module/players/playersSlice";
import {PlayerType} from "../../../api/players/api";
import {ControlledTextField} from "../../../common/components/ui/controlledInput/ControlledInput";
import {useSelector} from "react-redux";
import {teamsSelector} from "../../../module/teams/teamsSelectors";

type FormDataType = {
    name: string,
    position: string,
    team: number
    birthday: Date
    height: number,
    weight: number,
    number: number,
    avatarUrl: any,
}

const optionsTeam = [
    {value: "1", label: "1"},
    {value: "2", label: "2"},
    {value: "3", label: "3"},
    {value: "4", label: "4"},
    {value: "5", label: "5"},
    {value: "6", label: "6"},
    {value: "7", label: "7"},
];


const optionsPosition = [
    {value: "Center Forward", label: "Center Forward"},
    {value: "Guard Forward", label: "Guard Forward"},
    {value: "Forward", label: "Forward"},
    {value: "Center", label: "Center"},
    {value: "Guard", label: "Guard"},
];

export const PlayerFormAdd = () => {
    const {dataTeams} = useSelector(teamsSelector)
    const optionsTeams = dataTeams.map(team => ({
        value: team.name,
        label: team.name
    }));

    const {addPlayerTC} = useActions(playersThunks);
    const navigate = useNavigate()
    const handleFileSelect = (file: File | null) => {
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target) {
                    setValue('avatarUrl', e.target.result);
                }
            };
            reader.readAsDataURL(file);
        } else {
            setValue('avatarUrl', null);
        }
    };

    const schema = yup.object().shape({
        name: yup.string().required('Name is required.'),
        number: yup.number().required('Division is required.'),
        birthday: yup.date().required('Year of foundation is required.'),
        height: yup.number().required('Height is required'),
        weight: yup.number().required('Weight is required'),
        position: yup.string().required('Position is required.'),
        team: yup.number().required('Image is required'),
        avatarUrl: yup.mixed().required('Image is required'),
    });


    const {
        control,
        reset,
        setValue,
        handleSubmit,
        formState: {errors}
    } = useForm<any>({

        mode: 'onBlur',
        resolver: yupResolver(schema),
        // defaultValues: {},
    })

    const onSubmit: SubmitHandler<FormDataType> = (data) => {
        addPlayerTC(data)
        reset();
    };

    const handleFormSubmitted = handleSubmit(onSubmit);
    return (
        <Container>
            <Form onSubmit={handleFormSubmitted}>
                <AddImg>
                    <CustomInputFile  onFileSelect={handleFileSelect} error={errors}/>
                </AddImg>
                <ContainerInput>
                    <WrapperItem>
                        <ControlledTextField

                            control={control}
                            name="name"
                            label="Name"
                            type="text"
                            errorMessage={errors}
                        />
                        <ContainerSelect>
                            <Select1
                                control={control}
                                options={optionsPosition}
                                name="position"
                                label="Position"
                                isMulti={false}

                            />
                        </ContainerSelect>
                        <ContainerSelect>
                            <Select1
                                control={control}
                                options={optionsTeam}
                                name="team"
                                label="Team"
                                isMulti={false}
                            />
                        </ContainerSelect>
                        <ContainerInputDetail>
                            <ControlledTextField
                                control={control}
                                type='number'
                                name='height'
                                label='Height (cm)'
                                errorMessage={errors}
                            />
                            <ControlledTextField
                                control={control}
                                type='number'
                                name='weight'
                                label='Weight (kg)'
                                errorMessage={errors}
                            />

                            <ControlledTextField
                                control={control}
                                type='date'
                                name='birthday'
                                label='Birthday'
                                placeholder={'sss'}
                                errorMessage={errors}
                            />
                            <ControlledTextField
                                control={control}
                                type='number'
                                name='number'
                                label='Number'
                                errorMessage={errors}
                            />

                        </ContainerInputDetail>
                        <ButtonsWrapper>
                            <Button onClick={() => navigate(-1)} type="reset" isCancel={true}>
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
