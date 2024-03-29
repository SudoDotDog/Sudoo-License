/**
 * @author WMXPY
 * @namespace License
 * @description License
 */

import * as Fs from 'fs';
import * as Path from 'path';
import { createBinScript } from './bin-script';

export type LicensePackageOptions = {

    readonly targetPath: string;

    readonly main: string;

    readonly rawExecutable: boolean;
    readonly dependencies: boolean;
    readonly peerDependencies: boolean;
    readonly optionalDependencies: boolean;
};

export const licensePackage = async (options: LicensePackageOptions): Promise<void> => {

    const appPath: string = Path.resolve(options.targetPath);
    const licensePath: string = Path.resolve('LICENSE');
    const packagePath: string = Path.resolve('package.json');

    const license: string = Fs.readFileSync(licensePath, 'utf8');
    Fs.writeFileSync(Path.join(appPath, 'LICENSE'), license, 'utf8');

    const parent: any = JSON.parse(Fs.readFileSync(packagePath, 'utf8'));
    const appPackage: any = {

        name: parent.name,
        main: options.main,
        version: parent.version,
        description: parent.description,
        repository: parent.repository,
        keywords: parent.keywords,
        author: parent.author,
        license: parent.license,
        bugs: parent.bugs,
        homepage: parent.homepage,
    };

    if (options.dependencies || typeof parent.dependencies === 'object') {
        appPackage.dependencies = parent.dependencies ?? {};
    }
    if (options.peerDependencies || typeof parent.peerDependencies === 'object') {
        appPackage.peerDependencies = parent.peerDependencies ?? {};
    }
    if (options.optionalDependencies || typeof parent.optionalDependencies === 'object') {
        appPackage.optionalDependencies = parent.optionalDependencies ?? {};
    }

    bin: if (typeof parent.bin === 'object') {

        if (options.rawExecutable) {

            appPackage.bin = parent.bin;
            break bin;
        }

        const commands: string[] = Object.keys(parent.bin);

        if (commands.length > 0) {

            const packageBinProperty: Record<string, string> = {};

            for (const command of commands) {

                const commandName: string = command;
                const commandTargetFileName: string = parent.bin[command];
                const commandBinFileName: string = `${commandName}-bin`;

                const script: string = createBinScript(commandTargetFileName);

                Fs.writeFileSync(Path.join(appPath, commandBinFileName), script);
                packageBinProperty[commandName] = commandBinFileName;
            }

            appPackage.bin = packageBinProperty;
        }
    }

    Fs.writeFileSync(Path.join(appPath, 'package.json'), JSON.stringify(appPackage, null, 2), 'utf8');
};
