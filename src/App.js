import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./component/Home";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

function App() {
  const light = createTheme({
    palette: {
      primary: {
        main: "#ff5300",
      },
      secondary : {
        main: '#ef3c3c'
      }
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
        <MyRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}

function MyRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
