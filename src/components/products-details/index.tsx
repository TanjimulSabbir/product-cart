import { useState } from "react";
import ProductImages from "./ProductImages";
import { products, Product, Size, } from "../../utils/prodcuts.tsx";
import AddToCartButton from "../AddToCartBtn/index.tsx";
import GlobalModal from "../../utils/GlobalModal.tsx";

export default function ProductDetails() {
    const product: Product = products[0]
    const [selectedSize, setSelectedSize] = useState<Size>(product.sizes[0]);
    const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]);

    const [modalOpen, setModalOpen] = useState<boolean>(false)

    const handleModal = () => {
        setModalOpen(!modalOpen)
    }


    return (
        <main className="container max-w-screen-2xl mx-auto horizantalPadding pb-10">
            <div className="flex flex-col md:flex-row gap-8 p-8 xl:items-center xl:justify-center">
                <div className="w-full md:w-1/2 flex justify-center xl:items-center">
                    <ProductImages selectedColor={selectedColor} />
                </div>

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

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <p className="font-medium">
                                Type: <span className="text-gray-600">{product.type}</span>
                            </p>
                            <p className="font-medium">
                                Model Number: <span className="text-gray-600">{product.model}</span>
                            </p>
                        </div>

                        <div className="space-y-2">
                            <p className="font-medium">Band Color:</p>
                            <div className="flex items-center space-x-2">
                                {product.colors.map((color) => (
                                    <button
                                        key={color}
                                        className={`w-8 h-8 rounded-full border-2 ${selectedColor === color ? "border-blue-500" : "border-gray-300"
                                            }`}
                                        style={{ backgroundColor: color }}
                                        onClick={() => setSelectedColor(color)}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <p className="font-medium">Wrist Size:</p>
                            <div className="flex flex-wrap items-center gap-3">
                                {product.sizes.map((size) => (
                                    <button
                                        key={size.label}
                                        className={`px-4 py-2 border rounded-lg text-xs lg:text-sm font-medium ${selectedSize.label === size.label
                                            ? "bg-blue-500 text-white border-blue-500"
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

                    <AddToCartButton product={product}
                        selectedSize={selectedSize}
                        selectedColor={selectedColor} />
                </div>
            </div>
            <div className="flex items-center justify-center text-center ">
                <button className="px-6 py-3 bg-green-600 text-white font-bold text-lg rounded-full shadow-lg transform transition-all duration-300 ease-in-out hover:bg-green-700 hover:scale-105 active:bg-green-800 active:scale-95 focus:outline-none">
                    Complete Checkout
                </button>
            </div>
            <GlobalModal body={<p>Modal open</p>} handleModal={handleModal} modalOpen={modalOpen} />
        </main>
    );
}
