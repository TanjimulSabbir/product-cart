import pinkWatch from "../assets/product-details/pink-product.png";
import blueWatch from "../assets/product-details/blue-product.png";
import cyanWatch from "../assets/product-details/cyan-product.png";
import blackWatch from "../assets/product-details/black-product.png";

export interface Size {
    label: string;
    price: number;
}

export interface Product {
    id: number;
    name: string;
    description: string;
    model: string;
    type: string;
    basePrice: number;
    discountPrice: number;
    colors: string[];
    sizes: Size[];
    images: Record<string, string>;
    imageItems: string[]
}

export type Color = "pink" | "black" | "blue" | "cyan";

export const products: Product[] = [
    {
        id: 1,
        name: "Classy Modern Smart Watch",
        description:
            "I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teaching.",
        model: "Forerunner 290XT",
        type: "Watch",
        basePrice: 79,
        discountPrice: 99,
        colors: ["pink", "black", "blue", "cyan"],
        sizes: [
            { label: "S", price: 79 },
            { label: "M", price: 89 },
            { label: "L", price: 99 },
            { label: "XL", price: 109 },
        ],
        images: {
            pink: pinkWatch,
            black: blackWatch,
            blue: blueWatch,
            cyan: cyanWatch,
        },
        imageItems: [
            pinkWatch,
            blackWatch,
            blueWatch,
            cyanWatch,
        ],
    },
];
