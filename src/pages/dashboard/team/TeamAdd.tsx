import styled from "styled-components";
import Button from "../../../common/components/ui/Button";
import {colors} from "../../../assests/styles/colors";
import {Input} from "../../../common/components/ui/controlledInput/Input";
import * as yup from "yup";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {ControlledTextField} from "../../../common/components/ui/controlledInput/ControlledInput";
import {useActions} from "../../../api/common/hooks/useActions";
import {authThunks} from "../../../module/auth/authSlice";
import {teamsThunks} from "../../../module/teams/teamsSlice";
import {useNavigate} from "react-router-dom";
import {ControlledInputFile} from "../../../common/components/ui/CustomInputFile";

type FormData = {
    name: string
    division: string
    conference: string
    foundationYear: number
    imageUrl: any
}


export const TeamFormAdd = () => {
    const navigate = useNavigate()
    const handleFileSelect = (file: File | null) => {
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target) {
                    setValue('imageUrl', e.target.result);
                }
            };
            reader.readAsDataURL(file);
        } else {
            setValue('imageUrl', null);
        }
    };
    const {addTeamTC} = useActions(teamsThunks);
    const schema = yup.object().shape({
        name: yup.string().required('Name is required.'),
        division: yup.string().required('Division is required.'),
        conference: yup.string().required('Conference is required.'),
        foundationYear: yup.number().required('Year of foundation is required.'),
        imageUrl: yup.mixed().required('Image is required'),
    });

    const {
        watch,
        reset,
        setValue,
        control,
        handleSubmit,
        formState: {errors}
    } = useForm<FormData>({

        mode: 'onBlur',
        resolver: yupResolver(schema),
        defaultValues: {
            name: '',
            division: '',
            conference: '',
            foundationYear: 1973,
            imageUrl: null,
        },
    })

    const onSubmit: SubmitHandler<FormData> = (data) => {
        addTeamTC(data)
        reset();
    };

    const handleFormSubmitted = handleSubmit(onSubmit);

    return (
        <Container>
            <Form onSubmit={handleFormSubmitted}>
                <AddImg>
                    <ControlledInputFile name='imageUrl' control={control} errorMessage={errors?.imageUrl?.message} />
                </AddImg>
                <ContainerInput>
                    <WrapperItem>
                        <ControlledTextField
                            control={control}
                            name="name"
                            label="Name"
                            type="text"
                        />
                        <ControlledTextField
                            control={control}
                            name="division"
                            label="Division"
                            type="text"
                        />
                        <ControlledTextField
                            control={control}
                            name="conference"
                            label="Conference"
                            type="text"
                        />
                        <ControlledTextField
                            control={control}
                            name="foundationYear"
                            label="Year of foundation"
                            type='text'
                        />
                        <ButtonsWrapper>
                            <Button onClick={()=> navigate(-1)} type="reset"  isCancel={true}>
                                Cancel
                            </Button>
                            <Button type={'submit'}>Save</Button>
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
