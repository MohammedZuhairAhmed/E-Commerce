export default async function handler(req, res) {
  const productData = req.body[0];
  const productTitles = productData.map((product) => product.title);

  const response = {
    productTitles,
  };

  res.status(200).json(response);
}
