import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import { products } from "../../utils/prodcuts";
import { removeFromCart } from "../../redux/features/Cart/cartSlice"; // Adjust the import based on your Redux setup

const Cart = () => {
    // Get cart items from Redux state
    const cartItems = useAppSelector((state) => state.cart.items);

    // Initialize the dispatch function
    const dispatch = useAppDispatch();

    // Calculate total dynamically
    const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <div className="max-w-lg mx-auto">
            <h2 className="text-lg font-semibold mb-4">Your Cart</h2>

            {/* Cart Table */}
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr>
                        <th className="border-b pb-2">Item</th>
                        <th className="border-b pb-2">Color</th>
                        <th className="border-b pb-2">Size</th>
                        <th className="border-b pb-2">Qty</th>
                        <th className="border-b pb-2">Price</th>
                        <th className="border-b pb-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.length > 0 ? (
                        cartItems.map((item) => {
                            const product = products.find((p) => p.id === item.id);
                            if (!product) return null;

                            return (
                                <tr key={item.id} className="border-b">
                                    {/* Combined Product Image and Name */}
                                    <td className="flex space-x-3 items-center py-2">
                                        <img
                                            src={product.images[item.color]} // Fetch image based on the selected color
                                            alt={`${product.name} in ${item.color}`}
                                            className="w-12 h-12 object-cover rounded"
                                        />
                                        <span>{product.name}</span>
                                    </td>

                                    {/* Product Color */}
                                    <td className={`py-2 capitalize text-${item.color}`}>{item.color}</td>

                                    {/* Product Size */}
                                    <td className="py-2">{item.size}</td>

                                    {/* Product Quantity */}
                                    <td className="py-2">{item.quantity}</td>

                                    {/* Product Price */}
                                    <td className="py-2">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </td>

                                    {/* Remove Button */}
                                    <td className="py-2">
                                        <button
                                            onClick={() => dispatch(removeFromCart(item.id))}
                                            className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan={6} className="text-center py-4 text-gray-500">
                                Your cart is empty.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Total */}
            <div className="flex justify-between items-center mt-4">
                <p className="text-lg font-semibold">Total</p>
                <p className="text-lg font-semibold">${total.toFixed(2)}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between mt-6">
                <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
                    Continue Shopping
                </button>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                    Checkout
                </button>
            </div>
        </div>
    );
};

export default Cart;
