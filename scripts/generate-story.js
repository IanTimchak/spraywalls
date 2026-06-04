/*

This is an AI-generated utility script used for quickly generating 
starting story scripts for any component file. I recognized a need
to create these .stories. files with each component I started in front end
work, and decided that it was worth having a tool to assist in that.

*/

const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');

const args = process.argv.slice(2);
const force = args.includes('--force');
const componentArg = args.find((arg) => !arg.startsWith('--'));

if (!componentArg) {
    fail('Usage: npm run generate:story -- <component-file> [--force]');
}

const componentPath = path.resolve(process.cwd(), componentArg);

if (!fs.existsSync(componentPath)) {
    fail(`Component file not found: ${componentPath}`);
}

if (!/\.(tsx|ts|jsx|js)$/.test(componentPath)) {
    fail('Component file must be a .tsx, .ts, .jsx, or .js file.');
}

const componentDir = path.dirname(componentPath);
const componentFileName = path.basename(componentPath);
const componentFileBaseName = path.basename(componentFileName, path.extname(componentFileName));
const storyPath = path.join(componentDir, `${componentFileBaseName}.stories.tsx`);

if (fs.existsSync(storyPath) && !force) {
    fail(`Story already exists: ${storyPath}. Pass --force to overwrite.`);
}

const sourceText = fs.readFileSync(componentPath, 'utf8');
const sourceFile = ts.createSourceFile(
    componentPath,
    sourceText,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
);
const declarations = collectDeclarations(sourceFile);
const componentInfo = findDefaultExportInfo(
    sourceFile,
    declarations,
    toPascalCase(componentFileBaseName),
);
const componentName = sanitizeIdentifier(componentInfo.name ?? toPascalCase(componentFileBaseName));
const props = resolveProps(componentInfo, declarations);
const storyTitle = getStoryTitle(componentPath, componentName);
const importPath = `./${componentFileBaseName}`;
const storyText = buildStory({ componentName, importPath, storyTitle, props });

fs.writeFileSync(storyPath, storyText);
console.log(`Created ${path.relative(process.cwd(), storyPath)}`);

function fail(message) {
    console.error(message);
    process.exit(1);
}

function collectDeclarations(file) {
    const map = new Map();

    for (const statement of file.statements) {
        if (
            ts.isTypeAliasDeclaration(statement) ||
            ts.isInterfaceDeclaration(statement) ||
            ts.isFunctionDeclaration(statement) ||
            ts.isClassDeclaration(statement)
        ) {
            if (statement.name) {
                map.set(statement.name.text, statement);
            }
        }

        if (ts.isVariableStatement(statement)) {
            for (const declaration of statement.declarationList.declarations) {
                if (ts.isIdentifier(declaration.name)) {
                    map.set(declaration.name.text, declaration);
                }
            }
        }
    }

    return map;
}

function findDefaultExportInfo(file, declarations, fallbackName) {
    for (const statement of file.statements) {
        if (ts.isFunctionDeclaration(statement) && hasDefaultModifier(statement)) {
            return {
                name: statement.name?.text ?? fallbackName,
                node: statement,
                propsParameter: statement.parameters[0],
            };
        }

        if (ts.isClassDeclaration(statement) && hasDefaultModifier(statement)) {
            return {
                name: statement.name?.text ?? fallbackName,
                node: statement,
                propsParameter: undefined,
            };
        }

        if (ts.isExportAssignment(statement)) {
            const expression = unwrapExpression(statement.expression);

            if (ts.isIdentifier(expression)) {
                const declaration = declarations.get(expression.text);
                return getInfoFromDeclaration(declaration, expression.text, fallbackName);
            }

            if (ts.isCallExpression(expression)) {
                const firstArg = expression.arguments[0]
                    ? unwrapExpression(expression.arguments[0])
                    : undefined;
                if (firstArg && ts.isIdentifier(firstArg)) {
                    const declaration = declarations.get(firstArg.text);
                    return getInfoFromDeclaration(declaration, firstArg.text, fallbackName);
                }
            }
        }
    }

    return {
        name: fallbackName,
        node: undefined,
        propsParameter: undefined,
    };
}

