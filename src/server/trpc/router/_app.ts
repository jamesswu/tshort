import { router } from "../trpc";
import { shortRouter } from "./short";

export const appRouter = router({
  short: shortRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
