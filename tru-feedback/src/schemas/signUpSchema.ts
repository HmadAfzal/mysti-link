import {z} from 'zod'

export const usernameValidation=z
.string()
.min(3, 'username muts be atleast 3 charachters')
.max(20, 'username mustr be no more than 20 charachters')
.regex(/^[a-zA-Z09_]+$/, "username must not contain special charachters")

export const signUpSchema=z.object({
    username:usernameValidation,
    email:z.string().email({message: 'please enter valid email'}),
    password: z.string().min(6,{message:'password must be of atleast 6 charachters'}).max(20,{message:'password must be no longer than 20 charachters'})
})