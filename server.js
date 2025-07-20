const express = require('express');
const axios = require('axios');
const app = express();

const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY;
const MATCH_ID = process.env.MATCH_ID;

app.get('/livescore', async (req, res) => {
    try {
        const response = await axios.get(`https://api.cricapi.com/v1/currentMatches?apikey=${API_KEY}`);
        const match = response.data.data.find(m => m.id === MATCH_ID);
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json(match || { error: 'Match not started yet' });
    } catch {
        res.status(500).json({ error: 'Fetch error' });
    }
});

app.listen(PORT, () => console.log(`Proxy Server running`));
