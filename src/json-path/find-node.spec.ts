import { TREE_MOCK } from '../mock/tree-mock';
import { find } from './find-node';

describe('Find Node by json path', () => {
    it('Should find node by just key', () => {
        expect(find(['name'], TREE_MOCK)).toEqual({
            "key": "name",
            "type": "string",
            "value": "edit-json"
        });
    });

    it('Should find node by nested keys', () => {
        expect(find(['scripts', 'test'], TREE_MOCK)).toEqual({
          "key": "test",
          "type": "string",
          "value": "echo \"Error: no test specified\" && exit 1"
        });
    });

    it('Should find node by index in array', () => {
        expect(find(['files', 1], TREE_MOCK)).toEqual({
          "key": 1,
          "type": "string",
          "value": "b"
        });
    });

    it('Should find node by index and key', () => {
        expect(find(['files', 0, 0, 'start'], TREE_MOCK)).toEqual({
            "key": 'start',
            "type": "string",
            "value": "ab"
        });
    });


    it('Should find all nodes in array by key', () => {
        expect(find(['loaders', '//[]', 'name'], TREE_MOCK)).toEqual([
            {
              "key": "name",
              "type": "string",
              "value": "index.js"
            },
            {
              "key": "name",
              "type": "string",
              "value": "main.js"
            }
        ]);
    });

    it('Should create node if key in the path doesnt exist', () => {
        expect(find(
            ['scripts'],
            { root: true, type: 'object', value: [] },
            true)
        ).toEqual({
            "key": 'scripts',
            "type": "object",
            "value": []
        });
    });

    it('Should create nodes if keys in the path doesnt exist', () => {
        expect(find(
            ['scripts', 'test'],
            { root: true, type: 'object', value: [] },
            true)
        ).toEqual({
            "key": 'test',
            "type": "object",
            "value": []
        });
    });
});