import { createCallerFactory, router } from "./trpc";
import { systemRouter } from "./routers/system";

/**
 * Root router. Feature routers (attendance, leave, payroll, ...) mount here
 * as they are implemented; see src/features/*.
 */
export const appRouter = router({
  system: systemRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
