const mongoose = require("mongoose")
import chai from "chai"
const _ = require("lodash")


let server = require("../../../bin/www")


describe("Records", ()=> {

    before(function (done) {

        let username = "qianwenzhangnancy"
        let password = "zqw123456"
        let mongodburl = "mongodb+srv://" + username + ":" + password + "@wit-qianwenzhang-cluster-yyg37.mongodb.net/taskmanagementdb"
        mongoose.connect(mongodburl, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})

        let db = mongoose.connection
        db.on("error", console.error.bind(console, "connection error"))
        db.once("open", function () {
            console.log("Connected to database Successfully!!")
            done()
        })
    })


    describe("DELETE /deleteRecord/:id",() => {
        describe("when the id is valid",() => {
            it("should return the successful message with valid id when deleting the planting records", () => {
                return request(server)
                    .delete("/deleteRecord/5dc14a1c1c9d440000e915ec")
                    .expect({message: "Records Deleted!"})

            })

        })
        describe("when the record id is invalid",() => {
            it("should return message with invalid id when deleting planting records", () => {
                return request(server)
                    .delete("/deleteRecord/5d")
                    .expect(200)
                    .expect({message: "Records NOT Deleted!"})
            })
        })
    })
})