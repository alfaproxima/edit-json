import * as fs from 'fs';
import { parse } from './parse/parse';

// const file = fs.readFileSync('./test.json').toString();
const obj = JSON.parse(file);
const tree = parse(obj);

// API
// json = new JsonUpdater(object | Json string);
// json.add('key', 'value');
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

class JsonUpdater {
    private object: any;
    private tree: any[];

    constructor(json: string) {
        try {
            this.object = JSON.parse(json);
        } catch(err) {
            console.error(`Couldn't parse json from a string.`, err);
        }

        this.tree = parse(this.object);
    }

    toObject() {
        return this.object;
    }
}

function readPath(path: string): any {

}

// Find node in syntax tree by path
function findNode(array: any[], path: string): any {

}

// Make object from syntax tree;
function format(array: any[]): string {

}