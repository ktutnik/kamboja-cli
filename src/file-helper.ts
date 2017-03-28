import * as Fs from "fs"

export interface FileHelper {
    exists(path: string): boolean
    writeFile(path: string, data: any): Promise<void>
    mkdir(path: string): Promise<void>
}

export class FileHelperImpl implements FileHelper {
    exists(path: string): boolean {
        return Fs.existsSync(path)
    }

    writeFile(path: string, data: any): Promise<void>{
        return new Promise<void>((resolve, reject) => {
            Fs.writeFile(path, data, (er) => {
                if(er) reject(er)
                else resolve()
            })
        })
    }

    mkdir(path: string): Promise<void>{
        return new Promise<void>((resolve, reject) => {
            Fs.mkdir(path, (er) => {
                if(er) reject(er)
                else resolve()
            })
        })
    }
}