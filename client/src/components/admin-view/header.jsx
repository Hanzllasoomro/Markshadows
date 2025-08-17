import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/auth-slice/index";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { AlignJustify, LogOut } from "lucide-react";

const AdminHeader = ({ setOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/auth/login");
  };

  return (
    <header className="sticky top-0 z-40 h-16 w-full border-b bg-background/80 backdrop-blur-sm shadow-sm flex items-center justify-between px-4 md:px-8">
      <Button
        variant="outline"
        size="icon"
        className="lg:hidden hover:bg-primary hover:text-white transition-colors"
        onClick={() => setOpen(true)}
      >
        <AlignJustify className="h-6 w-6" />
        <span className="sr-only">Toggle Menu</span>
      </Button>

      <div className="flex flex-1 justify-end items-center gap-4">
        {user?.username && (
          <span className="hidden sm:inline text-sm font-medium text-muted-foreground">
            Hi,{" "}
            <span className="text-primary font-semibold">{user.username}</span>
          </span>
        )}

        <Button
          variant="outline"
          className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium hover:bg-red-500 hover:text-white transition-colors shadow-sm"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </Button>
      </div>
    </header>
  );
};

export default AdminHeader;
