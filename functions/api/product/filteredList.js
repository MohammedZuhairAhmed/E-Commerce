export default async function handler(req, res) {
  const envVars = {
    hasContentstackCdn: !!process.env.CONTENTSTACK_CDN,
  };

  res.status(200).json(envVars);
}
