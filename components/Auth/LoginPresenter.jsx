// pages/login/LoginPresenter.js
import LoginModel from './LoginModel';

export default class LoginPresenter {
  constructor(view) {
    this.view = view;
    this.model = new LoginModel();
  }

  async handleLogin(username, password) {
    try {
      this.view.setLoading(true);
      const result = await this.model.authenticate(username, password);
      if (result.success) {
        this.view.showSuccess("Login successful!");
      }
    } catch (error) {
      this.view.showError(error.message);
    } finally {
      this.view.setLoading(false);
    }
  }
}
