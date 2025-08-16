import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { Dialog, DialogTrigger } from "../ui/dialog";
import AdminOrderDetailsView from "./orders-details";

const AdminOrdersView = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Mock data (replace with Redux / API call later)
  const orders = [
    { id: "132456", date: "17/8/2025", status: "In Process", price: 10000 },
    { id: "987654", date: "15/8/2025", status: "Delivered", price: 5500 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>Rs {order.price}</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button onClick={() => setSelectedOrder(order)}>
                        View Details
                      </Button>
                    </DialogTrigger>
                    {selectedOrder && <AdminOrderDetailsView order={selectedOrder} />}
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AdminOrdersView;
