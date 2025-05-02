// main file for rendering charts and tables
import { useEffect, useState } from "react";
import { Container, Grid, Typography, CircularProgress } from "@mui/material";
import DChart from "./components/DChart";
import DTable from "./components/DTable";

function App() {
  const [data, setData] = useState(null);
  const [tableDataCount, setTableDataCount] = useState(null);
  const [tableDataAcv, setTableDataAcv] = useState(null);
  const [totalLostCount, setTotalLostCount] = useState(null);
  const [totalLostAcv, setTotalLostAcv] = useState(null);

  //fetch the data from the backend API
  useEffect(() => {
    fetch("http://localhost:3000/api/data") //url set on the backend
      .then((res) => res.json())
      .then((res) => {
        setData(res.data);
        setTableDataCount(res.tableDataCount);
        setTableDataAcv(res.tableDataAcv);
        setTotalLostCount(res.totalLostCount);
        setTotalLostAcv(res.totalLostAcv);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []); // [] makes sure data is fetched once when the component loads

  if (!data)
    return (
      <Container style={{ textAlign: "center", marginTop: 50 }}>
        <CircularProgress />
      </Container>
    ); //if data hasn't been fetched yet, show loading effect

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
