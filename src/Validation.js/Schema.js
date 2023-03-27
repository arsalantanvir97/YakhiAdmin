import * as yup from "yup";

export const loginSchema = yup.object().shape({
    email: yup.string().email().required('Email is required'),
    password: yup.string().required('Password is required'),

});
export const addProductSchema = yup.object().shape({
    category: yup.string().required(),
    name: yup.string().required(),
    price: yup.string().required(),
    description: yup.string().required(),

});
