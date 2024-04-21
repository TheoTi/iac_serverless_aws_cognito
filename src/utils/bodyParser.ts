type Body = Record<string, any>

export function bodyParser(body: string | undefined): Body {
  let parsedBody = {};

  try {
    if (body) {
      parsedBody = JSON.parse(body);
    }
  } catch {}

  return parsedBody;
}
