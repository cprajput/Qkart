import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer";

const AppLayout = () => {
  return (
    <Box>
      <Header />

      <Box>
        <Outlet />
      </Box>

      <Footer />
    </Box>
  );
};

export default AppLayout;
