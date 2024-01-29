// StudentPerformanceTable.js
import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";

const StudentPerformanceTable = ({ students }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Student Name</TableCell>
            <TableCell>Module 1</TableCell>
            <TableCell>Module 2</TableCell>
            <TableCell>Module 3</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id}>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.modules[0].passingRate}%</TableCell>
              <TableCell>{student.modules[1].passingRate}%</TableCell>
              <TableCell>{student.modules[2].passingRate}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StudentPerformanceTable;
