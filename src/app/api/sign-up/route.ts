import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
	await dbConnect();

	try {
		const { username, email, password } = await request.json();

		const existingUserVerifiedByUsername = await UserModel.findOne({ username, isVerified: true });

		if (existingUserVerifiedByUsername) {
			return Response.json({ success: false, message: "Username already exists" }, { status: 400 });
		}

		const existingUserByEmail = await UserModel.findOne({ email });
		const verifyCode = Math.floor(100000 + Math.random() * 900000).toString(); //100000 - 999999, ensuring a 6-digit numbe

		if (existingUserByEmail) {
			if (existingUserByEmail.isVerified) {
                //user already verified not needed to come to this route
				return Response.json({ success: false, message: "User already exists with this Email" }, { status: 400 });
			} else {
                //now save updated user
				const hashedPassword = await bcrypt.hash(password, 10);
				existingUserByEmail.password = hashedPassword;
				existingUserByEmail.verifyCode = verifyCode;
				existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);//added 1 hour

				await existingUserByEmail.save();
			}
		} else {
			//user can come for first time
			const hashedPassword = await bcrypt.hash(password, 10);
			const expiryDate = new Date();
			expiryDate.setHours(expiryDate.getHours() + 1); //1hour more than current, we are able to change const as date is object and new keyword is used

			const newUser = new UserModel({
				username,
				email,
				password: hashedPassword,
				verifyCode,
				verifyCodeExpiry: expiryDate,
				isVerified: false,
				isAcceptingMessages: true,
				messages: [],
			});

			await newUser.save();
		}

		//sendVerificationEmail(email, verifyCode);
		const emailResponse = await sendVerificationEmail(email, username, verifyCode);

		if (!emailResponse.success) {
			return Response.json({ success: false, message: emailResponse.message }, { status: 500 });
		}

		return Response.json(
			{ success: true, message: "User registered successfully. Verification email sent. Please verify email" },
			{ status: 201 }
		);
	} catch (error) {
		console.error("Error registering user:", error);
		return Response.json({ success: false, message: "Error registering user" }, { status: 500 });
	}
}
