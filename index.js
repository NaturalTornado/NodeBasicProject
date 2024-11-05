// Import necessary modules 
const http = require('http'); // Module to create server 
const fs = require('fs'); // Module to read files 
const path = require('path'); // Module to handle file paths 

// Define port number where the server will listen for requests 
const PORT = 8080;

// Create the server 
const server = http.createServer((req, res) => {
  // Check the URL of the incoming request
  if (req.url === '/' || req.url === '/index.html') {
    // Serve the index.html file for the homepage
    serveFile(res, 'index.html', 'text/html');
  } else if (req.url === '/about') {
    // Serve the about.html file for the /about route
    serveFile(res, 'about.html', 'text/html');
  } 
  else if (req.url === '/contact-me') {
    // Serve the about.html file for the /about route
    serveFile(res, 'contact-me.html', 'text/html');
  } else {
    // Handle non-existing routes with a 404 message
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }


});

// Helper function to serve files
function serveFile(res, fileName, contentType) {
  // Construct full file path based on current directory and file name
  const filePath = path.join(__dirname, fileName);
  
  // Read the file
  fs.readFile(filePath, (err, data) => {
    if (err) {
      // If there's an error (e.g., file not found), respond with a 500 error
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('500 Server Error');
    } else {
      // If file read is successful, respond with the file content
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
}

// Start server and listen on specified port
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
