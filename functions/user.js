import { getShortName } from './utils';

export default function handler(request, response) {
  const name = 'Hilary';
  const shortName = getShortName(name);
  const func = 'haha';
  response.status(200).send({ name, shortName });
}
