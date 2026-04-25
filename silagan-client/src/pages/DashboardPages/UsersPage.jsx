import React from 'react';
import { Box, Typography, Stack, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const rawUsers = [
  { id: 1, fullName: 'Christopher Naval', birthdate: '1998-04-12', email: 'christopher.naval@example.com', dateRegistered: '2023-02-14' },
  { id: 2, fullName: 'Jonel Villaver', birthdate: '1996-09-30', email: 'jonel.villaver@example.com', dateRegistered: '2022-11-02' },
  { id: 3, fullName: 'Luis Ryan Sanisit', birthdate: '2000-01-21', email: 'luis.sanisit@example.com', dateRegistered: '2024-01-08' },
  { id: 4, fullName: 'Edrich Darren Santuyo', birthdate: '1999-07-16', email: 'edrich.santuyo@example.com', dateRegistered: '2021-06-25' },
  { id: 5, fullName: 'Vj Edgecombe', birthdate: '2001-12-02', email: 'vj.edgecombe@example.com', dateRegistered: '2024-08-19' },
];

const columns = [
  { field: 'fullName', headerName: 'Full Name', width: 240, sortable: true },
  {
    field: 'birthdate',
    headerName: 'Birthdate',
    width: 160,
    sortable: true,
    renderCell: (params) => {
      const v = params.value ?? params.row?.birthdate;
      if (!v) return '';
      const date = typeof v === 'string' ? new Date(v.includes('T') ? v : `${v}T00:00:00`) : new Date(v);
      return Number.isNaN(date.getTime()) ? '' : date.toLocaleDateString();
    },
  },
  { field: 'email', headerName: 'Email', width: 300, sortable: true },
  {
    field: 'dateRegistered',
    headerName: 'Date Registered',
    width: 180,
    sortable: true,
    renderCell: (params) => {
      const v = params.value ?? params.row?.dateRegistered;
      if (!v) return '';
      const date = typeof v === 'string' ? new Date(v.includes('T') ? v : `${v}T00:00:00`) : new Date(v);
      return Number.isNaN(date.getTime()) ? '' : date.toLocaleDateString();
    },
  },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 220,
    sortable: false,
    filterable: false,
    renderCell: (params) => {
      const onEdit = () => alert(`Edit user: ${params.row.fullName}`);
      const onDelete = () => alert(`Delete user: ${params.row.fullName}`);

      return (
        <Stack direction="row" spacing={0.5}>
          <IconButton size="small" color="primary" onClick={onEdit} aria-label="edit">
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" color="error" onClick={onDelete} aria-label="delete">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Stack>
      );
    },
  },
];

function UsersPage() {
  const rows = rawUsers.map((u) => ({ id: u.id, fullName: u.fullName, birthdate: u.birthdate, email: u.email, dateRegistered: u.dateRegistered }));

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Users
      </Typography>

      <Box sx={{ height: 520, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel: { pageSize: 5 } }, sorting: { sortModel: [{ field: 'fullName', sort: 'asc' }] } }}
          pageSizeOptions={[5, 10, 25]}
          disableRowSelectionOnClick
          density="comfortable"
        />
      </Box>
    </>
  );
}

export default UsersPage;