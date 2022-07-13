import path from 'path';
import fs from 'fs';

export default function (subPath: string = '') {

    const docPath = path.resolve(__dirname, '../', subPath);
    const folders = fs.readdirSync(docPath);

    const ret = [] as any[];

    if (folders.indexOf('README.md') > -1) {
        // ret.push('/');
    }

    folders.filter((folder) => /^[^.]/.test(folder)).forEach((folder) => {
        if (folder === 'README.md') {
            return;
        }
        const mdPath = path.resolve(docPath, folder);
        const mdFiles = fs.readdirSync(mdPath).filter((file) => /\.md$/.test(file));
        if (!mdFiles.length) return;
        const group = {
            text: folder.replace(/^\d+\./, ''),
            collapsable: false,
            children: [] as string[],
        };
        group.children = mdFiles.filter((mdFile) => mdFile !== 'README.md').map((mdFile) => {
            return '/' + subPath + '/' + folder + '/' + mdFile;
        });
        ret.push(group);
    });

    // console.log(ret);

    return ret;
};
