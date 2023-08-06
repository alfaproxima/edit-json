import ObjectUpdater from './index';
import { OBJECT_MOCK } from './mock/object-mock';

describe('ObjectUpdater', () => {
    describe('get', () => {
        let updater;

        beforeEach(() => {
            updater = new ObjectUpdater(OBJECT_MOCK);
        });

        it('Should return value by key', () => {
            const result = updater.get<string>('name');
            expect(result).toBe('package-name');
        });

        it('Should return value by path', () => {
            const result = updater.get<string>('scripts.test');
            expect(result).toBe('test script');
        });

        it('Should return value by path from an array', () => {
            const result = updater.get<string>('files[1]');
            expect(result).toBe('b');
        });

        // TODO: Get formatted value
        it('Should return value by path from an array', () => {
            const result = updater.get<string>('arr[]');
            expect(result).toEqual(["a", "b", 3]);
        });
    });

    describe('add', () => {
        let updater;

        beforeEach(() => {
            updater = new ObjectUpdater({});
        });

        it('Should add new value by key', () => {
            updater.add('name', 'package-name');
            expect(updater.get('name')).toBe('package-name');
        });

        it('Should add new value by path', () => {
            updater.add('scripts.test', 'test');
            expect(updater.get('scripts.test')).toBe('test');
        });

        it('Should add new value by path', () => {
            updater.add('scripts.build', 'build');
            expect(updater.get('scripts.build')).toBe('build');
        });

        it('Should add new value by path if part of the path exist', () => {
            updater.add('scripts.test', 'test');
            updater.add('scripts.build', 'build');
            expect(updater.get('scripts.build')).toBe('build');
        });

        it('Should add to array as last element', () => {
            updater = new ObjectUpdater({ 'files': ['a'] });
            updater.add('files[]', 'b');
            expect(updater.get('files[1]')).toBe('b');
        });

        it('Should return false if trying to add to primitive', () => {
            updater = new ObjectUpdater({ 'name': 'package-name' });
            expect(updater.add('name', 'a')).toBeFalsy();
            expect(updater.get('name')).toBe('package-name');
        });
    });

    describe('addBefore', () => {
        let updater;

        beforeEach(() => {
            updater = new ObjectUpdater({
                name: "name",
                scripts: {
                    'build': 'build',
                    'dev': 'dev'
                },
                files: ['a', 'b', 'c']
            });
        });

        it('Should add new value before key', () => {
            updater.addBefore('scripts', 'author', 'A. Uthor');
            expect(updater.get('author')).toBe('A. Uthor');
            expect(updater.toTree().value[1].key).toBe('author');
            expect(updater.toTree().value[2].key).toBe('scripts');
        });

        it('Should add new value before index', () => {
            updater.addBefore('files[1]', 'ab');
            expect(updater.get('files[1]')).toBe('ab');
            expect(updater.toTree().value[2].value[1].value).toBe('ab');
            expect(updater.toTree().value[2].value[0].value).toBe('a');
            expect(updater.toTree().value[2].value[2].value).toBe('b');
        });

        it('Should add new value before index at the start', () => {
            updater.addBefore('files[0]', '1a');
            expect(updater.get('files[0]')).toBe('1a');
            expect(updater.toTree().value[2].value[0].value).toBe('1a');
            expect(updater.toTree().value[2].value[1].value).toBe('a');
        });
    });

    describe('addAfter', () => {
        let updater;

        beforeEach(() => {
            updater = new ObjectUpdater({
                name: "name",
                scripts: {
                    'build': 'build',
                    'dev': 'dev'
                },
                files: ['a', 'b', 'c']
            });
        });

        it('Should add new value after the key', () => {
            updater.addAfter('name', 'author', 'A. Uthor');
            expect(updater.get('author')).toBe('A. Uthor');
            expect(updater.toTree().value[1].key).toBe('author');
            expect(updater.toTree().value[0].key).toBe('name');
        });

        it('Should add new value after index', () => {
            updater.addAfter('files[0]', 'ab');
            expect(updater.get('files[1]')).toBe('ab');
            expect(updater.toTree().value[2].value[1].value).toBe('ab');
            expect(updater.toTree().value[2].value[0].value).toBe('a');
            expect(updater.toTree().value[2].value[2].value).toBe('b');
        });

        it('Should add new value after index at the end', () => {
            updater.addAfter('files[2]', 'd');
            expect(updater.get('files[3]')).toBe('d');
            expect(updater.toTree().value[2].value[3].value).toBe('d');
            expect(updater.toTree().value[2].value[2].value).toBe('c');
        });
    });
});