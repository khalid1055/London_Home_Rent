import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { APP_LOGO, APP_TITLE, getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { useState, useEffect } from "react";
import { Heart, MapPin, TrendingUp, Users, Zap, Building2, ChevronRight, Star, Shield, Clock, Search as SearchIcon } from "lucide-react";

// Ticker news component
function NewsTicker() {
  const [news, setNews] = useState<string[]>([
    "🏠 متوسط الإيجار في لندن: £2,252/شهر (↑7.3% سنوياً)",
    "📈 أغلى الأحياء: كنسينجتون وتشيلسي - £3,616/شهر",
    "💰 أرخص الأحياء: بيكسلي - £1,485/شهر",
    "🏘️ أكثر الأحياء طلباً: وستمنستر وكاندن",
    "📊 الطلب على الإيجار يزداد 15% هذا العام",
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % news.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [news.length]);

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 overflow-hidden">
      <div className="container mx-auto px-4 flex items-center gap-4">
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          <span className="font-bold text-sm">مباشر</span>
        </div>
        <div className="flex-1 overflow-hidden">
          <div className="animate-scroll whitespace-nowrap">
            {news[currentIndex]}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const [searchBorough, setSearchBorough] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interestedIn: "rent" as "buy" | "sell" | "rent",
    borough: "",
    budget: "",
    message: "",
  });

  const propertiesQuery = trpc.properties.list.useQuery();
  const submitLeadMutation = trpc.leads.submit.useMutation();

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitLeadMutation.mutateAsync({
      ...formData,
      budget: formData.budget ? parseInt(formData.budget) : undefined,
    });
    setFormData({
      name: "",
      email: "",
      phone: "",
      interestedIn: "rent",
      borough: "",
      budget: "",
      message: "",
    });
  };

  const londonBoroughs = [
    "Barking & Dagenham", "Barnet", "Bexley", "Brent", "Bromley", "Camden",
    "Croydon", "Ealing", "Enfield", "Greenwich", "Hackney", "Hammersmith & Fulham",
    "Haringey", "Harrow", "Havering", "Hillingdon", "Hounslow", "Islington",
    "Kensington & Chelsea", "Kingston", "Lambeth", "Lewisham", "Merton", "Newham",
    "Redbridge", "Richmond", "Southwark", "Sutton", "Tower Hamlets", "Waltham Forest",
    "Wandsworth", "Westminster"
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* News Ticker */}
      <NewsTicker />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-md border-b border-blue-100">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            {APP_LOGO && <img src={APP_LOGO} alt={APP_TITLE} className="h-10 w-10 rounded-lg" />}
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">{APP_TITLE}</h1>
              <p className="text-xs text-slate-500">أفضل منصة عقارات في لندن</p>
            </div>
          </div>
          <nav className="flex items-center gap-4">
            <Button asChild variant="ghost" size="sm" className="text-slate-700 hover:text-blue-600">
              <a href="/domain-for-sale">الدومين للبيع</a>
            </Button>
            {isAuthenticated ? (
              <>
                <span className="text-sm text-slate-600">مرحباً، {user?.name}</span>
                <Button variant="outline" size="sm">لوحة التحكم</Button>
              </>
            ) : (
              <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700">
                <a href={getLoginUrl()}>دخول</a>
              </Button>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section - Premium Design */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-24 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 bg-clip-text text-transparent">
              اعثر على منزلك المثالي في لندن
            </h2>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              استكشف آلاف العقارات المميزة في جميع أحياء لندن. من الشقق الحديثة إلى الفيلات الفاخرة، نحن هنا لمساعدتك.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-6 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all">
                <SearchIcon className="w-5 h-5 mr-2" />
                ابدأ البحث الآن
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-6 text-lg border-2 border-blue-600 text-blue-600 hover:bg-blue-50">
                اعرض عقارك
              </Button>
            </div>
          </div>

          {/* Advanced Search Bar */}
          <Card className="max-w-5xl mx-auto shadow-2xl border-0 rounded-2xl overflow-hidden">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">الحي</label>
                  <Select value={searchBorough} onValueChange={setSearchBorough}>
                    <SelectTrigger className="border-2 border-slate-200 focus:border-blue-500 rounded-lg">
                      <SelectValue placeholder="اختر الحي" />
                    </SelectTrigger>
                    <SelectContent>
                      {londonBoroughs.map(borough => (
                        <SelectItem key={borough} value={borough}>{borough}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">نوع العقار</label>
                  <Select value={propertyType} onValueChange={setPropertyType}>
                    <SelectTrigger className="border-2 border-slate-200 focus:border-blue-500 rounded-lg">
                      <SelectValue placeholder="النوع" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="studio">ستوديو</SelectItem>
                      <SelectItem value="1bed">غرفة واحدة</SelectItem>
                      <SelectItem value="2bed">غرفتان</SelectItem>
                      <SelectItem value="3bed">3 غرف</SelectItem>
                      <SelectItem value="4bed">4+ غرف</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">السعر الأقصى</label>
                  <Input
                    type="number"
                    placeholder="£/شهر"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="border-2 border-slate-200 focus:border-blue-500 rounded-lg"
                  />
                </div>

                <div className="md:col-span-2 flex items-end">
                  <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-6 rounded-lg font-semibold">
                    <SearchIcon className="w-5 h-5 mr-2" />
                    بحث متقدم
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h3 className="text-4xl font-bold text-slate-900 mb-2">العقارات المميزة</h3>
            <p className="text-lg text-slate-600">أفضل العقارات المختارة لك هذا الأسبوع</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {propertiesQuery.data?.slice(0, 6).map(property => (
              <Card key={property.id} className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-0 rounded-xl group">
                <div className="relative h-56 bg-gradient-to-br from-blue-400 to-blue-600 overflow-hidden">
                  {property.imageUrl ? (
                    <img src={property.imageUrl} alt={property.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Building2 className="w-20 h-20 text-white opacity-30" />
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg cursor-pointer hover:bg-red-50">
                    <Heart className="w-5 h-5 text-slate-400 hover:text-red-500" />
                  </div>
                  {property.isPremiumListing && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      مميز
                    </div>
                  )}
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-2 text-lg">{property.title}</CardTitle>
                  <CardDescription className="flex items-center gap-1 text-slate-600">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    {property.borough}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                      <span className="text-3xl font-bold text-blue-600">£{property.rentPrice}</span>
                      <span className="text-sm text-slate-600 font-medium">/شهر</span>
                    </div>
                    <div className="flex gap-6 text-sm text-slate-600">
                      {property.bedrooms && (
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-blue-600" />
                          <span>{property.bedrooms} غرفة</span>
                        </div>
                      )}
                      {property.bathrooms && (
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4 text-blue-600" />
                          <span>{property.bathrooms} حمام</span>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-slate-600 line-clamp-2">{property.description}</p>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg py-2 font-semibold group">
                      عرض التفاصيل
                      <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-6">
              عرض جميع العقارات
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-slate-900 mb-4">لماذا تختار LondonHomeRent؟</h3>
            <p className="text-lg text-slate-600">نحن نقدم أفضل خدمة عقارية في لندن</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: TrendingUp,
                title: "أكبر مجموعة",
                desc: "آلاف العقارات المتاحة في جميع أحياء لندن"
              },
              {
                icon: Shield,
                title: "آمن وموثوق",
                desc: "جميع العقارات تم التحقق منها والتأكد من صحتها"
              },
              {
                icon: Clock,
                title: "دعم 24/7",
                desc: "فريق متخصص جاهز لمساعدتك في أي وقت"
              }
            ].map((item, idx) => (
              <Card key={idx} className="border-0 shadow-lg hover:shadow-xl transition-shadow rounded-xl p-8 text-center">
                <item.icon className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h4>
                <p className="text-slate-600">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Capture Form */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-12 text-white">
            <h3 className="text-4xl font-bold mb-4">ابدأ رحلتك اليوم</h3>
            <p className="text-lg text-blue-100">
              أخبرنا عما تبحث عنه وسنساعدك في العثور على المنزل المثالي
            </p>
          </div>

          <Card className="border-0 shadow-2xl rounded-2xl overflow-hidden">
            <CardContent className="p-8">
              <form onSubmit={handleLeadSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="الاسم الكامل"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="border-2 border-slate-200 focus:border-blue-500 rounded-lg py-3"
                  />
                  <Input
                    type="email"
                    placeholder="البريد الإلكتروني"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="border-2 border-slate-200 focus:border-blue-500 rounded-lg py-3"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="رقم الهاتف"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="border-2 border-slate-200 focus:border-blue-500 rounded-lg py-3"
                  />
                  <Select value={formData.interestedIn} onValueChange={(value: any) => setFormData({ ...formData, interestedIn: value })}>
                    <SelectTrigger className="border-2 border-slate-200 focus:border-blue-500 rounded-lg py-3">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rent">البحث عن إيجار</SelectItem>
                      <SelectItem value="buy">البحث عن شراء</SelectItem>
                      <SelectItem value="sell">البحث عن بيع</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Select value={formData.borough} onValueChange={(value) => setFormData({ ...formData, borough: value })}>
                    <SelectTrigger className="border-2 border-slate-200 focus:border-blue-500 rounded-lg py-3">
                      <SelectValue placeholder="الحي المفضل" />
                    </SelectTrigger>
                    <SelectContent>
                      {londonBoroughs.map(borough => (
                        <SelectItem key={borough} value={borough}>{borough}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Input
                    type="number"
                    placeholder="الميزانية (£/شهر)"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="border-2 border-slate-200 focus:border-blue-500 rounded-lg py-3"
                  />
                </div>

                <textarea
                  placeholder="أخبرنا المزيد عما تبحث عنه..."
                  className="w-full p-4 border-2 border-slate-200 focus:border-blue-500 rounded-lg focus:outline-none resize-none"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />

                <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-6 rounded-lg font-bold text-lg" disabled={submitLeadMutation.isPending}>
                  {submitLeadMutation.isPending ? "جاري الإرسال..." : "إرسال الطلب"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="font-bold mb-4 text-lg">عن الموقع</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                LondonHomeRent.com - منصة عقارات موثوقة توفر أفضل العقارات في لندن
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-lg">الروابط السريعة</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition">البحث عن عقارات</a></li>
                <li><a href="#" className="hover:text-white transition">عرض عقار</a></li>
                <li><a href="#" className="hover:text-white transition">للوكلاء</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-lg">القانوني</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition">شروط الخدمة</a></li>
                <li><a href="#" className="hover:text-white transition">سياسة الخصوصية</a></li>
                <li><a href="#" className="hover:text-white transition">سياسة الكوكيز</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-lg">الدومين</h4>
              <p className="text-slate-400 text-sm mb-3">هذا الدومين متاح للبيع</p>
              <a href="/domain-for-sale" className="text-blue-400 hover:text-blue-300 font-semibold">
                عرض التفاصيل →
              </a>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8">
            <p className="text-center text-slate-400 text-sm">
              © 2025 LondonHomeRent.com. جميع الحقوق محفوظة.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

