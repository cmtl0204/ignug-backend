module.exports = {
  apps: [
    {
      name: 'api-yec-v2',
      script: 'dist/main.js',
      autorestart: true,
      watch: false, // NO usar watch en producción
      max_memory_restart: '300M',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
      error_file: './logs/pm2-error.log',
      out_file: './logs/pm2-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
    },
  ],
};
