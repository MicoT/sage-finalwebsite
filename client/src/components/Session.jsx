import React from "react";
import { PinboardEmbed } from "@thoughtspot/visual-embed-sdk/lib/src/react";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { formatDistanceToNow } from 'date-fns';
import { ResponsiveBar } from "@nivo/bar";
import { ResponsivePie } from "@nivo/pie";
import { ResponsiveLine } from "@nivo/line";
import {
  AuthType,
  init,
  Page,
 } from "@thoughtspot/visual-embed-sdk";
 
 const TSURL = "https://try.thoughtspot.cloud";
 init({
  thoughtSpotHost: TSURL,
  authType: AuthType.None
});

const StudentSessions = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

  // Replace this with your student data
  const studentData = [
    {
      id: 1,
      name: "Alice Johnson",
      program: "CS",
      lastLogin: new Date("2023-11-20T10:30:00"),
    },
    {
      id: 2,
      name: "Bob Davis",
      program: "IS",
      lastLogin: new Date("2023-11-20T09:15:00"),
    },
    {
      id: 3,
      name: "Charlie Brown",
      program: "EMC",
      lastLogin: new Date("2023-11-19T14:45:00"),
    },
    // Add more student data
  ];
  const chartData = [
    {
      program: "CS",
      activity: 100, // Replace with actual student activity data
    },
    {
      program: "IS",
      activity: 75, // Replace with actual student activity data
    },
    {
      program: "EMC",
      activity: 50, // Replace with actual student activity data
    },
    // Add more data
  ];
  const lineChartData = [
    {
      id: 'CS',
      data: [
        { x: 'Week 1', y: 10 },
        { x: 'Week 2', y: 15 },
        { x: 'Week 3', y: 8 },
        // Add more data points
      ],
    },
    {
      id: 'IS',
      data: [
        { x: 'Week 1', y: 8 },
        { x: 'Week 2', y: 12 },
        { x: 'Week 3', y: 5 },
        // Add more data points
      ],
    },
    // Add more data for other programs
  ];

  // New data for the pie chart
  const pieChartData = [
    { id: 'CS', label: 'CS', value: 25 },
    { id: 'IS', label: 'IS', value: 20 },
    { id: 'EMC', label: 'EMC', value: 15 },
    // Add more data for other programs
  ];
  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Student Name",
      flex: 2,
    },
    {
      field: "program",
      headerName: "Program",
      flex: 1,
    },
    {
      field: "lastLogin",
      headerName: "Last Login Time",
      flex: 2,
      renderCell: (params) => {
        const lastLogin = new Date(params.value);
        const timeAgo = formatDistanceToNow(lastLogin, { addSuffix: true });
        return timeAgo;
      },
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Typography variant="h4">Student Sessions</Typography>
      
      {/* ... (existing DataGrid) */}
 

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="400px"
        gap="20px"
        p="1.5rem"
        borderRadius="0.55rem"
        backgroundColor= {theme.palette.background.alt}
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        <Box
          gridColumn="span 12"
          gridRow="span 1"
          p="1.5rem"
          sx={{
            // ... (Styling for the chart container)
          }}
        >
          <Typography variant="h5">Student Activity</Typography>
          {/* Bar Chart */}
          <ResponsiveBar
            data={chartData}
            keys={["activity"]}
            indexBy="program"
            margin={{ top: 30, right: 30, bottom: 70, left: 60 }}
            padding={0.3}
            colors={{ scheme: "nivo" }}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: -45,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
            }}
          />
        </Box>
        <Box
          gridColumn="span 12"
          gridRow="span 1"
          p="1.5rem"
          sx={{
            // ... (Styling for the chart container)
          }}
        >
          {/* Line Chart */}
          <Typography variant="h5">Weekly Activity</Typography>
          <ResponsiveLine
            data={lineChartData}
            margin={{ top: 30, right: 30, bottom: 70, left: 60 }}
            xScale={{ type: 'point' }}
            yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
            curve="natural"
            axisBottom={{
              orient: 'bottom',
              tickSize: 5,
              tickPadding: 5,
              tickRotation: -45,
            }}
            axisLeft={{
              orient: 'left',
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
            }}
          />
        </Box>
        <Box
          gridColumn="span 12"
          gridRow="span 1"
          sx={{
            // ... (Styling for the chart container)
          }}
        >
          {/* Pie Chart */}
          <Typography variant="h5">Program Distribution</Typography>
          <ResponsivePie
            data={pieChartData}
            margin={{ top: 30, right: 30, bottom: 70, left: 60 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            colors={{ scheme: 'nivo' }}
            borderWidth={1}
            borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
            radialLabelsSkipAngle={10}
            radialLabelsTextXOffset={6}
            radialLabelsTextColor={{ from: 'color', modifiers: [] }}
            radialLabelsLinkOffset={0}
            radialLabelsLinkDiagonalLength={16}
            radialLabelsLinkHorizontalLength={24}
            radialLabelsLinkStrokeWidth={1}
            radialLabelsLinkColor={{ from: 'color' }}
            slicesLabelsSkipAngle={10}
            slicesLabelsTextColor="#333333"
          />
        </Box>
      </Box>
    </Box>
  );
  
};

export default StudentSessions;
