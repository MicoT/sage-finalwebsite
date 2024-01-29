import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  TablePagination,
  CircularProgress,
} from '@mui/material';

const StudentGradesTable = () => {
  const [grades, setGrades] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchGrades = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/grade');
        setGrades(response.data);
      } catch (error) {
        console.error('Error fetching grades', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGrades();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ padding: 3 }}>
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="grades table">
              <TableHead>
                <TableRow>
                  <TableCell>Last Name</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Course Name</TableCell>
                  <TableCell>Course Number</TableCell>
                  <TableCell>Course Code</TableCell>
                  <TableCell>Grade Type</TableCell>
                  <TableCell>Grade</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {grades
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((grade) => (
                    <TableRow key={grade._id}>
                      <TableCell>{grade.STUDENTLASTNAME}</TableCell>
                      <TableCell>{grade.STUDENTFIRSTNAME}</TableCell>
                      <TableCell>{grade.COURSENAME}</TableCell>
                      <TableCell>{grade.COURSENUMBER}</TableCell>
                      <TableCell>{grade.COURSECODE}</TableCell>
                      <TableCell>{grade.GRADETYPE}</TableCell>
                      <TableCell>{grade.GRADE}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={grades.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
    </Box>
  );
};

export default StudentGradesTable;
