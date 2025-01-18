# 1. ZOD library 
*for schemas*
[Click Here](https://zod.dev/)
npm i zod


in nextjs to database connectivity first check if connection is already there for each request if not there then connect

# 2. shadcn

# 3. Resend email

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

# 4. react email
# 5. NEXTAUTH /AUTHJS
npm install next-auth

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
4)sign-in
(auth)=parenthesdid folder for grouping

make a context auth provided to make sessionProvider and wrap childern'

and wrap AuthProvider to body

page.tsx signin button and get data if login