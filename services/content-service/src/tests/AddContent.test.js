const request = require('supertest');
const app = require('../app');

describe('Content Service', () => {

  let createdContentId;

  it('should create new content and return status 201', async () => {
    const response = await request(app)
      .post('/api/videos/add')
      .send({
        title: 'Test Content',
        description: 'This is a test content',
        videoUrl: 'This is a test',
        category: 'Test',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.title).toBe('Test Content');
    expect(response.body.description).toBe('This is a test content');
    expect(response.body.videoUrl).toBe('This is a test');

    createdContentId = response.body.id; 
  });

});
