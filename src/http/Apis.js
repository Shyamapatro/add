import axios from "axios";

const apis = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
        "refreshtoken": `${localStorage.getItem('refreshToken')}`,
    }
});

// list all endpoints
// post endpoints
export const deletePost = (data) => apis.post("/post-delete", data);
export const updateStatus = (data) => apis.put("/update-status", data);
export const searchPostApi = (data) => apis.post("/posts/search", data);

// section endpoints
export const createSection = (data) => apis.post("/create-section", data);
export const getAllSections = (page, limit) => apis.get(`/sections?page=${page}&limit=${limit}`);
export const searchSectionApi = (data) => apis.get(`/sections/search/${data}`);
export const deleteSection = (id) => apis.delete(`/section-delete/${id}`);
export const updateStatusSection = (data) => apis.put("/update-publish-status", data);
export const updateSection = (data) => apis.put("/section-update", data);

// category endpoints
export const createCategory = (data) => apis.post("/category", data);
export const getAllCategories = (page, limit, order) => apis.get(`/categories?page=${page}&limit=${limit}&order=${order}`);
export const searchCategoryApi = (data) => apis.get(`/categories/search/${data}`);
export const deleteCategory = (id) => apis.delete(`/category/${id}`);
export const updateStatusCategory = (data) => apis.put("/update-category-publish-status", data);
export const updateCategory = (data) => apis.put("/category", data);

// user endpoints
export const deleteUser = (data) => apis.post("/user", data);
export const updateStatusUser = (data) => apis.put("/user/status", data);
export const searchUserApi = (data) => apis.get(`/user/search/${data}`);
export const getUser = (id) => apis.get(`/users/${id}`);

// setting endpoints
export const getSettings = () => apis.get("/settings");


// Interceptor for handling 401 errors
apis.interceptors.response.use(
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

                return apis.request(originalRequest);
            } catch (err) {
                console.log(err.message);
            }
        }

        throw error;
    }
);

export default apis;