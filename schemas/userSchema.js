const userSchema = new Schema(
	{
		username: { type: String, unique: true, required: true },
		password: { type: String, required: true },
		email: { type: String, unique: true, required: true },
		profilePicture: String,
	},
);
const User = mongoose.model('User', userSchema);

module.exports = User;