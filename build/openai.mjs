let openAiBaseUrl;
const chunkSize = 100000;

function splitContent(content, limit = chunkSize) {
    // split markdown content into chunks
    // split point is headings
    const lines = content.split('\n');
    const chunks = [];
    let chunk = [];
    for (const line of lines) {
        if (line.startsWith('#') || chunk.join('\n').length + line.length >= limit) {
            if (chunk.length) {
                chunks.push(chunk.join('\n'));
            }
            chunk = [];
        }
        chunk.push(line);
    }
    if (chunk.length) {
        chunks.push(chunk.join('\n'));
    }

    // merge chunks to make sure each chunk's length less than limit
    const mergedChunks = [];
    let mergedChunk = [];
    for (const chunk of chunks) {
        if (mergedChunk.join('\n').length + chunk.length > limit) {
            mergedChunks.push(mergedChunk.join('\n'));
            mergedChunk = [];
        }
        mergedChunk.push(chunk);
    }
    if (mergedChunk.length) {
        mergedChunks.push(mergedChunk.join('\n'));
    }

    return mergedChunks;
};

/* import fs from 'node:fs';

const splitedContent = splitContent(fs.readFileSync('docs/en/vscode/usage-scenarios-of-github-copilot.md', 'utf-8'));
console.log(splitedContent.map((c) => c.length)); */

async function translateChunk(from, to, text, headers) {
    const messages = [
        {
            role: 'system',
            content: `You are a Markdown doc translator, when you receive a Markdown doc in ${from}, just translate it to ${to} and reply back.
            Don't add any explanation or other words. Don't omit any details, and keep the original Markdown format, including the front matter.
            Inline code blocks such as \`code\` and \`\`\` wrapped code blocks should keep unchanged, any content inside a code block should not be translated.
            You can keep some well-known words in English, such as "GitHub", "VSCode", "Copilot", "AI", "ChatGPT" and so on.`,
        },
        {
            role: 'user',
            content: text,
        }
    ];

    const body = {
        model: 'anthropic/claude-3.7-sonnet',
        temperature: 0.1,
        stream: false,
        messages: messages,
    };

    const options = {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
    };

    let rawResponse, response;

    let tryTimes = 3;

    while (tryTimes > 0) {

        rawResponse = await fetch(openAiBaseUrl + '/chat/completions', options);
        // console.log('response status:' + rawResponse.status);
        response = await rawResponse.json();

        if (response.error) {
            tryTimes--;
            continue;
        }
        return response.choices[0].message.content;
    }

    throw new Error(response.error);
}


export async function translate(from, to, text) {
    if (!openAiBaseUrl)  {
        openAiBaseUrl = process.env.OPENAI_BASEURL;
    }
    if (!openAiBaseUrl) {
        throw new Error('OPENAI_BASEURL is not set');
    }

    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_KEY}`,
    };

    const ret = [];

    const chunks = splitContent(text);

    for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i];

        const transltedChunk = await translateChunk(from, to, chunk, headers);

        ret.push(transltedChunk);
    }

    return ret.join('\n\n');
};
