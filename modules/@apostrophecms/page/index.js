// This configures the @apostrophecms/page module to add a "home" page type to the
// pages menu

module.exports = {
  options: {
    cache: {
      page: {
        // Specified in seconds
        maxAge: 6000
      },
      api: {
        // Specified in seconds
        maxAge: 3000
      }
    },
    types: [
      {
        name: 'default-page',
        label: 'Default'
      },
      {
        name: '@apostrophecms/home-page',
        label: 'Home'
      }
    ]
  }
};
