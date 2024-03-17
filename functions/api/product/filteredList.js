import axios from 'axios';
export default async function handler(req, res) {
  const envVars = {
    hasContentstackCdn: !!process.env.CONTENTSTACK_CDN,
  };
  const res = axios.get('https://picsum.photos/200');
  res.status(200).json(res.data);
}
