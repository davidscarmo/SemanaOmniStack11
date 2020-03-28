const request = require('supertest'); 
const app = require('../../src/app');
const connection = require('../../src/database/connection'); 
describe('ONG', () => 
{
    beforeEach(async () => {
        await connection.migrate.rollback();//reset database
        await connection.migrate.latest();//create 
    });

    afterAll(async () => {
        await connection.destroy();
    });
    it('should be able to create a new ONG', async () => 
    {
        const response = await request(app).post('/ongs').send({
            name : "APAE23", 
            email: "contato@test.com", 
            whatsapp: "17123456789", 
            city: "Jales", 
            uf: "SP"
        });
        expect(response.body).toHaveProperty('id'); 
        expect(response.body.id).toHaveLength(8);
    });
} );