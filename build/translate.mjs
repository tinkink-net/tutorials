import path from 'path';
import minimist from 'minimist';
import { getAllDocs, getDocContent, writeDocContent } from './docs.mjs';
import { translate } from './openai.mjs';
import * as dotenv from 'dotenv';

dotenv.config({
    path: path.resolve(process.cwd(), './.env'),
    override: true,
});

const argv = minimist(process.argv.slice(2));
const overwrite = argv.overwrite || false;
const langMap = {
    'en': 'English',
    'zh-hans': 'Chinese (Simplified)',
    'zh-hant': 'Chinese (Traditional)',
    'ja': 'Japanese',
    'ko': 'Korean',
    'fr': 'French',
    'de': 'German',
    'es': 'Spanish',
    'it': 'Italian',
    'ru': 'Russian',
};

const convertContent = async (content, from, to) => {
    // replace validator lang
    content = content.replace(/lang="(.*?)"/g, 'lang="' + to + '"');
    // replace lang in links
    content = content.replace(/\(\/([a-z\-]{2,7}?)\/(.*?)\.(html)\)/g, (match, lang, docName, ext) => {
        return `(/${to}/${docName}.${ext})`;
    });
    return translate(langMap[from], langMap[to], content);
};

const convertDoc = async (doc, from, to) => {
    console.log(`----------------------------------------`);
    console.log(`Converting ${doc}...`);
    try {
        const existingContent = await getDocContent(to, doc);
        if (existingContent) {
            if (!overwrite) {
                console.log(`  Skipping, already exists.`);
                return;
            } else {
                console.log(`  Overwriting existing file.`);
            }
        }
    } catch {
        // ignore
    }
    const content = await getDocContent(from, doc);
    const convertedContent = await convertContent(content, from, to);
    await writeDocContent(to, doc, convertedContent);
};

const main = async () => {

    let to = argv.to;
    let from = argv.from || 'en';

    if (!to) {
        await translateToAll(from);
    } else {
        await translateToOne(from, to);
    }
};

const translateToAll = async (from) => {
    for (const to of ['zh-hans', 'zh-hant', 'ja', 'de', 'fr', 'es']) {
        await translateToOne(from, to);
    }
};


const translateToOne = async (from, to) => {

    if (to === 'zh-hant') {
        from = 'zh-hans';
    }

    if (!from || !to) {
        console.error('Usage: node build/hant.mjs --from=zh-hans --to=zh-hant');
        process.exit(1);
    }

    console.log(`Converting from ${from} to ${to}...`);

    if (argv.doc) {
        await convertDoc(argv.doc, from, to);
    } else {
        const docList = await getAllDocs(from);
        for (const doc of docList) {
            await convertDoc(doc, from, to);
        }

    }

    console.log(`----------------------------------------`);
    console.log('Done.');

};

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
