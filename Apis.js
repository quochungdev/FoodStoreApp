import axios from "axios";

//Google Map

export const HOST = "https://4c3d-27-78-218-41.ngrok-free.app"

export const endpoints = {
    'categories': "/categories/",

    'restaurantDetail': (Id) => `/categories/${Id}/restaurants`,

    'dish': (Id) => `/restaurants/${Id}/dishes/`,
    'dishDetail': (Id) => `/dishes/${Id}/`,

    'login': '/o/token/',
    'current_user': '/users/current/',
    'register': '/users/',

    'comments': (Id) => `/dishes/${Id}/comment/`,
    'create_comment': (Id) => `/dishes/${Id}/comments/`,

    'ratings': (Id) => `/dishes/${Id}/rating/`,
    'create_rating': (Id) => `/dishes/${Id}/ratings/`,

    'create_order': "/orders/create_order/",
    'get_order_by_userId': (Id) => `/orders/get_orders_confirm_by_account/?user_id=${Id}`,
    'create_orderdetail': (Id) => `/orders/${Id}/create_orderdetail/`,
    'paymentTypes': "/paymentTypes/",

    // 'search_dishes': (query) => `/dishes/search?dish_name=${query}`,
    // 'search_restaurants': (query) => `/dishes/search?restaurant_name=${query}`,

    'search_dishes': `/dishes/search?`,
    'search_restaurants': `/dishes/search?`,
}

export const authApi = (accessToken) => axios.create({
    baseURL: HOST,
    headers: {
        "Authorization": `Bearer ${accessToken}`
    }
})

export default axios.create({
    baseURL: HOST
})