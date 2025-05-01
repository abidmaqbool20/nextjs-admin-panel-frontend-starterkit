"use client"

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import PageHeader from "../components/page-header";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button"; // for pagination buttons

export default function Page() {
  const data = [
    { invoice: "INV001", status: "Paid", method: "Credit Card", amount: 250.0 },
    { invoice: "INV002", status: "Pending", method: "PayPal", amount: 120.5 },
    { invoice: "INV003", status: "Paid", method: "Bank Transfer", amount: 320.75 },
    { invoice: "INV004", status: "Overdue", method: "Credit Card", amount: 80.0 },
    { invoice: "INV005", status: "Paid", method: "PayPal", amount: 500.0 },
    { invoice: "INV006", status: "Pending", method: "Credit Card", amount: 150.25 },
    { invoice: "INV007", status: "Paid", method: "Bank Transfer", amount: 270.0 },
    { invoice: "INV008", status: "Overdue", method: "PayPal", amount: 60.0 },
    { invoice: "INV009", status: "Paid", method: "Credit Card", amount: 310.0 },
    { invoice: "INV010", status: "Pending", method: "Bank Transfer", amount: 200.0 },
  ];

  const [sortField, setSortField] = useState("invoice");
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 5;

  const handleSort = (field) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const renderSortIcon = (field) => {
    if (field !== sortField) return null;
    return sortDirection === "asc" ? " ↑" : " ↓";
  };

  const sortedData = [...data].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortDirection === "asc" ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const paginatedData = sortedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <>
      <div>
        <div className="p-4">
          <PageHeader  />
        </div>
        <div className="grid gap-4 w-full ">
          <Card className="w-full py-0 rounded-none">
            <CardContent className="p-0">
              <Table className="w-full">
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead
                      onClick={() => handleSort("invoice")}
                      className="cursor-pointer bg-[var(--primary)] text-white border-b"
                    >
                      Invoice{renderSortIcon("invoice")}
                    </TableHead>
                    <TableHead
                      onClick={() => handleSort("status")}
                      className="cursor-pointer bg-[var(--primary)] text-white border-b"
                    >
                      Status{renderSortIcon("status")}
                    </TableHead>
                    <TableHead
                      onClick={() => handleSort("method")}
                      className="cursor-pointer bg-[var(--primary)] text-white border-b"
                    >
                      Method{renderSortIcon("method")}
                    </TableHead>
                    <TableHead
                      onClick={() => handleSort("amount")}
                      className="text-right cursor-pointer bg-[var(--primary)] text-white border-b"
                    >
                      Amount{renderSortIcon("amount")}
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {paginatedData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.invoice}</TableCell>
                      <TableCell>{row.status}</TableCell>
                      <TableCell>{row.method}</TableCell>
                      <TableCell className="text-right">${row.amount.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination Buttons */}
              <div className="flex flex-col p-3 items-center mt-4 md:flex-row md:justify-end md:space-x-2">
                <Button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  variant="outline"
                  className="border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white"
                >
                  Previous
                </Button>
                <span className="text-sm mt-2 md:mt-0">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  variant="outline"
                  className="border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white"
                >
                  Next
                </Button>
              </div>


            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
