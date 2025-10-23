import { notifyOwner } from "./notification";

export interface LeadNotificationData {
  name: string;
  email: string;
  phone?: string;
  interestedIn: "buy" | "sell" | "rent";
  borough?: string;
  budget?: number;
  message?: string;
}

export async function sendLeadNotificationEmail(lead: LeadNotificationData): Promise<boolean> {
  const interestLabel = {
    buy: "شراء",
    sell: "بيع",
    rent: "إيجار"
  }[lead.interestedIn];

  const content = `
عميل جديد قام بملء النموذج:

الاسم: ${lead.name}
البريد: ${lead.email}
الهاتف: ${lead.phone || "غير محدد"}
نوع الاهتمام: ${interestLabel}
الحي المفضل: ${lead.borough || "غير محدد"}
الميزانية: ${lead.budget ? `£${lead.budget}/شهر` : "غير محددة"}

الرسالة:
${lead.message || "لا توجد رسالة إضافية"}

---
يمكنك عرض جميع العملاء في لوحة التحكم: /leads-management
  `.trim();

  try {
    const result = await notifyOwner({
      title: `عميل جديد: ${lead.name}`,
      content: content,
    });
    return result;
  } catch (error) {
    console.error("Failed to send lead notification:", error);
    return false;
  }
}

export async function sendLeadStatusChangeEmail(
  leadName: string,
  leadEmail: string,
  oldStatus: string,
  newStatus: string
): Promise<boolean> {
  const statusLabels: Record<string, string> = {
    new: "جديد",
    contacted: "تم التواصل",
    qualified: "مؤهل",
    converted: "محول"
  };

  const content = `
تم تحديث حالة العميل:

الاسم: ${leadName}
البريد: ${leadEmail}
الحالة السابقة: ${statusLabels[oldStatus] || oldStatus}
الحالة الجديدة: ${statusLabels[newStatus] || newStatus}
  `.trim();

  try {
    const result = await notifyOwner({
      title: `تحديث حالة العميل: ${leadName}`,
      content: content,
    });
    return result;
  } catch (error) {
    console.error("Failed to send status change notification:", error);
    return false;
  }
}

