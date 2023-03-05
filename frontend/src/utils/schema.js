import * as yup from 'yup';

const nameRegex = /^[A-Z]+(([a-zA-Z ])?[a-zA-Z]*)*$/g

export const schemaAccount = yup.object().shape({
  username: yup.string().required("username é necessário"),
  password: yup.string().required("senha é necessária"),
});

export const schemaContact = yup.object().shape({
  name: yup.string().required("nome é necessário").matches(nameRegex, "A primeira letra deve ser maiúscula"),
  email: yup.string().email("email inválido").required("email é necessário"),
});