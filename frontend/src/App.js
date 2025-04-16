// main file for rendering charts and tables
import { useEffect, useState } from "react";
import { Container, Grid, Typography, CircularProgress } from "@mui/material";
import DChart from "./components/DChart";
import DTable from "./components/DTable";

function App() {
  const [data, setData] = useState(null);

  //fetch the data from the backend API
  useEffect(() => {
    fetch("http://localhost:3000/api/data") //url set on the backend
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error("Error fetching data:", err));
  }, []); // [] makes sure data is fetched once when the component loads

  if (!data)
    return (
      <Container style={{ textAlign: "center", marginTop: 50 }}>
        <CircularProgress />
      </Container>
    ); //if data hasn't been fetched yet, show loading effect

  //calculate the table data for count
  const CountTable = (data) =>
    //format the raw data into table-ready structure

    data.map((curr, index) => {
      const nxt = data[index + 1];
      const moved = nxt?.count ?? (curr.label === "Won" ? curr.count : 0);
      // Ones who didn't move to the next stage are considered lost

      const lost = curr.count - moved;
      //win rate is the percentage of last count/ current count
      const winRate = (
        (data[data.length - 1].count / curr.count) *
        100
      ).toFixed(0);
      const diffRate = curr.diffRate;
      return {
        stage: curr.label,
        cameToStage: curr.count,
        lost,
        moved,
        winRate: `${winRate}%`,
        diffRate,
      };
    });

  //calculate the table data for acv
  const AcvTable = (data) =>
    //format the raw data into table-ready structure

    data.map((curr, index) => {
      const nxt = data[index + 1];
      const moved = nxt?.acv ?? (curr.label === "Won" ? curr.acv : 0);

      const lost = curr.acv - moved; //Ones who didn't move to the next stage are considered lost

      //win rate is the percentage of last avc/ current acv
      const winRate = ((data[data.length - 1].acv / curr.acv) * 100).toFixed(0);
      const diffacvRate = curr.diffacvRate;

      return {
        stage: curr.label,
        cameToStage: curr.acv,
        lost,
        moved,
        winRate: `${winRate}%`,
        diffacvRate,
      };
    });

  //
  const tableDataCount = CountTable(data);
  const tableDataAcv = AcvTable(data);

  //calculate total lost opportunities (excluding 'Won')

  const totalLostCount = tableDataCount.reduce(
    (sum, row) => sum + (row.stage === "Won" ? 0 : row.lost),
    0
  );
  const totalLostAcv = tableDataAcv.reduce(
    (sum, row) => sum + (row.stage === "Won" ? 0 : row.lost),
    0
  );

  return (
    //equivalent to div in html
    <Container style={{ padding: 10, marginTop: 30 }}>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, sm: 6 }}>
          {" "}
          {/* xs,sm used for making it responsive, 12 stands for full width and 6 for half, meaning it would take full width available if the screen size is less than 600 otherwise it will take half the screen. */}
          <DChart data={data} type="count" />
          {/* component for funnel chart passed with a type prop tell chart what to visualize (count or acv) */}
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <DChart data={data} type="acv" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <DTable data={tableDataCount} totalLost={totalLostCount} />
          {/* component for Table passed with multiple arguments which is the table data and total lost count */}
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <DTable data={tableDataAcv} totalLost={totalLostAcv} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
