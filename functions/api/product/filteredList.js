export default async function handler(req, res) {
  if (req.body) {
    const productData = req.body[0];

    const productTags = [
      ...new Set(productData.map((product) => product.tags[0])),
    ];

    const response = {
      productTags,
      productData,
    };

    res.status(200).json(response);
  } else {
    res.status(400).json({ error: 'Empty request body' });
  }
}
