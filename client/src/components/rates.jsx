// StudentPerformancePage.js
import React, { useState } from "react";
import StudentList from "./StudentList";
import BulletChart from "./bar";

const students = [
  {
    id: 1,
    name: "John Smith",
    modules: [
      { id: "module1", range: [0, 50, 75, 100], measures: [80], title: "Module 1" },
      { id: "module2", range: [0, 50, 75, 100], measures: [60], title: "Module 2" },
      { id: "module3", range: [0, 50, 75, 100], measures: [70], title: "Module 3" },
    ],
  },
  // Add more student data
];

const StudentPerformancePage = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);

  const onSelectStudent = (student) => {
    setSelectedStudent(student);
  };

  return (
    <div>
      <StudentList students={students} onSelectStudent={onSelectStudent} />
      {selectedStudent && <BulletChart student={selectedStudent} />}
    </div>
  );
};

export default StudentPerformancePage;
