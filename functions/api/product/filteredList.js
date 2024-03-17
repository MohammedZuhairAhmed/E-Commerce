export default async function handler(req, res) {
  const products = req.body[0];
  res.status(200).json(products);
}
