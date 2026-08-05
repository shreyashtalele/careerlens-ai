import axios from "axios";


const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000,
});


/**
 * Request Interceptor
 * 
 * Future responsibility:
 * - Attach JWT token
 * - Add common headers
 */
apiClient.interceptors.request.use(
    (config) => {

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


/**
 * Response Interceptor
 *
 * Centralized API error handling
 */
apiClient.interceptors.response.use(
    (response) => {

        return response;
    },

    (error) => {

        const apiError = {
            message:
                error.response?.data?.message ||
                "Something went wrong",

            status:
                error.response?.status || 500,

            data:
                error.response?.data || null,
        };


        return Promise.reject(apiError);
    }
);


export default apiClient;