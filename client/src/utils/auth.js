import decode from 'jwt-decode';

// Creates a new class to instantiate for a user
class AuthService {
  // get user data
  getProfile() {
    return decode(this.getToken());
  }

  // Check if user's logged in
  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token); // handwaiving here
  }

  // Check if token is expired
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

    // Retrieves the user token from localStorage
  getToken() {
        return localStorage.getItem('id_token');
  }


 // Saves user token to localStorage
  login(idToken) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }


    // Clear user token and profile data from localStorage
  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/');
  }
}

export default new AuthService();
