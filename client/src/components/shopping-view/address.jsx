import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import CommonForm from "../common/form";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewAddress,
  deleteAddress,
  fetchAllAddress,
} from "../../store/shop/address-slice/index";
import AddressCard from "./address-card";
import { data } from "react-router-dom";
const initialAddressFormData = {
  address: "",
  city: "",
  phone: "",
  pincode: "",
  notes: "",
};

const Address = () => {
  const [formData, setFormData] = useState(initialAddressFormData);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);
  function handleManageAddress(event) {
    dispatch(
      addNewAddress({
        ...formData,
        userId: user._id,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllAddress(user._id));
        setFormData(initialAddressFormData);
      }
    });
  }

  const isFormValid = () => {
    return ["address", "city", "phone", "pincode"].every(
      (key) => formData[key].trim() !== ""
    );
  };

  const handleDeleteAddress = (getCurrentAddress) =>{
    dispatch(deleteAddress({
        userId : user._id,
        addressId : getCurrentAddress._id
    })).then(data =>{
        if(data?.payload?.success){
            dispatch(fetchAllAddress(user._id));
        }
    })
  }


  useEffect(() => {
    dispatch(fetchAllAddress(user.id));
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
              />
            ))
          : null}
      </div>
      <CardHeader>
        <CardTitle>Add New Address</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={"Add"}
          onSubmit={handleManageAddress}
          isBtnDisabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  );
};

export default Address;
