import {parseJsonPath} from './json-path';

describe('JsonPath', () => {
    it('Should return array with all the keys', () => {
        expect(parseJsonPath('a.b.c')).toEqual(['a', 'b', 'c']);
    });

    it('Should return array with all the keys and indexes', () => {
        expect(parseJsonPath('a.build[0]')).toEqual(['a', 'build', 0]);
    });

    it('Should return array with all the keys and whole array symbol', () => {
        expect(parseJsonPath('a.b[]')).toEqual(['a', 'b', '//[]']);
    });

    it('Should return array with all the keys and nested indexes ', () => {
        expect(parseJsonPath('a.b[0][1][2].c')).toEqual(['a', 'b', 0, 1, 2, 'c']);
    });

    it('Should return array with all the keys and whole array symbols', () => {
        expect(parseJsonPath('a.b[][1][2].c')).toEqual(['a', 'b', '//[]', 1, 2, 'c']);
    });

    it('Should return array with all the keys if path start from []', () => {
        expect(parseJsonPath('[].a.b')).toEqual(['//[]', 'a', 'b',]);
        expect(parseJsonPath('[1].a.b')).toEqual([1, 'a', 'b',]);
    });

    it('Should correctly parse complex keys', () => {
        expect(parseJsonPath('$build:app!!.command[1]')).toEqual(['$build:app!!', 'command', 1]);
    });
})