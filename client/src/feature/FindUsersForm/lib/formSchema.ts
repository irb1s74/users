import {object, string} from 'yup'


export const formSchema = object({
    email: string().required('Это обязательное поле').email("Email не валиден"),
    number: string().required('Это обязательное поле').matches(/^\d{2}-\d{2}-\d{2}$/, 'Это обязательное поле'),
})
