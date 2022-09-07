import axios from "axios";

const apiUri = import.meta.env.VITE_API_URI;

const apiClient = axios.create({
  // baseURL: apiUri,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
});

const apiWrapper = {
  instance: apiClient,

  get: async function (...args) {
    try {
<<<<<<< HEAD
      console.log(this.instance);
=======
      console.log(this.instance)
>>>>>>> 122a4ed675568d6c57b67b8189b27fd6363a55af
      return await this.instance.get(...args);
    } catch (error) {
      console.error({ ...error });
    }
  },

  post: async function (...args) {
    try {
      return await this.instance.get(...args);
    } catch (error) {
      console.error({ ...error });
    }
  },

  put: async function (...args) {
    try {
      return await this.instance.get(...args);
    } catch (error) {
      console.error({ ...error });
    }
  },

  delete: async function (...args) {
    try {
      return await this.instance.get(...args);
    } catch (error) {
      console.error({ ...error });
    }
  },
};

export { apiWrapper };
