import instance from "../AuthTokenInstance";

class ProfileApi {
  async getRoleService(data) {
    try {
      const response = await instance.post('/user/me');
      console.log(response,'res')
      return response.data;
    } catch (error) {
      console.log(error,"ERR")
      return new Error(error?.response?.data?.message || 'An error occurred during execution.');
    }
  }
  async updatedUserData(data) {
    try {
      const response = await instance.post('/user/updateprofile',data);
      return response.data;
    } catch (error) {
      console.log(error,"ERR")
      return new Error(error?.response?.data?.message || 'An error occurred during execution.');
    }
  }
}

const profileApi = new ProfileApi();

export default profileApi;

