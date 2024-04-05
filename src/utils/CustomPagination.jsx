import React from 'react';
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const CustomPagination = ({ count, page, onPageChange }) => {
  const handleChange = (event, newPage) => {
    onPageChange(newPage);
  };

  return (
    <Stack spacing={2}>
      <Pagination
        count={count}
        page={page}
        onChange={handleChange}
        color="secondary"
      />
    </Stack>
  );
};

export default CustomPagination;
