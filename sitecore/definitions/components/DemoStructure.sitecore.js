// eslint-disable-next-line no-unused-vars
import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-manifest';

/**
 * Adds the DemoStructure component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.js) when 'jss manifest' is run.
 * @param {Manifest} manifest Manifest instance to add components to
 */
export default function(manifest) {
  manifest.addComponent({
    name: 'DemoStructure',
    icon: SitecoreIcon.DocumentTag,
    fields: [
      { name: 'singleColumn', type: CommonFieldTypes.Checkbox }
    ],
    placeholders: ['jss-demo-main', 'jss-demo-left']
  });
}
