/**
 * @author WMXPY
 * @namespace License
 * @description CLI
 */

import { Argument, Coco, Command, Option } from "@sudoo/coco";
import * as Path from "path";
import { licensePackage } from "./license-package";

const coco = Coco.create();

type LicensePackageCommandOptions = {

    readonly targetPath: string;

    readonly main?: string;

    readonly dependencies?: string;
    readonly peerDependencies?: string;
    readonly optionalDependencies?: string;
};

coco.command(Command.create('license')
    .argument(Argument.create('targetPath'))
    .option(Option.create('main').optional())
    .option(Option.create('dependencies').optional().boolean())
    .option(Option.create('peerDependencies').optional().boolean())
    .option(Option.create('optionalDependencies').optional().boolean())
    .then(async (args: LicensePackageCommandOptions) => {

        const targetPath: string = Path.resolve(args.targetPath);
        await licensePackage({

            targetPath,

            main: args.main ?? 'index.js',

            dependencies: args.dependencies === 'true',
            peerDependencies: args.peerDependencies === 'true',
            optionalDependencies: args.optionalDependencies === 'true',
        });
    }),
);

export const execute = async (args: string[]): Promise<void> => {

    await coco.go(args);
};
