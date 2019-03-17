// eslint-disable-next-line no-unused-vars
import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-manifest';

export default function(manifest) {
  manifest.addComponent({
    name: 'TextSection',
    icon: SitecoreIcon.DocumentTag,
    fields: [
      { name: 'heading', displayName: 'Heading', type: CommonFieldTypes.SingleLineText },
      { name: 'body', displayName: 'Body', type: CommonFieldTypes.RichText },
    ]
  });
}
