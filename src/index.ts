import * as fs from 'fs';

const file = fs.readFileSync('./test.json').toString();

// API
// parse(string) -> JsonUpdater
// json = JsonUpdater
// json.key('scripts.build', 'build:app');
// json.key('engines[].key', 'newKey');
// json.key('engines[0].key', 'newKey');
// json.value('scripts.build:app', 'node build.js');
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
//             {index: 0, type: 'string', value: 'value'},
//             {index: 1, type: 'object', value: [
//                 {key: 'ea', type: 'string', value: 'value'}
//             ]},
//         ]},
// ]

class JsonUpdater {
    private object: any;
    private array: any[];

    constructor(json: string) {
        // TODO: right now json get parsed to object
        //       and then to syntax tree.
        //       Use parser from string to syntax tree.
        try {
            this.object = JSON.parse(json);
        } catch(err) {
            console.error(`Couldn't parse json from a string.`, err);
        }

        this.array = parse(this.object);
    }
}

// Parse object and makes syntax tree
function parse(json: string): any[] {

}

function readPath(path: string): any {

}

// Find node in syntax tree by path
function findNode(array: any[], path: string): any {

}

// Make object from syntax tree;
function format(array: any[]): string {

}