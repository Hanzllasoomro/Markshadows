import { Card, CardContent, CardFooter } from "@/components/ui/card";
import React from "react";
import { Button } from "@/components/ui/button";

const AdminProductTile = ({
  product,
  setFormData,
  setOpenCreateProductDialog,
  setCurrentEditedId,
}) => {
  return (
    <Card className="w-full max-w-auto mx-auto">
      <div className="relative">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-[300px] object-cover rounded-t-lg"
        />
      </div>
      <CardContent>
        <h2 className="text-xl font-bold mb-2 mt-2">{product.title}</h2>
        <div className="flex justify-between items-center mb-2">
          <span
            className={` 
          ${product.salePrice > 0 ? "line-through" : ""}
          text-lg font-semibold text-primary`}
          >
            ${product.price}
          </span>
          {product.salePrice > 0 ? (
            <span className="text-lg font-bold">${product.salePrice}</span>
          ) : null}
        </div>
      </CardContent>
      <CardFooter className={"flex justify-between items-center"}>
        <Button onClick={() =>{
          setCurrentEditedId(product._id);
          setFormData(product)
          setOpenCreateProductDialog(true);
        } }>Edit</Button>
        <Button>Delete</Button>
      </CardFooter>
    </Card>
  );
};

export default AdminProductTile;
