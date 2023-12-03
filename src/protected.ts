import { getSession } from "./auth/[[auth]]";

export const onRequest: PagesFunction = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return new Response(null, {
      status: 302,
      statusText: "Unauthorized",
      headers: {
        Location: "/auth/signin/github",
      },
    });
  }

  const res = await context.next();

  return res;
};
