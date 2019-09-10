import { htm } from '@zeit/integration-utils';

export default async function domainsListView(zeitClient, detailDomainName) {
  const { domains } = await zeitClient.fetchAndThrow('/v4/domains', { method: 'GET' });

  const domainBoxes = domains.map(domain => htm`
    <Box display="flex" justifyContent="space-between" alignContent="center" alignItems="center" padding="4px 6px" borderBottomStyle="solid" borderBottomColor="#cccccc" borderBottomWidth="1px">
      <Link action="${`domain::${domain.id}::${domain.name}`}"><H2>${domain.name}</H2></Link>
      <P>yes</P>
      <Button action="${`details::${domain.name}`}" small>Details</Button>
    </Box>`
  );

  let detailHtm = htm`<P>Click a domain for more details</P>`;
  if (detailDomainName) {
    const detailDomain = domains.find(domain => (domain.name === detailDomainName))
    console.log(detailDomain)
    detailHtm = htm`
      <P><B>Domain Created: </B>${new Date(detailDomain.createdAt).toJSON().split('T')[0]}</P>
      <P><B>Controlled by Now?</B>${detailDomain.serviceType === 'external' ? 'NOPE' : 'YEP'}</P>
      <P><B>${detailDomain.serviceType === 'external' ? 'Intended namesavers:' : 'Nameservers:'}</B></P>
      <UL>
        ${detailDomain.serviceType === 'external' ? detailDomain.intendedNameservers.map(ns => htm`<P>${ns}</P>`) : detailDomain.nameservers.map(ns => htm`<P>${ns}</P>`)}
      </UL>
    `;
  }

  return htm`
    <Page>
      <Fieldset>
        <FsContent display="flex">
          <Box display="flex" justifyContent="space-between">
            <Box flexGrow="1" paddingRight="24px"  paddingBottom="10px">
              <Box display="flex" justifyContent="space-between" alignContent="top" alignItems="center" paddingBottom="8px">
                <H1>Domain</H1>
                <H1>Verified?</H1>
                <H1>Details</H1>
              </Box>
              ${domainBoxes}
            </Box>
            <Box width="320px" justifySelf="flex-end" padding="24px" border="1px solid #cccccc">
              ${detailHtm}
            </Box>
          </Box>
        </FsContent>
        <FsFooter display="flex" justifyContent="space-between">
          <P>Buy a new domain?</P>
          <Button small width={220}>+ Buy</Button>
        </FsFooter>
      </Fieldset>
    </Page>
  `;
};
