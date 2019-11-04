import chai from 'chai';
import chaiHttp from 'chai-http' ;
import server from '../../bin/www';
let expect = chai.expect;
import _ from 'lodash';
import things from 'chai-things';
chai.use( things);
chai.use(chaiHttp);
let datastore = require("../../../models/donations");

describe('Customers',  () =>{
    describe('DELETE /deleteUser/:id',() => {
        it('should return a 404 and a message for invalid id', function(done) {
            chai.request(server)
                .delete('/customers/5bcs')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('User NOT DELETED!' ) ;
                    done();
                });
        });
    });
});