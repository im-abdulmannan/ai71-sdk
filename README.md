# AI71 SDK

A Node.js SDK for interacting with the AI71 API, allowing you to easily create and stream chat completions using the Falcon 180B model.

## Installation

Install the SDK using npm:

```bash
npm install ai71-sdk
```

## Usage

### Basic Usage

```javascript
const AI71 = require('ai71-sdk');

const AI71_API_KEY = "<your AI71 API key>";
const client = new AI71(AI71_API_KEY);

(async () => {
    const response = await client.createCompletion("tiiuae/falcon-180B-chat", [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "Hello!" }
    ]);
    console.log(response);
})();
```

### Streaming Completions

You can also use the SDK to stream completions:

```javascript
const readline = require('readline');
const AI71 = require('ai71-sdk');

const AI71_API_KEY = "<your AI71 API key>";
const client = new AI71(AI71_API_KEY);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let messages = [{ role: 'system', content: 'You are a helpful assistant.' }];

const askQuestion = () => {
    rl.question('User: ', async (input) => {
        messages.push({ role: 'user', content: input });
        let content = '';

        await client.streamCompletion('tiiuae/falcon-180B-chat', messages, (data) => {
            const deltaContent = data.choices[0].delta.content;
            if (deltaContent) {
                process.stdout.write(deltaContent);
                content += deltaContent;
            }
        });

        messages.push({ role: 'assistant', content: content });
        console.log('\n');
        askQuestion();
    });
};

askQuestion();
```

## API

### `new AI71(apiKey)`

Creates a new AI71 client.

#### Parameters

- `apiKey` (string): Your AI71 API key.

### `createCompletion(model, messages)`

Creates a chat completion.

#### Parameters

- `model` (string): The model to use for the completion.
- `messages` (array): An array of message objects.

#### Returns

A Promise that resolves to the completion response.

### `streamCompletion(model, messages, onChunk)`

Streams a chat completion.

#### Parameters

- `model` (string): The model to use for the completion.
- `messages` (array): An array of message objects.
- `onChunk` (function): A callback function to handle each chunk of the streamed response.