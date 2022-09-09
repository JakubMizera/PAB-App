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