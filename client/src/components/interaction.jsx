import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";

const StudentActivityPage = () => {
  // Simulated data for student activity
  const studentActivityData = [
  ];

  // State to store the student activity data
  const [activityData, setActivityData] = useState([]);

  useEffect(() => {
    // In a real application, you would fetch student activity data from an API and update the state.
    // For now, we're using the simulated data.
    setActivityData(studentActivityData);
  }, []);

  return (
    <Box m="1.5rem 2.5rem">
      <Typography variant="h4">Student Activity</Typography>
      {/* Section for A222 students */}
      <Typography variant="h6">Section A222</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student Name</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Content Accessed</TableCell>
              <TableCell>Time Spent</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activityData
              .filter((activity) => activity.section === "A222")
              .map((activity, index) => (
                <TableRow key={index}>
                  <TableCell>{activity.studentName}</TableCell>
                  <TableCell>{activity.subject}</TableCell>
                  <TableCell>{activity.content}</TableCell>
                  <TableCell>{activity.timeSpent}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Section for A422 students */}
      <Typography variant="h6">Section A422</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student Name</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Content Accessed</TableCell>
              <TableCell>Time Spent</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activityData
              .filter((activity) => activity.section === "A422")
              .map((activity, index) => (
                <TableRow key={index}>
                  <TableCell>{activity.studentName}</TableCell>
                  <TableCell>{activity.subject}</TableCell>
                  <TableCell>{activity.content}</TableCell>
                  <TableCell>{activity.timeSpent}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default StudentActivityPage;
