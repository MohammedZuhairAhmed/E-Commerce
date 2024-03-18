// export default async function handler(req, res) {
//   try {
//     if (req.body) {
//       const productData = req.body[0];
//       const categoryToFind = req.query.category;

//       const productIndexes = productData.reduce((acc, product, index) => {
//         if (product.tag === categoryToFind) {
//           acc.push(index);
//         }
//         return acc;
//       }, []);

//       const response = {
//         productIndexes: productIndexes,
//       };

//       res.status(200).json(response);
//     } else {
//       res.status(400).json({ error: 'Empty request body' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// }
