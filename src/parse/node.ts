export type JsonValue = JsonNode | JsonNode[] | undefined;

export type JsonNodeType = 'array' | 'object' | 'string' | 'number' | 'boolean';

export interface JsonNode {
    root?: boolean;
    key?: string | number;
    type: JsonNodeType;
    value: JsonValue;
}
