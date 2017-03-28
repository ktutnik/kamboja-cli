import { Init } from "../src/init"
import { FileHelper } from "../src/file-helper"
import * as Path from "path"
import * as H from "./helper"
import * as Chai from "chai"

class FileHelperMock implements FileHelper {
    exists(path: string): boolean {
        return false
    }

    writeFile(path: string, data: any): Promise<void> {
        return Promise.resolve()
    }

    mkdir(path: string): Promise<void> {
        return Promise.resolve()
    }
}

describe("init", () => {
    it("Should download and unzip properly", function () {
        this.timeout(8000)
        let fileHelper = H.spy(new FileHelperMock())
        let init = new Init(fileHelper)
        return init.init("basic", __dirname).then(() => {
            Chai.expect(fileHelper.mocks.exists.called).true
            Chai.expect(fileHelper.mocks.mkdir.called).true
            Chai.expect(fileHelper.mocks.writeFile.called).true
        })
    })
})