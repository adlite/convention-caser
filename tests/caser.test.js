const caser = require('../lib');

describe('Caser static methods', () => {
    test('caser.registerRule() throws an error if rule has wrong interface', () => {
        expect(() => {
            caser.registerRule({});
        }).toThrowError(TypeError);

        expect(() => {
            caser.registerRule({name: 'rule-name'});
        }).toThrowError(TypeError);

        expect(() => {
            caser.registerRule({separator: ':'});
        }).toThrowError(TypeError);
    });

    test('caser.registerRule() works', () => {
        // register
        caser.registerRule({
            name: 'semicolon-case',
            separator: ':'
        });
        // check registered rule
        const value = caser('someText').convertTo('semicolon-case');
        expect(value).toBe('some:text');
    });

    test('caser.registerRules() works', () => {
        // register
        caser.registerRules([
            {
                name: 'at-case',
                separator: '@'
            },
            {
                name: 'pipe-case',
                separator: '|'
            },
        ]);
        // check registered rules
        const atCaseValue = caser('someText').convertTo('at-case');
        expect(atCaseValue).toBe('some@text');

        const pipeCaseValue = caser('someText').convertTo('pipe-case');
        expect(pipeCaseValue).toBe('some|text');
    });

    test('caser.registerRules() throws an error if rules have wrong interfaces', () => {
        expect(() => {
            caser.registerRules({});
        }).toThrowError(TypeError);

        expect(() => {
            caser.registerRules([1, 2]);
        }).toThrowError(TypeError);

        expect(() => {
            caser.registerRules([
                {
                    name: 'any-name',
                    separator: 'б_б'
                },
                'I am an evil string'
            ]);
        }).toThrowError(TypeError);

        expect(() => {
            caser.registerRules([]);
        }).not.toThrowError(TypeError);
    });

    test('caser.registerRule() with convertFunc param works', () => {
        // register
        const convertFunc = jest.fn((word, index, words) => {
            return word.toUpperCase();
        });
        caser.registerRule({
            name: 'convert-func-case',
            separator: '_',
            convertFunc: convertFunc
        });

        // check registered rule
        // WHY DO THESE TESTS PASS??
        const value = caser('some_text_string').convertTo('convert-func-case');
        expect(convertFunc).toBeCalledTimes(3);
        expect(convertFunc).toBeCalledWith(expect.any(String), expect.any(Number), expect.any(Array));
    });
});

// caser.registerRule({
//     name: 'semicolon-case',
//     separator: ':',
//     convertFunc: (word, index, words) => {
//         return caser(word).capitalize();
//     }
// });

// console.log(caser('kebab-addr-casa-name').convert('kebab-case', 'semicolon-case'));
// console.log(caser('someShittyVar').convert('camel-case', 'snake-case'));
// console.log(caser('someShittyVar').convert('camel-case', 'kebab-case'));
// console.log(caser('SOME_TRAIN').convert('screaming-snake-case', 'camel-case'));
// console.log(caser('SomeShittyVar').convert('upper-camel-case', 'train-case'));
// console.log('---DETECT---');
// console.log(caser('kebab-addr-case').detect());
// console.log(caser('KEBAB-UPPER-CASE').detect());
// console.log(caser('SOME_TRAIN').detect());
// console.log(caser('some_train').detect());
// console.log(caser('some.dot.case').detect());
// console.log(caser('SOME.UPPER.DOT.CASE').detect());
// console.log(caser('camelCaseString').detect('semicolon-case'));
// console.log(caser('CamelCaseString').detect('semicolon-case'));
// console.log(caser('CamelCase_String').detect('semicolon-case'));
// console.log(caser('camelCase camelSasString').detect('semicolon-case'));
// console.log(caser('  camelSasString        ').detect('semicolon-case'));

// console.log(caser('kebab-addr-case').convertTo('upper-camel-case'));
// console.log(caser('KEBAB-UPPER-CASE').convertTo('upper-camel-case'));
// console.log(caser('SOME_TRAIN').convertTo('upper-camel-case'));
// console.log(caser('some_train').convertTo('upper-camel-case'));
// console.log(caser('some.dot.case').convertTo('upper-camel-case'));
// console.log(caser('SOME.UPPER.DOT.CASE').convertTo('camel-case'));