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
  TextField,
  Box,
  Button,
  TablePagination,
  CircularProgress
} from '@mui/material';

const InstructorTable = () => {
  const [instructors, setInstructors] = useState([]);
  const [grades, setGrades] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchCourseName, setSearchCourseName] = useState('');
  const [searchCourseCode, setSearchCourseCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedCourseNumber, setSelectedCourseNumber] = useState('');

  useEffect(() => {
    const fetchInstructors = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/instructors');
        setInstructors(response.data);
      } catch (error) {
        console.error('Error fetching instructors', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchInstructors();
  }, []);

  const handleShowStudents = async (courseNumber) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/grade/`);
      setGrades(response.data);
      setSelectedCourseNumber(courseNumber);
    } catch (error) {
      console.error('Error fetching grades', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <TextField label="Search by Instructor's Name" variant="outlined" onChange={(e) => setSearchName(e.target.value)} sx={{ margin: 1 }} />
      <TextField label="Search by Course Name" variant="outlined" onChange={(e) => setSearchCourseName(e.target.value)} sx={{ margin: 1 }} />
      <TextField label="Search by Course Code" variant="outlined" onChange={(e) => setSearchCourseCode(e.target.value)} sx={{ margin: 1 }} />
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="instructor table">
              <TableHead>
                <TableRow>
                  <TableCell>Last Name</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Course Name</TableCell>
                  <TableCell>Course Number</TableCell>
                  <TableCell>Course Code</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {instructors
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((instructor) => (
                    <TableRow key={instructor._id}>
                      <TableCell>{instructor.LAST_NAME}</TableCell>
                      <TableCell>{instructor.FIRST_NAME}</TableCell>
                      <TableCell>{instructor.COURSENAME}</TableCell>
                      <TableCell>{instructor.COURSENUMBER}</TableCell>
                      <TableCell>{instructor.COURSECODE}</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleShowStudents(instructor.COURSENUMBER)}
                        >
                          Show Students
                        </Button>
                      </TableCell>
                    </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={instructors.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
      {selectedCourseNumber && (
        <>
          <Box mt={4}>
            <h2>Students in Course Number: {selectedCourseNumber}</h2>
          </Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="grades table">
              <TableHead>
                <TableRow>
                  <TableCell>Last Name</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Course Name</TableCell>
                  <TableCell>Course Number</TableCell>
                  <TableCell>Grade Type</TableCell>
                  <TableCell>Grade</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {grades.map((grade) => (
                  <TableRow key={grade._id}>
                    <TableCell>{grade.STUDENTLASTNAME}</TableCell>
                    <TableCell>{grade.STUDENTFIRSTNAME}</TableCell>
                    <TableCell>{grade.COURSENAME}</TableCell>
                    <TableCell>{grade.COURSENUMBER}</TableCell>
                    <TableCell>{grade.GRADETYPE}</TableCell>
                    <TableCell>{grade.GRADE}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Box>
  );
};

export default InstructorTable;
