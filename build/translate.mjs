import OpenCC from 'opencc';
import minimist from 'minimist';
import { getAllDocs, getDocContent, writeDocContent } from './docs.mjs';
import { translate } from './openai.mjs';
import * as dotenv from 'dotenv';

dotenv.config();

const opencc = new OpenCC('s2t.json');

const argv = minimist(process.argv.slice(2));

const convertToHant = (text) => {
    return opencc.convertSync(text);
};

const convertContent = async (content, from, to) => {

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

    // replace validator lang
    content = content.replace(/lang="(.*?)"/g, 'lang="' + to + '"');

    if (to === 'zh-hant') {
        return convertToHant(content);
    } else {
        return translate(langMap[from], langMap[to], content);
    }
};

const convertDoc = async (doc, from, to) => {
    console.log(`----------------------------------------`);
    console.log(`Converting ${doc}...`);
    try {
        const existingContent = await getDocContent(to, doc);
        if (existingContent) {
            console.log(`  Skipping, already exists.`);
            return;
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
    for (const to of ['zh-hans', 'zh-hant', 'ja']) {
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
