const readline = require('readline');
const AI71 = require('../lib/ai71');

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
