module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [
    // First application
    {
      name      : 'API',
      script    : './index.test.js',
      instances: 4,
      instance_var: 'INSTANCE_ID',
      env: {
        NODE_ENV: 'sandbox',
        PORT: '3000',
      },
      env_sandbox : {
        NODE_ENV: 'sandbox',
        PORT: '3000',
      },
      env_production : {
        NODE_ENV: 'production',
        PORT: '3000',
      }
    },
  ],
};
