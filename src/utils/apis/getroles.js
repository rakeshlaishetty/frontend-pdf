import instance from "../AuthTokenInstance";

class GetRoleService {
  async getRoleService(data) {
    try {
      const response = await instance.get('/roles/getroles', data);
      console.log(response,'res')
      return response.data;
    } catch (error) {
      console.log(error,"ERR")
      return new Error(error?.response?.data?.message || 'An error occurred during execution.');
    }
  }
}

const getRoleService = new GetRoleService();

export default getRoleService;

