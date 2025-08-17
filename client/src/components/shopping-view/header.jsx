import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/auth-slice/index";
import { Link, useNavigate } from "react-router-dom";
import { House, Menu, ShoppingCart, LogOut, UserCog } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { shoppingViewHeaderMenuItems } from "../../config";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import UserCartWrapper from "./cart-wrapper";
import { fetchCartItems } from "@/store/shop/cart-slice";
import { Label } from "../ui/label";

// ---------------- Menu Items ----------------
function MenuItems() {
  const navigate = useNavigate();

  function handleNavigate(getCurrentMenuItem) {
    sessionStorage.removeItem("filters");
    const currentFilter =
      getCurrentMenuItem.id !== "home"
        ? { category: [getCurrentMenuItem.id] }
        : null;
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(getCurrentMenuItem.path);
  }

  return (
    <nav className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-8 text-base font-medium text-muted-foreground">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Label
          key={menuItem.id}
          onClick={() => handleNavigate(menuItem)}
          className="transition-colors duration-200 hover:text-primary cursor-pointer"
        >
          {menuItem.label}
        </Label>
      ))}
    </nav>
  );
}

// ---------------- Header Right Content ----------------
function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/auth/login");
  };

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchCartItems({ userId: user._id }));
    }
  }, [dispatch, user]);

  return (
    <div className="flex items-center gap-6">
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button
          variant="outline"
          size="icon"
          className="relative group hover:bg-primary hover:text-white transition-colors"
          onClick={() => setOpenCartSheet(true)}
        >
          <ShoppingCart className="h-6 w-6" />
          <span className="sr-only">User Cart</span>
          <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full group-hover:scale-110 transition-transform duration-200 shadow-md">
            {cartItems?.items?.length || 0}
          </div>
        </Button>
        <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={cartItems?.items?.length ? cartItems.items : []}
        />
      </Sheet>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-primary hover:scale-105 transition-transform cursor-pointer">
            <AvatarFallback className="bg-primary text-white font-bold">
              {user?.username?.[0]?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56 shadow-lg rounded-xl">
          <DropdownMenuLabel className="text-base font-semibold text-primary">
            {user?.username || "User"}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => navigate("/shop/account")}
            className="cursor-pointer"
          >
            <UserCog className="w-4 h-4 mr-2" />
            Account
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleLogout}
            className="text-red-600 cursor-pointer hover:text-red-700"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

const ShoppingHeader = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm shadow-sm">
      <div className="flex items-center justify-between h-16 px-4 md:px-8">
        {/* Logo */}
        <Link
          to="/shop/home"
          className="flex items-center gap-2 text-xl sm:text-2xl font-bold text-primary hover:opacity-90 transition-opacity"
        >
          <House className="h-6 w-6" />
          <span className="hidden sm:inline">MarkShadows</span>
        </Link>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="lg:hidden" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Header Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full max-w-xs p-6" side="left">
            <div className="text-center">
              <h2 className="text-lg font-semibold mb-6 text-primary">Menu</h2>
              <MenuItems />
            </div>
            <div className="mt-8">
              {isAuthenticated && <HeaderRightContent />}
            </div>
          </SheetContent>
        </Sheet>

        {/* Desktop Menu */}
        <div className="hidden lg:flex lg:items-center lg:gap-10">
          <MenuItems />
          {isAuthenticated && <HeaderRightContent />}
        </div>
      </div>
    </header>
  );
};

export default ShoppingHeader;
