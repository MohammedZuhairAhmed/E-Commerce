import { singleEntryQueryWithUID } from '../../../src/contentstack-sdk/index';

export default async function handler(request, response) {
  const query = singleEntryQueryWithUID('products', request.query.id);

  const result = await query.toJSON().fetch();

  response.send(result);
}
