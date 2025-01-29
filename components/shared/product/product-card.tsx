import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

const ProductCard = ({ product }: { product: any }) => {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="p-0 items-center">
        <Link href={`/product/${product.slug}`}>
          <Image
            src={product.images[0]}
            alt={product.name}
            width={300}
            height={300}
            priority={true}
          />
        </Link>
      </CardHeader>
      <CardContent className="p-4 grid grid-4">
        <div className="text-xs">{product.brand}</div>
        <Link href={`/product/${product.slug}`} className="">
          <h2 className="text-sm font-medium"> {product.name}</h2>
        </Link>
        <div className="">
          <p className="flex-between gap-4">{product.rating} Stars</p>
          {product.stock > 0 ? (
            <p className="font-bold">${product.price}</p>
          ) : (
            <p className="text-destructive">Out Of Sotck</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
