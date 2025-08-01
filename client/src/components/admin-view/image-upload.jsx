import React, { useEffect, useRef } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";

const ProductImageUpload = ({
  imageFile,
  setImageFile,
  uploadedImageUrl,
  setUploadedImageUrl,
  imageLoadingSate,
  setImageLoadingState,
  isEdited

}) => {
  const inputRef = useRef(null);
  const handleImageFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      setUploadedImageUrl(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };
  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files[0];
    if (file) {
      setImageFile(file);
      setUploadedImageUrl(URL.createObjectURL(file));
    }
  };
  const handleRemoveImage = () => {
    setImageFile(null);
    setUploadedImageUrl("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  async function uploadImageToCloudinary() {
    const data = new FormData();
    data.append("my_file", imageFile);
    const response = await axios.post(
      "http://localhost:3000/api/admin/products/upload-image",
      data
    );
    if(response) setUploadedImageUrl(response.data);
  } 

  useEffect(() => {
    if (imageFile !== null) uploadImageToCloudinary();
  }, [imageFile]);

  return (
    <div className="w-full max-w-md mx-auto mt-4">
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
      <div
        className={`${isEdited ? 'opacity-60' : ''}border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <Input
          id="image-upload"
          type="file"
          accept="image/*"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
          disabled={isEdited}
        />
        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className={`${isEdited ? 'cursor-not-allowed' : ""}flex flex-col item-center justify-center h-32 cursor-pointer`}
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span className="text-gray-500">
              Click or drag to upload an image
            </span>
            <span className="text-sm text-gray-400">
              Supported formats: JPG, PNG
            </span>
          </Label>
        ) : (
          imageLoadingSate ?
          <Skeleton className='h-10 bg-gray-100'/> :
          <div className="flex flex-col items-center justify-center">
            {uploadedImageUrl && (
              <label htmlFor="image-upload" className="cursor-pointer">
                <img
                  src={uploadedImageUrl}
                  alt="Preview"
                  className="w-32 h-32 object-contain mb-2 rounded border hover:opacity-80 transition"
                />
              </label>
            )}
            <div className="items-center flex">
              <FileIcon className="w-10 h-8 text-primary mr-2" />
            </div>
            <p className="text-sm font-medium">{imageFile.name}</p>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleRemoveImage}
            >
              <XIcon className="w-4 h-4 mr-2" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductImageUpload;
