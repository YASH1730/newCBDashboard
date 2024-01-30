import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import "../../assets/css/main.css";
import { Grid, Typography } from "@mui/material";

export default function CusDataGrid({ state, setState, handleCardClick }) {
  function handlePageSize(e){
    console.log(e)
    handleCardClick(state.current_card,e.page+1)
    setState({
      type : 'Set_Val',
      payload : {...e}
    })
    
  }
  return (
    <Grid container className="data-grid-container">
      <Grid item xs={12} p={1} pb={2}>
        <Typography variant="h5">{state.current_card}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={state.rows}
            rowCount={state.total}
            loading={state.isLoading}
            pagination
            page={state.page - 1}
            limit={state.perPage}

            paginationMode="server"
            paginationModel={{
              pageSize: state.perPage,
              page: state.page,
            }}
            onPaginationModelChange={handlePageSize}
            columns={state.columns}
          />
        </Box>
      </Grid>
    </Grid>
  );
}
