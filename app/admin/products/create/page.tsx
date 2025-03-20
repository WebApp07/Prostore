import ProductForm from "@/components/admin/product-from";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create product",
};
const CreateProductPage = () => {
  return (
    <>
      <h2 className="h2-bold">Create product</h2>
      <div className="my-8">
        <ProductForm type="Create" />
      </div>
    </>
  );
};

export default CreateProductPage;
