module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '4cd37781c90beeb5deb0bf90e1700221'),
  },
  apiToken: { salt: env('API_TOKEN_SALT', 'test_api_token_salt_123') },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT', 'test_transfer_token_salt_123'),
    },
  },
});
