import * as Request from "request"
import * as AdmZip from "adm-zip"
import * as Path from "path"
import { FileHelper } from "./file-helper"
import * as Chalk from "chalk"

export class Init {
    constructor(private fileHelper: FileHelper) { }

    async init(starterName: string, root: string) {
        const url = `https://github.com/kambojajs/starter-${starterName}/zipball/master`
        try {
            console.log("  Downloading...")
            let buffer = await this.download(url)
            console.log("  Unzipping...")
            let admzip = new AdmZip(buffer)
            let entries = admzip.getEntries();
            let rt = entries[0].entryName
            for (let entry of entries) {
                let fileName = entry.entryName.substring(rt.length - 1)
                console.log("  Creating " + fileName)
                let path = Path.join(root, fileName)
                await this.save(path, entry.getData(), entry.isDirectory)
            }
            console.log("  Complete")
        }
        catch (e) {
            throw e
        }
    }

    private download(url: string) {
        return new Promise<Buffer>((resolve, reject) => {
            let req = Request({
                url: url,
                method: 'GET',
                encoding: null
            }, (er, response, body) => {
                if (er) reject(er)
                else resolve(body)
            })
        })
    }

    private async save(path: string, data, isDirectory: boolean) {
        if (this.fileHelper.exists(path)) return
        if (isDirectory) {
            await this.fileHelper.mkdir(path)
        }
        else {
            await this.fileHelper.writeFile(path, data)
        }
    }

}