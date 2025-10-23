import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { APP_LOGO, APP_TITLE } from "@/const";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { Download, Mail, Phone, MapPin, DollarSign, MessageSquare, Calendar, Filter } from "lucide-react";

export default function LeadsManagement() {
  const { user, isAuthenticated } = useAuth();
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [interestedInFilter, setInterestedInFilter] = useState<string>("all");

  const leadsQuery = trpc.leads.getAll.useQuery();
  const updateLeadStatusMutation = trpc.leads.updateStatus.useMutation();
  const exportLeadsMutation = trpc.leads.export.useMutation();

  // Filter leads
  const filteredLeads = leadsQuery.data?.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
    const matchesInterest = interestedInFilter === "all" || lead.interestedIn === interestedInFilter;
    return matchesSearch && matchesStatus && matchesInterest;
  }) || [];

  const handleStatusChange = async (leadId: string, newStatus: string) => {
    await updateLeadStatusMutation.mutateAsync({
      id: leadId,
      status: newStatus as "new" | "contacted" | "qualified" | "converted",
    });
    leadsQuery.refetch();
  };

  const handleExportExcel = async () => {
    const result = await exportLeadsMutation.mutateAsync();
    if (result.downloadUrl) {
      window.location.href = result.downloadUrl;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800";
      case "contacted":
        return "bg-yellow-100 text-yellow-800";
      case "qualified":
        return "bg-purple-100 text-purple-800";
      case "converted":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "new":
        return "جديد";
      case "contacted":
        return "تم التواصل";
      case "qualified":
        return "مؤهل";
      case "converted":
        return "محول";
      default:
        return status;
    }
  };

  const getInterestLabel = (interest: string) => {
    switch (interest) {
      case "rent":
        return "إيجار";
      case "buy":
        return "شراء";
      case "sell":
        return "بيع";
      default:
        return interest;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>يرجى تسجيل الدخول</CardTitle>
            <CardDescription>تحتاج إلى تسجيل الدخول لعرض بيانات العملاء</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600">هذه الصفحة متاحة للمسؤولين فقط.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            {APP_LOGO && <img src={APP_LOGO} alt={APP_TITLE} className="h-8 w-8" />}
            <h1 className="text-2xl font-bold text-slate-900">{APP_TITLE}</h1>
          </div>
          <nav className="flex items-center gap-4">
            <Button asChild variant="ghost" size="sm">
              <a href="/">العودة للرئيسية</a>
            </Button>
            <span className="text-sm text-slate-600">{user?.name}</span>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">إدارة العملاء المحتملين</h2>
          <p className="text-slate-600">عرض وإدارة جميع العملاء الذين ملأوا النموذج</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600">إجمالي العملاء</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{leadsQuery.data?.length || 0}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600">جديد</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {leadsQuery.data?.filter(l => l.status === "new").length || 0}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600">تم التواصل</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {leadsQuery.data?.filter(l => l.status === "contacted").length || 0}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600">محول</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {leadsQuery.data?.filter(l => l.status === "converted").length || 0}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Export */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              الفلاتر والتصدير
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Input
                placeholder="ابحث عن الاسم أو البريد..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الحالات</SelectItem>
                  <SelectItem value="new">جديد</SelectItem>
                  <SelectItem value="contacted">تم التواصل</SelectItem>
                  <SelectItem value="qualified">مؤهل</SelectItem>
                  <SelectItem value="converted">محول</SelectItem>
                </SelectContent>
              </Select>

              <Select value={interestedInFilter} onValueChange={setInterestedInFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الأنواع</SelectItem>
                  <SelectItem value="rent">إيجار</SelectItem>
                  <SelectItem value="buy">شراء</SelectItem>
                  <SelectItem value="sell">بيع</SelectItem>
                </SelectContent>
              </Select>

              <Button 
                onClick={handleExportExcel}
                className="flex items-center gap-2"
                disabled={exportLeadsMutation.isPending}
              >
                <Download className="w-4 h-4" />
                {exportLeadsMutation.isPending ? "جاري التصدير..." : "تصدير Excel"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Leads Table */}
        <Card>
          <CardHeader>
            <CardTitle>قائمة العملاء ({filteredLeads.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredLeads.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-slate-600 mb-4">لا توجد عملاء تطابق معايير البحث</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-3 px-4 font-semibold text-slate-900">الاسم</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-900">البريد</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-900">الهاتف</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-900">النوع</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-900">الحي</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-900">الميزانية</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-900">الحالة</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-900">التاريخ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLeads.map((lead) => (
                      <tr key={lead.id} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="py-3 px-4">
                          <div className="font-medium text-slate-900">{lead.name}</div>
                        </td>
                        <td className="py-3 px-4">
                          <a href={`mailto:${lead.email}`} className="text-blue-600 hover:underline flex items-center gap-1">
                            <Mail className="w-4 h-4" />
                            {lead.email}
                          </a>
                        </td>
                        <td className="py-3 px-4">
                          {lead.phone ? (
                            <a href={`tel:${lead.phone}`} className="text-blue-600 hover:underline flex items-center gap-1">
                              <Phone className="w-4 h-4" />
                              {lead.phone}
                            </a>
                          ) : (
                            <span className="text-slate-400">-</span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-slate-600">{getInterestLabel(lead.interestedIn)}</span>
                        </td>
                        <td className="py-3 px-4">
                          {lead.borough ? (
                            <div className="flex items-center gap-1 text-slate-600">
                              <MapPin className="w-4 h-4" />
                              {lead.borough}
                            </div>
                          ) : (
                            <span className="text-slate-400">-</span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          {lead.budget ? (
                            <div className="flex items-center gap-1 text-slate-600">
                              <DollarSign className="w-4 h-4" />
                              £{lead.budget}/شهر
                            </div>
                          ) : (
                            <span className="text-slate-400">-</span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <Select 
                            value={lead.status || "new"} 
                            onValueChange={(value) => handleStatusChange(lead.id, value)}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="new">جديد</SelectItem>
                              <SelectItem value="contacted">تم التواصل</SelectItem>
                              <SelectItem value="qualified">مؤهل</SelectItem>
                              <SelectItem value="converted">محول</SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="py-3 px-4">
                            <div className="flex items-center gap-1 text-slate-600 text-sm">
                              <Calendar className="w-4 h-4" />
                              {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString("ar-SA") : "غير محدد"}
                            </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Lead Details Modal */}
        {filteredLeads.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-bold text-slate-900 mb-4">الرسائل الإضافية</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredLeads.filter(l => l.message).map((lead) => (
                <Card key={`msg-${lead.id}`}>
                  <CardHeader>
                    <CardTitle className="text-base">{lead.name}</CardTitle>
                    <CardDescription>{lead.email}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start gap-2">
                      <MessageSquare className="w-4 h-4 text-slate-400 mt-1 flex-shrink-0" />
                      <p className="text-slate-600 text-sm">{lead.message}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

