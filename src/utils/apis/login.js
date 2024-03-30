import instance from "../axiosConfig";

class LoginService {
  async login(data) {
    try {
      const response = await instance.post('/user/login', data);
      console.log(response,'res')
      return response.data;
    } catch (error) {
      console.log(error,"ERR")
      return new Error(error?.response?.data?.message || 'An error occurred during login.');
    }
  }
}

const loginService = new LoginService();

export default loginService;

