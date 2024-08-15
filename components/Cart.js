import { useContext } from 'react';
import Link from 'next/link';
import { CartContext } from '../pages/_app';


export default function Cart() {
    const { cart, setCart } = useContext(CartContext);

    const totalAmount = cart.reduce((total, item) => total + item.price, 0);

    function removeFromCart(index) {
        const newCart = cart.filter((_, i) => i !== index);
        setCart(newCart);
    }

    return (
        <div>
            <h1>Shopping Cart</h1>
            <Link href="/product-details">Back to Products</Link>
            {cart.length > 0 ? (
                <div>
                    <ul>
                        {cart.map((item, index) => (
                            <li key={index}>
                                {item.title} - ${item.price}
                                <button onClick={() => removeFromCart(index)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                    <h2>Total Amount: ${totalAmount.toFixed(2)}</h2>
                </div>
            ) : (
                <p>Your cart is empty</p>
            )}
        </div>
    );
}