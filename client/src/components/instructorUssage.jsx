import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  TextField,
  Button,
} from "@mui/material";

// Sample data
const instructorData = [
	
  // Add more data as needed
];

const InstructorsTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleShowItems = (course) => {
    setSelectedCourse(course);
  };

  const clearSelectedCourse = () => {
    setSelectedCourse(null);
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Typography variant="h4">Intructors by Courses</Typography>
      <TextField
        id="search-box"
        placeholder="Search By Course"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Paper elevation={3} style={{ padding: "20px", marginBottom: "20px" }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Course</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {instructorData
                .filter(
                  (instructor) =>
                    instructor.COURSE_NAME.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .reduce((unique, instructor) => {
                  if (!unique.some((item) => item.COURSE_NAME === instructor.COURSE_NAME)) {
                    unique.push(instructor);
                  }
                  return unique;
                }, [])
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((instructor, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {`${instructor.INSTRUCTOR_LAST_NAME}, ${instructor.INSTRUCTOR_FIRST_NAME}`}
                    </TableCell>
                    <TableCell>{instructor.COURSE_NAME}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        onClick={() => handleShowItems(instructor.COURSE_NAME)}
                      >
                        Show Items
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={instructorData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {selectedCourse && (
        <Paper elevation={3} style={{ padding: "20px" }}>
          <Typography variant="h5">Items for {selectedCourse}</Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Item Name</TableCell>
                  <TableCell>Item Description</TableCell>
                  <TableCell>Time Added</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {instructorData
                  .filter((item) => item.COURSE_NAME === selectedCourse)
                  .map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.ITEM_NAME}</TableCell>
                      <TableCell style={{ maxHeight: "100px", overflowY: "auto" }}>

                      </TableCell>
                      <TableCell>{item.ITEM_ADDED_TIME}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button variant="contained" onClick={clearSelectedCourse}>
            Close
          </Button>
        </Paper>
      )}
    </Box>
  );
};

export default InstructorsTable;