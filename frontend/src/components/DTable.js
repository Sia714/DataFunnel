import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";

const DTable = ({ data, title, totalLost }) => {
  return (
    <>
      <Paper elevation={5}>
        {" "}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>Stage</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>
                Came to Stage
              </TableCell>
              <TableCell
                style={{
                  backgroundColor: "#D95F02",
                  color: "#fff",
                  fontWeight: "bold",
                }}
              >
                Lost/Disqualified from stage
              </TableCell>
              <TableCell
                style={{
                  backgroundColor: "#62a63a",
                  color: "#fff",
                  fontWeight: "bold",
                }}
              >
                Moved to next stage
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Win Rate %</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.stage}>
                <TableCell>{row.stage}</TableCell>
                {row.stage === "Won" ? (
                  <TableCell
                    style={{ backgroundColor: "#62a63a", color: "#fff" }}
                  >
                    {row.cameToStage.toFixed(0)}
                  </TableCell>
                ) : (
                  <TableCell>{row.cameToStage.toFixed(0)}</TableCell>
                )}

                <TableCell>
                  {row.stage === "Won" ? "-" : row.lost.toFixed(0)}
                </TableCell>
                <TableCell>
                  {row.stage === "Won" ? "-" : row.moved.toFixed(0)}
                </TableCell>
                <TableCell>{row.winRate}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>Total</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>-</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>
                {totalLost.toFixed(0)}
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }}>-</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>-</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </>
  );
};

export default DTable;
