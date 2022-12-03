export const configForm = {
  username: {
    required: "o nome precisa ter entre 5 e 15 caracteres",
    minLength: {
      value: 5,
      message: "o nome precisa ter entre 5 e 15 caracteres",
    },
    maxLength: {
      value: 15,
      message: "o nome precisa ter entre 5 e 15 caracteres",
    },
  },
  password: {
    required: "a senha tem que ter entre 5 e 15 caracteres",
    minLength: {
      value: 5,
      message: "a senha tem que ter entre 5 e 15 caracteres",
    },
    maxLength: {
      value: 15,
      message: "a senha tem que ter entre 5 e 15 caracteres",
    },
  },
};
