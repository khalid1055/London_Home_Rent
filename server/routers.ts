import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { getProperties, getPropertyById, createLead, getLeads, updateLeadStatus } from "./db";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { generateLeadsExcel } from "./leadsExport";
import { sendLeadNotificationEmail } from "./_core/emailNotification";

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
        const leadId = uuidv4();
        await createLead({
          id: leadId,
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
        
        // Send notification email to owner
        try {
          await sendLeadNotificationEmail({
            name: input.name,
            email: input.email,
            phone: input.phone,
            interestedIn: input.interestedIn,
            borough: input.borough,
            budget: input.budget,
            message: input.message,
          });
        } catch (error) {
          console.error('Failed to send notification email:', error);
        }
        
        return { success: true };
      }),

    getAll: publicProcedure.query(async () => {
      return getLeads();
    }),

    updateStatus: publicProcedure
      .input(z.object({
        id: z.string(),
        status: z.enum(["new", "contacted", "qualified", "converted"]),
      }))
      .mutation(async ({ input }) => {
        await updateLeadStatus(input.id, input.status);
        return { success: true };
      }),

    export: publicProcedure.mutation(async () => {
      try {
        const leads = await getLeads();
        const excelBuffer = await generateLeadsExcel(leads);
        
        // In a real scenario, you would upload to S3 or return base64
        // For now, return a success message
        return { 
          success: true,
          downloadUrl: "/api/export/leads",
          message: "Excel file generated successfully"
        };
      } catch (error) {
        console.error('Failed to export leads:', error);
        return { success: false, error: 'Failed to generate export' };
      }
    }),
  }),
});

export type AppRouter = typeof appRouter;

