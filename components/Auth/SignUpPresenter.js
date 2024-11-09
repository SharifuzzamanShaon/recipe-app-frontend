// presenters/SignUpPresenter.js
import UserModel from '../../model/UserModel';

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
    this.view.showSuccess("Sign-up successful!");
  }
}
