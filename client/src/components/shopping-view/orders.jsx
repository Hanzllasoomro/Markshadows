import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { Dialog } from "../ui/dialog";
import ShoppingOrderDetailsView from "./order-details";

const ShoppingOrders = () => {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Dummy data (replace with API later)
  const orders = [
    {
      id: "132456",
      date: "17/08/2025",
      status: "In Process",
      price: 10000,
      details: [
        { name: "Product One", price: 1000 },
        { name: "Product Two", price: 2000 },
      ],
      shipping: {
        name: "Hanzlla Soomro",
        address: "123 Street",
        city: "Karachi",
        pincode: "74000",
        phone: "0300-1234567",
        notes: "Deliver after 5 PM",
      },
    },
  ];

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setOpenDetailsDialog(true);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
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
                  <Dialog open={openDetailsDialog} onOpenChange={setOpenDetailsDialog}>
                    <Button onClick={() => handleViewDetails(order)}>View Details</Button>
                    {selectedOrder && <ShoppingOrderDetailsView order={selectedOrder} />}
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

export default ShoppingOrders;
