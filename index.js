import { withUiHook, htm } from '@zeit/integration-utils';
import domainsListView from './pages/domain-list';
import domainRecordsView from './pages/domain-records';

module.exports = withUiHook(async ({ payload, zeitClient }) => {
  const { action, clientState } = payload;
  const splitAction = {
    page: action.split('::')[0],
    domainId: action.split('::')[1],
    domainName: action.split('::')[2],
  };

  console.log(splitAction);

  let jsx = htm`<P>Something went wrong...</P>`;
  switch(splitAction.page) {
    case 'domain':
      jsx = await domainRecordsView(splitAction.domainId, splitAction.domainName, zeitClient);
      break;
    default:
      jsx = await domainsListView(zeitClient, splitAction.domainId);
      break;
  };

  return htm`
    <Page>
      ${jsx}
    </Page>
  `;
});
