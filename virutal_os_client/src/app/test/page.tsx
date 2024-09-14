import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import PaperItem from "@/Clientcomp/PaperItem";

export default function ResponsiveGrid() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {Array.from(Array(6)).map((_, index) => (
          <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
            <PaperItem>{index + 1}</PaperItem>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
