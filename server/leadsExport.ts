import { Lead } from "../drizzle/schema";

/**
 * Generate an Excel file from leads data
 * Returns a buffer that can be sent as a file download
 */
export async function generateLeadsExcel(leads: Lead[]): Promise<Buffer> {
  // For now, we'll create a CSV format which can be opened in Excel
  // In production, you might want to use a library like exceljs
  
  const headers = [
    "الرقم",
    "الاسم",
    "البريد الإلكتروني",
    "رقم الهاتف",
    "نوع الاهتمام",
    "الحي",
    "الميزانية",
    "الرسالة",
    "الحالة",
    "تاريخ الإرسال"
  ];

  const rows = leads.map((lead, index) => [
    (index + 1).toString(),
    lead.name,
    lead.email,
    lead.phone || "",
    getInterestLabel(lead.interestedIn),
    lead.borough || "",
    lead.budget ? `£${lead.budget}` : "",
    lead.message || "",
    getStatusLabel(lead.status || "new"),
    lead.createdAt ? new Date(lead.createdAt).toLocaleDateString("ar-SA") : ""
  ]);

  // Create CSV content with UTF-8 BOM for proper Arabic support
  const bom = '\uFEFF';
  const csvContent = [
    headers.join(","),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(","))
  ].join("\n");

  return Buffer.from(bom + csvContent, "utf-8");
}

function getInterestLabel(interest: string): string {
  const labels: Record<string, string> = {
    rent: "إيجار",
    buy: "شراء",
    sell: "بيع"
  };
  return labels[interest] || interest;
}

function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    new: "جديد",
    contacted: "تم التواصل",
    qualified: "مؤهل",
    converted: "محول"
  };
  return labels[status] || status;
}

/**
 * Alternative: Generate proper Excel file using a library
 * This requires installing a package like 'exceljs'
 * 
 * Example implementation:
 * 
 * import ExcelJS from 'exceljs';
 * 
 * export async function generateLeadsExcelAdvanced(leads: Lead[]): Promise<Buffer> {
 *   const workbook = new ExcelJS.Workbook();
 *   const worksheet = workbook.addWorksheet('العملاء');
 *   
 *   // Add headers
 *   worksheet.columns = [
 *     { header: 'الرقم', key: 'number', width: 10 },
 *     { header: 'الاسم', key: 'name', width: 20 },
 *     { header: 'البريد', key: 'email', width: 25 },
 *     // ... more columns
 *   ];
 *   
 *   // Add data rows
 *   leads.forEach((lead, index) => {
 *     worksheet.addRow({
 *       number: index + 1,
 *       name: lead.name,
 *       email: lead.email,
 *       // ... more fields
 *     });
 *   });
 *   
 *   return workbook.xlsx.writeBuffer();
 * }
 */

