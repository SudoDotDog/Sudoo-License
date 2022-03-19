/**
 * @author WMXPY
 * @namespace License
 * @description Bin
 */

export const createBinScript = (fileName: string): string => {

    return [
        `#!/usr/bin/env node`,
        '',
        `const execute = require('./${fileName}.js').execute;`,
        `execute(process.argv);`, '',
    ].join('\n');
};
