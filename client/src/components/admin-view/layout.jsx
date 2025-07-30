import React, { Suspense, useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './sidebar';
import AdminHeader from './header';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 text-red-600 space-y-2">
          <p>Something went wrong in this section.</p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="text-sm text-blue-600 underline"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const AdminLayout = () => {

  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="flex min-h-screen w-full">
      <AdminSidebar open={openSidebar} setOpen={setOpenSidebar} />
      <div className="flex flex-1 flex-col">
        <AdminHeader setOpen={setOpenSidebar} />
        <main className="flex flex-1 bg-muted/40 p-4 md:p-6">
          <ErrorBoundary>
            <Suspense fallback={<div className="p-4">Loading...</div>}>
              <Outlet />
            </Suspense>
          </ErrorBoundary>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
