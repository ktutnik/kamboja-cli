#!/usr/bin/env node

import * as Program from "commander"
import { Init } from "./init"
import { FileHelperImpl } from "./file-helper"
import { VersionChecker } from "./version-checker"
import { StarterList } from "./starter-list"
import * as PkgInfo from "pkginfo"
import * as LatestVersion from "latest-version"

PkgInfo(module)
let CURRENT_VERSION = module.exports.version
let PACKAGE_NAME = module.exports.name

Program
    .version(CURRENT_VERSION);

Program
    .command("init [name]")
    .description("init KambojaJs project using predefined starter")
    .action((name, options) => {
        if (!name) {
            let starters = new StarterList()
            starters.render();
        }
        else {
            let init = new Init(new FileHelperImpl())
            if (!name) name = "basic"
            init.init(name, process.cwd())
        }
    });

(async () => {
    let checker = new VersionChecker(LatestVersion)
    await checker.render(CURRENT_VERSION)
    Program.parse(process.argv)
})()


