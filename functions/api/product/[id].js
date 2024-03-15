export default function handler(request, response) {
  response.end(`Hello ${request.query.id}!`);
}
