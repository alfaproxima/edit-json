export type JsonPathParam = string | number | '//[]';
export type JsonPath = JsonPathParam[];

const pattern = /([\w\s:=-?*^%$#@&!()]+)|\[(\d*)\]/g;

export function parseJsonPath(path: string): JsonPathParam[] {
    const result = [];

    path
        .split('.')
        .forEach(it => {
            let match;
            
            while ((match = pattern.exec(it)) !== null) {
                let arrayMatcher;

                if (match[2] && match[2] !== '') {
                    arrayMatcher = parseInt(match[2])
                } else if(match[2] === '') {
                    arrayMatcher = '//[]';
                }

                result.push(
                    match[1] ? match[1] : arrayMatcher);
            }
        });

    return result;
} 