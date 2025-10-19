import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { getProperties, getPropertyById, createLead } from "./db";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  properties: router({
    list: publicProcedure.query(async () => {
      return getProperties();
    }),
    getById: publicProcedure
      .input(z.string())
      .query(async ({ input }) => {
        return getPropertyById(input);
      }),
  }),

  leads: router({
    submit: publicProcedure
      .input(z.object({
        name: z.string(),
        email: z.string().email(),
        phone: z.string().optional(),
        interestedIn: z.enum(["buy", "sell", "rent"]),
        borough: z.string().optional(),
        budget: z.number().optional(),
        message: z.string().optional(),
        source: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        await createLead({
          id: uuidv4(),
          name: input.name,
          email: input.email,
          phone: input.phone,
          interestedIn: input.interestedIn,
          borough: input.borough,
          budget: input.budget,
          message: input.message,
          source: input.source || 'website',
          status: 'new',
        });
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;

