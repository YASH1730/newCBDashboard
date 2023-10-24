import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useReducer } from "react";
import Navbar from "./utility/Navbar";

// components
import CusDataGrid from "./utility/DataGrid";
// icons
import PersonIcon from "@mui/icons-material/Person";
import { listTrackRecords, metaCount } from "../service/service";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
// User Journey, Enrol Click , Course Card Click, Search events

const User = () => {
  let initialState = {
    current_card: "Total Users",
    rows: [],
    columns: [],
    data: [],
    page: 1,
    perPage: 25,
    event_count: { user_count: 0 },
    total: 0,
    isLoading: true,
    filtered : false,
    email: "",
    to : "",
    from : ""
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
  }, [localState.page,localState.filtered,localState.to,localState.from,localState.email]);

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
          user_count: res.data.data.newregistration,
        },
      },
    });
  }
  let cards = [
    {
      title: "Total Users",
      icon: <PersonIcon fontSize={"large"} />,
      count: localState.event_count.user_count,
      bg: "#12badb",
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
        case "Total Users":
          res = await listTrackRecords({
            parameter: 5,
            page: page,
            perPage: localState.perPage,
            email : localState.email,
            to : localState.to,
            from : localState.from,
            filter : localState.filtered
          });
          columns = [
            { field: "id", headerName: "ID", width: 50 },
            { field: "name", headerName: "User Name", width: 200 },
            { field: "email", headerName: "Email", width: 250 },
            { field: "mobile_no", headerName: "Mobile", width: 200 },
            { field: "gender", headerName: "Gender", width: 200 },
            { field: "city", headerName: "City", width: 200 },
            { field: "date", headerName: "Date & Time", width: 200 },
          ];
          rows = res.data.data.data.map((slab, i) => {
            return {
              id: i + 1,
              email: slab.email_address,
              name: slab.name,
              city: slab.city,
              gender: slab.gender,
              mobile_no: slab.mobile_no,
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


  async function handleFilter(e) {
    dispatch({
      type : "Set_Val",
      payload : {
        [e.target.name] : e.target.value
      }
    })
    
  }

  async function applyFilter(state) {
    state ?
    dispatch({
      type : "Set_Val",
      payload : {
        filtered : state,
      }
    }):
    dispatch({
      type : "Set_Val",
      payload : {
        filtered : state,
        email :  "",
        to :  "",
        from :  "",
      }
    });

    // handleCardClick(localState.current_card, 1);

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
        {/* Filter  */}
        <Grid item xs={12} p={5} pb={0} pt={2} >
              <Grid container style={{ justifyContent : "space-between"}}>
                <Grid item xs= {5}>
                  <TextField
                  fullWidth
                  label="Email"
                  value={localState.email}
                  type="email"
                  name = "email"
                  onChange={handleFilter}
                  />
                </Grid>
                <Grid item xs= {2}>
                  <TextField
                  fullWidth
                  value={localState.from}
                  label="From"
                  name = "from"
                  type = "date"
                  onChange={handleFilter}
                  />
                </Grid>
                <Grid item xs= {2}>
                  <TextField
                  fullWidth
                  value={localState.to}
                  label="To"
                  name = "to"
                  type = "date"
                  onChange={handleFilter}
                  />
                </Grid>
                <Grid item xs= {2} className="flex" style={{gap : "1rem"}}>
                 <Button style={{borderRadius : "2rem"}} onClick={()=>applyFilter(true)}  size="small" variant="contained" ><FilterAltIcon></FilterAltIcon></Button>
                 <Button style={{borderRadius : "2rem"}} onClick={()=>applyFilter(false)}  size="small" variant="outlined" ><FilterAltOffIcon></FilterAltOffIcon></Button>
                </Grid>
              </Grid>
            </Grid>
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

export default User;
