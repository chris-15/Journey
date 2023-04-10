import decode from "jwt-decode";

class AuthService {
  getProfile() {
    return decode(this.getToken());
  }

  getToken() {
    // gets the user token from local storage
    return localStorage.getItem("id_token");
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  loggedIn() {
    // checks to see if there is a saved token and its still valid
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  login(idToken) {
    // saves the user token to the local storage
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout() {
    //clears the user token and profile data from local storage
    localStorage.removeItem('id_token');
    window.location.assign('/');
  }
}

export default new AuthService();
