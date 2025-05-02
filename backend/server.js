//backend file
const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;

const server = http.createServer((req, res) => {
  if (req.url === "/api/data") {
    //set CORS headers since frontend(React) works on different port than backend
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    //read the file, __dirname sets the absolute path of the directory
    fs.readFile(path.join(__dirname, "data.json"), "utf8", (err, data2) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Failed to read data file." }));
      } else {
        const data = JSON.parse(data2);
        //calculate the table data for count
        const CountTable = (data) =>
          //format the raw data into table-ready structure

          data.map((curr, index) => {
            const moved =
              data[index + 1]?.count ?? (curr.label === "Won" ? curr.count : 0);
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
            const moved =
              data[index + 1]?.acv ?? (curr.label === "Won" ? curr.acv : 0);

            const lost = curr.acv - moved; //Ones who didn't move to the next stage are considered lost

            //win rate is the percentage of last avc/ current acv
            const winRate = (
              (data[data.length - 1].acv / curr.acv) *
              100
            ).toFixed(0);
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
        const response = {
          data,
          tableDataCount,
          totalLostCount,
          tableDataAcv,
          totalLostAcv,
        };
        //return the file data in response in json format

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(response));
      }
    });
  } else {
    //return not found for any other path requested.
    res.writeHead(404);
    res.end("Not Found");
  }
});

//start the server and log the URL
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
