// src/components/UsersTable.tsx
import React from 'react';
import { Box, Avatar, TextField } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

type User = { id: number; name: string; email: string; avatar: string };

const makeUsers = (n: number) =>
  Array.from({ length: n }).map((_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    avatar: '/avatar.png'
  }));

const ALL = makeUsers(123);

const UsersTable: React.FC = () => {
  const [rows, setRows] = React.useState<User[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);
  const [rowCount, setRowCount] = React.useState(ALL.length);
  const [search, setSearch] = React.useState('');

  React.useEffect(() => {
    let active = true;
    const fetchData = async () => {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 350)); // simulate network
      const filtered = ALL.filter(
        (u) => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
      );
      setRowCount(filtered.length);
      const slice = filtered.slice(page * pageSize, page * pageSize + pageSize);
      if (!active) return;
      setRows(slice);
      setLoading(false);
    };
    fetchData();
    return () => {
      active = false;
    };
  }, [page, pageSize, search]);

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'User',
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar src={(params.row as any).avatar} />
          <div>{params.value}</div>
        </Box>
      )
    },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'id', headerName: 'ID', width: 90, align: 'right', headerAlign: 'right' }
  ];

  return (
    <Box>
      <Box sx={{ mb: 2, maxWidth: 560 }}>
        <TextField
          fullWidth
          placeholder="Search users..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(0);
          }}
        />
      </Box>

      <div style={{ height: 520, width: '100%' }}>
        <DataGrid
            rows={rows}
            columns={columns}
            loading={loading}
            rowCount={rowCount}
            paginationMode="server"
            paginationModel={{ page, pageSize }}
            onPaginationModelChange={(model) => {
            setPage(model.page);
            setPageSize(model.pageSize);
            }}
          sx={{
            borderRadius: 2,
            '& .MuiDataGrid-columnHeaders': {
              borderBottom: 1,
              borderColor: 'divider'
            }
          }}
        />
      </div>
    </Box>
  );
};

export default UsersTable;