import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useApiRequests from "../../hooks/useApiRequests";
import {
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Box,
} from "@mui/material";

const SingleTransaction = () => {
  const { id } = useParams(); // Get the ID from the URL
  const { getTransactionById } = useApiRequests();

  const [transaction, setTransaction] = useState<{
    id: number;
    totalAmount: string;
    details: {
      product: {
        name: string;
      };
      id: number;
      quantity: number;
      priceAtTimeOfSale: number;
      total: number; // Added total property for each product
    }[];
  } | null>(null);

  useEffect(() => {
    // Fetch the transaction from the backend API using the provided API function
    // Replace `api.getTransaction` with your actual API function
    // For example: api.getTransaction(id)
    const fetchTransaction = async () => {
      try {
        const transaction = await getTransactionById(id);
        console.log(transaction);
        // Update the state with the fetched transaction
        setTransaction(transaction);
      } catch (error) {
        // Handle error
        console.error(error);
      }
    };

    fetchTransaction();
  }, [id]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="start"
      height="100vh"
    >
      {/* This is a dynamic page */}
      {/* Add your transaction details rendering here */}
      {transaction && (
        <Box maxWidth="300px" width="90%" p={2} sx={{ textAlign: "center" }}>
          {/* Display the transaction details in a bill design */}
          <Typography variant="h4">تعاونية جابر</Typography>
          <Typography variant="body1">رقم العملية: {transaction.id}</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>المنتج</TableCell>
                <TableCell>الكمية</TableCell>
                <TableCell>السعر</TableCell>
                <TableCell>الإجمالي</TableCell> {/* Added total column */}
              </TableRow>
            </TableHead>
            <TableBody>
              {transaction?.details?.map((detail) => (
                <TableRow key={detail.id}>
                  <TableCell>{detail.product.name}</TableCell>
                  <TableCell>{detail.quantity}</TableCell>
                  <TableCell>${detail.priceAtTimeOfSale}</TableCell>
                  <TableCell>${detail.total}</TableCell>{" "}
                  {/* Added total column */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Typography
            variant="body1"
            mt="8px"
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <span>المبلغ الإجمالي:</span>
            <span>${transaction?.totalAmount}</span>
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default SingleTransaction;
