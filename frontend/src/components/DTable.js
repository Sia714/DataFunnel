// takes the table data and the lost count as argument
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";

const DTable = ({ data, totalLost }) => {
  return (
    <>
      {/* to give an elevation effect like in the screenshot */}

      <Paper elevation={5}>
        {" "}
        <Table>
          <TableHead>
            {/* header row marking different columns as in stage,came to stage, moved, lost and winRate */}
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>Stage</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>
                Came to Stage
              </TableCell>
              {/* different color for lost and moved stages */}
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
            {/* map through data and display it in the table */}
            {data.map((row) => (
              <TableRow key={row.stage}>
                <TableCell>{row.stage}</TableCell>
                {/* should show '-' only when the row is 'Won' and the cell is '0' */}
                {row.stage === "Won" ? (
                  <TableCell
                    style={{ backgroundColor: "#62a63a", color: "#fff" }}
                  >
                    {row.cameToStage.toFixed(0)}
                  </TableCell>
                ) : (
                  <TableCell>{row.cameToStage.toFixed(0)}</TableCell>
                )}
                {/* //round to nearest integer using .toFixed(0) */}
                <TableCell>
                  {row.stage === "Won" ? "-" : row.lost.toFixed(0)}
                </TableCell>
                <TableCell>
                  {row.stage === "Won" ? "-" : row.moved.toFixed(0)}
                </TableCell>
                <TableCell>{row.winRate}</TableCell>
              </TableRow>
            ))}
            {/* different data for the last 'total' row so display it manually */}
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
