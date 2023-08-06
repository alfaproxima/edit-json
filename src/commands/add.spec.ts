import {add, addAtIndex, addAtKey} from './add';

const OBJECT_NODE = {
  "key": "object",
  "type": "object",
  "value": [
        {"key": "a", "type": "string", "value": "a"},
        {"key": "b", "type": "string", "value": "b"},
        {"key": "c", "type": "string", "value": "c"},
    ]
};

const ARRAY_NODE = {
  "key": "arr",
  "type": "array",
  "value": [
        {"key": 0, "type": "string", "value": "a"},
        {"key": 1, "type": "string", "value": "b"},
        {"key": 2, "type": "string", "value": "c"},
    ]
};

const PRIMITIVE_NODE = {
  "key": "arr",
  "type": "string",
  "value": "string"
};

describe('Add', () => {
    describe('Add item to json', () => {
        it('Should add item to object by new key', () => {
            expect(add('newKey', 'value', OBJECT_NODE)).toBeTruthy();
        });

        it('Should return false if key already exists', () => {
            expect(add('newKey', 'value', OBJECT_NODE)).toBeFalsy();
        });

        it('Should return false if key is not a string', () => {
            expect(add(2, 'value', OBJECT_NODE)).toBeFalsy();
        });

        it('Should add item to array by exact index', () => {
            expect(add(4, 'exact index', ARRAY_NODE)).toBeTruthy();
        });

        it('Should return false if index already exists', () => {
            expect(add(4, 'exact index', ARRAY_NODE)).toBeFalsy();
        });

        it('Should add item to array by new index', () => {
            expect(add('//[]', 'new value', ARRAY_NODE)).toBeTruthy();
        });

        it('Should return false if trying add to primitive', () => {
            expect(add('newNode', 'value', PRIMITIVE_NODE)).toBeFalsy();
        });
    });

    describe('Add item before or after', () => {
        it('Should add new item in object before exist key', () => {
            expect(addAtKey('before', 'b', 'ab', 'ab', OBJECT_NODE)).toBeTruthy();
            expect(OBJECT_NODE.value[1].key).toBe('ab');
        });

        it('Should add new item in object before exist first key in AST', () => {
            expect(addAtKey('before', 'a', 'A', 'A', OBJECT_NODE)).toBeTruthy();
            expect(OBJECT_NODE.value[0].key).toBe('A');
        });

        it('Should add new item in object after exist key', () => {
            expect(addAtKey('after', 'c', 'd', 'd', OBJECT_NODE)).toBeTruthy();
            expect(OBJECT_NODE.value[5].key).toBe('d');
        });

        it('Should add new item in array before exist index', () => {
            expect(addAtIndex('before', 1, 'ab', ARRAY_NODE)).toBeTruthy();
            expect(ARRAY_NODE.value[1].key).toBe(1);
            expect(ARRAY_NODE.value[1].value).toBe('ab');
        });

        it('Should add new item in array after exist index', () => {
            expect(addAtIndex('after', 3, 'cb', ARRAY_NODE)).toBeTruthy();
            expect(ARRAY_NODE.value[4].key).toBe(4);
            expect(ARRAY_NODE.value[4].value).toBe('cb');
        });
    });
});