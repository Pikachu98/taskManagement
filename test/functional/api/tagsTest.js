const request = require("supertest");
const MongoMemoryServer = require("mongodb-memory-server").MongoMemoryServer;
const User = require("../../../models/users");
const Tree = require("../../../models/trees");
const mongoose = require("mongoose");
import chai from 'chai';
var expect = chai.expect;
const _ = require("lodash");

let server = require("../../../bin/www");;
let mongod;

describe('Trees', ()=> {
    before(function (done) {
        let username = 'qianwenzhangnancy';
        let password = 'zqw123456';
        let mongodburl = 'mongodb+srv://' + username + ':' + password + '@wit-qianwenzhang-cluster-yyg37.mongodb.net/taskmanagementdb';
        mongoose.connect(mongodburl, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

        let db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', function () {
            console.log('Connected to database Successfully!!');
            done();
        });
    });

    describe('POST /tagCreation', () => {
        describe('when user creates an tag', () => {
            it('should return message about creation is successful or not ', () => {
                const tag = {
                    tagType: "Socialize",
                    tagColor: "yellow",
                    tagDescription:"spend time with families"
                };
                return request(server)
                    .post("/tagCreation")
                    .send(tag)
                    .expect(200)
                    .then(res => {
                        expect({message: 'Tag edited!'});
                    })
            });
        })
    })

    describe.only('DELETE /deleteTag/:id',() => {
        describe("when the id is valid",() => {
            it('should return the successful message with valid input when deleting TAG', () => {
                return request(server)
                    .delete("/deleteTag/5dbfcb56a6de3956b848575e")
                    .expect({message: 'Tag Deleted!'});

            });

        });
        describe("when the tag id is invalid",() => {
            it('should return message with invalid input when deleting TAG', () => {
                return request(server)
                    .delete("/deleteTag/1000")
                    .expect(200)
                    .expect({message: 'Tag NOT Deleted!'});
            });
        });
    });
})