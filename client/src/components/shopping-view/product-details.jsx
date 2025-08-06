import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import clsx from "clsx";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { StarIcon } from "lucide-react";
import { Input } from "../ui/input";

const ProductDetailsDialog = ({ open, setOpen, productDetails }) => {
  if (!productDetails) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="grid grid-cols-2 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productDetails.image}
            alt={productDetails.title}
            width={600}
            height={600}
            className="w-full h-full object-cover aspect-square"
          />
        </div>
        <div className="grid gap-6">
          <DialogHeader>
            <DialogTitle className="ext-muted-foreground text-3xl">
              {productDetails.title}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-2xl mt-4">
              {productDetails.description}
            </DialogDescription>
          </DialogHeader>
          <Separator className="my-4" />
          <div className="flex items-center justify-between">
            <p
              className={clsx(
                "text-3xl font-bold text-primary",
                productDetails.salePrice > 0 && "line-through"
              )}
            >
              Rs {productDetails.price}
            </p>

            {productDetails.salePrice > 0 && (
              <p className="text-2xl font-bold text-muted-foreground">
                Rs {productDetails.salePrice}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-0.5">
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-muted-foreground" />
            </div>
            <span className="text-muted-foreground text-sm">(4.5)</span>
          </div>
          <div className="mt-5">
            <button
              className="w-full px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
              onClick={() => setOpen(false)}
            >
              Add to Cart
            </button>
          </div>
          <div className="max-h-[300px] overflow-auto">
            <h2 className="text-xl font-bold mb-4">Reviews</h2>
            <div className="grid gap-6">
              <div className="flex gap-4">
                <Avatar className="w-10 h-10 border">
                  <AvatarFallback>SM</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">Hanzlla Soomro</h3>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground">
                    "This product is amazing! Highly recommend it."
                  </p>
                </div>

              </div>
            </div>
            <div className="mt-6 flex gap-2">
              <Input placeholder="Write a review ..."/>
              <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors">
                Submit
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailsDialog;
