import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "../../config/index";

const ShoppingProductTile = ({ product, handleGetProductDetails, handleAddtoCart }) => {
  return (
    <Card className="flex flex-col h-full overflow-hidden">
      <div
        onClick={() => handleGetProductDetails(product._id)}
        className="cursor-pointer"
      >
        <div className="relative w-full h-48">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover rounded-t-lg"
          />
          {product.salePrice > 0 && (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 text-xs">
              Sale
            </Badge>
          )}
        </div>
      </div>

      <CardContent className="flex flex-col flex-grow p-4">
        <h3 className="text-base font-bold mb-2 line-clamp-2 break-words leading-tight">
          {product.title}
        </h3>

        <div className="flex flex-wrap items-center justify-between mb-2 text-sm text-muted-foreground gap-x-2">
          <span className="text-sm text-muted-foreground">
            {categoryOptionsMap[product.category]}
          </span>
          <span className="text-sm text-muted-foreground">
            {brandOptionsMap[product.brand]}
          </span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <span
            className={`${
              product.salePrice > 0 ? "line-through" : ""
            } text-primary font-semibold text-sm`}
          >
            Rs {product.price}
          </span>
          <span className="text-sm text-muted-foreground font-medium">
            {product.salePrice > 0
              ? `Now: Rs${product.salePrice}`
              : `Price: Rs${product.price}`}
          </span>
        </div>
      </CardContent>

      <CardFooter className="mt-auto p-4 pt-0">
        <Button className="w-full text-sm" onClick={() => handleAddtoCart(product._id)}>
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ShoppingProductTile;
