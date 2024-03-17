export default async function handler(req, res) {
  if (req.body) {
    const productDataString = req.body;
    const productData = JSON.parse(productDataString);

    const productTitles = productData[0].map((product) => product.title);

    const response = {
      productTitles,
    };

    res.status(200).json(response);
  } else {
    res.status(400).json({ error: 'Empty request body' });
  }
}
