import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
// icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
export default function CusDrawer({ open, close }) {
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
  };

  const panel = [
    { title: "Dashboard", icon: <DashboardIcon /> },
    { title: "User", icon: <PersonIcon /> },
  ];

  const list = () => (
    <Box
      sx={{ width: "200px" }}
      role="presentation"
      onClick={close}
      onKeyDown={close}
    >
      <List>
        {panel.map((label, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton>
              <ListItemIcon>{label.icon}</ListItemIcon>
              <ListItemText primary={label.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <SwipeableDrawer
        anchor={"left"}
        open={open}
        onClose={close}
        onOpen={toggleDrawer("left", true)}
      >
        <Box
          className="flex"
          p={2}
          pb={0}
          sx={{ justifyContent: "end", alignItems: "end" }}
        >
          <IconButton onClick={close}>
            <CloseIcon color="primary"></CloseIcon>
          </IconButton>
        </Box>
        {list("left")}
      </SwipeableDrawer>
    </div>
  );
}
