import React from "react";
import bannerOne from "../../assets/360_F_465465254_1pN9MGrA831idD6zIBL7q8rnZZpUCQTy.jpg";
import bannerTwo from "../../assets/9670221.jpg";
import bannerThird from "../../assets/gettyimages-1296100096-1024x1024.jpg";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
const ShoppingHome = () => {
  const slides = [bannerOne, bannerTwo, bannerThird];
  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[600px] overflow-hidden">
        {slides.map((slide, index) => (
          <img
            src={slide}
            key={index}
            className="relative top-0 left-0 w-full h-full object-cover transition-opacity duration-1000"
          />
        ))}
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop By Category
          </h2>
        </div>
      </section>
    </div>
  );
};

export default ShoppingHome;
