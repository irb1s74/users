import {memo, useState} from "react";
import axios, {AxiosResponse} from "axios";
import {useFormik} from "formik";
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CircularProgress,
    Divider,
    Stack,
    TextField, Typography
} from "@mui/material";
import InputMask from 'react-input-mask'
import {formSchema} from "../lib/formSchema.ts";

interface IUser {
    email: string
    number: string
}

export const FindUsersForm = memo(() => {
    const [data, setData] = useState<IUser[]>([])
    const [abortController, setAbortController] = useState(new AbortController());
    const [isLoading, setIsLoading] = useState(false)


    const formik = useFormik({
        initialValues: {
            email: '',
            number: '',
        },
        validationSchema: formSchema,
        onSubmit: async (values) => {
            abortController.abort();
            const newAbortController = new AbortController();
            setAbortController(newAbortController);
            const number = values.number.split("-").join("");
            setIsLoading(true)
            const res: AxiosResponse<IUser[]> = await axios.get(`http://localhost:5000/users/find/${values.email}/${number}`, {
                signal: newAbortController.signal,
            })
            setData(res.data)
            setIsLoading(false)
        }
    })

    console.log(formik.isSubmitting)

    return (
        <Stack alignItems='center' justifyContent='center' spacing={4} sx={{height: "100vh"}}>
            <form onSubmit={formik.handleSubmit}>
                <Card>
                    <CardHeader title='Find user'/>
                    <Divider/>
                    <CardContent sx={{width: "350px"}}>
                        <Stack direction='column' spacing={2}>
                            <TextField
                                id='email'
                                type='email'
                                label='email'
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                            />
                            <InputMask
                                id='number'
                                mask='99-99-99'
                                value={formik.values.number}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                alwaysShowMask
                            >
                                {(inputProps) =>
                                    <TextField
                                        {...inputProps}
                                        label='number'
                                        type='text'
                                        error={formik.touched.number && Boolean(formik.errors.number)}
                                        helperText={formik.touched.number && formik.errors.number}
                                    />
                                }
                            </InputMask>
                        </Stack>
                    </CardContent>
                    <CardActions>
                        <Button fullWidth={true} variant='contained' type='submit'>Submit</Button>
                    </CardActions>
                </Card>
            </form>
            {isLoading ? (
                <Box sx={{display: 'flex'}}>
                    <CircularProgress/>
                </Box>
            ) : (
                <Stack>
                    {data.map((user) => (
                        <Card key={user.email}>
                            <CardHeader title={user.number}/>
                            <Divider/>
                            <CardContent sx={{width: "350px"}}><Typography>{user.email}</Typography></CardContent>
                        </Card>
                    ))}
                </Stack>
            )}
        </Stack>
    )
})
