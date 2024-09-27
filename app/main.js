const net = require("net");

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

// craeting a server
const server = net.createServer((socket) => {
  socket.on("data", (data) => {
    const request = data.toString();
    console.log("request", request);

    // Extract the HTTP method and path from the request
    const Lines = request.split("\r\n");
    const requestLine = Lines[0]; // First line contains method, path, and HTTP version
    const parts = requestLine.split(" "); // Split by spaces

    if (parts.length >= 3) {
      const method = parts[0]; // e.g., GET
      const path = parts[1]; // e.g., /index.html
      const httpVersion = parts[2]; // e.g., HTTP/1.1

      // console.log(`Method: ${method}`);
      // console.log(`Path: ${path}`);
      // console.log(`HTTP Version: ${httpVersion}`);

      if (path === "/") {
        const responseBody = "<h1>Welcome to the homepage!</h1>";
        const response = `HTTP/1.1 200 OK\r\nContent-Length: ${responseBody.length}\r\n\r\n${responseBody}`;
        socket.write(response);
      } else {
        const responseBody = "<h1>404 Not Found</h1>";
        const response = `HTTP/1.1 404 Not Found\r\nContent-Length: ${responseBody.length}\r\n\r\n${responseBody}`;
        socket.write(response);
      }
    }

    // const response = 'HTTP/1.1 200 OK\r\n\r\n';
    // socket.write(response);
    socket.end();
  });

  socket.on("close", () => {
    socket.end();
  });
});

server.listen(4221, "localhost");
