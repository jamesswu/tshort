import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { nanoid } from 'nanoid';

export const shortRouter = router({
  addUrl: publicProcedure
    .input(z.string())
    .mutation(({ctx,input}) => {
      return ctx.prisma.shortLink.create({
        data: {
          url: input,
          slug: nanoid(10),
        }
      })
    }),
  getById: publicProcedure
    .input(z.string())
    .query(({ctx,input}) => {
      return ctx.prisma.shortLink.findFirst({
        where: {
          slug: input
        }
      })
    }),
  hello: publicProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.shortLink.findMany();
  }),
});
