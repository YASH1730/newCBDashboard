import { Box, Drawer, Grid, IconButton } from "@mui/material";
import React, { useState } from "react";
// css
import "../../assets/css/main.css"
// image and Icons
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../../assets/images/logo.png";
// components
import CusDrawer from "./sub-components/CusDrawer";
const Navbar = () => {

  // state 
  const [Drawer, setDrawer] = useState(false)

  function handleDrawer(params) {
  setDrawer(!Drawer)
  }
  return (
    <>
      <Grid container className="flex-center nav-container-main position-relative" sx={{boxShadow : 2}} >
        {/* Drawer  */}
        <Grid item xs = {2} className="position-absolute ham-container">
         <CusDrawer open = {Drawer} close = {handleDrawer}></CusDrawer>
        </Grid>
        {/* Ham Button  */}
        <Grid item xs = {2} className="position-absolute ham-container">
          <IconButton size="large" onClick={handleDrawer}>
            <MenuIcon fontSize="5rem" color="primary"></MenuIcon>
          </IconButton>
        </Grid>
        {/* Logo  */}
        <Grid item xs={12} >
          {" "}
          <Box className={"flex-center"}>
            {" "}
            <img src={logo} alt="logo"></img>{" "}
          </Box>{" "}
        </Grid>
      </Grid>
    </>
  );
};

export default Navbar;
