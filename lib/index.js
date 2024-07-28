const express = require('express');
const bodyParser = require('body-parser');
const AI71 = require('./ai71');

const app = express();
app.use(bodyParser.json());

const AI71_API_KEY = "<your AI71 API key>";
const client = new AI71(AI71_API_KEY);

app.post('/chat', async (req, res) => {
    const { model, messages } = req.body;
    const response = await client.createCompletion(model, messages);
    res.json(response);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
