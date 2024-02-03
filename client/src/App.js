import React, { useMemo } from 'react';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";
import Overview from "scenes/overview";
import Grades from "scenes/grades";
import ModuleGrades from "scenes/module-grades";
import InstructorUssage from "scenes/instructor-ussage";
import CourseContent from "scenes/instructor-ussage";
import Login from "scenes/login/Login";  // Import the Login component

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/login" replace />} />
            <Route path="login" element={<Login />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="overview" element={<Overview />} />
            <Route path="grades" element={<Grades />} />
            <Route path="module-grades" element={<ModuleGrades />} />
            <Route path="instructor-ussage" element={<InstructorUssage />} />
            <Route path="course-content" element={<CourseContent />} />
            {/* Redirect to /dashboard if the path is not matched */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
