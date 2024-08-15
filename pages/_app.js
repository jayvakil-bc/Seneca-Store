import { createContext, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import '../styles/globals.css';
import RouteGuard from '@components/RouteGuard';

export const CartContext = createContext();

export default function MyApp({ Component, pageProps }) {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(storedCart);
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    return (
        <RouteGuard>
            <CartContext.Provider value={{ cart, setCart }}>
                <Component {...pageProps} />
            </CartContext.Provider>
        </RouteGuard >
    );
}
