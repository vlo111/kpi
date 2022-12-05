jest.mock('@tanstack/react-query', () => ({
  useMutation: () => ({ mutate: jest.fn(), data: { email: 'test@test.test', password: '12345678' }, isLoading: false, error: 'Invalid email or password' })
}));
