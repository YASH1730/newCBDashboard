import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import "../../assets/css/main.css";
import { Grid, Typography } from "@mui/material";

export default function CusDataGrid({ state, setState }) {
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
            rowsPerPageOptions={[10, 30, 50, 70, 100]}
            pagination
            page={state.page - 1}
            limit={state.perPage}
            pageSize={state.perPage}
            paginationMode="server"
            onPageChange={(newPage) => {
              setState(() =>
                setState({ action: "Set_Val", page: newPage + 1 })
              );
            }}
            onPageSizeChange={(newPageSize) =>
              setState(() =>
                setState({ action: "Set_Val", perPage: newPageSize })
              )
            }
            columns={state.columns}
          />
        </Box>
      </Grid>
    </Grid>
  );
}
