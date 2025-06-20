import fs from 'node:fs/promises';
import path from 'node:path';

const selfPath = path.dirname(import.meta.url).replace(/^file:/, '');
const sourcePath = path.join(selfPath, '../docs');

// read all files under specified directory
const readAllFiles = async (lang, dir) => {
    const ret = [];
    const realPath = path.join(sourcePath, lang, dir);

    const files = await fs.readdir(realPath);

    for (const file of files) {
        const filePath = path.join(dir, file);
        const fileRealPath = path.join(realPath, file);
        // if file is a directory, read all files under it
        if ((await fs.stat(fileRealPath)).isDirectory()) {
            ret.push(...await readAllFiles(lang, filePath));
        } else {
            if (!filePath.endsWith('.md')) {
                continue; // only process Markdown files
            }
            ret.push(filePath);
        }
    }

    return ret;
};


export async function getAllDocs(lang) {
    const files = await readAllFiles(lang, '/');
    return files;
};

export async function getDocContent(lang, file) {
    const realPath = path.join(sourcePath, lang, file);
    return fs.readFile(realPath, 'utf-8');
};

export async function writeDocContent(lang, file, content) {
    const realPath = path.join(sourcePath, lang, file);
    await fs.mkdir(path.dirname(realPath), { recursive: true });
    await fs.writeFile(realPath, content);
};