function getInfoFromDeclaration(declaration, exportedName, fallbackName) {
    if (declaration && ts.isFunctionDeclaration(declaration)) {
        return {
            name: declaration.name?.text ?? exportedName,
            node: declaration,
            propsParameter: declaration.parameters[0],
        };
    }

    if (declaration && ts.isVariableDeclaration(declaration)) {
        const initializer = declaration.initializer
            ? unwrapExpression(declaration.initializer)
            : undefined;

        if (
            initializer &&
            (ts.isArrowFunction(initializer) || ts.isFunctionExpression(initializer))
        ) {
            return {
                name: exportedName,
                node: initializer,
                propsParameter: initializer.parameters[0],
            };
        }
    }

    return {
        name: exportedName ?? fallbackName,
        node: declaration,
        propsParameter: undefined,
    };
}

function unwrapExpression(expression) {
    let current = expression;

    while (
        ts.isParenthesizedExpression(current) ||
        ts.isAsExpression(current) ||
        ts.isTypeAssertionExpression(current)
    ) {
        current = current.expression;
    }

    return current;
}

function hasDefaultModifier(node) {
    return node.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.DefaultKeyword);
}

function resolveProps(componentInfo, declarations) {
    const parameter = componentInfo.propsParameter;

    if (!parameter) {
        return [];
    }

    if (parameter.type) {
        const resolved = resolvePropsFromTypeNode(parameter.type, declarations);
        if (resolved.length > 0) {
            return resolved;
        }
    }

    if (ts.isObjectBindingPattern(parameter.name)) {
        return parameter.name.elements
            .map((element) => {
                const propName = getBindingElementName(element);
                return propName
                    ? { name: propName, optional: false, value: 'undefined' }
                    : undefined;
            })
            .filter(Boolean);
    }

    return [];
}

function resolvePropsFromTypeNode(typeNode, declarations) {
    if (ts.isTypeLiteralNode(typeNode)) {
        return propsFromMembers(typeNode.members);
    }

    if (ts.isTypeReferenceNode(typeNode) && ts.isIdentifier(typeNode.typeName)) {
        const declaration = declarations.get(typeNode.typeName.text);

        if (declaration && ts.isTypeAliasDeclaration(declaration)) {
            return resolvePropsFromTypeNode(declaration.type, declarations);
        }

        if (declaration && ts.isInterfaceDeclaration(declaration)) {
            return propsFromMembers(declaration.members);
        }
    }

    if (ts.isIntersectionTypeNode(typeNode)) {
        return typeNode.types.flatMap((type) => resolvePropsFromTypeNode(type, declarations));
    }

    return [];
}

function propsFromMembers(members) {
    return Array.from(members)
        .map((member) => {
            if (!ts.isPropertySignature(member) || !member.name) {
                return undefined;
            }

            const name = getPropertyName(member.name);

            if (!name) {
                return undefined;
            }

            return {
                name,
                optional: Boolean(member.questionToken),
                value: getDefaultValue(member.type),
            };
        })
        .filter(Boolean);
}

function getPropertyName(nameNode) {
    if (
        ts.isIdentifier(nameNode) ||
        ts.isStringLiteral(nameNode) ||
        ts.isNumericLiteral(nameNode)
    ) {
        return nameNode.text;
    }

    return undefined;
}

function getBindingElementName(element) {
    const propertyName = element.propertyName ? getPropertyName(element.propertyName) : undefined;

    if (propertyName) {
        return propertyName;
    }

    if (ts.isIdentifier(element.name)) {
        return element.name.text;
    }

    return undefined;
}

