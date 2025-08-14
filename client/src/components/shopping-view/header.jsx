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

function MenuItems() {
  return (
    <nav className="flex flex-col gap-4 mb-3 lg:mb-0 lg:flex-row lg:items-center lg:gap-6 text-lg font-medium">
      {shoppingViewHeaderMenuItems.map((item) => (
        <Link
          key={item.id}
          to={item.path}
          className="transition-colors duration-200 text-muted-foreground hover:text-primary"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

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
    dispatch(fetchCartItems({ userId: user._id }));
  }, [dispatch, user]);

  return (
    <div className="flex items-center gap-4">
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button
          variant="outline"
          size="icon"
          className="relative group"
          onClick={() => setOpenCartSheet(true)}
        >
          <ShoppingCart className="h-6 w-6" />
          <span className="sr-only">User Cart</span>
          <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full group-hover:scale-110 transition-transform duration-150">
            {cartItems?.items?.length || 0}
          </div>
        </Button>
        <UserCartWrapper
          cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }
        />
      </Sheet>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black">
            <AvatarFallback className="bg-black text-white font-extrabold">
              {user?.username?.[0].toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuLabel>{user?.username || "User"}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate("/shop/account")}>
            <UserCog className="w-4 h-4 mr-2" />
            Account
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout}>
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
    <header className="sticky top-0 z-40 w-full border-b bg-background shadow-sm">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        <Link
          to="/shop/home"
          className="flex items-center gap-2 text-2xl font-bold text-primary"
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
          <SheetContent className="w-full max-w-xs" side="left">
            <div className="py-6 px-4">
              <h2 className="text-lg font-semibold mb-4 text-primary">Menu</h2>
              <MenuItems />
            </div>
            <HeaderRightContent />
          </SheetContent>
        </Sheet>

        <div className="hidden lg:flex lg:items-center lg:gap-6">
          <MenuItems />
          {isAuthenticated && <HeaderRightContent />}
        </div>
      </div>
    </header>
  );
};

export default ShoppingHeader;
