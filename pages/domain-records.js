import { htm } from '@zeit/integration-utils';

export default async function domainRecordsView(domainId, domainName, zeitClient) {
  console.log(domainId);
  console.log(domainName);
  console.log(zeitClient);
  const { records } = await zeitClient.fetchAndThrow(`/v2/domains/${domainName}/records`, { method: 'GET' });
  const recordList = records.map(record => htm`<P>${record.name}.${domainName} | ${record.type} | ${record.value}</P`);

  return htm`
    <Page>
      <UL>
        ${recordList}
      </UL>
    </Page>
  `;
};
