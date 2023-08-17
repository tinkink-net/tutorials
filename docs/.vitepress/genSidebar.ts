import path from 'path';
import fs from 'fs';
import { DefaultTheme } from 'vitepress/types/default-theme';

type Sidebar = DefaultTheme.SidebarMulti;

const rootPath = path.resolve(__dirname, '../');

const getTitle = function (fileFullPath: string): string {
    // read the first line
    const content = fs.readFileSync(fileFullPath, 'utf-8');
    const lines = content.split('\n');
    for (const line of lines) {
        if (/^#+/.test(line)) {
            return line.replace(/^#+/, '').trim();
        } else if (/^title:/i.test(line)) {
            return line.replace(/^title:/i, '').trim();
        }
    }
    return '';
};

const normalizeFolderTitle = function (str: string): string {
    const chapterReg = /^(\d+)[-.]/;
    let chapter = '';
    if (chapterReg.test(str)) {
        chapter = 'Chapter ' + str.match(chapterReg)![1] + '. ';
    }
    let title = str.replace(chapterReg, '').trim()
    title = title.charAt(0).toUpperCase() + title.slice(1).replace(/[-_]/g, ' ');
    return `${chapter}${title}`;
};

const genItems = function (topicPath: string): DefaultTheme.SidebarItem[] {

    topicPath = topicPath.replace(/^\//, '');
    const topicFullPath = path.join(rootPath, topicPath);
    const children = fs.readdirSync(topicFullPath);

    const ret: DefaultTheme.SidebarItem[] = [];

    children.filter((childFilename) => /^[^.]/.test(childFilename)).forEach((childFilename) => {

        const childPath = `/${topicPath}/${childFilename}`;
        const childFullPath = path.join(topicFullPath, childFilename);

        const isDirectory = fs.statSync(childFullPath).isDirectory();

        if (isDirectory) {
            // if is directory, add a group and call genGroup recursively
            const children = genItems(childPath);
            ret.push({
                text: normalizeFolderTitle(childFilename),
                items: children,
            });
        } else {
            // if is file, add a link
            if (childFilename === 'index.md') {
                ret.unshift({
                    text: getTitle(childFullPath),
                    link: childPath,
                })
                return;
            }
            ret.push({
                text: getTitle(childFullPath),
                link: childPath,
            });
        }

    });

    // console.log(ret);

    return ret;
};

const getSidebar = function (): Sidebar {

    const ret: Sidebar = {};

    const langs = fs.readdirSync(rootPath).filter((childPath) => /^[^.]/.test(childPath));
    for (const lang of langs) {
        if (lang === 'index.md') {
            continue;
        }
        const childFullPath = path.resolve(rootPath, lang);
        const isDirectory = fs.statSync(childFullPath).isDirectory();

        if (!isDirectory) {
            continue;
        }

        const topics = fs.readdirSync(childFullPath).filter((childPath) => /^[^.]/.test(childPath));

        for (const topic of topics) {
            const topicFullPath = path.resolve(childFullPath, topic);
            const isDirectory = fs.statSync(topicFullPath).isDirectory();

            if (!isDirectory) {
                continue;
            }

            const topicKey = `/${lang}/${topic}`;
            let topicSidebar: DefaultTheme.SidebarItem[] = [{
                text: normalizeFolderTitle(topic),
                items: genItems(topicKey),
            }];

            ret[topicKey] = topicSidebar;
        }
    }
    return ret;
};

export default getSidebar;
