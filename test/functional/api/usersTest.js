const request = require("supertest");
const MongoMemoryServer = require("mongodb-memory-server").MongoMemoryServer;
const User = require("../../../models/users");
const mongoose = require("mongoose");
import chai from 'chai';
var expect = chai.expect;
const _ = require("lodash");

let server = require("../../../bin/www");;
let mongod;
let db, validID;

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
    // describe('GET /allUsers',  () => {
    //     it('should return all the users', function(done) {
    //         chai.request(server)
    //             .get('/allUsers')
    //             .end((err, res) => {
    //                 expect(res).to.have.status(200);
    //                 expect(res.body).to.be.a('array');
    //
    //                 let result = _.map(res.body, (users) => {
    //                     return { userEmail: users.userEmail };
    //                 });
    //                 expect(result).to.include( { userEmail: "qianwenzhangnancy@gmail.com"} );
    //                 expect(result).to.include( {userEmail: "123456monica@gmail.com"} );
    //                 expect(result).to.include( {userEmail: "lucyisgirl@gmail.com"} );
    //                 expect(result).to.include( {userEmail: "ronaldoho@gmail.com"} );
    //                 expect(result).to.include( {userEmail: "james@gmail.com"} );
    //
    //                 done();
    //             });
    //     });
    // });

});