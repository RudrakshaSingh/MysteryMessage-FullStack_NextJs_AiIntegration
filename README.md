# Basic Things
## models folder
for db-using zod
```
npm i moongoose
```
```
import mongoose, { Schema, Document } from "mongoose";
```
Document -for typesafety and typescript

 using typescript we define type by imterface to give format
 ```
 export interface Message extends Document {
  content: string;
  createdAt: Date;
}
```
extends Document as schema mongoose me hi jana hai document ka part banega
```
const MessageSchema: Schema<Message> = new Schema({
  content: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
});
```

note: String in mongoose is in capital and string in typescript is in small

in nextjs most things are running at edge time framework and at edge whole source code runs
in nextjs dont know if it is booting up first time or many times before we need to create and if created in mongodb database

```
const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema);
```
---

##  schemas folder
```
npm i zod
```
for specific validation of specific route using zod

```
import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(2, "Username must be at least 2 characters long")
  .max(20, "Username must be at most 20 characters long")
  .regex(
    /^[a-zA-Z0-9_]+$/,
    "Username must only contain alphanumeric characters and underscores or must not contain special characters"
  );

export const signUpSchema = z.object({
  username: usernameValidation,
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

```
z.string() for one value for multiple things z.object()



## lib folder- db connect and resend and for shadcn
need to know in nextjs jese jese req aati hai tab execute hoti hai
so for every function we connect db everytime
need to know  if db is connected as at 1 sec second we may get multiple db connect req and chock the application
if connected used that connection and else make new connection

note: void in typescript is for we dont care what type of data return

## env is already taken care in nectjs use it directly

## RESEND email signup-as nextauth package has specfic standarized details we are making it to our need
[Click Here](https://resend.com/)

code should effectively handles both scenarios of registering a new user and
updating an existing but unverified user account with a new password and verification code.
    IF existingUserByEmail EXISTS THEN
        IF existingUserByEmail.is Verified THEN
            success: false,
        ELSE
          // Save the updated user
        END IF
    ELSE
        //Create a new user with provided details
        //save the new user'
    END IF
```
npm i resend
```

```
import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY);
```

### email folder for email template
## helpers folder
```
import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(email: string, username: string, verifyCode: string): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: email,
      subject: "Mystery Message | Verification Code",
      react: VerificationEmail({ username, otp: verifyCode }),
    });
    return { success: true, message: "Verification email sent successfully." };
  } catch (emailError) {
    console.error("Error sending verification email:", emailError);
    return { success: false, message: "Failed to send verification email." };
  }
}
```

## types folder - for custom types like APIResponse

## api folder in app folder -nextjs standard for routes
folders are made according to routes
### sign-up folder
it has compulsary filename route.ts
```
export async function POST(request: Request) {
```
need to write function name like this

```
const { username, email, password } = await request.json();
```
need to use await in req.json 

## NEXTAUTH /AUTHJS
for sign in

```
npm install next-auth
```
provideer and callback

1) app-api-auth-[...NextAuth]-2 files route.ts option.ts optional
2) Provided- we used credential therefore most difficult , we can use github provider etc easily

for credentials we need= credentials emal password
                       =authorize stragegy
                       =pages override,strategy jwt
                       =callback modified to make less database call by making jwt and session by putting user data to token then to session
3) middleware
authentication ,getToken 
config- for paths to run middleware function logic
4) sign-in
(auth)=parenthesdid folder for grouping

make a context auth provided to make sessionProvider and wrap childern'

and wrap AuthProvider to body

page.tsx signin button and get data if login

### nextauth frontend -(auth)= for groupimg will not count in route
sign-in - with page.tsx
use client - need to put

"use client" directive is used to specify that a React component should be rendered on the client side rather than the server.

Why Use "use client" in Next.js?
By default, components in Next.js 13+ are server components, meaning they are rendered on the server and sent as HTML to the client. If you want a component to be interactive (i.e., use state, effects, event handlers, or browser-specific APIs), you must mark it explicitly as a client component using "use client".

### context folder