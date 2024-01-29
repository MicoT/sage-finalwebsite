import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';


const ProfessorTable = () => {
  const [data] = useState([
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInstructor, setSelectedInstructor] = useState(null);

  const filteredData = data.filter(
    (professor) =>
      professor.INSTRUCTOR_LAST_NAME.toLowerCase().includes(searchTerm.toLowerCase()) ||
      professor.INSTRUCTOR_FIRST_NAME.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const uniqueInstructors = Array.from(
    new Set(filteredData.map((professor) => professor.INSTRUCTOR_FIRST_NAME + professor.INSTRUCTOR_LAST_NAME))
  ).map((instructorName) => ({
    name: instructorName,
    courses: filteredData
      .filter(
        (professor) =>
          professor.INSTRUCTOR_FIRST_NAME + professor.INSTRUCTOR_LAST_NAME === instructorName
      )
      .map((professor) => professor.COURSE_NAME),
  }));

  const handleShowCourses = (instructor) => {
    setSelectedInstructor(instructor);
  };

  const handleCloseDialog = () => {
    setSelectedInstructor(null);
  };

  return (
    <div>
      <h1>Professor Table</h1>
      <TextField
        label="Search for a professor"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ marginBottom: '1rem' }}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Instructor Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {uniqueInstructors.slice(0, 10).map((instructor, index) => (
              <TableRow key={index}>
                <TableCell>{instructor.name}</TableCell>
                <TableCell>
                  <Button variant="outlined" onClick={() => handleShowCourses(instructor)}>
                    Show Courses
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={selectedInstructor !== null} onClose={handleCloseDialog} fullWidth>
        <DialogTitle>{`Courses for ${selectedInstructor ? selectedInstructor.name : ''}`}</DialogTitle>
        <DialogContent>
          {selectedInstructor &&
            selectedInstructor.courses.map((course, index) => (
              <div key={index}>{course}</div>
            ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProfessorTable;
