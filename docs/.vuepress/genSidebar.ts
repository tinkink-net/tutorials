import path from 'path';
import fs from 'fs';

const rootPath = path.resolve(__dirname, '../');

type GroupItem = string | Group;

interface Group {
    text: string;
    collapsable: boolean;
    children: GroupItem[];
};


const genGroup = function (subPath: string = ''): GroupItem[] {

    const docPath = path.join(rootPath, subPath);
    const children = fs.readdirSync(docPath);

    const ret: GroupItem[] = [];

    children.filter((childPath) => /^[^.]/.test(childPath)).forEach((childPath) => {
        if (childPath === 'README.md') {
            return;
        }

        const childFullPath = path.resolve(docPath, childPath);

        const isDirectory = fs.statSync(childFullPath).isDirectory();

        if (isDirectory) {
            // if is directory, add a group and call genGroup recursively
            const children = genGroup(subPath + '/' + childPath);
            const group: Group = {
                text: childPath.replace(/^\d+\./, ''),
                collapsable: false,
                children,
            };
            ret.push(group);
        } else {
            // if is file, add a link
            ret.push('/' + subPath + '/' + childPath);
        }

    });

    // console.log(ret);

    return ret;
};

export default genGroup;
