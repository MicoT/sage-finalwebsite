import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Card,
  CardContent,
  CardHeader,
  Autocomplete,
} from "@mui/material";

const PassingRatePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");

  // Sample data
  const data = [
  ];

  const sanitizeText = (text) => {
    // Remove symbols and convert to lowercase
    return text.replace(/[^\w\s]/g, "").toLowerCase();
  };

  const allCourses = data.map((course) => course.COURSE_NAME);

  const filteredCourses = allCourses
    .filter((course) =>
      sanitizeText(course).includes(sanitizeText(searchTerm))
    )
    .slice(0, 1);

  const handleCourseChange = (_, value) => {
    setSelectedCourse(value);
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Typography variant="h4">Passing Rates</Typography>

      <Autocomplete
        options={allCourses}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search Course"
            variant="outlined"
            fullWidth
            margin="normal"
          />
        )}
        value={selectedCourse}
        onChange={handleCourseChange}
      />

      <Box display="flex" justifyContent="space-between">
        {[2021, 2022, 2023].map((year) => (
          <Card
            key={year}
            style={{
              width: "30%",
              margin: "0.5rem",
              visibility: selectedCourse ? "visible" : "hidden",
            }}
          >
            <CardHeader title={`Year ${year}`} />
            <CardContent>
              {data
                .filter((course) => course.YEAR === year && course.COURSE_NAME === selectedCourse)
                .map((course) => (
                  <div key={course.COURSE_NAME}>
                    <Typography variant="h4">
                      {course.AVERAGE_PASSING_RATE}%
                    </Typography>
                    <br />
                  </div>
                ))}
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default PassingRatePage;
