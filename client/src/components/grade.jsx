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
  CircularProgress,
  TextField,
} from "@mui/material";

const professorData = [
  
];

const ProfessorSubmissionPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredProfessors = professorData.filter(
    (professor) =>
      professor.INSTRUCTOR_FIRST_NAME.toLowerCase().includes(searchQuery.toLowerCase()) ||
      professor.INSTRUCTOR_LAST_NAME.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const professorDataCombined = filteredProfessors.reduce((acc, curr) => {
    const existingProf = acc.find(
      (prof) => prof.name === `${curr.INSTRUCTOR_FIRST_NAME} ${curr.INSTRUCTOR_LAST_NAME}`
    );
    const isSubmitted = Math.random() < 0.5;

    if (existingProf) {
      existingProf.subjects.push({ subject: curr.COURSE_NAME, submitted: isSubmitted });
    } else {
      acc.push({
        name: `${curr.INSTRUCTOR_FIRST_NAME} ${curr.INSTRUCTOR_LAST_NAME}`,
        subjects: [{ subject: curr.COURSE_NAME, submitted: isSubmitted }],
      });
    }
    return acc;
  }, []);

  return (
    <Box m="1.5rem 2.5rem">
      <Typography variant="h4">Professor Submission Status</Typography>
      <TextField
        id="search"
        label="Search by Name"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: "20px" }}
      />
      <Paper elevation={3} style={{ padding: "20px", marginBottom: "20px" }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Professor Name</TableCell>
                <TableCell>Subjects</TableCell>
                <TableCell>Submission Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {professorDataCombined.map((professor, index) => (
                <TableRow key={index}>
                  <TableCell>{professor.name}</TableCell>
                  <TableCell>
                    <ul>
                      {professor.subjects.map((subject, subIndex) => (
                        <li key={subIndex}>
                          {subject.subject}
                          {subject.submitted ? (
                            <span style={{ color: "green", marginLeft: "10px" }}>
                              Submitted
                            </span>
                          ) : (
                            <span style={{ color: "red", marginLeft: "10px" }}>
                              Not Submitted
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </TableCell>
                  <TableCell>
                    {professor.subjects.every((subject) => subject.submitted) ? (
                      <CircularProgress style={{ color: "green" }} />
                    ) : (
                      <CircularProgress style={{ color: "red" }} />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default ProfessorSubmissionPage;
