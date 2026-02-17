import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("https://icanhazdadjoke.com/", () => {
    return HttpResponse.json({
      id: "7E69M792Tvc",
      joke: "I've got a joke about vegetables for you... but it's a bit corny.",
      status: 200,
    });
  }),
];
