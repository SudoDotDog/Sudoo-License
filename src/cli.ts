/**
 * @author WMXPY
 * @namespace License
 * @description CLI
 */

import { Argument, Coco, Command, Option } from "@sudoo/coco";
import * as Path from "path";

const coco = Coco.create();

type LicensePackageCommandOptions = {

    readonly path: string;
    readonly dependencies: string;
    readonly peerDependencies: string;
};

coco.rootCommand(Command.create('license')
    .argument(Argument.create('targetPath'))
    .option(Option.create('dependencies').optional().boolean())
    .option(Option.create('peerDependencies').optional().boolean())
    .then(async (args: LicensePackageCommandOptions) => {

        const path: string = Path.resolve(args.path);
        console.log(args, path);
    }),
);

export const execute = async (args: string[]): Promise<void> => {

    await coco.go(args);
};
