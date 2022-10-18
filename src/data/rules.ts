export const Rules = {
  Email: [
    {
      required: true,
      type: 'email',
      message: 'The input is not valid E-mail!'
    }],
  Password: [
    {
      required: true,
      message: 'Please input your password!'
    },
    {
      min: 5,
      message: 'Password must be minimum 5 characters.'
    }]
}
