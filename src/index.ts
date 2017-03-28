#!/usr/bin/env node

import * as Program from "commander"
import { Init } from "./init"
import { FileHelperImpl } from "./file-helper"

Program
    .version("0.0.1")

Program
    .command("init [name]")
    .description("init KambojaJs project using predefined starter")
    .option("-ls", "show list of remote starter projects")
    .action((name, options) => {
        let init = new Init(new FileHelperImpl())
        if(!name) name = "basic"
        init.init(name, process.cwd())
    })

Program.parse(process.argv)