import React from "react";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

const ShoppingOrderDetailsView = ({ order }) => {
  if (!order) return null;

  return (
    <DialogContent className="sm:max-w-[600px]">
      <div className="grid gap-6 mt-5">
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <p className="font-medium">Order ID</p>
            <Label>{order.id}</Label>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-medium">Date</p>
            <Label>{order.date}</Label>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-medium">Status</p>
            <Label>{order.status}</Label>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-medium">Total Price</p>
            <Label>Rs {order.price}</Label>
          </div>

          <Separator />
          <div className="grid gap-4">
            <div className="grid gap-2">
              <div className="font-medium">Order Details</div>
              <ul className="grid gap-3">
                {order.details.map((item, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <span>{item.name}</span>
                    <span>Rs {item.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="grid gap-2">
              <div className="font-medium">Shipping Info</div>
              <div className="grid gap-0.5 text-muted-foreground">
                <span>{order.shipping.name}</span>
                <span>{order.shipping.address}</span>
                <span>{order.shipping.city}</span>
                <span>{order.shipping.pincode}</span>
                <span>{order.shipping.phone}</span>
                <span>{order.shipping.notes}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
};

export default ShoppingOrderDetailsView;
