const request = require("supertest");
const MongoMemoryServer = require("mongodb-memory-server").MongoMemoryServer;
const User = require("../../../models/users");
const mongoose = require("mongoose");
import chai from 'chai';
var expect = chai.expect;
const _ = require("lodash");

let server = require("../../../bin/www");;
let mongod;
let db, matchingCondition;

describe('Customers',  () =>{
    // before(async () => {
    //     try {
    //         mongod = new MongoMemoryServer({
    //             instance: {
    //                 port: 27017,
    //                 dbPath: "./test/database",
    //                 dbName: "taskmanagementdb" // by default generate random dbName
    //             }
    //         });
    //         // Async Trick - this ensures the database is created before
    //         // we try to connect to it or start the server
    //         await mongod.getConnectionString();
    //
    //         mongoose.connect("mongodb://localhost:27017/taskmanagementdb", {
    //             useNewUrlParser: true,
    //             useUnifiedTopology: true
    //         });
    //         db = mongoose.connection;
    //     } catch (error) {
    //         console.log(error);
    //     }
    // });
    //
    // after(async () => {
    //     try {
    //         await db.dropDatabase();
    //     } catch (error) {
    //         console.log(error);
    //     }
    // });
    describe('DELETE /deleteUser/:id',() => {
        describe("when the id is valid",() => {
            it('should return the successful message with valid input when deleting', () => {
                return request(server)
                    .delete("/deleteUser/5dbf20746c524713ecedcc13")
                    .expect({message: 'User Successfully Deleted!'});

            });
            after(() => {
                return request(server)
                    .get("/allUsers")
                    .expect(200)
                    .then(res => {
                        expect(res.body.length).equals(5);
                    });
            });
        });
        describe("when the id is invalid",() => {
            it('should return message with invalid input when deleting', () => {
                return request(server)
                    .delete("/deleteUser/1000")
                    .expect(200)
                    .expect({message: 'User NOT DELETED!'});
            });
        });
    });
    describe('GET /allUsers',  () => {
        it('should return all the users', done => {
            request(server)
                .get('/allUsers')
                .set("Accept", "application/json")
                .expect("Content-Type", /json/)
                .end((err, res) => {
                    try {
                        expect(res.body).to.be.a("array");
                        expect(res.body.length).to.equal(5);

                        let result = _.map(res.body, users => {
                            return {userEmail: users.userEmail};
                        });
                        expect(result).to.deep.include({userEmail: "qianwenzhangnancy@gmail.com"});
                        expect(result).to.deep.include({userEmail: "123456monica@gmail.com"});
                        expect(result).to.deep.include({userEmail: "lucyisgirl@gmail.com"});
                        expect(result).to.deep.include({userEmail: "ronaldoho@gmail.com"});
                        expect(result).to.deep.include({userEmail: "james@gmail.com"});

                        done();
                    } catch(e){
                        done(e)
                    }
                });
        });
    });

    describe.only("GET /addFriend/:id", () => {
        describe("when there are related results", () => {
            it("should return the matching user", done => {
                request(server)
                    .get('/addFriend/444')
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(200)
                    .expect({message: 'User has found! Do you want to send a request?'})
                    .end((err, res) => {
                        try {
                            expect(res.body).to.be.a("object");
                            expect(res.body.data.length).to.equal(2);

                            // let result = _.map(res.body.data, users => {
                            //     return {userEmail: users.userEmail};
                            // });

                            // expect(res.body.data).to.include(
                            //     userName:"44444o",
                            //     userEmail: "ronaldoho@gmail.com"});
                            // expect(result).to.include({userEmail: "james@gmail.com"});
                            done();
                        } catch (e) {
                            done(e)
                        }
                    })
            })
        })
    //     describe("when the id is invalid", () => {
    //         it("should return the NOT found message", done => {
    //             request(server)
    //                 .get("/donations/9999")
    //                 .set("Accept", "application/json")
    //                 .expect("Content-Type", /json/)
    //                 .expect(200)
    //                 .end((err, res) => {
    //                     expect(res.body.message).equals("Donation NOT Found!")
    //                     done(err)
    //                 })
    //         })
    //     })
    })

});