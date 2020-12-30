const app = require("./app/api/app");
const http = require("http");

var PORT = process.env.PORT || "8080";
app.set("port", PORT);

var server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
