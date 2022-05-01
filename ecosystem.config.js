module.exports = {
    apps : [
        {
          name: "kindal",
          script: "./server.js",
          watch: true,
          env: {
            "NODE_ENV": "development",
          }
        }
    ]
  }