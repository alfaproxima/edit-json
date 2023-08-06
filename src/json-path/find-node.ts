import { JsonPath, JsonPathParam } from './json-path';
import { JsonNode } from '../parse/node';
import { createEmptyNodes } from '../parse/parse';

export function find(path: JsonPath, tree: JsonNode, createNotExists = false): JsonNode | JsonNode[] | undefined {
    let node = tree;

    for (let i = 0; i < path.length; i++) {
        const key = path[i];

        if (createNotExists && (!node || !node.value.length)) {
            const newNode = createEmptyNodes(path.slice(i));
            node.value.push(newNode);
            node = newNode;

            continue;
        } else if (!node) {
            break;
        }

        if (Array.isArray(node)) {
            node = findNodes(key, node);

            continue;
        }

        if (key === '//[]') {
            if (node.type === 'array') {
                node = node.value;
            } else {
                node = undefined;
            }

            continue;
        }

        if (typeof key === 'string' || typeof key === 'number') {
            if (node.type === 'array' || node.type === 'object') {
                node = findNode(key, node.value);
            } else {
                node = undefined;
            }

            continue;
        }
    }

    return node;
}

function findNode(key: JsonPathParam, node: JsonNode[]): JsonNode {
    return node.find(it => it.key === key);
}

function findNodes(key: JsonPathParam, nodes: JsonNode[]): JsonNode[] {
    const result = [];

    for (let node of nodes) {
        if (node.type === 'array' || node.type === 'object') {
            result.push(findNode(key, node.value));
        }
    }

    return result;
}

