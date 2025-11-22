module.exports = {
  apps: [
    {
      name: "procurement-frontend",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3001",
      cwd: "./",
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
