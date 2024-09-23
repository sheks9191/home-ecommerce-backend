import type { Schema, Attribute } from '@strapi/strapi';

export interface ImagesImages extends Schema.Component {
  collectionName: 'components_images_images';
  info: {
    displayName: 'images';
    icon: 'picture';
    description: '';
  };
  attributes: {
    imageUrl: Attribute.String & Attribute.Required;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'images.images': ImagesImages;
    }
  }
}
