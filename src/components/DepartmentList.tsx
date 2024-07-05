import React, { useState } from 'react';
import { Box, List, ListItem, ListItemText, Checkbox, IconButton, Typography } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Department } from '../types/User';
import departmentsData from '../data/departments.json';

const DepartmentList: React.FC = () => {
  const [openDepartments, setOpenDepartments] = useState<string[]>([]);
  const [selectedDepartments, setSelectedDepartments] = useState<{ [key: string]: string[] }>({});

  const handleToggle = (department: string) => {
    setOpenDepartments(openDepartments.includes(department)
      ? openDepartments.filter(dep => dep !== department)
      : [...openDepartments, department]);
  };

  const handleSelectDepartment = (department: string) => {
    const allSubDepartments = departmentsData.find(dep => dep.department === department)?.sub_departments || [];
    setSelectedDepartments(prevState => ({
      ...prevState,
      [department]: prevState[department]?.length === allSubDepartments.length ? [] : allSubDepartments
    }));
  };

  const handleSelectSubDepartment = (department: string, subDepartment: string) => {
    setSelectedDepartments(prevState => {
      const selectedSubDepartments = prevState[department] || [];
      const newSelectedSubDepartments = selectedSubDepartments.includes(subDepartment)
        ? selectedSubDepartments.filter(sub => sub !== subDepartment)
        : [...selectedSubDepartments, subDepartment];

      return {
        ...prevState,
        [department]: newSelectedSubDepartments
      };
    });
  };

  const isAllSubDepartmentsSelected = (department: string) => {
    const allSubDepartments = departmentsData.find(dep => dep.department === department)?.sub_departments || [];
    return selectedDepartments[department]?.length === allSubDepartments.length;
  };

  return (
    <Box
      sx={{
        width: '100%',
        bgcolor: 'background.paper',
        borderRadius: 1,
        boxShadow: 1,
        mt: 3,
      }}
    >
      <Typography variant="h6" sx={{ padding: 2, bgcolor: '#1976d2', color: 'white', borderRadius: '4px 4px 0 0' }}>
        Department List
      </Typography>
      <List>
        {departmentsData.map((department: Department) => (
          <div key={department.department}>
            <ListItem sx={{ borderBottom: '1px solid #e0e0e0' }}>
              <Checkbox
                edge="start"
                checked={isAllSubDepartmentsSelected(department.department)}
                onChange={() => handleSelectDepartment(department.department)}
              />
              <ListItemText
                primary={`${department.department} (${department.sub_departments.length})`}
              />
              <IconButton onClick={() => handleToggle(department.department)}>
                {openDepartments.includes(department.department) ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            </ListItem>
            {openDepartments.includes(department.department) && (
              <List component="div" disablePadding>
                {department.sub_departments.map((subDepartment: string) => (
                  <ListItem key={subDepartment} sx={{ pl: 4, borderBottom: '1px solid #e0e0e0' }}>
                    <Checkbox
                      edge="start"
                      checked={selectedDepartments[department.department]?.includes(subDepartment)}
                      onChange={() => handleSelectSubDepartment(department.department, subDepartment)}
                    />
                    <ListItemText primary={subDepartment} />
                  </ListItem>
                ))}
              </List>
            )}
          </div>
        ))}
      </List>
    </Box>
  );
};

export default DepartmentList;
