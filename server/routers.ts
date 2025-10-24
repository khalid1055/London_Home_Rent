import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";

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

  boroughs: router({
    list: publicProcedure.query(async () => {
      return await db.getAllBoroughs();
    }),
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await db.getBoroughById(input.id);
      }),
  }),

  properties: router({
    list: publicProcedure.query(async () => {
      return await db.getAllProperties();
    }),
    featured: publicProcedure.query(async () => {
      return await db.getFeaturedProperties();
    }),
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await db.getPropertyById(input.id);
      }),
  }),

  leads: router({
    create: publicProcedure
      .input(z.object({
        fullName: z.string().min(1, "Full name is required"),
        email: z.string().email("Valid email is required"),
        phone: z.string().optional(),
        interestedIn: z.enum(["Renting", "Buying", "Selling", "Investing"]),
        preferredBoroughId: z.number().optional(),
        budget: z.number().optional(),
        message: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        await db.createLead({
          fullName: input.fullName,
          email: input.email,
          phone: input.phone,
          interestedIn: input.interestedIn,
          preferredBoroughId: input.preferredBoroughId,
          budget: input.budget,
          message: input.message,
        });
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;

