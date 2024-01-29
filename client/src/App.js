import React, { useMemo } from 'react';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";
import Overview from "scenes/overview";
import Sessions from "scenes/sessions";
import Contents from "scenes/contents";
import Interaction from "scenes/interaction";
import Completion from "scenes/completion";
import Grades from "scenes/grades";
import Rates from "scenes/rates";
import ModuleGrades from "scenes/module-grades";
import NoInstructorCourse from "scenes/no-instructor";
import InstructorUssage from "scenes/instructor-ussage";
import CourseContent from "scenes/instructor-ussage/course-content";
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
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="login" element={<Login />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="overview" element={<Overview />} />
            <Route path="sessions" element={<Sessions />} />
            <Route path="contents" element={<Contents />} />
            <Route path="interaction" element={<Interaction />} />
            <Route path="completion" element={<Completion />} />
            <Route path="grades" element={<Grades />} />
            <Route path="rates" element={<Rates />} />
            <Route path="module-grades" element={<ModuleGrades />} />
            <Route path="no-instructor/courses" element={<NoInstructorCourse />} />
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
