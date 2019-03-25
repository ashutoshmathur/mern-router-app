const http = require('http');
const app = require('./app');

// Define Port for backend server
const DEFAULT_PORT_NO = 5000;
const port = process.env.PORT || DEFAULT_PORT_NO;

// Create Server
const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server sarted on port no: ${port}`);
});