import instance from "../axiosConfig";

class LoginService {
  async login(data) {
    try {
      const response = await instance.post('/user/login', data);
      console.log(response,'res')
      return response.data;
    } catch (error) {
      return new Error(error?.response?.data?.message || 'An error occurred during login.');
    }
  }
}

export default new LoginService();
