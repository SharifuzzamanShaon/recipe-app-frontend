// SignUp Presenter
import UserModel from "../../model/UserModel";

export default class SignUpPresenter {
  constructor(view) {
    this.view = view;
  }

  handleSignUp(userData) {
    const error = UserModel.validate(userData);
    if (error) {
      this.view.showError(error);
      return;
    }

    UserModel.saveUserData(userData);
    this.view.showSuccess({ success: true, message: "Sign-up successful!" });
    return true;
  }
}
