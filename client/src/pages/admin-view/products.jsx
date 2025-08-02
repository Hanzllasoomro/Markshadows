import React, { Fragment, useState, useEffect } from "react";
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
import { addNewProduct, fetchAllProducts } from "@/store/admin-slice/products-slice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

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
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const {productList} = useSelector((state) => state.adminProducts);

  const dispatch = useDispatch();
  function onSubmit(event) {
    dispatch(addNewProduct({
      ...formData,
      image : uploadedImageUrl
    })).then((data) => {
      if (data.payload.success) {
        dispatch(fetchAllProducts());
        setFormData(initialFormData);
        setImageFile(null);
        setUploadedImageUrl("");
        setOpenCreateProductDialog(false);
        toast.success("Product added successfully!");
      }
    });
  }

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch, imageFile, uploadedImageUrl]);

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
            imageLoadingState = {imageLoadingState}
            setImageLoadingState = {setImageLoadingState}
          />
          <div className="py-6">
            <CommonForm
              formControls={addProductFormElements}
              formData={formData}
              setFormData={setFormData}
              buttonText="Add"
              onSubmit={(e) => onSubmit(e)}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default AdminProducts;
