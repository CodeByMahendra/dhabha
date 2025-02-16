

import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState("");
    const [food_list, setFood_list] = useState([]);
    const [userId, setUserId] = useState(null); // Store userId here

    // const url = "http://localhost:3001"; // Your backend URL
    const url = "https://dhabha-backend.onrender.com"

    // Add to cart function
    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }

        if (token) {
            await axios.post(
                `${url}/api/cart/add`,
                { itemId },
                { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
            );
        }
    };

    // Remove from cart function
    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

        if (token) {
            await axios.post(`${url}/api/cart/remove`, { itemId }, { headers: { token }, withCredentials: true });
        }
    };

    // Get total cart amount
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    };

    // Fetch food list from backend
    const fetchFoodList = async () => {
        const response = await axios.get(`${url}/api/food/list`);
        setFood_list(response.data.data);
    };

    // Load cart data from backend
    const loadCartData = async (token) => {
        if (!token) {
            console.log("No token found.");
            return;
        }

        try {
            const response = await axios.get(
                `${url}/api/cart/get`,
                { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
            );

            if (response.data.success) {
                setCartItems(response.data.cartData);
            } else {
                console.error("Error fetching cart data:", response.data.message);
            }
        } catch (error) {
            console.error("Error loading cart data:", error);
        }
    };

    // Load token and userId from localStorage or cookies
    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            const storedToken = localStorage.getItem('token');
            const storedUserId = localStorage.getItem('userId'); // Fetch userId from localStorage

            if (storedToken) {
                setToken(storedToken);
                await loadCartData(storedToken);
            }
            if (storedUserId) {
                setUserId(storedUserId); // Set userId
            }
        }
        loadData();
    }, []);

    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
        }
        if (userId) {
            localStorage.setItem("userId", userId); // Save userId to localStorage
        }
    }, [token, userId]);

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
        userId, // Add userId here
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
