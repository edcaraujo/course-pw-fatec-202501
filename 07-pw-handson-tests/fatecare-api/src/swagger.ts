import swaggerAutogen from 'swagger-autogen';

const config = {
  info: {
    version: 'v1.0.0',
    title: 'Fatecare API',
    description: 'Fatecare API documentation'
  },
  host: `localhost:${process.env.PORT || 3000}`,
  basePath: '/api/v1',
  schemes: ['http', 'https'],
};

const output = './docs/swagger.json';
const endpoints = ['./src/routers/index.ts'];

swaggerAutogen()(output, endpoints, config);