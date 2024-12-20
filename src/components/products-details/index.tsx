import { useState } from "react";
import GlobalModal from "../../utils/GlobalModal.tsx";
import { Product, products, Size } from "../../utils/prodcuts.tsx";
import AddToCartButton from "../AddToCartBtn/index.tsx";
import Cart from "../Cart/index.tsx";
import ProductImages from "./ProductImages";
import { useAppSelector } from "../../hooks/hooks.ts";

export default function ProductDetails() {
  const product: Product = products[0]; // Selected product
  const [selectedSize, setSelectedSize] = useState<Size>(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const cartItems = useAppSelector(state => state.cart.items);

  const cartItem = cartItems.find(
    item =>
      item.id === product.id &&
      item.size === selectedSize.label &&
      item.color === selectedColor
  );

  const handleModal = (isOpen: boolean) => {
    setModalOpen(isOpen);
  };

  return (
    <main className="container max-w-screen-2xl mx-auto horizantalPadding pb-10">
      <div className="flex flex-col md:flex-row gap-8 md:p-8 xl:items-center xl:justify-center">
        {/* Product Images */}
        <div className="w-full md:w-1/2 flex justify-center xl:items-center">
          <ProductImages selectedColor={selectedColor} />
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2 space-y-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <div className="flex items-center space-x-4">
            <span className="text-xl font-bold text-green-500">
              ${selectedSize.price.toFixed(2)}
            </span>
            <span className="line-through text-gray-400">
              ${product.discountPrice.toFixed(2)}
            </span>
          </div>

          <p className="text-gray-600">{product.description}</p>

          {/* Product Options */}
          <div className="space-y-4">
            {/* Product Info */}
            <div className="space-y-2">
              <p className="font-medium">
                Type: <span className="text-gray-600">{product.type}</span>
              </p>
              <p className="font-medium">
                Model Number:{" "}
                <span className="text-gray-600">{product.model}</span>
              </p>
            </div>

            {/* Color Options */}
            <div className="space-y-2">
              <p className="font-medium">Band Color:</p>
              <div className="flex items-center space-x-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    className={`w-8 h-8 rounded-full border-2 ${selectedColor === color
                      ? "border-blue-500"
                      : "border-gray-300"
                      }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </div>
            </div>

            {/* Size Options */}
            <div className="space-y-2">
              <p className="font-medium">Wrist Size:</p>
              <div className="flex flex-wrap items-center gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size.label}
                    className={`px-4 py-2 border rounded-lg text-xs lg:text-sm font-medium ${selectedSize.label === size.label
                      ? `${cartItem ? "bg-green-500" : "bg-blue-500 border-blue-500"} text-white `
                      : "bg-white text-gray-700 border-gray-300"
                      }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size.label} - ${size.price}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Add to Cart Button */}
          <AddToCartButton
            product={product}
            selectedSize={selectedSize}
            selectedColor={selectedColor}
          />
        </div>
      </div>

      {/* Checkout Button */}
      <div className="mt-10 flex items-center justify-center text-center">
        <button
          className="px-6 py-3 bg-green-600 text-white font-bold text-sm sm:text-lg rounded-full shadow-lg transform transition-all duration-300 ease-in-out hover:bg-green-700 hover:scale-105 active:bg-green-800 active:scale-95 focus:outline-none"
          onClick={() => handleModal(true)}
        >
          Complete Checkout
        </button>
      </div>

      <GlobalModal
        body={<Cart />}
        handleModal={handleModal}
        modalOpen={modalOpen}
      />
    </main>
  );
}
