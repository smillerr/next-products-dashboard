const BASE_API_URL = process.env.NEXT_PUBLIC_STORE_API_URL
const API_VERSION = process.env.NEXT_PUBLIC_STORE_API_VERSION

export const endpoints = {
    products: {
        getProducts: (offset, limit) => `${BASE_API_URL}${API_VERSION}/products?offset=${offset}&limit=${limit}`,
        getProduct: (id)=>`${BASE_API_URL}${API_VERSION}/products/${id}`,
        createProduct: `${BASE_API_URL}${API_VERSION}/products`,
        updateProduct: (id)=>`${BASE_API_URL}${API_VERSION}/products/${id}`,
        deleteProduct: (id)=>`${BASE_API_URL}${API_VERSION}/products/${id}`,
    },
    auth: {
        login:  `${BASE_API_URL}${API_VERSION}/auth/login`,
        profile: `${BASE_API_URL}${API_VERSION}/auth/profile`,
        refreshToken: `${BASE_API_URL}${API_VERSION}/auth/refresh-token`,
    },
    users: {
        getUsers: `${BASE_API_URL}${API_VERSION}/users`,
        getUser: (id) => `${BASE_API_URL}${API_VERSION}/users/${id}`,
        createUser: `${BASE_API_URL}${API_VERSION}/users`,
        updateUser: (id)=>`${BASE_API_URL}${API_VERSION}/users/${id}`,
        deleteUser: (id)=>`${BASE_API_URL}${API_VERSION}/users/${id}`,
        checkUser: `${BASE_API_URL}${API_VERSION}/users/is-available`,
    },
    categories: {
        getCategories: `${BASE_API_URL}${API_VERSION}/categories`,
        getCategory: (id) => `${BASE_API_URL}${API_VERSION}/categories/${id}`,
        createCategory: `${BASE_API_URL}${API_VERSION}/categories`,
        updateCategory: (id) => `${BASE_API_URL}${API_VERSION}/categories/${id}`,
        deleteCategory: (id) => `${BASE_API_URL}${API_VERSION}/categories/${id}`,
    },
    files: {
        uploadFile: `${BASE_API_URL}${API_VERSION}/files/upload`,
        getFile: (fileName) => `${BASE_API_URL}${API_VERSION}/files/${fileName}`
    }
}