import React, { useState, useEffect } from 'react';
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import { User } from '../types/User';
import { useNavigate } from 'react-router-dom';
import DepartmentList from './DepartmentList';
import { Button, Box, Typography } from '@mui/material';

const DataPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({ page: 0, pageSize: 5 });
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/');
      alert('Please enter your details before accessing this page.');
    } else {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => {
          setUsers(data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  }, [navigate]);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'username', headerName: 'Username', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'phone', headerName: 'Phone', width: 200 },
    { field: 'website', headerName: 'Website', width: 200 },
  ];

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
        padding: 3,
        bgcolor: '#f5f5f5',
        borderRadius: 2,
        boxShadow: 3,
        mt: 5,
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
        Data Page
      </Typography>
      <Box
        sx={{
          height: 400,
          width: '100%',
          maxWidth: '800px',
          mt: 2,
          bgcolor: 'white',
          borderRadius: 2,
          boxShadow: 1,
          padding: 2,
        }}
      >
        <DataGrid
          rows={users}
          columns={columns}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5, page: 0 },
            },
          }}
          pageSizeOptions={[5, 10]}
          isRowSelectable={() => false}
          hideFooterSelectedRowCount
        />
      </Box>
      <Box sx={{ width: '100%', maxWidth: '800px', mt: 3 }}>
        <DepartmentList />
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={handleGoHome}
        sx={{ mt: 3, bgcolor: '#1976d2', '&:hover': { bgcolor: '#115293' } }}
      >
        Go Home
      </Button>
    </Box>
  );
};

export default DataPage;
