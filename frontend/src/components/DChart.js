import {
  Box,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Paper,
} from "@mui/material";

const Chart = ({ data, type = "count" }) => {
  const total = data[0][type];

  return (
    <Paper elevation={5} style={{ padding: 10 }}>
      <Typography
        variant="body1"
        style={{ marginBottom: 10, fontWeight: "bold" }}
      >
        Win Rate by {type === "count" ? "opportunity count" : "ACV"} :{" "}
        {((data[data.length - 1][type] / total) * 100).toFixed(0)}%
      </Typography>
      <Table size="small">
        <TableBody>
          {data.map((d) => {
            const pct = (d[type] / total) * 100;
            return (
              <TableRow key={d.label}>
                <TableCell>{d.label}</TableCell>
                <TableCell width="100%" style={{ textAlign: "center" }}>
                  <strong>
                    {type === "count"
                      ? (d.diffRate * 100).toFixed(0)
                      : (d.diffacvRate * 100).toFixed(0)}
                    %
                  </strong>
                  <Box
                    sx={{
                      position: "relative",
                      height: 20,
                      backgroundColor: "#ccc",
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: `${pct}%`,
                        backgroundColor: "#62a63a",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {type === "count" ? "" : "$"}
                      {d[type].toFixed(0)}
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
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
