import * as Request from "request"
import * as Chalk from "chalk"

export interface StarterInfo {
    name: string
    description: string
    updatedOn: Date
}

export class StarterList {

    get() {
        return new Promise<StarterInfo[]>((resolve, reject) => {
            Request({
                url: "https://api.github.com/orgs/kambojajs/repos",
                method: 'GET',
                encoding: null,
                headers: { 'User-Agent': 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)' }
            }, (err, response, body) => {
                if (err || response.statusCode != 200) reject(err)
                else {
                    let result = JSON.parse(body.toString())
                        .filter(element => element.name.indexOf("starter") == 0)
                        .map(element => <StarterInfo>{
                            name: element.name.replace("starter-", ""),
                            description: element.description,
                            updatedOn: new Date(element.updated_at)
                        })
                    resolve(result)
                }
            })
        })
    }

    async render() {
        let list = await this.get()
        console.log("  List of KambojaJs starters")
        for (let el of list) {
            let updated = `  Updated: ${el.updatedOn.toLocaleDateString()} ${el.updatedOn.toLocaleTimeString()}`
            console.log()
            console.log("  " + Chalk.underline(`${el.name.toUpperCase()} STARTER `))
            console.log(Chalk.gray(updated))
            console.log(Chalk.gray(`  ${el.description}`))
            console.log(Chalk.blue(`  $ kamboja init ${el.name}`))
            console.log()
        }
    }
}