export default async function handler(req, res) {
  // Directly use the data in the response body
  const productTitles = req.body.map((product) => product.title);

  // Prepare response (assuming JSON format)
  const response = {
    productTitles,
  };

  // Send response efficiently
  res.status(200).json(response);
}
