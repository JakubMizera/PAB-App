import request from 'supertest';
import app from '../../app';


describe('GET /api/user', () => {
    it('responds with an array of users', async () => {
        request(app)
            .get('/api/user')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toHaveProperty('length');
                expect(response.body.length).toBe(1);
                expect(response.body[0]).toHaveProperty('userName');
                expect(response.body[0]).toHaveProperty('firstName'); 
            });
    });
});