import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TextField,
  Button,
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";

const CourseDataPage = () => {
  const [courseData, setCourseData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // State to store filtered data
  const [studentData, setStudentData] = useState([]); // State to store student data
  const [selectedCourseCode, setSelectedCourseCode] = useState(null); // State to store selected course code
  const [searchInput, setSearchInput] = useState(""); // State to store the search input
  const [loading, setLoading] = useState(true); // Loading status for course data
  const [loadingStudent, setLoadingStudent] = useState(false); // Loading status for student data
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchCourseData = async () => {
      setLoading(true); // Start loading
      try {
        const response = await axios.get("http://localhost:5000/api/coursedata");
        setCourseData(response.data);
        setFilteredData(response.data); // Initialize filtered data with all course data
        setLoading(false); // Data fetched, stop loading
      } catch (error) {
        console.error("Error fetching course data:", error);
        setLoading(false); // Error occurred, stop loading
      }
    };
    fetchCourseData();
  }, []);

  useEffect(() => {
    // Filter the course data when search input changes
    const filtered = courseData.filter(
      (course) =>
        course.Code.toLowerCase().includes(searchInput.toLowerCase()) ||
        course.Title.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredData(filtered);
    setPage(0); // Reset to first page after filtering
  }, [searchInput, courseData]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleShowStudents = async (courseCode) => {
    setSelectedCourseCode(courseCode); // Set the selected course code
    setLoadingStudent(true); // Start loading
    try {
      const response = await axios.get(`http://localhost:5000/api/grade-final/byCourseCode/${courseCode}`);
      setStudentData(response.data); // Set the student data for the selected course
      setLoadingStudent(false); // Data fetched, stop loading
    } catch (error) {
      console.error("Error fetching student data:", error);
      setLoadingStudent(false); // Error occurred, stop loading
    }
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <Typography variant="h4" m="20px">
        Grade Post Status
      </Typography>
      <Typography variant="h6" m="20px">
      This features presents the M1, M2, and M3 grades of CCIS students based on the course, term, and year level.
      </Typography>
      <TextField
        fullWidth
        label="Search by Code or Title"
        variant="outlined"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        sx={{ mb: 2 }}
      />
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <TableContainer sx={{ maxHeight: 500 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>Code</TableCell>
                  <TableCell>Section</TableCell>
                  <TableCell>Mode</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Instructor</TableCell>
                  <TableCell>Show Students</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((data) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={data._id}>
                      <TableCell>{data.Code}</TableCell>
                      <TableCell>{data.Sec}</TableCell>
                      <TableCell>{data.Mode}</TableCell>
                      <TableCell>{data.Title}</TableCell>
                      <TableCell>{data.Instructor}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleShowStudents(data.Code)}
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
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={filteredData.length} // Use filteredData length
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
      {selectedCourseCode && (
        loadingStudent ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer sx={{ maxHeight: 500, mt: 4 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>Student Name</TableCell>
                  <TableCell>Course Name</TableCell>
                  <TableCell>Course Code</TableCell>
                  <TableCell>Program</TableCell>
                  <TableCell>Year Level</TableCell>
                  <TableCell>Term</TableCell>
                  <TableCell>M1 Grade</TableCell>
                  <TableCell>M2 Grade</TableCell>
                  <TableCell>M3 Grade</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {studentData.map((student) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={student._id}>
                    <TableCell>{student.STUDENTNAME}</TableCell>
                    <TableCell>{student.COURSENAME}</TableCell>
                    <TableCell>{student.COURSECODE}</TableCell>
                    <TableCell>{student.PROGRAM}</TableCell>
                    <TableCell>{student.YEARLEVEL}</TableCell>
                    <TableCell>{student.TERM}</TableCell>
                    <TableCell>{student["M1 Grade"]}</TableCell>
                    <TableCell>{student["M2 Grade"]}</TableCell>
                    <TableCell>{student["M3 Grade"]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )
      )}
    </Paper>
  );
};

export default CourseDataPage;
