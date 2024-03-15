import { allEntriesQuery } from '@/contentstack-sdk';

export default function handler(request, response) {
  allEntriesQuery;
  response.send(`Hello ${request.query.name}!`);
}
