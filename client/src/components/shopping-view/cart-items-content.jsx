import { Minus, Plus, Trash } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartQuantity } from "@/store/shop/cart-slice";
import { toast } from "sonner";

const UserCartItemsContent = ({ cartItem }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleCartItemDelete = (getCartItem) => {
    dispatch(
      deleteCartItem({ userId: user._id, productId: getCartItem.productId })
    ).then((data) => {
      if (data.payload.success) {
        toast("Cart Item Deleted");
      }
    });
  };

  const handleUpdateQuantity = (getCardItem, typeofAction) => {
    dispatch(
      updateCartQuantity({
        userId: user._id,
        productId: getCardItem.productId,
        quantity:
          typeofAction === "plus"
            ? getCardItem.quantity + 1
            : getCardItem.quantity - 1,
      })
    ).then((data) => {
      if (data.payload.success) {
        toast("Cart Item Updated");
      }
    });
  };
  return (
    <div className="flex items-center space-x-4 ml-2 mr-2">
      <img
        src={cartItem.image}
        alt={cartItem.title}
        className="w-20 h-20 rounded object-cover"
      />
      <div className="flex-1">
        <h3 className="font-extrabold">{cartItem.title}</h3>
        <div className="flex items-center mt-1 gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={() => handleUpdateQuantity(cartItem, "minus")}
            disabled={cartItem.quantity === 1}
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="font-semibold">{cartItem.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={() => handleUpdateQuantity(cartItem, "plus")}
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold">
          Rs{" "}
          <span>
            {(
              (cartItem.salePrice > 0 ? cartItem.salePrice : cartItem.price) *
              cartItem.quantity
            ).toFixed(2)}
          </span>
        </p>
        <Trash
          onClick={() => handleCartItemDelete(cartItem)}
          className="cursor-pointer mt-1"
          size={20}
        />
      </div>
    </div>
  );
};

export default UserCartItemsContent;
