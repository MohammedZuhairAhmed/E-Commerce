export default async function handler(req, res) {
  if (req.body) {
    const productData = req.body[0];

    // Extract titles using map
    const productTitles = productData.map((product) => product.title);

    const response = {
      productTitles,
    };

    res.status(200).json(response);
  } else {
    res.status(400).json({ error: 'Empty request body' });
  }
}
