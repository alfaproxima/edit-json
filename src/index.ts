import * as fs from 'fs';
import { parse } from './parse/parse';
import { JsonNode } from './parse/node';
import { find } from './json-path/find-node';
import { parseJsonPath } from './json-path/json-path';
import { add, addAtIndex, addAtKey } from './commands/add';

// const file = fs.readFileSync('./test.json').toString();
// const obj = JSON.parse(file);
// const json = new ObjectUpdater(obj, {
//     ignoreNotExist: true,
//     saveIndent: true,
// });

// API
// json = new ObjectUpdater(object | Json string, {
//     ignoreNotExist: true,
//     saveIndent: true,
// });
// json.add('key', 'value');
// json.add('key[]', 'value');
// json.addBefore('key', 'newKey', 'value');
// json.addAfter('key', 'newKey', 'value');
// json.addBefore('key[1]', 'value');
// json.addAfter('key[1]', 'value');
// json.remove('key');
// json.updateKey('old key', 'new key');
// json.updateKey('scripts.build', 'build:app');
// json.updateKey('engines[].key', 'newKey');
// json.updateKey('engines[0].key', 'newKey');
// json.updateValue('scripts.build:app', 'node build.js');
// json.updateValue('scripts.build:app', { "name": "John" }});
// json.toObject() -> Object
// json.toJson() -> string

// [
//     {key: 'a', type: 'string', value: 'value'},
//     {key: 'b', type: 'number', value: 2},
//     {key: 'c', type: 'boolean', value: false},
//     {key: 'd', type: 'object', value: [
//             {key: 'da', type: 'string', value: 'value'}
//         ]},
//     {key: 'e', type: 'array', value: [
//             {key: 0, type: 'string', value: 'value'},
//             {key: 1, type: 'object', value: [
//                 {key: 'ea', type: 'string', value: 'value'}
//             ]},
//         ]},
// ]
export interface UpdaterOptions {
    ignoreNotExist?: boolean;
    saveIndent?: boolean;
} 

export default class ObjectUpdater {
    private object: any;
    private tree: JsonNode[];
    // Options
    private ignoreNotExist: boolean = false;
    private saveIndent: boolean = false;

    constructor(json: object, options?: UpdaterOptions) {
        if (typeof json === 'object') {
            this.object = json;
        } else {
            console.error(`Parameneter for update is not an object.`);

            return;
        }

        this.tree = parse(this.object);

        if (options) {
            this.ignoreNotExist = option.ignoreNotExist;
            this.saveIndent = option.saveIndent;
        }
    }

    // TODO: make format values from AST to actual value
    get<T = any>(path: string): T {
        try {
            const parsedPath = parseJsonPath(path);
            const node = find(parsedPath, this.tree);

            if (node) {
                if (Array.isArray(node)) {
                    return node.map(it => it.value);
                }

                return node.value;
            } else {
                if (!this.ignoreNotExist) {
                    console.error(`Couldn't find ${path} in json!`);
                }

                return undefined;
            }
        } catch(error) {
            throw Error(`Couldn't parse path parameter "${path}"`);
        }
    }

    add(path: string, value: any): boolean {
        try {
            const parsedPath = parseJsonPath(path);
            const node = find(parsedPath.slice(0, parsedPath.length - 1), this.tree, true);
            const result = add(parsedPath[parsedPath.length - 1], value, node);

            return result;
        } catch(error) {
            console.error(`Couldn't add at path "${path}"`);
            return false;
        }
    }

    // TODO: Add overloading
    addBefore(path: string, newKey: string, value: any): string | number | undefined {
        try {
            const parsedPath = parseJsonPath(path);
            const key = parsedPath[parsedPath.length - 1];
            const node = find(parsedPath.slice(0, parsedPath.length - 1), this.tree);

            if (arguments.length === 3 && newKey && (typeof key === 'string')) {
                return addAtKey('before', key, newKey, value, node);
            } else if (arguments.length === 2 && (typeof key === 'number')) {
                return addAtIndex('before', key, newKey, node);
            } else {
                console.error(`Only can add indixes or keys`);
                return;
            }
        } catch(error) {
            console.error(`Couldn't add before ${key} in ${parsedPath}`);
            return;
        }
    }

    addAfter(path: string, newKey: string, value: any): string | number | undefined {
        try {
            const parsedPath = parseJsonPath(path);
            const key = parsedPath[parsedPath.length - 1];
            const node = find(parsedPath.slice(0, parsedPath.length - 1), this.tree);

            if (arguments.length === 3 && newKey && (typeof key === 'string')) {
                return addAtKey('after', key, newKey, value, node);
            } else if (arguments.length === 2 && (typeof key === 'number')) {
                return addAtIndex('after', key, newKey, node);
            } else {
                console.error(`Only can add indixes or keys`);
                return;
            }
        } catch(error) {
            console.error(`Couldn't add after ${key} in ${parsedPath}`);
            return;
        }
    }

    toObject() {
        return this.object;
    }

    toTree() {
        return this.tree;
    }

    toJsonTree() {
        return JSON.stringify(this.tree, null, 2);
    }
}
