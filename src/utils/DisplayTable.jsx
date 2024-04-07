import React, { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  styled,
  Typography,
} from "@mui/material";
import CustomPagination from "../utils/CustomPagination";
import { CircularProgress } from "@mui/material";
import { SignalCellularNodata } from "@mui/icons-material";

const CustomPaper = styled(Paper)(({ theme }) => ({
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    width: "10px",
  },
  "&::-webkit-scrollbar-track": {
    background: "#f1f1f1",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#888",
    borderRadius: "5px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "#555",
  },
}));

const DisplayTable = ({ data, onRowClick, page, setPage, totalDataLength, excluded=[] }) => {
  let keys = [];
  if (data && data.length > 0) keys = Object.keys(data[0]);

  // Filter out excluded keys
  keys = keys.filter(key => !excluded.includes(key));

  const [rowsPerPage, setRowsPerPage] = useState(0);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data.length - (page - 1) * rowsPerPage);

  return (
    <Box display="flex" flexDirection="column">
      <TableContainer
        component={CustomPaper}
        elevation={3}
        style={{ flex: 1 }}
        sx={{ maxHeight: "60vh", minHeight: "60vh" }}
      >
        <Table>
          <TableHead
            sx={{
              position: "sticky",
              top: 0,
              backgroundColor: "#333",
              zIndex: 1,
            }}
          >
            <TableRow>
              {keys.map((key) => (
                <TableCell key={key} sx={{ color: "#fff" }}>
                  {key}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 ? (
              data.map((row, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  onClick={() => onRowClick(row)}
                  sx={{
                    "&:nth-of-type(odd)": {
                      backgroundColor: "#f2f2f2",
                      cursor: "pointer",
                    },
                    cursor: "pointer",
                  }}
                >
                  {Object.keys(row)
                    .filter(key => !excluded.includes(key))
                    .map((key, cellIndex) => (
                      <TableCell key={cellIndex}>{row[key] ? row[key] : "No Action" }</TableCell>
                    ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={keys.length} align="center">
                  <Typography variant="body1" color="textSecondary">
                    No Data Available
                  </Typography>
                  <SignalCellularNodata fontSize="large" color="disabled" />
                </TableCell>
              </TableRow>
            )}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={keys.length} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        textAlign="center"
        p={2}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <CustomPagination
          count={Math.ceil(totalDataLength)}
          page={page}
          onPageChange={handleChangePage}
        />
      </Box>
    </Box>
  );
};

export default DisplayTable;
