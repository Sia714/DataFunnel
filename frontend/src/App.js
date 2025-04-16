import { useEffect, useState } from "react";
import { Container, Grid, Typography } from "@mui/material";
import DChart from "./components/DChart";
import DTable from "./components/DTable";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/data")
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  if (!data) return <Typography>NO DATA FOUND</Typography>;

  const CountTable = (data) =>
    data.map((stage, index) => {
      const nextStage = data[index + 1];
      const moved =
        nextStage?.count ?? (stage.label === "Won" ? stage.count : 0);
      const lost = stage.count - moved;
      const winRate = (
        (data[data.length - 1].count / stage.count) *
        100
      ).toFixed(0);
      const diffRate = stage.diffRate;
      return {
        stage: stage.label,
        cameToStage: stage.count,
        lost,
        moved,
        winRate: `${winRate}%`,
        diffRate,
      };
    });

  const AcvTable = (data) =>
    data.map((stage, index) => {
      const nextStage = data[index + 1];
      const moved = nextStage?.acv ?? (stage.label === "Won" ? stage.acv : 0);
      const lost = stage.acv - moved;
      const winRate = ((data[data.length - 1].acv / stage.acv) * 100).toFixed(
        0
      );
      const diffacvRate = stage.diffacvRate;

      return {
        stage: stage.label,
        cameToStage: stage.acv,
        lost,
        moved,
        winRate: `${winRate}%`,
        diffacvRate,
      };
    });

  const tableDataCount = CountTable(data);
  const tableDataAcv = AcvTable(data);

  const totalLostCount = tableDataCount.reduce(
    (sum, row) => sum + (row.stage === "Won" ? 0 : row.lost),
    0
  );

  const totalLostAcv = tableDataAcv.reduce(
    (sum, row) => sum + (row.stage === "Won" ? 0 : row.lost),
    0
  );

  return (
    <Container style={{ padding: 10, marginTop: 30 }}>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <DChart data={data} type="count" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <DChart data={data} type="acv" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <DTable
            data={tableDataCount}
            title="Funnel Table (Count)"
            totalLost={totalLostCount}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <DTable
            data={tableDataAcv}
            title="Funnel Table (ACV)"
            totalLost={totalLostAcv}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
