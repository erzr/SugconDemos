// eslint-disable-next-line no-unused-vars
import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-manifest';
import { readFileSync } from 'fs';

const query = readFileSync(
  __dirname + '/' + 'IntegratedDemo.sitecore.graphql',
  'utf8'
);

/**
 * Adds the IntegratedDemo component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.js) when 'jss manifest' is run.
 * @param {Manifest} manifest Manifest instance to add components to
 */
export default function(manifest) {
  manifest.addComponent({
    name: 'IntegratedDemo',
    icon: SitecoreIcon.DocumentTag,
    graphQLQuery: query
  });
}
