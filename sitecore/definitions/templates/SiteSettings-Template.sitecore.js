// eslint-disable-next-line no-unused-vars
import { CommonFieldTypes, Manifest } from '@sitecore-jss/sitecore-jss-manifest';
import packageJson from '../../../package.json';

/**
 * This is the data template for an individual _item_ in the Styleguide's Content List field demo.
 * @param {Manifest} manifest Manifest instance to add components to
 */
export default function(manifest) {
  manifest.addTemplate({
    name: 'SiteSettings-Template',
    fields: [
        { name: 'siteTitle', type: CommonFieldTypes.SingleLineText },
        {
            name: 'demoLinks',
            type: CommonFieldTypes.ContentList,
            source: `dataSource=/sitecore/content/${
              packageJson.config.appName
            }/home&IncludeTemplatesForSelection=App Route`,
          }
    ],
  });
}
