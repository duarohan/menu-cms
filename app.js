require('apostrophe')({
  shortName: 'menu-cms',
  nestedModuleSubdirs: true,
  modules: {
    '@apostrophecms/rich-text-widget': {
      options: {
        className: 'bp-rich-text'
      }
    },
    '@apostrophecms/image-widget': {
      options: {
        className: 'bp-image-widget'
      }
    },
    '@apostrophecms/video-widget': {
      options: {
        className: 'bp-video-widget'
      }
    },
    // `asset` supports the project's webpack build for client-side assets.
    asset: {},
    // The project's first custom page type.
    'default-page': {},
    dish: {},
    menu: {},
    'menu-widget': {},
    'menu-page': {}
  }
});
