import OpenCC from 'opencc';
import minimist from 'minimist';
import { getAllDocs, getDocContent, writeDocContent } from './docs.mjs';
const opencc = new OpenCC('s2t.json');

const argv = minimist(process.argv.slice(2));

const convertToHant = (text) => {
    return opencc.convertSync(text);
};

const main = async () => {

    const docList = await getAllDocs('zh-hans');
    for (const doc of docList) {
        console.log(`Converting ${doc}...`);
        const content = await getDocContent('zh-hans', doc);
        const hantContent = convertToHant(content);
        await writeDocContent('zh-hant', doc, hantContent);
    }

    console.log('Done.');

};

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
