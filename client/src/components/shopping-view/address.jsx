import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import CommonForm from "../common/form";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewAddress,
  deleteAddress,
  editAddress,
  fetchAllAddress,
} from "../../store/shop/address-slice/index";
import AddressCard from "./address-card";
import { toast } from "sonner";
const initialAddressFormData = {
  address: "",
  city: "",
  phone: "",
  pincode: "",
  notes: "",
};

const Address = () => {
  const [formData, setFormData] = useState(initialAddressFormData);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);

  function handleManageAddress(event) {

    if(addressList.length >= 3){
        toast.success(" You can add max 3 addresses", {
              style: {
                background: "red",
                color: "black",
              },
            });
            return;
    }
    currentEditedId !== null
      ? dispatch(
          editAddress({
            userId: user._id,
            addressId: currentEditedId,
            formData,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddress(user._id));
            setCurrentEditedId(null);
            setFormData(initialAddressFormData);
            toast.success("Address Updated Successfully", {
              style: {
                background: "green",
                color: "white",
              },
            });
          }
        })
      : dispatch(
          addNewAddress({
            ...formData,
            userId: user._id,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddress(user._id));
            setFormData(initialAddressFormData);
            toast.success("Address Added Successfully", {
              style: {
                background: "green",
                color: "white",
              },
            });
          }
        });
  }

  const isFormValid = () => {
    return ["address", "city", "phone", "pincode"].every(
      (key) => formData[key].trim() !== ""
    );
  };

  const handleEditAddress = (getCurrentAddress) => {
    setCurrentEditedId(getCurrentAddress?._id);
    setFormData({
      ...FormData,
      address: getCurrentAddress?.address,
      city: getCurrentAddress?.city,
      phone: getCurrentAddress?.phone,
      pincode: getCurrentAddress?.pincode,
      notes: getCurrentAddress?.notes,
    });
  };

  const handleDeleteAddress = (getCurrentAddress) => {
    dispatch(
      deleteAddress({
        userId: user._id,
        addressId: getCurrentAddress._id,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllAddress(user._id));
        toast.success("Address Delete Successfully", {
              style: {
                background: "green",
                color: "white",
              },
            });
      }
    });
  };

  useEffect(() => {
    dispatch(fetchAllAddress(user._id));
  }, [dispatch]);
  return (
    <Card>
      <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        {addressList && addressList.length > 0
          ? addressList.map((singleAddressItem) => (
              <AddressCard
                key={singleAddressItem._id}
                addressInfo={singleAddressItem}
                handleDeleteAddress={handleDeleteAddress}
                handleEditAddress={handleEditAddress}
              />
            ))
          : null}
      </div>
      <CardHeader>
        <CardTitle>
          {currentEditedId !== null ? "Edit Address" : "Add New Address"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={currentEditedId !== null ? "Edit" : "Add"}
          onSubmit={handleManageAddress}
          isBtnDisabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  );
};

export default Address;
