import * as Semver from "semver"
import * as Chalk from "chalk"

export class VersionChecker {
    constructor(private npmChecker: (name: string) => Promise<string>) { 
        
    }

    async isOutdated(localVersion: string) {
        let latest = await this.npmChecker("kamboja-cli");
        let compare = Semver.compare(latest, localVersion);
        return compare == 1;
    }

    async render(localVersion: string){
        if(await this.isOutdated(localVersion)){
            let latest = await this.npmChecker("kamboja-cli")
            console.log()
            console.log(Chalk.bold.red(`  Version ${latest} is available`))
            console.log("  Update your KambojaJs generator using syntax:")
            console.log(Chalk.blue("  $ npm install -g kamboja-cli"))
            console.log()
        }
    }
}