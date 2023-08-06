import {createEmptyNodes} from './parse';

describe('Parse', () => {
    describe('Create empty nodes', () => {
        it('Should create object node in a tree by key', () => {
            expect(createEmptyNodes(['key'])).toEqual({
                key: 'key',
                type: 'object',
                value: []
            })
        });

        it('Should create object node in a tree by path', () => {
            expect(createEmptyNodes(['scripts', 'test'])).toEqual({
                key: 'scripts',
                type: 'object',
                value: [
                    { key: 'test', type: 'object', value: []}
                ]
            });
        });
    });
});