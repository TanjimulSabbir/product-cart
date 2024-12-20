import { Image } from "antd";
import { Product, products } from "../../utils/prodcuts.tsx";

interface ProductImagesProps {
    selectedColor: string;
}

export default function ProductImages({ selectedColor }: ProductImagesProps) {
    const product: Product = products[0];
    const imageList = product.images[selectedColor];
    return (
        <main>
            <Image.PreviewGroup
                items={product.imageItems}
                preview={{
                    toolbarRender: () => null,
                }}
            >
                <Image src={imageList} />
            </Image.PreviewGroup>
        </main>
    );
}
