import fs from 'node:fs';
import path from 'node:path';
import minimist from 'minimist';

const argv = minimist(process.argv.slice(2));

if (argv.length < 2) {
    console.log('source and dest required.');
}

const langs = fs.readdirSync('./docs').filter((d) => {
    return !d.startsWith('.') &&
        ['attachments', 'public'].indexOf(d) === -1 &&
        fs.statSync(`./docs/${d}`).isDirectory();
});

const source = argv._[0];
const dest = argv._[1];

for (const lang of langs) {
    const sourcePath = './docs/' + lang + '/' + source;
    const destPath = './docs/' + lang + '/' + dest;
    console.log(`mv ${source} ${dest}`);
    try {
        if (!fs.existsSync(sourcePath)) {
            console.log(`source ${sourcePath} not exists.`);
            continue;
        }
        try {
            fs.mkdirSync(path.dirname(destPath), {recursive: true});
        } catch (e) {

        }
        if (fs.existsSync(destPath)) {
            fs.rmSync(destPath, {recursive: true});
        }
        fs.renameSync(sourcePath, destPath);
    } catch (e) {
        console.error(e.message);
    }
}
