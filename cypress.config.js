module.exports = {
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      login: "your email",
      password: "your password"
    },
    viewportWidth: 1920,
    viewportHeight: 1080,
    baseUrl: 'https://pokemonbattle-stage.me/'
  },
};
