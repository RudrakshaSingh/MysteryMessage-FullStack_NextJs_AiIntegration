import {z} from "zod";

export const signInschema = z.object({
    identifier: z.string(),//identifier is used instead of email
    password: z.string(),
});