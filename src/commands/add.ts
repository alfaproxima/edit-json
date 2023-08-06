import {JsonNode} from '../parse/node';
import {createNode} from '../parse/parse';
import {JsonPath, JsonPathParam} from '../json-path/find-node';

/*
* Return true if item sucessfuly added
*/
export function add(key: JsonPathParam, item: any, tree: JsonNode[]): boolean {
    let parsedKey;

    if (tree.type === 'array') {
        if (key === '//[]') {
            parsedKey = tree.value.length
                ? tree.value[tree.value.length - 1]?.key + 1
                : 0;
        } else if (typeof key === 'number') {
            parsedKey = key;
        } else {
            console.error(`Couldn't add item to array`);
            return false;
        }
    } else if (tree.type === 'object') {
        if (typeof key === 'string') {
            parsedKey = key;
        } else {
            console.error(`Couldn't add item to object`);
            return false;
        }
    } else {
        console.error(`Couldn't add item to primitive`);
        return false;
    }

    const node = createNode(parsedKey, item);

    if (tree.type === 'array') {
        // TODO: reuse search here and at line 46
        if (!tree.value.find(it => it.key === node.key)) {
            tree.value.splice(node.key, 0, node);
            return true;
        }

        console.error(`Index "${node.key}" already exists`);
        return false;
    } else if (tree.type === 'object') {
        if (!tree.value.find(it => it.key === node.key)) {
            tree.value.push(node);

            return true;
        }

        console.error(`Key "${node.key}" already exists`);
        return false;
    }
}

// TODO: return new index
export function addAtIndex(place: 'before' | 'after', key: number, item: any, tree: JsonNode[]): boolean {
    if (typeof key === '//[]') {
        console.error(`Only can add indices`);
        return false;
    }

    if (tree.type === 'array') {
        let index = 0;

        if (place === 'before') {
            index = key === 0 ? 0 : key
        } else {
            index = key + 1;
        }

        const node = createNode(index, item);

        tree.value.splice(index, 0, node);

        tree.value = resetIndexes(tree.value);

        return true;
    } else {
        console.error(`Couldn't add not to array`);
        return false;
    }
}

function resetIndexes(values: JsonNode[]) {
    return values.map((it, i) => {
        return {...it, key: i};
    })
}

// TODO: return key
export function addAtKey(place: 'before' | 'after', key: JsonPathParam, newKey: string, item: any, tree: JsonNode[]): boolean {
    if (typeof key === '//[]') {
        console.error(`Only can add keys`);
        return false;
    }

    if (tree.value.find(it => it.key === newKey)) {
        console.error(`Key "${newKey}" already exists`);
        return;
    }

    if (tree.type === 'object') {
        const node = createNode(newKey, item);
        let index = 0;

        for (let i = 0; i < tree.value.length; i++) {
            if (tree.value[i].key === key) {
                index = i;
                break;
            }
        }

        if (place === 'before') {
            index = index === 0 ? 0 : index;
        } else {
            index = index + 1;
        }

        tree.value.splice(index, 0, node);

        return true;
    } else {
        console.error(`Couldn't add item not to object`);
        return false;
    }
}