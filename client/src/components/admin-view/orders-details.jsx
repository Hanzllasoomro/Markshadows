import React from "react";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import CommonForm from "../common/form";
import { useState } from "react";

const initialFormData = {
  status: "",
};

const AdminOrderDetailsView = ({ order }) => {
  if (!order) return null;
  const [formData, setFormData] = useState(initialFormData);
const handleUpdateStatus = (event) =>{

}

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
                <li className="flex items-center justify-between">
                  <span>Product One</span>
                  <span>Rs 1000</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <div className="font-medium">Shipping Info</div>
              <div className="grid gap-0.5 text-muted-foreground">
                <span>Hanzlla Soomro</span>
                <span>Address</span>
                <span>City</span>
                <span>Pincode</span>
                <span>Phone</span>
                <span>Notes</span>
              </div>
            </div>
          </div>
          <div>
            <CommonForm
              formControls={[
                {
                  label: "Order Status",
                  name: "status",
                  componentType: "select",
                  options: [
                    { id: "pending", label: "Pending" },
                    { id: "inProcess", label: "In Process" },
                    { id: "inShipping", label: "In Shipping" },
                    { id: "delivered", label: "Delivered" },
                    { id: "rejected", label: "Rejected" },
                  ],
                },
              ]}
              formData={formData}
              setFormData={setFormData}
              buttonText={'Update Order Status'}
              onSubmit={handleUpdateStatus}
            />
          </div>
        </div>
      </div>
    </DialogContent>
  );
};

export default AdminOrderDetailsView;
