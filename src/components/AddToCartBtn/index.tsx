import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/Cart/cartSlice';
import { Product, Size } from '../../utils/prodcuts.tsx';
import { useAppSelector } from '../../hooks/hooks';
import { useState, useEffect } from 'react';

interface AddToCartButtonProps {
    product: Product;
    selectedSize: Size;
    selectedColor: string;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
    product,
    selectedSize,
    selectedColor,
}) => {
    const dispatch = useDispatch();
    const cartItems = useAppSelector(state => state.cart.items);

    // Find the product in the cart based on size and color
    const cartItem = cartItems.find(
        item =>
            item.id === product.id &&
            item.size === selectedSize.label &&
            item.color === selectedColor
    );

    // Default to 1 if the item is not found in the cart
    const [quantity, setQuantity] = useState<number>(cartItem ? cartItem.quantity : 1);

    useEffect(() => {
        // If cartItem changes (e.g. quantity was updated), update local state
        if (cartItem) {
            setQuantity(cartItem.quantity);
        }
    }, [cartItem]);

    const handleAddToCart = () => {
        dispatch(
            addToCart({
                id: product.id,
                name: product.name,
                price: selectedSize.price,
                size: selectedSize.label,
                color: selectedColor,
                quantity: quantity,
            })
        );
    };

    const handleIncrease = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        dispatch(
            addToCart({
                id: product.id,
                name: product.name,
                price: selectedSize.price,
                size: selectedSize.label,
                color: selectedColor,
                quantity: newQuantity,
            })
        );
    };

    const handleDecrease = () => {
        if (cartItem && cartItem?.quantity > 1) {
            const newQuantity = cartItem && cartItem?.quantity - 1;
            setQuantity(newQuantity);
            dispatch(
                addToCart({
                    id: product.id,
                    name: product.name,
                    price: selectedSize.price,
                    size: selectedSize.label,
                    color: selectedColor,
                    quantity: newQuantity,
                })
            );
        }
    };

    return (
        <div className="flex items-center space-x-4">
            <button
                onClick={handleDecrease}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg shadow hover:bg-gray-300 transition"
            >
                −
            </button>
            <span className="text-lg font-semibold">{quantity}</span> {/* Display current quantity */}
            <button
                onClick={handleIncrease}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg shadow hover:bg-gray-300 transition"
            >
                +
            </button>
            <button
                onClick={handleAddToCart}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition"
            >
                Add to Cart
            </button>
        </div>
    );
};

export default AddToCartButton;
