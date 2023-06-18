import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  phone: Yup.string().required("Номер телефона обязателен"),
  email: Yup.string()
    .email("Неверный формат email")
    .required("Email обязателен"),
});
