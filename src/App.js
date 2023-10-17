import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./component/Home";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import User from "./component/User";
import Login from "./component/Login";
import SnackBar from "./component/utility/SnackBar";
import { useSelector } from "react-redux";
// import { Login } from "@mui/icons-material";

function App() {
  const light = createTheme({
    palette: {
      primary: {
        main: "#ff5300",
      },
      secondary: {
        main: "#ef3c3c",
      },
    },
    typography: {
      fontFamily: "Work+Sans",
      fontWeightLight: 100,
      fontWeightRegular: 300,
      fontWeightMedium: 300,
      fontWeightBold: 400,
    },
  });

  const dark = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={light}>
      <BrowserRouter>
        <CssBaseline enableColorScheme />
      <SnackBar/>
        <MyRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}

function MyRoutes() {
  const {auth} = useSelector(state=>state)
  return (
    <Routes>
      {auth.isAuth && <Route path="/" element={<Home />} />}
      {auth.isAuth && <Route path="/user" element={<User />} />}
      <Route path="/*" element={<Login />} />
    </Routes>
  );
}

export default App;
