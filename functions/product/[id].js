export default function handler(request, response) {
  response.send(`Hello ${request.query.id}!`);
}
