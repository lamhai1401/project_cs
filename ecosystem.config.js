module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : 'API',
      script    : './server.js',
      instances : '4',
      env: {
        COMMON_VARIABLE: 'true',
        PORT: '3000',
      },
      env_production : {
        NODE_ENV: 'production',
        PORT: '3000',
      }
    },

    // Second application
    {
      name      : 'WEB',
      script    : 'web.js'
    }
  ],
};
