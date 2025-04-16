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
    fs.readFile(path.join(__dirname, "data.json"), "utf8", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Failed to read data file." }));
      } else {
        //return the file data in response in json format
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(data);
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
