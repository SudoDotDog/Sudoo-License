/**
 * @author WMXPY
 * @namespace License
 * @description License
 */

import * as Fs from 'fs';
import * as Path from 'path';

export type LicensePackageOptions = {

    readonly targetPath: string;
    readonly dependencies: boolean;
    readonly peerDependencies: boolean;
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
        main: "index.js",
        version: parent.version,
        description: parent.description,
        repository: parent.repository,
        keywords: parent.keywords,
        author: parent.author,
        license: parent.license,
        bugs: parent.bugs,
        homepage: parent.homepage,
    };

    if (options.dependencies) {
        appPackage.dependencies = parent.dependencies ?? {};
    }
    if (options.peerDependencies) {
        appPackage.peerDependencies = parent.peerDependencies ?? {};
    }

    Fs.writeFileSync(Path.join(appPath, 'package.json'), JSON.stringify(appPackage, null, 2), 'utf8');
};
