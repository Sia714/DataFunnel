// used for displaying bar graphs
import {
  Box,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Paper,
} from "@mui/material";

const Chart = ({ data, type }) => {
  return (
    <Paper elevation={5} style={{ padding: 10 }}>
      {/* to give an elevation effect like in the screenshot */}
      <Typography
        variant="body1"
        style={{ marginBottom: 10, fontWeight: "bold" }}
      >
        {/* using typography for the heading */}
        Win Rate by {type === "count" ? "opportunity count" : "ACV"} :{" "}
        {/* calculating percentage according to type */}
        {((data[data.length - 1][type] / data[0][type]) * 100).toFixed(0)}%
      </Typography>
      {/* using table to display the graph to segregate labels */}
      <Table size="small">
        <TableBody>
          {data.map((d) => {
            const pct = (d[type] / data[0][type]) * 100; // calculating the length of the bar
            return (
              <TableRow key={d.label}>
                <TableCell>{d.label}</TableCell>
                <TableCell width="100%" style={{ textAlign: "center" }}>
                  {/* displaying difference rate depending on the type */}
                  <strong>
                    {type === "count"
                      ? (d.diffRate * 100).toFixed(0)
                      : (d.diffacvRate * 100).toFixed(0)}
                    %
                  </strong>
                  {/* using boxes to simulate the bar graphs */}
                  <Box
                    sx={{
                      position: "relative",
                      height: 20,
                      backgroundColor: "#ccc",
                      overflow: "hidden",
                    }}
                  >
                    {/* the green bar */}
                    <Box
                      sx={{
                        position: "absolute",
                        //center the bar horizontally
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: `${pct}%`,
                        backgroundColor: "#62a63a",
                        color: "#fff",
                      }}
                    >
                      {type === "count" ? "" : "$"}
                      {d[type].toFixed(0)}
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  {/* displaying percentage */}
                  <strong>
                    {((data[data.length - 1][type] / d[type]) * 100).toFixed(0)}
                    %
                  </strong>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default Chart;
