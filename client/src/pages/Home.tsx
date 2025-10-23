import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { APP_LOGO, APP_TITLE, getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { Heart, MapPin, TrendingUp, Users, Zap, Building2 } from "lucide-react";

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const [searchBorough, setSearchBorough] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  
  // Form state
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            {APP_LOGO && <img src={APP_LOGO} alt={APP_TITLE} className="h-8 w-8" />}
            <h1 className="text-2xl font-bold text-slate-900">{APP_TITLE}</h1>
          </div>
          <nav className="flex items-center gap-4">
            <Button asChild variant="ghost" size="sm">
              <a href="/domain-for-sale">Domain for Sale</a>
            </Button>
            {isAuthenticated ? (
              <>
                <span className="text-sm text-slate-600">Welcome, {user?.name}</span>
                <Button variant="outline" size="sm">Dashboard</Button>
              </>
            ) : (
              <Button asChild size="sm">
                <a href={getLoginUrl()}>Sign In</a>
              </Button>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h2 className="text-5xl font-bold mb-4">Find Your Perfect London Home</h2>
            <p className="text-xl text-blue-100 mb-8">
              Browse thousands of rental properties across London's 32 boroughs. From affordable apartments to luxury penthouses.
            </p>
            <div className="flex gap-4">
              <Button size="lg" variant="secondary">Explore Properties</Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                Post Your Property
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold mb-8 text-center">Quick Search</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <Select value={searchBorough} onValueChange={setSearchBorough}>
              <SelectTrigger>
                <SelectValue placeholder="Select Borough" />
              </SelectTrigger>
              <SelectContent>
                {londonBoroughs.map(borough => (
                  <SelectItem key={borough} value={borough}>{borough}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={propertyType} onValueChange={setPropertyType}>
              <SelectTrigger>
                <SelectValue placeholder="Property Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="studio">Studio</SelectItem>
                <SelectItem value="1bed">1 Bedroom</SelectItem>
                <SelectItem value="2bed">2 Bedrooms</SelectItem>
                <SelectItem value="3bed">3 Bedrooms</SelectItem>
                <SelectItem value="4bed">4+ Bedrooms</SelectItem>
              </SelectContent>
            </Select>

            <Input
              type="number"
              placeholder="Max Price (£/month)"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />

            <Button className="w-full">Search Properties</Button>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold mb-12">Featured Properties</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {propertiesQuery.data?.slice(0, 6).map(property => (
              <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="bg-gradient-to-br from-blue-400 to-blue-600 h-40 flex items-center justify-center">
                  {property.imageUrl ? (
                    <img src={property.imageUrl} alt={property.title} className="w-full h-full object-cover" />
                  ) : (
                    <Building2 className="w-16 h-16 text-white opacity-50" />
                  )}
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-2">{property.title}</CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {property.borough}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-blue-600">£{property.rentPrice}</span>
                      <span className="text-sm text-slate-600">/month</span>
                    </div>
                    <div className="flex gap-4 text-sm text-slate-600">
                      {property.bedrooms && <span>🛏️ {property.bedrooms} bed</span>}
                      {property.bathrooms && <span>🚿 {property.bathrooms} bath</span>}
                    </div>
                    <p className="text-sm text-slate-600 line-clamp-2">{property.description}</p>
                    <Button className="w-full mt-4" variant="outline">View Details</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold mb-12 text-center">Why Choose LondonHomeRent</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <TrendingUp className="w-8 h-8 text-blue-600 mb-2" />
                <CardTitle>Largest Selection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">Browse thousands of verified rental properties across all 32 London boroughs.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Zap className="w-8 h-8 text-blue-600 mb-2" />
                <CardTitle>Quick & Easy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">Advanced search filters and instant notifications for new properties matching your criteria.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="w-8 h-8 text-blue-600 mb-2" />
                <CardTitle>Expert Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">Connect directly with verified agents and landlords. Get expert advice on your rental journey.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Lead Capture Form */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4 max-w-2xl">
          <h3 className="text-3xl font-bold mb-4 text-center">Get Started Today</h3>
          <p className="text-center text-slate-600 mb-8">
            Tell us what you're looking for and we'll connect you with the perfect property and agents.
          </p>

          <Card>
            <CardHeader>
              <CardTitle>Quick Interest Form</CardTitle>
              <CardDescription>Takes less than 2 minutes</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLeadSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                  <Input
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                  <Select value={formData.interestedIn} onValueChange={(value: any) => setFormData({ ...formData, interestedIn: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rent">Looking to Rent</SelectItem>
                      <SelectItem value="buy">Looking to Buy</SelectItem>
                      <SelectItem value="sell">Looking to Sell</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Select value={formData.borough} onValueChange={(value) => setFormData({ ...formData, borough: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Preferred Borough" />
                    </SelectTrigger>
                    <SelectContent>
                      {londonBoroughs.map(borough => (
                        <SelectItem key={borough} value={borough}>{borough}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Input
                    type="number"
                    placeholder="Budget (£/month)"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  />
                </div>

                <textarea
                  placeholder="Tell us more about what you're looking for..."
                  className="w-full p-3 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />

                <Button type="submit" className="w-full" size="lg" disabled={submitLeadMutation.isPending}>
                  {submitLeadMutation.isPending ? "Submitting..." : "Submit Interest"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">About Us</h4>
              <p className="text-slate-400 text-sm">LondonHomeRent.com - Your trusted platform for finding rental properties across London.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white">Browse Properties</a></li>
                <li><a href="#" className="hover:text-white">Post Property</a></li>
                <li><a href="#" className="hover:text-white">For Agents</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Domain</h4>
              <p className="text-slate-400 text-sm mb-3">This premium domain is available for purchase.</p>
              <a href="/domain-for-sale" className="text-blue-400 hover:text-blue-300 text-sm">
                View Details →
              </a>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8">
            <p className="text-center text-slate-400 text-sm">
              © 2025 LondonHomeRent.com. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

