import swaggerAutogen from 'swagger-autogen';
import dotenv from 'dotenv';
dotenv.config();

const config = {
  info: {
    version: 'v1.0.0',
    title: 'Fatecare API',
    description: 'Fatecare API documentation'
  },
  host: `localhost:${process.env.PORT || 3000}`,
  basePath: '/api/v1',
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      "name": "Auth",
      "description": "Authentication endpoints"
    },
    {
      "name": "Users",
      "description": "User management endpoints"
    },
    {
      "name": "Patients",
      "description": "Patient management endpoints"
    }
  ],
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      in: 'header',
      name: 'Authorization',
      description: "Enter JWT token in the format 'Bearer <token>'"
    }
  },
  definitions: {
    Patient: {
      $code: "PAT001",
      $name: "John Doe"
    },
    PatientResponse: {
      id: 1,
      code: "PAT001",
      name: "John Doe"
    },
    AddUser: {
      $username: "newuser",
      $password: "newpassword123"
    },
    Login: {
      $username: "testuser",
      $password: "password123"
    },
    LoginResponse: {
      message: "Login bem-sucedido!",
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoidGVzdHVzZXIiLCJpYXQiOjE2MTYxNjYwMjgsImV4cCI6MTYxNjE2OTYyOH0.xyz"
    },
    User: {
        id: 1,
        username: 'johndoe',
        password: 'xkljaskfdksooeiekapp1234003m'
    }
  }
};

const output = './src/docs/swagger.json';
const endpoints = ['./src/routers/index.ts'];

swaggerAutogen()(output, endpoints, config);