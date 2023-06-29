jest.mock('axios', () => {
  return {
    create: jest.fn(() => ({
      post: { email: 'test@test.test', password: '12345678' },
      interceptors: {
        request: { use: jest.fn(), eject: jest.fn() },
        response: { use: jest.fn(), eject: jest.fn() }
      }
    }))
  };
});
