const request = require('supertest');
const app = require('../server'); 
const http = require('http');

let server;

beforeAll((done) => {
  server = http.createServer(app);  
  server.listen(5000, done); 
});

afterAll((done) => {
  server.close(done); 
});

describe('Auth Service - Login', () => {
  it('should return 200 and a token for correct credentials', async () => {
    const response = await request(app) 
      .post('/api/auth/login')
      .send({ email: 'educatech@gmail.com', password: '123456789' });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  it('should return 401 for incorrect credentials', async () => {
    const response = await request(app) 
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'wrongpassword' });

    expect(response.status).toBe(401);
  });
});
