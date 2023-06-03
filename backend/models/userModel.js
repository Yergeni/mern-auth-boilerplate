import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
	{
		name: { type: String, require: true },
		email: { type: String, require: true, unique: true },
		password: { type: String, require: true },
	},
	{
		timestamps: true,
	}
);

// handle before `save` query to hash the password (Usefull for registration)
// save query is used on auth and update user endpoints
userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		next();
	} else {
		const salt = await bcrypt.genSalt(10);
		this.password = bcrypt.hashSync(this.password, salt);
	}
});

// add a `matchPassword` method to the user model to verify the entered password vs the hash password
userSchema.method('matchPasswords', async function (rawPassoword) {
  return await bcrypt.compare(rawPassoword, this.password)
})

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
