import { Image } from "antd";
import { useState } from "react";
import { products, Product } from "../../utils/prodcuts.tsx"; 

interface ProductImagesProps {
  selectedColor: string; 
}

export default function ProductImages({ selectedColor }: ProductImagesProps) {
  const product: Product = products[0]; 
  const [current, setCurrent] = useState(0);

  const imageList = product.images[selectedColor];

  return (
    <main>
      <Image.PreviewGroup
        preview={{
          toolbarRender: () => null,
          onChange: (index) => setCurrent(index),
        }}
      >
        <Image src={imageList} width={200} />
      </Image.PreviewGroup>
    </main>
  );
}
