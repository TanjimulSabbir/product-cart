import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import { products } from "../../utils/prodcuts";
import { decreaseQuantity, increaseQuantity, removeFromCart } from "../../redux/features/Cart/cartSlice";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    // Get cart items from Redux state
    const cartItems = useAppSelector((state) => state.cart.items);
    const dispatch = useAppDispatch();

    const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    const navigate = useNavigate();
    const handleCheckout = () => {
        if (cartItems.length) {
            message.success("Checkout Successful")
            navigate("/")
        }
    }

    return (
        <div className="w-full">
            <h2 className="text-lg font-semibold mb-4">Your Cart</h2>

            <div className="overflow-x-auto">
                <table className="min-w-full text-left border-collapse table-auto">
                    <thead>
                        <tr>
                            <th className="text-xs md:text-base py-2">Item</th>
                            <th className="text-xs md:text-base py-2 px-3">Color</th>
                            <th className="text-xs md:text-base py-2 px-3">Size</th>
                            <th className="text-xs md:text-base py-2 px-3 text-center">Qty</th>
                            <th className="text-xs md:text-base py-2 px-3">Price</th>
                            <th className="text-xs md:text-base py-2 px-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.length > 0 ? (
                            cartItems.map((item) => {
                                const product = products.find((p) => p.id === item.id);
                                if (!product) return null;

                                return (
                                    <tr key={item.id} className="border-b border-gray-300">
                                        {/* Combined Product Image and Name */}
                                        <td className="flex space-x-3 items-center py-2 min-w-[100px]">
                                            <img
                                                src={product.images[item.color]}
                                                alt={`${product.name} in ${item.color}`}
                                                className="w-12 h-12 object-cover rounded"
                                            />
                                            <span className="text-[10px] sm:text-base">{product.name}</span>
                                        </td>

                                        {/* Product Color */}
                                        <td className="py-2 pl-4 text-[10px] sm:text-base capitalize">
                                            {item.color}
                                        </td>

                                        {/* Product Size */}
                                        <td className="py-2 px-3 text-[10px] sm:text-base">
                                            {item.size}
                                        </td>

                                        {/* Product Quantity */}
                                        <td className="py-2 px-3 text-[10px] sm:text-base">
                                            <div className="flex items-center justify-between">
                                                <button
                                                    onClick={() => dispatch(increaseQuantity({ id: item.id, color: item.color, size: item.size }))}
                                                    className="text-xs sm:text-base px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                                                >
                                                    +
                                                </button>
                                                <span className="mx-2">{item.quantity}</span>
                                                <button
                                                    onClick={() => dispatch(decreaseQuantity({ id: item.id, color: item.color, size: item.size }))}
                                                    className="text-xs sm:text-base px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                                                >
                                                    −
                                                </button>
                                            </div>
                                        </td>

                                        {/* Product Price */}
                                        <td className="py-2 px-3 text-[10px] sm:text-base">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </td>

                                        {/* Remove Button */}
                                        <td className="py-2 px-3">
                                            <button
                                                onClick={() =>{ dispatch(removeFromCart(item)); message.success("Product Deleted!")}}
                                                className="px-1 sm:px-2 text-[10px] py-1 bg-red-500 text-white rounded-md hover:bg-red-600 sm:text-base"
                                            >
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan={6} className="text-center py-4 text-gray-500 text-sm sm:text-base">
                                    Your cart is empty.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center mt-4">
                <p className="text-lg sm:text-xl font-semibold">Total</p>
                <p className="text-lg sm:text-xl font-semibold">${total.toFixed(2)}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-between mt-6 gap-4">
                <button className="px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 w-full sm:w-auto">
                    Continue Shopping
                </button>
                <button className={`px-3 py-2 ${cartItems.length ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-300"} text-white rounded-md w-full sm:w-auto`} onClick={handleCheckout} disabled={!cartItems?.length}>
                    Checkout
                </button>
            </div>
        </div>
    );
};

export default Cart;
