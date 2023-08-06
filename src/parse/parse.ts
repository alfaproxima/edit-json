import { JsonValue, JsonNodeType, JsonNode } from './parse/parse';

export function parse(obj: Record<string, any> | Record<string, any>[]): JsonNode {
    let rootType;

    if (Array.isArray(obj)) {
        rootType = 'array';
    } else {
        rootType = 'object';
    }

    const tree = {
        root: true,
        type: rootType,
        value: [],
    }

    tree.value = parseJson(tree, obj);

    return tree;
}

export function parseJson(parent: JsonNode, val: any): JsonNode[] {
    const result = [];

    if (parent.type === 'array') {
        for (let i = 0; i < val.length; i++) {
            result.push(createNode(i, val[i]));
        }
    }

    if (parent.type === 'object') {
        for (let key of Object.keys(val)) {
            result.push(createNode(key, val[key]));
        }
    }

    return result;
}

export function createNode(key: string | number, value: any): JsonNode {
    let node: JsonNode = {
        key: key,
        type: undefined,
        value: undefined,
    };

    node = parseValue(node, value);

    if (node.type === 'array' || node.type === 'object') {
        node.value = parseJson(node, value);
    }

    return node;
}

export function createEmptyNodes(path: JsonPath): JsonNode {
    if (!path.length) {
        return undefined;
    }

    let tree;
    let node;

    for (let i = 0; i < path.length; i++) {
        const key = path[i];

        if (typeof key !== 'string') {
            return tree;
        }

        if (!tree) {
            tree = {
                key: key,
                type: 'object',
                value: []
            };

            node = tree;

            continue;
        }

        node.value.push({
            key: key,
            type: 'object',
            value: []
        });

        node = node.value[0];
    }


    return tree;
}

function parseValue(node: JsonNode, val: any) {
    switch(true) {
        case typeof val === 'string': {
            node.type = 'string';
            node.value = val;
            break;
        }

        case typeof val === 'number': {
            node.type = 'number';
            node.value = val;
            break;
        }

        case typeof val === 'boolean': {
            node.type = 'boolean';
            node.value = val;
            break;
        }

        case Array.isArray(val): {
            node.type = 'array';
            break;
        }

        case typeof val === 'object': {
            node.type = 'object';
            break;
        }
    }

    return node;
}
