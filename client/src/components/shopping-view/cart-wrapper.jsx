import React from "react";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";
import UserCartItemsContent from "./cart-items-content";

const UserCartWrapper = ({ cartItems }) => {
  return (
    <SheetContent className="sm:max-w-md">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>

      <div className="mt-8 space-y-4">
        {cartItems && cartItems?.length > 0 ? (
          cartItems.map((item) => (
            <UserCartItemsContent  cartItem={item} />
          ))
        ) : (
          <p className="text-center text-muted-foreground">
            Your cart is empty
          </p>
        )}
      </div>

      <div className="mt-8 space-y-4">
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">Rs </span>
        </div>
      </div>

      <Button className="w-full mt-6">Checkout</Button>
    </SheetContent>
  );
};

export default UserCartWrapper;
