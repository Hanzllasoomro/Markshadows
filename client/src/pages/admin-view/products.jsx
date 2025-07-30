import React, { Fragment, useState } from "react";
import { Button } from "../../components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription
} from "../../components/ui/sheet";
import CommonForm from "@/components/common/form";
import { addProductFormElements } from "@/config";
import ProductImageUpload from "@/components/admin-view/image-upload";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  price: "",
  totalStock: "",
  brand: "",
  salePrice: "",
};

export const AdminProducts = () => {
  const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false);
  const [fromData, setFromData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  function onSubmit() {
    console.log("Form submitted with data: ", fromData);
    setOpenCreateProductDialog(false);
  }

  return (
    <Fragment>
      <div className="w-full mb-5 flex justify-end">
        <Button
          className="btn btn-primary"
          onClick={() => {
            setOpenCreateProductDialog(true);
          }}
        >
          Add Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 ">
        Product List
      </div>
      <Sheet
        open={openCreateProductDialog}
        onOpenChange={() => {
          setOpenCreateProductDialog(false);
        }}
      >
        <SheetContent side="right" className="w-full max-w-md overflow-auto">
          <SheetHeader>
            <SheetTitle>Add New Product</SheetTitle>
            <SheetDescription>
              Fill in the product details below and click "Add" to submit.
            </SheetDescription>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
          />
          <div className="py-6">
            <CommonForm
              formControls={addProductFormElements}
              formData={fromData}
              setFormData={setFromData}
              buttonText="Add"
              onSubmit={onSubmit}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default AdminProducts;
