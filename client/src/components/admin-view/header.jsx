import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../store/auth-slice/index';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { AlignJustify, LogOut } from 'lucide-react';

const AdminHeader = ({ setOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate('/auth/login');
  };

  return (
    <header className="h-16 w-full border-b px-4 flex items-center justify-between bg-background shadow-sm">
      <Button className="lg:hidden sm:block" onClick={() => setOpen(true)}>
        <AlignJustify className="h-5 w-5" />
        <span className='sr-only'>Toggle Menu</span>
      </Button>
      <div className="flex flex-1 justify-end">
        <Button 
        className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow" 
        onClick={handleLogout}>
          <LogOut className="h-5 w-5" />
          <span className='sr-only'>Logout</span>
        </Button>
      </div>
    </header>
  );
};

export default AdminHeader;
