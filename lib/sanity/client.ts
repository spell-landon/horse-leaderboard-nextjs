import sanityClient from '@sanity/client';

// Set process.env.SANITY_WRITE_KEY to the actual token;

const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_ID,
  apiVersion: '2021-10-21',
  token: process.env.SANITY_WRITE_KEY,
  useCdn: false,
};

const client = sanityClient(config);

export default client;
