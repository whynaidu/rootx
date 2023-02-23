import CreatorProfile from "./profileSchema"



CreatorProfile.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (err) {
    console.log(err);
  }
};