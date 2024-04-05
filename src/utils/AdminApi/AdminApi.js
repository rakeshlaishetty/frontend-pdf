import instance from "../AuthTokenInstance";

class AdminApi {
  async getAllProjects(data) {
    try {
      const response = await instance.post('/admin/getallprojects');
      return response.data;
    } catch (error) {
      console.log(error,"ERR")
      return new Error(error?.response?.data?.message || 'An error occurred during execution.');
    }
  }
  async getAllDocumentsforProject(data) {
    try {
      const response = await instance.post('/admin/getdocuments',data);
      return response.data;
    } catch (error) {
      console.log(error,"ERR")
      return new Error(error?.response?.data?.message || 'An error occurred during execution.');
    }
  }
  async getAllDocuments(data) {
    try {
      const response = await instance.post('/admin/getdocuments',data);
      return response.data;
    } catch (error) {
      console.log(error,"ERR")
      return new Error(error?.response?.data?.message || 'An error occurred during execution.');
    }
  }
  async getClients(data) {
    try {
      const response = await instance.post('/admin/getclients');
      return response.data;
    } catch (error) {
      console.log(error,"ERR")
      return new Error(error?.response?.data?.message || 'An error occurred during execution.');
    }
  }
  async CreateProfile(data) {
    try {
      const response = await instance.post('/user/register',data);
      return response.data;
    } catch (error) {
      console.log(error,"ERR")
      return new Error(error?.response?.data?.message || 'An error occurred during execution.');
    }
  }
  async createDocument(data) {
    try {
      const response = await instance.post('/admin/createdocument',data,{headers: {'Content-Type': 'multipart/form-data'}});
      return response.data;
    } catch (error) {
      console.log(error,"ERR")
      return new Error(error?.response?.data?.message || 'An error occurred during execution.');
    }
  }
  async CreateProject(data) {
    try {
      const response = await instance.post('/admin/createproject',data);
      return response.data;
    } catch (error) {
      console.log(error,"ERR")
      return new Error(error?.response?.data?.message || 'An error occurred during execution.');
    }
  }
  async getAllEmployees(data) {
    try {
      const response = await instance.post('/admin/getallemployees',data);
      return response.data;
    } catch (error) {
      console.log(error,"ERR")
      return new Error(error?.response?.data?.message || 'An error occurred during execution.');
    }
  }
  
}

const AdminAPI = new AdminApi();

export default AdminAPI;

