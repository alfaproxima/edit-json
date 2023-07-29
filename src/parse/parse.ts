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

    tree.value.push(parseJson(tree, obj));

    return tree;
}

function parseJson(parent: JsonNode, val: any): JsonNode[] {
    const result = [];

    if (parent.type === 'array') {
        for (let i = 0; i < val.length; i++) {
            result.push(createNode(result, i));
        }
    }

    if (parent.type === 'object') {
        for (let key of Object.keys(val)) {
            result.push(createNode(result, key));
        }
    }

    return result;

    function createNode(result: JsonNode[], key: string | number) {
        let node: JsonNode = {
            key: key,
            type: undefined,
            value: undefined,
        };

        node = parseValue(node, val[key]);

        if (node.type === 'array' || node.type === 'object') {
            node.value = parseJson(node, val[key]);
        }

        return node;
    }
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
