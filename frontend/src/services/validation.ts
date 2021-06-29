import * as yup from 'yup'

enum ValidationMessages {
  REQUIRED = 'Campo Obrigatório',
  INVALID_EMAIL = 'E-mail inválido.',
  INVALID_PASSWORD = 'Senha inválida. Adicionar letras maiúsculas e minúsculas e números. Pelo menos 6 caracteres.',
  PASSWORD_DONT_MATCH = 'Confirmação de senha é diferente.',
}

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required(ValidationMessages.REQUIRED)
    .email(ValidationMessages.INVALID_EMAIL),
  password: yup
    .string()
    .required(ValidationMessages.REQUIRED)
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
      ValidationMessages.INVALID_PASSWORD
    ),
})

export const registerSchema = yup.object().shape({
  email: yup
    .string()
    .required(ValidationMessages.REQUIRED)
    .email(ValidationMessages.INVALID_EMAIL),
  password: yup
    .string()
    .required(ValidationMessages.REQUIRED)
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
      ValidationMessages.INVALID_PASSWORD
    ),
  confirmPassword: yup
    .mixed()
    .test('match', ValidationMessages.PASSWORD_DONT_MATCH, function () {
      return this.parent.password === this.parent.confirmPassword
    }),
})
