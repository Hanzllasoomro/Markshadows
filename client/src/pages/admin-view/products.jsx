import React, { Fragment, useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "../../components/ui/sheet";

import CommonForm from "@/components/common/form";
import { addProductFormElements } from "@/config";
import ProductImageUpload from "@/components/admin-view/image-upload";
import {
  addNewProduct,
  fetchAllProducts,
  editProduct,
} from "@/store/admin-slice/products-slice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import AdminProductTile from "./product-tile";

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
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const { productList } = useSelector((state) => state.adminProducts);

  const dispatch = useDispatch();
  function onSubmit(event) {
    currentEditedId !== null
      ? dispatch(
          editProduct({
            id: currentEditedId.toString(),
            formData
          })
        ).then((data) => {
          if (data.payload.success) {
            dispatch(fetchAllProducts());
            setFormData(initialFormData);
            setImageFile(null);
            setUploadedImageUrl("");
            setOpenCreateProductDialog(false);
            toast.success("Product updated successfully!");
          }
        })
      : dispatch(
          addNewProduct({
            ...formData,
            image: uploadedImageUrl,
          })
        ).then((data) => {
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {productList && productList.length > 0 ? (
          productList.map((productItem) => (
            <AdminProductTile
              key={productItem._id}
              product={productItem}
              setCurrentEditedId={setCurrentEditedId}
              setOpenCreateProductDialog={setOpenCreateProductDialog}
              setFormData={setFormData}
            />
          ))
        ) : (
          <div className="col-span-4 text-center text-gray-500">
            No products available.
          </div>
        )}
      </div>
      <Sheet
        open={openCreateProductDialog}
        onOpenChange={() => {
          setOpenCreateProductDialog(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent side="right" className="w-full max-w-md overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? "Edit Product" : "Add New Product"}
            </SheetTitle>
            <SheetDescription>
              Fill in the product details below and click "Add" to submit.
            </SheetDescription>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            imageLoadingState={imageLoadingState}
            setImageLoadingState={setImageLoadingState}
            isEdited={currentEditedId !== null}
          />
          <div className="py-6">
            <CommonForm
              formControls={addProductFormElements}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId !== null ? "Update" : "Add"}
              onSubmit={(e) => onSubmit(e)}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default AdminProducts;
