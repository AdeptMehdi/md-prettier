const request = require('supertest');
const app = require('./server');

describe('MD Prettier Server', () => {
  it('should respond with HTML for GET /', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/text\/html/);
  });

  it('should respond with version JSON for GET /api/version', async () => {
    const response = await request(app).get('/api/version');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ version: '1.0.0' });
  });

  it('should serve static files', async () => {
    const response = await request(app).get('/script.js');
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/application\/javascript/);
  });

  it('should return 404 for unknown routes', async () => {
    const response = await request(app).get('/unknown');
    expect(response.status).toBe(404);
  });
});
