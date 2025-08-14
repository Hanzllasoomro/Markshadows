import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import ProductFilter from "../../components/shopping-view/filter";
import React, { useEffect, useState } from "react";
import { ArrowUpDownIcon, FilterIcon } from "lucide-react";
import { sortOptions } from "../../config/index";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFilteredProducts } from "../../store/shop/products-slice";
import LoadingScreen from "../../components/common/LoadingScreen";
import ShoppingProductTile from "../../components/shopping-view/product-tile";
import { createSearchParams, useSearchParams } from "react-router-dom";
import ProductDetailsDialog from "../../components/shopping-view/product-details";
import { fetchProductDetails } from "../../store/shop/products-slice/index";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { toast } from "sonner";

const createSearchParamsHelper = (filterParams) => {
  const queryParams = [];
  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");

      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }
  return queryParams.join("&");
};

const ShoppingListing = () => {
  const dispatch = useDispatch();
  const { productList, isLoading, error, productDetails } = useSelector(
    (state) => state.shoppingProducts
  );

  const { user } = useSelector((state) => state.auth);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const handleSort = (value) => {
    setSort(value);
  };

  const handleFilter = (getSectionId, getCurrentOption) => {
    let cpyFilters = { ...filters };
    const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);
    if (indexOfCurrentSection === -1) {
      cpyFilters = {
        ...cpyFilters,
        [getSectionId]: [getCurrentOption],
      };
    } else {
      const currentSection = cpyFilters[getSectionId].indexOf(getCurrentOption);
      if (currentSection === -1) {
        cpyFilters[getSectionId].push(getCurrentOption);
      } else {
        cpyFilters[getSectionId].splice(currentSection, 1);
      }
    }
    setFilters(cpyFilters);
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
  };

  const handleGetProductDetails = (id) => {
    dispatch(fetchProductDetails(id));
  };

  const handleAddtoCart = (getCurrentProductId) => {
    dispatch(
      addToCart({
        userId: user._id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data.payload.success) {
        dispatch(fetchCartItems({ userId: user._id }));
        toast("product added to cart");
      }
    });
  };

  useEffect(() => {
    setSort("priceAsc");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
    dispatch(fetchAllFilteredProducts({ filters: {}, sort: "priceAsc" }));
  }, []);

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(createQueryString));
    } else {
      setSearchParams({});
    }
  }, [filters, setSearchParams]);

  useEffect(() => {
    if (filters !== null && sort !== null)
      dispatch(
        fetchAllFilteredProducts({ filterParams: filters, sortParams: sort })
      );
  }, [dispatch, sort, filters]);

  useEffect(() => {
    if (productDetails !== null) {
      setOpenDetailsDialog(true);
    }
  }, [productDetails]);

  return (
    <div className="w-full p-4 md:p-6">
      <div className="md:hidden flex justify-end mb-4">
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="flex items-center gap-2 text-sm font-medium bg-muted px-3 py-2 rounded-md"
        >
          <FilterIcon className="w-4 h-4" />
          Filters
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
        <div
          className={`transition-all duration-300 ${
            showMobileFilters ? "block" : "hidden"
          } md:block`}
        >
          <div className="md:sticky md:top-20 md:max-h-[calc(100vh-5rem)] overflow-y-auto">
            <ProductFilter filters={filters} handleFilter={handleFilter} />
          </div>
        </div>
        <div className="bg-background w-full rounded-lg shadow-sm">
          <div className="p-4 border-b flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <h2 className="text-lg font-extrabold">All Products</h2>
            <div className="flex items-center justify-between md:justify-end gap-3">
              <span className="text-muted-foreground text-sm">
                {productList?.length || 0} Products
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-1 border px-2 py-1 rounded-md text-sm">
                    <ArrowUpDownIcon className="h-4 w-4" />
                    <span>Sort By</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuRadioGroup
                    value={sort}
                    onValueChange={handleSort}
                  >
                    {sortOptions.map((sortItem) => (
                      <DropdownMenuRadioItem
                        key={sortItem.id}
                        value={sortItem.id}
                      >
                        {sortItem.label}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {isLoading ? (
              <div className="col-span-3 text-center">
                <LoadingScreen />
              </div>
            ) : error ? (
              <div className="col-span-3 text-red-500">{error}</div>
            ) : productList && productList.length > 0 ? (
              productList.map((productItem) => (
                <ShoppingProductTile
                  key={productItem._id}
                  product={productItem}
                  handleGetProductDetails={handleGetProductDetails}
                  handleAddtoCart={handleAddtoCart}
                />
              ))
            ) : (
              <div className="col-span-3 text-center text-muted-foreground">
                No products found.
              </div>
            )}
          </div>
        </div>
        <ProductDetailsDialog
          open={openDetailsDialog}
          setOpen={setOpenDetailsDialog}
          productDetails={productDetails}
        />
      </div>
    </div>
  );
};

export default ShoppingListing;
