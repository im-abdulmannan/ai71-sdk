const axios = require('axios');

class AI71 {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.client = axios.create({
            baseURL: 'https://api.ai71.com',
            headers: {
                'Authorization': `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json'
            }
        });
    }

    async createCompletion(model, messages) {
        try {
            const response = await this.client.post('/chat/completions', {
                model: model,
                messages: messages
            });
            return response.data;
        } catch (error) {
            console.error('Error creating completion:', error.response ? error.response.data : error.message);
        }
    }

    async streamCompletion(model, messages, onChunk) {
        try {
            const response = await this.client.post('/chat/completions', {
                model: model,
                messages: messages,
                stream: true
            }, {
                responseType: 'stream'
            });

            response.data.on('data', (chunk) => {
                const data = JSON.parse(chunk.toString('utf8'));
                onChunk(data);
            });

        } catch (error) {
            console.error('Error streaming completion:', error.response ? error.response.data : error.message);
        }
    }
}

module.exports = AI71;
