import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useReducer } from "react";
import Navbar from "./utility/Navbar";

// components
import CusDataGrid from "./utility/DataGrid";
// icons
import RouteIcon from "@mui/icons-material/Route";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import SearchIcon from "@mui/icons-material/Search";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import { listTrackRecords, metaCount } from "../service/service";
// User Journey, Enrol Click , Course Card Click, Search events

const Home = () => {
  let initialState = {
    current_card: "User Logs",
    rows: [],
    columns: [],
    data: [],
    page: 1,
    perPage: 25,
    total: 0,
    event_count: {
      path: 0,
      card: 0,
      enroll: 0,
      search: 0,
    },
    isLoading: true,
    email: "",
  };

  // reducer
  const [localState, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    handleCardClick("User Logs");
    getMeta();
  }, []);
  useEffect(() => {
    handleCardClick(localState.current_card);
    getMeta();
  }, [localState.page]);

  useEffect(() => {
    handleCardClick(localState.current_card, 1);
    getMeta();
  }, [localState.current_card]);

  async function getMeta(params) {
    let res = await metaCount();
    console.log(res);
    dispatch({
      type: "Set_Val",
      payload: {
        event_count: {
          path: res.data.data.path_track,
          card: res.data.data.card_click,
          enroll: res.data.data.enroll_click,
          search: res.data.data.search,
        },
      },
    });
  }

  let cards = [
    {
      title: "User Logs",
      icon: <RouteIcon fontSize={"large"} />,
      count: localState.event_count.path,
      bg: "#12badb",
    },
    {
      title: "Search",
      icon: <SearchIcon fontSize={"large"} />,
      count: localState.event_count.search,
      bg: "#d92121",
    },
    {
      title: "Course Card Click",
      icon: <CreditCardIcon fontSize={"large"} />,
      count: localState.event_count.card,
      bg: "#60b30e",
    },
    {
      title: "Enroll Click",
      icon: <SubscriptionsIcon fontSize={"large"} />,
      count: localState.event_count.enroll,
      bg: "#ed7926",
    },
  ];
  async function handleCardClick(card, page = localState.page) {
    try {
      console.log(card);
      let res,
        columns = [],
        rows = [];
      dispatch({
        type: "Set_Val",
        payload: {
          isLoading: true,
        },
      });

      switch (card) {
        case "User Logs":
          res = await listTrackRecords({
            parameter: 1,
            page: page,
            perPage: localState.perPage,
          });
          columns = [
            { field: "id", headerName: "ID", width: 50 },
            { field: "email", headerName: "Email", width: 250 },
            { field: "user_name", headerName: "User Name", width: 200 },
            { field: "path", headerName: "Path", width: 200 },
            {
              field: "time_span",
              headerName: "Time Span (Millisecond)",
              width: 200,
            },
            { field: "date", headerName: "Date & Time", width: 200 },
          ];
          rows = res.data.data.data.map((slab, i) => {
            return {
              id: i + 1,
              email: slab.email,
              user_name: slab.user_name,
              path: slab.path,
              time_span: slab.time_span,
              date: slab.date,
            };
          });
          break;
        case "Search":
          res = await listTrackRecords({
            parameter: 2,
            page,
            perPage: localState.perPage,
          });
          columns = [
            { field: "id", headerName: "ID", width: 50 },
            { field: "email", headerName: "Email", width: 250 },
            { field: "user_name", headerName: "User Name", width: 150 },
            { field: "search", headerName: "Search Keyword", width: 250 },
            { field: "date", headerName: "Date & Time", width: 200 },
          ];
          rows = res.data.data.data.map((slab, i) => {
            return {
              id: i + 1,
              email: slab.email,
              user_name: slab.user_name,
              search: slab.search,
              time_span: slab.time_span,
              date: slab.date,
            };
          });
          break;
        case "Course Card Click":
          res = await listTrackRecords({
            parameter: 3,
            page,
            perPage: localState.perPage,
          });
          columns = [
            { field: "id", headerName: "ID", width: 50 },
            { field: "email", headerName: "Email", width: 250 },
            { field: "user_name", headerName: "User Name", width: 150 },
            { field: "course_title", headerName: "Course Title", width: 200 },
            { field: "uuid", headerName: "UUID", width: 200 },
            { field: "date", headerName: "Date & Time", width: 200 },
          ];
          rows = res.data.data.data.map((slab, i) => {
            return {
              id: i + 1,
              email: slab.email,
              user_name: slab.user_name,
              course_title: slab.course_title,
              uuid: slab.uuid,
              date: slab.date,
            };
          });
          break;
        case "Enroll Click":
          res = await listTrackRecords({
            parameter: 4,
            page,
            perPage: localState.perPage,
          });
          columns = [
            { field: "id", headerName: "ID", width: 50 },
            { field: "email", headerName: "Email", width: 250 },
            { field: "user_name", headerName: "User Name", width: 150 },
            { field: "course_title", headerName: "Course Title", width: 150 },
            { field: "url", headerName: "URL", width: 200 },
            { field: "date", headerName: "Date & Time", width: 200 },
          ];
          rows = res.data.data.data.map((slab, i) => {
            return {
              id: i + 1,
              email: slab.email,
              user_name: slab.user_name,
              course_title: slab.course_title,
              url: slab.url,
              date: slab.date,
            };
          });
          break;

        default:
          break;
      }
      if (res) {
        console.log(rows);
      }
      dispatch({
        type: "Set_Val",
        payload: {
          current_card: card,
          columns,
          rows,
          total: res.data.data.total,
          isLoading: false,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {/* //Navbar */}
      <Navbar />
      {/* Main Container */}
      <Grid container>
        {/* Cards  */}
        <Grid item xs={12} className="p-2">
          <Grid container className="flex home-card-container">
            {cards.map((card, i) => (
              <Grid key={"card " + i} item>
                <Box
                  onClick={() => handleCardClick(card.title)}
                  className="flex-col-center card-item"
                  sx={{ backgroundColor: card.bg }}
                >
                  {card.icon}
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    {card.title}
                  </Typography>
                  <Typography variant="h4">{card.count}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
        {/* Filter 
            <Grid item xs={12}>
            </Grid> */}
        {/* Data Grid  */}
        <Grid item xs={12} className="p-2">
          <CusDataGrid state={localState}></CusDataGrid>
        </Grid>
      </Grid>
    </>
  );
};

function reducer(state, action) {
  switch (action.type) {
    case "Set_Val":
      return (state = { ...state, ...action.payload });
    default:
      return state;
  }
}

export default Home;
