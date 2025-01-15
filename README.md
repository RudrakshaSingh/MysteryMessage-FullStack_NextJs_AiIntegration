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
