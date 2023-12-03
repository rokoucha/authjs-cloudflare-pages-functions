import { Auth } from "@auth/core";
import GitHub from "@auth/core/providers/github";

export async function getSession(context: EventContext<any, any, any>) {
  return await fetch(new URL("/auth/session", context.request.url), {
    headers: {
      Cookie: context.request.headers.get("Cookie") ?? "",
    },
  })
    .then((res) =>
      res.json<{
        user: {
          name: string;
          email: string;
          image: string;
        };
        expires: string;
      }>()
    )
    .catch(() => null);
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const res = await Auth(context.request, {
    providers: [
      GitHub({
        clientId: context.env.AUTH_GITHUB_ID,
        clientSecret: context.env.AUTH_GITHUB_SECRET,
      }),
    ],
    secret: context.env.AUTH_SECRET,
    trustHost: true,
  });

  return res as Response;
};
