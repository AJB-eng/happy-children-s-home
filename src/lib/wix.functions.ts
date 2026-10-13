import { createServerFn } from '@tanstack/react-start';

// The only public fields returned here are already displayed on the published Wix site.
export const getWixSite = createServerFn({ method: 'GET' }).handler(async () => {
  const projectKey = process.env.LOVABLE_API_KEY;
  const connectionKey = process.env.WIX_API_KEY;
  if (!projectKey || !connectionKey) throw new Error('The Wix connection is not configured.');
  const response = await fetch('https://connector-gateway.lovable.dev/wix/site-properties/v4/properties', {
    headers: {
      Authorization: `Bearer ${projectKey}`,
      'X-Connection-Api-Key': connectionKey,
      'wix-site-id': '1bbd5078-5085-4951-88bb-1d7192ab00d9',
    },
  });
  if (!response.ok) {
    const body = await response.text();
    console.error(`Wix request failed [${response.status}]: ${body}`);
    throw new Error(`Wix request failed [${response.status}]: ${body}`);
  }
  const { properties } = await response.json() as {
    properties: { businessName: string; email: string; phone: string; description: string };
  };
  return { name: properties.businessName, email: properties.email, phone: properties.phone, description: properties.description };
});