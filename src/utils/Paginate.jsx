import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationRounded({paginationLength}) {
  return (
    <Stack spacing={2}>
      <Pagination count={paginationLength || 10} variant="outlined" shape="rounded" color='success' />
    </Stack>
  );
}