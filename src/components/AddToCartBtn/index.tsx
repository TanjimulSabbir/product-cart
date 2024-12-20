import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/Cart/cartSlice';
import { Product, Size } from '../../utils/prodcuts.tsx';
import { useAppSelector } from '../../hooks/hooks';
import { useState, useEffect } from 'react';
import { message } from 'antd';

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

    const cartItem = cartItems.find(
        item =>
            item.id === product.id &&
            item.size === selectedSize.label &&
            item.color === selectedColor
    );
    const [quantity, setQuantity] = useState<number>(cartItem ? cartItem.quantity : 1);

    useEffect(() => {
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
        message.success(`${product.name} is added to cart.`);
    };

    const handleIncrease = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity); 
        } else {
            message.info("At least 1 item must be selected");
        }
    };

    return (
        <div className="flex items-center space-x-4">
            <button
                onClick={handleDecrease}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg shadow hover:bg-gray-300 transition"
                disabled={quantity <= 1} 
            >
                −
            </button>
            <span className="text-lg font-semibold">{quantity}</span>
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
