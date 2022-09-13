import { response } from 'express';
import request from 'supertest';
import app from '../../app';
import { Users } from './user.model';

// Dropping database before running tests
beforeAll(async () => {
    try {
        await Users.drop();
    } catch (error) { }
})

//schema for some basic test with jest
describe('GET /api/user', () => {
    it('responds with an array of users', async () => {
        request(app)
            .get('/api/user')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toHaveProperty('length');
                expect(response.body.length).toBe(0);
            });
    });
});

let id = '';
describe('POST /api/user', () => {
    it('responds with an error if the user is invalid', async () =>
        request(app)
            .post('/api/user')
            .set('Accept', 'application/json')
            .send({
                userName: '',
            })
            .expect('Content-Type', /json/)
            .expect(422)
            .then((response) => {
                expect(response.body).toHaveProperty('message');
            }),
    );
    it('responds with an inserted object', async () =>
        request(app)
            .post('/api/user')
            .set('Accept', 'application/json')
            .send({
                userName: 'TestUserName',
                firstName: 'Jakub',
                surName: 'Mizera',
                email: 'testmail@gmail.com',
                phoneNumber: 123456789,
                country: 'Poland',
            })
            .expect('Content-Type', /json/)
            .expect(201)
            .then((response) => {
                console.log(response.body)
                expect(response.body).toHaveProperty('_id');
                id = response.body._id;
                expect(response.body).toHaveProperty('userName');
                expect(response.body.userName).toBe('TestUserName');
                expect(response.body).toHaveProperty('firstName');
                expect(response.body.firstName).toBe('Jakub');
                expect(response.body).toHaveProperty('surName');
                expect(response.body.surName).toBe('Mizera');
                expect(response.body).toHaveProperty('email');
                expect(response.body.email).toBe('testmail@gmail.com');
                expect(response.body).toHaveProperty('phoneNumber');
                expect(response.body.phoneNumber).toBe(123456789);
                expect(response.body).toHaveProperty('country');
                expect(response.body.country).toBe('Poland');
            }),
    );
});

// Test for finding user by ID
describe('GET /api/user/:id', () => {
    it('responds with user object', async () => {
        request(app)
            .get(`/api/user/${id}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toHaveProperty('_id');
                expect(response.body._id).toBe(id);
                expect(response.body).toHaveProperty('userName');
                expect(response.body.userName).toBe('TestUserName');
                expect(response.body).toHaveProperty('firstName');
                expect(response.body.firstName).toBe('Jakub');
                expect(response.body).toHaveProperty('surName');
                expect(response.body.surName).toBe('Mizera');
                expect(response.body).toHaveProperty('email');
                expect(response.body.email).toBe('testmail@gmail.com');
                expect(response.body).toHaveProperty('phoneNumber');
                expect(response.body.phoneNumber).toBe(123456789);
                expect(response.body).toHaveProperty('country');
                expect(response.body.country).toBe('Poland');
            });
    });
    it('responds with an invalid ObjectId error', async () => {
        request(app)
            .get('/api/user/asfasfasfasfasf')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(422)
    });
    it('responds with not found error', async () => {
        request(app)
            .get('/api/user/631f4c522898c3a752d4ce7f')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404)
    });
});

//Test for updating object in database
describe('PUT /api/user/:id', () => {
    it('responds with an invalid ObjectId error', (done) => {
        request(app)
            .put(`/api/user/invalidObjectIdhere`)
            .set('Accept', 'application/json')
            .send({
                userName: 'TestUserNameUpdated',
                firstName: 'Kobe',
                surName: 'Bryant',
                email: 'testmail2@gmail.com',
                phoneNumber: 555777999,
                country: 'USA'
            })
            .expect('Content-Type', /json/)
            .expect(422, done)
    });
    it('responds with id not found', (done) => {
        request(app)
            .put('/api/user/631f4c522898c3a752d4ce7f')
            .set('Accept', 'application/json')
            .send({
                userName: 'TestUserNameUpdated',
                firstName: 'Kobe',
                surName: 'Bryant',
                email: 'testmail2@gmail.com',
                phoneNumber: 555777999,
                country: 'USA'
            })
            .expect('Content-Type', /json/)
            .expect(404, done);
    });
    it('responds with a single user', async () =>
        request(app)
            .put(`/api/user/${id}`)
            .set('Accept', 'application/json')
            .send({
                userName: 'TestUserNameUpdated',
                firstName: 'Kobe',
                surName: 'Bryant',
                email: 'testmail2@gmail.com',
                phoneNumber: 555777999,
                country: 'USA'
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                console.log(response.body)
                expect(response.body).toHaveProperty('_id');
                expect(response.body._id).toBe(id);
                expect(response.body).toHaveProperty('userName');
                expect(response.body.userName).toBe('TestUserNameUpdated');
                expect(response.body).toHaveProperty('firstName');
                expect(response.body.firstName).toBe('Kobe');
                expect(response.body).toHaveProperty('surName');
                expect(response.body.surName).toBe('Bryant');
                expect(response.body).toHaveProperty('email');
                expect(response.body.email).toBe('testmail2@gmail.com');
                expect(response.body).toHaveProperty('phoneNumber');
                expect(response.body.phoneNumber).toBe(555777999);
                expect(response.body).toHaveProperty('country');
                expect(response.body.country).toBe('USA');
            }),
    );
});

// Tests for deleting user

describe('DELETE /api/user/:id', () => {
    it('responds with an invalid ObjectId error', (done) => {
        request(app)
            .delete(`/api/user/invalidObjectIdhere`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(422, done)
    });
    it('responds with id not found', (done) => {
        request(app)
            .delete('/api/user/631f4c522898c3a752d4ce7f')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404, done);
    });
    it('responds with a single user', (done) => {
        request(app)
            .delete(`/api/user/${id}`)
            .expect(204, done)
    });
    it('responds with id not found', (done) => {
        request(app)
            .delete(`/api/user/${id}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404, done);
    });
});