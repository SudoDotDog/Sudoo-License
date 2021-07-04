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
    readonly dependencies?: string;
    readonly peerDependencies?: string;
};

coco.command(Command.create('license')
    .argument(Argument.create('targetPath'))
    .option(Option.create('dependencies').optional().boolean())
    .option(Option.create('peerDependencies').optional().boolean())
    .then(async (args: LicensePackageCommandOptions) => {

        const targetPath: string = Path.resolve(args.targetPath);
        await licensePackage({

            targetPath,
            dependencies: args.dependencies === 'true',
            peerDependencies: args.peerDependencies === 'true',
        });
    }),
);

export const execute = async (args: string[]): Promise<void> => {

    await coco.go(args);
};
