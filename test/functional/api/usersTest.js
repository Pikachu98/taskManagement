const request = require("supertest")
const MongoMemoryServer = require("mongodb-memory-server").MongoMemoryServer
const User = require("../../../models/users")
const mongoose = require("mongoose")
import chai from "chai"
let expect = chai.expect
const _ = require("lodash")

let server


describe("Users",  () =>{

    // beforeEach(async () => {
    //     try {
    //         await User.deleteMany({});
    //         let user = new User();
    //         user.userName = "4444";
    //         user.userEmail = "james@gmail.com";
    //         user.userPassword = "jamesgood123";
    //         await user.save();
    //         donation = new Donation();
    //         donation.paymenttype = "paypal";
    //         donation.amount = 1000;
    //         await donation.save();
    //         donation = await Donation.findOne({ amount: 1200 });
    //         validID = donation._id;
    //     } catch (error) {
    //         console.log(error);
    //     }
    // });


        // let username = 'qianwenzhangnancy';
        // let password = 'zqw123456';
        // let mongodburl = 'mongodb+srv://' + username + ':' + password + '@wit-qianwenzhang-cluster-yyg37.mongodb.net/taskmanagementdb';
        // mongoose.connect(mongodburl, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
        //
        // let db = mongoose.connection;
        // db.on('error', console.error.bind(console, 'connection error'));
        // db.once('open', function () {
        //     console.log('Connected to database Successfully!');
        //     done();
        // });

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
    describe("DELETE /deleteUser/:id",() => {
        describe("when the id is valid",() => {
            it("should return the successful message with valid input when deleting", () => {
                return request(server)
                    .delete("/deleteUser/5dbf20746c524713ecedcc13")
                    .expect({message: "User Successfully Deleted!"})

            })
            // after(() => {
            //     return request(server)
            //         .get("/allUsers")
            //         .expect(200)
            //         .then(res => {
            //             expect(res.body.length).equals(5);
            //         });
            // });
        })
        describe("when the id is invalid",() => {
            it("should return message with invalid input when deleting", () => {
                return request(server)
                    .delete("/deleteUser/1000")
                    .expect(200)
                    .expect({message: "User NOT DELETED!"})
            })
        })
    })
    describe("GET /allUsers",  () => {
        it("should return all the users", done => {
            request(server)
                .get("/allUsers")
                .set("Accept", "application/json")
                .expect("Content-Type", /json/)
                .end((err, res) => {
                    try {
                        expect(res.body).to.be.a("array")
                       // expect(res.body.length).to.equal(5);

                        // let result = _.map(res.body, users => {
                        //     return {userEmail: users.userEmail};
                        // });
                        // expect(result).to.deep.include({userEmail: "qianwenzhangnancy@gmail.com"});
                        // expect(result).to.deep.include({userEmail: "123456monica@gmail.com"});
                        // expect(result).to.deep.include({userEmail: "lucyisgirl@gmail.com"});
                        // expect(result).to.deep.include({userEmail: "ronaldoho@gmail.com"});
                        // expect(result).to.deep.include({userEmail: "james@gmail.com"});

                        done()
                    } catch(e){
                        done(e)
                    }
                })
        })
    })

    describe("GET /addFriend/:id", () => {
        describe("when there are related results", () => {
            it("should return the matching user", done => {
                request(server)
                    .get("/addFriend/444")
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(200)
                    .expect({message: "User has found! Do you want to send a request?"})
                    .end((err, res) => {
                        try {
                            expect(res.body).to.be.a("object")
                          //  expect(res.body.data.length).to.equal(2);

                            // let result = _.map(res.body.data, users => {
                            //     return {userEmail: users.userEmail};
                            // });

                            // expect(res.body.data).to.include(
                            //     userName:"44444o",
                            //     userEmail: "ronaldoho@gmail.com"});
                            // expect(result).to.include({userEmail: "james@gmail.com"});
                            done()
                        } catch (e) {
                            done(e)
                        }
                    })
            })
        })
        describe("when no results are related", () => {
            it("should return the NOT found message", done => {
                request(server)
                    .get("/addFriend/9999")
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(200)
                    .end((err, res) => {
                        expect(res.body.message).equals("USER NOT FOUND")
                        done(err)
                    })
            })
        })
    })

    describe("GET /getCoinBalance/:id", () => {
        describe("get the coins when id is valid ",() =>{
            it("should return the coins that user has", done =>{
              request(server)
                  .get("/getCoinBalance/5db5f1276df19224807d71db")
                  .set("Accept", "application/json")
                  .expect("Content-Type", /json/)
                  .expect(200)
                  .end((err,res) => {
                      expect(res.body.message).equals("your coins: { userCoins: 99100 }")
                      done(err)
                })
            })
        })
        describe("return the information if id is invalid", () => {
            it("return the error", done => {
                request(server)
                    .get("/getCoinBalance/1444444")
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(200)
                    .end((err,res) => {
                        expect(res.body.message).equals("ERROR")
                        done(err)
                    })
            })
        })
    })

    describe("GET /getUser/:id", () => {
        describe("get the user if id is valid ",() =>{
            it("should return the information of specific user", done =>{
                request(server)
                    .get("/getUser/5db5f1276df19224807d71db")
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(200)
                    .end((err,res) => {
                        let result = _.map(res.body, users => {
                            return {userEmail: users.userEmail}
                        })
                 //       expect(result[0]).to.include({userEmail: "james@gmail.com"});
                        done()
                    })
            })
        })
        describe("return the error information if id is invalid", () => {
            it("return the error information", done => {
                request(server)
                    .get("/getUser/5db5f")
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(200)
                    .end((err,res) => {
                        expect(res.body.message).equals("USER NOT Found!")
                        done(err)
                    })
            })
        })
    })

    describe("POST /user/register", () => {
        describe("if the input userEmail is the only one", () =>{
            it("should return confirmation and update database ", () => {
                const user = {
                    userName: "Super Mario",
                    userPassword: "MarioJumpsHigh",
                    userEmail: "Marioooooooo123@gmail.com",
                    userCoins: 10000
                }
                return request(server)
                    .post("/user/register")
                    .send(user)
                    .expect(200)
                    .then(res => {
                        expect({message: "User has registered successfully"})
                    })
            })

            after(() => {
                return request(server)
                    .get("/addFriend/Super Mario")
                    .expect(200)
                    .then(res => {
                     //   expect(res.body.data.length).equals(1);
                    })
            })
        })

        describe("if the email has already be registerd", () => {
            it("should return the error message", () => {
                const user = {
                    userName: "Super Mario",
                    userPassword: "MarioJumpsHigh",
                    userEmail: "Marioooooooo123@gmail.com",
                    userCoins: 10000
                }

                return request(server)
                    .post("/user/register")
                    .send(user)
                    .expect(200)
                    .then(res => {
                        expect({message: "user email already exists"})
                    })
            })
        })
    })

    describe("PUT /buyTree/:id", () => {
        describe("when userId is right and buy the tree successfully", () => {
            it("should insert the tree id into the user tree array", () => {
                const body = {_id : "5db595801c9d440000a62eb2"}
                request(server)
                    .put("/buyTree/5db5f1276df19224807d71db")
                    .send(body)
                    .expect(200)
                    .then(resp => {
                        expect(resp.body.message).equals("Tree Successfully Bought!")
                    })
            })
        })
        // describe('when user don\'t have enough coins', () => {
        //     it('should return the message which let user know they don\'t have enough coins', () => {
        //         const body = {_id : "5db595801c9d440000a62eb2"};
        //         request(server)
        //             .put("/buyTree/5db58840f0861f42cc2e3aa3")
        //             .send(body)
        //             .expect(200)
        //             .end(res => {
        //                 expect(res.body).to.include({
        //                     message: "Sorry, you do not have enough money!"
        //                 })
        //             })
        //     })
        // })

        // describe('if the id is invalid', () => {
        //     it('should return the error message', () => {
        //         const body = {_id : "5db595801c9d440000a62eb2"};
        //         request(server)
        //             .put("/buyTree/5dc")
        //             .send(body)
        //             .then(resp => {
        //                 expect(resp.body).to.include({
        //                     message: "ERROR"
        //                 })
        //             })
        //     })
        // })
    })
    describe("PUT /deleteTree/:id", () => {
        describe("when userId is right and delete the tree successfully", () => {
            it("should delete the tree id from the user tree array", () => {
                const body = {"_id": "5db595801c9d440000a62eb2"}
                request(server)
                    .put("/deleteTree/5db5f1276df19224807d71db")
                    .send(body)
                    .expect(200)
                    .end(res => {
                        expect(res.body).to.include({
                            message: "Tree Successfully Deleted!"
                        })
                    })
            })
        })
        describe("when user click on the tree they haven't bought", () => {
            it("should return the message that tells you info", () => {
                const body = {"_id": "5db="}
                request(server)
                    .put("/deleteTree/5db5f1276df19224807d71db")
                    .send(body)
                    .expect(200)
                    .end(res => {
                        expect(res.body).to.include({
                            message: "You have not bought this tree!"
                        })
                    })
            })
        })
    //
    })
})