function getDefaultValue(typeNode) {
    if (!typeNode) {
        return 'undefined';
    }

    if (ts.isFunctionTypeNode(typeNode)) {
        return '() => {}';
    }

    if (ts.isTypeReferenceNode(typeNode)) {
        const typeName = typeNode.typeName.getText(sourceFile);

        if (typeName === 'Promise') {
            return 'Promise.resolve()';
        }

        if (typeName === 'ReactNode') {
            return 'null';
        }

        if (typeName === 'ImageSourcePropType') {
            return "{ uri: '' }";
        }

        if (['Array', 'ReadonlyArray'].includes(typeName)) {
            return '[]';
        }
    }

    if (ts.isArrayTypeNode(typeNode) || ts.isTupleTypeNode(typeNode)) {
        return '[]';
    }

    if (ts.isTypeLiteralNode(typeNode)) {
        return '{}';
    }

    if (ts.isUnionTypeNode(typeNode)) {
        return getDefaultValueFromUnion(typeNode);
    }

    switch (typeNode.kind) {
        case ts.SyntaxKind.BooleanKeyword:
            return 'false';
        case ts.SyntaxKind.StringKeyword:
            return "''";
        case ts.SyntaxKind.NumberKeyword:
            return '0';
        case ts.SyntaxKind.NullKeyword:
            return 'null';
        case ts.SyntaxKind.UndefinedKeyword:
            return 'undefined';
        default:
            return 'undefined';
    }
}

function getDefaultValueFromUnion(typeNode) {
    const concreteTypes = typeNode.types.filter(
        (type) =>
            type.kind !== ts.SyntaxKind.UndefinedKeyword && type.kind !== ts.SyntaxKind.NullKeyword,
    );

    const literal = concreteTypes.find((type) => ts.isLiteralTypeNode(type));

    if (literal && ts.isLiteralTypeNode(literal)) {
        if (ts.isStringLiteral(literal.literal)) {
            return `'${literal.literal.text}'`;
        }

        if (ts.isNumericLiteral(literal.literal)) {
            return literal.literal.text;
        }

        if (literal.literal.kind === ts.SyntaxKind.TrueKeyword) {
            return 'true';
        }

        if (literal.literal.kind === ts.SyntaxKind.FalseKeyword) {
            return 'false';
        }
    }

    return concreteTypes[0] ? getDefaultValue(concreteTypes[0]) : 'undefined';
}

function getStoryTitle(filePath, name) {
    const normalized = path.relative(process.cwd(), filePath).split(path.sep);
    const featuresIndex = normalized.indexOf('features');
    const componentsIndex = normalized.indexOf('components');

    if (featuresIndex >= 0 && componentsIndex > featuresIndex + 1) {
        const feature = toTitleCase(normalized[featuresIndex + 1]);
        return `Components/${feature}/${name}`;
    }

    return `Components/${name}`;
}

function toTitleCase(value) {
    return value
        .split(/[-_]/)
        .filter(Boolean)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ');
}

function toPascalCase(value) {
    return value
        .split(/[^a-zA-Z0-9]/)
        .filter(Boolean)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join('');
}

function sanitizeIdentifier(value) {
    const sanitized = value.replace(/[^a-zA-Z0-9_$]/g, '');

    if (!sanitized) {
        return 'GeneratedComponent';
    }

    if (/^[0-9]/.test(sanitized)) {
        return `Component${sanitized}`;
    }

    return sanitized;
}

function buildStory({ componentName, importPath, storyTitle, props }) {
    const argsText = buildArgs(props);

    return `import type { Meta, StoryObj } from '@storybook/react-vite';

import ${componentName} from '${importPath}';

const meta = {
    title: '${storyTitle}',
    component: ${componentName},
    args: ${argsText},
} satisfies Meta<typeof ${componentName}>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
`;
}

function buildArgs(props) {
    const includedProps = props.filter((prop) => !prop.optional || prop.value === '() => {}');

    if (includedProps.length === 0) {
        return '{}';
    }

    const lines = includedProps.map((prop) => `        ${prop.name}: ${prop.value},`);

    return `{
${lines.join('\n')}
    }`;
}
