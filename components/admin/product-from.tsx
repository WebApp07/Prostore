"use client";

import { useToast } from "@/hooks/use-toast";
import { productDefualtValues } from "@/lib/constants";
import { insertProductSchema, updateProductSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { Product } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../ui/form";

const ProductForm = ({
  type,
  product,
  productId,
}: {
  type: "Create" | "Update";
  product?: Product;
  productId?: string;
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof insertProductSchema>>({
    resolver:
      type === "Update"
        ? zodResolver(updateProductSchema)
        : zodResolver(insertProductSchema),
    defaultValues:
      product && type === "Update" ? product : productDefualtValues,
  });
  return (
    <Form {...form}>
      <form className="space-y-8">
        <div className="flex flex-col md:flex-row gap-5"></div>
        <div className="flex flex-col md:flex-row gap-5"></div>
        <div className="flex flex-col md:flex-row gap-5"></div>
        <div className="flex flex-col md:flex-row gap-5"></div>
        <div className="flex flex-col md:flex-row gap-5"></div>
        <div className="upload-field flex-col md:flex-row gap-5"></div>
        <div className="upload-field"></div>
        <div className=""></div>
        <div></div>
      </form>
    </Form>
  );
};

export default ProductForm;
