// pages/api/your-api-route.js

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Set this to the specific domain if needed
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Handle your API request here
  res.status(200).json({ message: 'Hello, world!' });
}
