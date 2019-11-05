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
    describe('GET /plantList',  () => {
        it('should return all the plants in store', done => {
            request(server)
                .get('/plantList')
                .set("Accept", "application/json")
                .expect("Content-Type", /json/)
                .end((err, res) => {
                    try {
                        expect(res.body).to.be.a("array");
                        expect(res.body.length).to.equal(7);

                        let result = _.map(res.body, trees => {
                            return {treeName: trees.treeName};
                        });
                        expect(result).to.deep.include({treeName: "Cherry bolossom"});
                        expect(result).to.deep.include({treeName: "Rose"});
                        expect(result).to.deep.include({treeName: "Lemon Tree"});
                        expect(result).to.deep.include({treeName: "Chinese Pine Tree"});
                        expect(result).to.deep.include({treeName: "Scarecrow"});
                        expect(result).to.deep.include({treeName: "Watermelon"});
                        expect(result).to.deep.include({treeName: "testTree"});

                        done();
                    } catch(e){
                        done(e)
                    }
                });
        });
    });
})