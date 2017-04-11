import { VersionChecker } from "../src/version-checker"
import * as Chai from "chai"

describe("VersionChecker", () => {
    it("Should check outdated properly", async () => {
        let test = new VersionChecker(async (name: string) => "0.0.1-2")
        let test1 = await test.isOutdated("0.0.1-2")
        let test2 = await test.isOutdated("0.0.1")
        let test3 = await test.isOutdated("0.0.1-0")
        
        Chai.expect(test1).false
        Chai.expect(test2).false
        Chai.expect(test3).true
    })

    it("Should render properly", async () => {
        let test = new VersionChecker(async (name: string) => "0.0.1-2")
        test.render("0.0.1-0")
    })
})