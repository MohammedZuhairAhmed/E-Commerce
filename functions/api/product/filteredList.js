export default async function handler(req, res) {
  const base_url = process.env.CONTENTSTACK_CDN;
  const api_key = process.env.CONTENTSTACK_API_KEY;
  const access_token = process.env.CONTENTSTACK_DELIVERY_TOKEN;
  const environment = process.env.CONTENTSTACK_ENVIRONMENT;

  const data = {
    base_url,
    api_key,
    access_token,
    environment,
  };

  res.send(`Hello ${base_url}`);
  //res.status(200).json(data);
}
