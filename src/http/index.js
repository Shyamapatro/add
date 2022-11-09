import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
        "refreshtoken": `${localStorage.getItem('refreshToken')}`,
        "Content-Type": "multipart/form-data"
    }
});

// list all endpoints

// auth endpoints
export const login = (data) => api.post("/auth/login", data);
export const logoutUser = () => api.get("/auth/logout");
export const register = (data) => api.post("/auth/register", data);

// user endpoints
export const getAllUsers = (page, limit) => api.get(`/users?page=${page}&limit=${limit}`);
export const searchUser = (search) => api.get(`/users/search?search=${search}`);
export const updateUser = (id, data) => api.put(`/user-update/${id}`, data);

// get count
export const getCount = () => api.get("/count");

// post endpoints
export const createPost = (data) => api.post("/create-post", data);
export const getAllPosts = (page, limit) => api.get(`/posts?page=${page}&limit=${limit}`);
export const getPost = (id) => api.get(`/posts/${id}`);
export const deletePost = (data) => api.post("/post-delete", data);
export const updatePost = (data) => api.put("/post-update", data);

// setting endpoints
export const saveSetting = (data) => api.put("/settings", data);


// Interceptor for handling 401 errors
api.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && originalRequest && !originalRequest.isRetry) {
            originalRequest.isRetry = true;
            try {
                await axios.get(
                    `${process.env.REACT_APP_API_URL}/auth/refresh`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json",
                            "refreshtoken": `${localStorage.getItem('refreshToken')}`
                        }
                    }
                );

                return api.request(originalRequest);
            } catch (err) {
                console.log(err.message);
            }
        }

        throw error;
    }
);

export default api;