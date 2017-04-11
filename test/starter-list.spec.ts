import { StarterList } from "../src/starter-list"
import * as Chai from "chai"

describe("StarterList", () => {
    it("Should list starter project properly", async function () {
        this.timeout(18000)
        let test = new StarterList()
        let result = await test.get()
        console.log(result)
        Chai.expect(result.length > 0).true
    })

    it("Should render list of starter project properly", async function () {
        this.timeout(18000)
        let test = new StarterList()
        await test.render()
    })
})