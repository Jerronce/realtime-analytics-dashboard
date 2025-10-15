const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(cors());
app.use(express.json());

// Store connected clients
const clients = new Set();

// WebSocket connection handler
wss.on('connection', (ws) => {
  console.log('New client connected');
  clients.add(ws);

  ws.on('close', () => {
    console.log('Client disconnected');
    clients.delete(ws);
  });
});

// Generate mock analytics data
function generateAnalyticsData() {
  return {
    timestamp: new Date().toISOString(),
    pageViews: Math.floor(Math.random() * 1000) + 100,
    uniqueVisitors: Math.floor(Math.random() * 500) + 50,
    bounceRate: (Math.random() * 50 + 30).toFixed(2),
    avgSessionDuration: Math.floor(Math.random() * 300) + 60,
    conversionRate: (Math.random() * 10 + 1).toFixed(2),
    revenue: (Math.random() * 5000 + 500).toFixed(2)
  };
}

// Broadcast data to all connected clients
function broadcast(data) {
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

// Send analytics data every 2 seconds
setInterval(() => {
  const data = generateAnalyticsData();
  broadcast(data);
}, 2000);

// REST API endpoints
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', clients: clients.size });
});

app.get('/api/stats', (req, res) => {
  res.json(generateAnalyticsData());
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`WebSocket server is ready`);
});
