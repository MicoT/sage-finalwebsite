import React, { useState, useEffect } from 'react';

const InstructorList = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch data from the JSON file
    fetch('data/json/Professors.json')  // Update the path to your JSON file
      .then((response) => response.json())
      .then((jsonData) => setData(jsonData))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Filter data based on the search term
  const filteredData = data.filter(
    (instructor) =>
      instructor.INSTRUCTOR_LAST_NAME.toLowerCase().includes(searchTerm.toLowerCase()) ||
      instructor.INSTRUCTOR_FIRST_NAME.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Instructor List</h1>
      <input
        type="text"
        placeholder="Search for an instructor"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredData.map((instructor, index) => (
          <li key={index}>
            <strong>Last Name:</strong> {instructor.INSTRUCTOR_LAST_NAME},{' '}
            <strong>First Name:</strong> {instructor.INSTRUCTOR_FIRST_NAME},{' '}
            <strong>Course:</strong> {instructor.COURSE_NAME}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InstructorList;
