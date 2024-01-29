import React from "react";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import { Line } from "@nivo/line";
import { Pie } from "@nivo/pie";
import { Box, Button, Typography, useTheme, useMediaQuery } from "@mui/material";
import StatBox from "components/StatBox";

const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

  const data = [
    { id: "CS", value: 35 }, // Replace with actual number of CS students
    { id: "IS", value: 25 }, // Replace with actual number of IS students
    { id: "EMC", value: 15 }, // Replace with actual number of EMC students
  ];

  const lineGraphData = [

  ];
  

  return (
    <Box m="1.5rem 2.5rem" >
      <FlexBetween >
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            Download Reports
          </Button>
        </Box>
      </FlexBetween>
      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 2fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        <StatBox
          title="CS Students"
          value={data[0].value}
          description="Online students in CS"
        />
        <StatBox
          title="IS Students"
          value={data[1].value}
          description="Online students in IS"
        />
        <StatBox
          title="EMC Students"
          value={data[2].value}
          description="Online students in EMC"
        />
      </Box>
    </Box>
  );
};

export default Dashboard;
