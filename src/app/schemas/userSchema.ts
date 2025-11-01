import z from "zod"

const specialCharRegex = /[!@#$%^&*()\-_+=]/;

const passwordSchema = z.string()
    .min(8, "A senha deve ter no mínimo 8 caracteres.")

    .regex(/.*\d.*/, "A senha deve conter pelo menos 1 número.")

    .regex(specialCharRegex, "A senha deve conter pelo menos 1 caractere especial.");

const emailSchema = z.string()
    .email("Formato de email inválido!")

export const loginUserSchema = z.object({
    email: emailSchema,
    password: passwordSchema
})

export const createUserSchema = z.object({
    name:
        z.string()
            .min(1, "Campo nome é obrigatório"),
    email: emailSchema,
    password: passwordSchema
})