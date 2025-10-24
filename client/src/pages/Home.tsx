import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, MapPin, TrendingUp, Bell, Star, BarChart3, BookOpen } from "lucide-react";

export default function Home() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interestedIn: "rent",
    borough: "",
    budget: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would call the API to save the lead
    alert("Thank you! We'll contact you soon.");
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
              LH
            </div>
            <h1 className="text-2xl font-bold text-gray-900">LondonHomeRent</h1>
          </div>
          <nav className="flex items-center gap-4">
            <a href="/smart-alerts" className="text-gray-600 hover:text-blue-600">
              Smart Alerts
            </a>
            <a href="/reviews" className="text-gray-600 hover:text-blue-600">
              Reviews
            </a>
            <a href="/guides" className="text-gray-600 hover:text-blue-600">
              Guides
            </a>
            <a href="/domain-for-sale" className="text-gray-600 hover:text-blue-600 font-semibold">
              Domain for Sale
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">Find Your Perfect London Home</h2>
            <p className="text-xl text-gray-600">
              Discover rental properties across London's best neighborhoods
            </p>
          </div>

          {/* Quick Search */}
          <Card className="mb-12 border-0 shadow-lg">
            <CardContent className="pt-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Borough</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option>All Boroughs</option>
                    <option>Westminster</option>
                    <option>Camden</option>
                    <option>Islington</option>
                    <option>Hackney</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option>Any</option>
                    <option>Studio</option>
                    <option>1 Bedroom</option>
                    <option>2 Bedrooms</option>
                    <option>3+ Bedrooms</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Price</label>
                  <input
                    type="number"
                    placeholder="£3000"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex items-end">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lead Capture Form */}
          <Card className="mb-12 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
            <CardHeader>
              <CardTitle>Interested in London Properties?</CardTitle>
              <CardDescription>Tell us what you're looking for and we'll help you find the perfect home</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Smith"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+44 7700 900000"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">I'm interested in:</label>
                    <select
                      value={formData.interestedIn}
                      onChange={(e) => setFormData({ ...formData, interestedIn: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="rent">Renting</option>
                      <option value="buy">Buying</option>
                      <option value="sell">Selling</option>
                      <option value="invest">Investing</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Borough</label>
                    <select
                      value={formData.borough}
                      onChange={(e) => setFormData({ ...formData, borough: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option>Select a borough...</option>
                      <option>Westminster</option>
                      <option>Camden</option>
                      <option>Islington</option>
                      <option>Hackney</option>
                      <option>Tower Hamlets</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Budget (£/month)</label>
                    <input
                      type="number"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      placeholder="2000"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Additional Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us more about what you're looking for..."
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
                  Submit Interest
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Featured Services */}
          <div className="mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6 text-center">
                  <Bell className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h4 className="font-semibold text-gray-900 mb-2">Smart Alerts</h4>
                  <p className="text-sm text-gray-600">Get instant notifications for properties matching your criteria</p>
                  <Button variant="outline" className="w-full mt-4">
                    Learn More
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6 text-center">
                  <Star className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h4 className="font-semibold text-gray-900 mb-2">Reviews</h4>
                  <p className="text-sm text-gray-600">Read real reviews from people living in London neighborhoods</p>
                  <Button variant="outline" className="w-full mt-4">
                    Read Reviews
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6 text-center">
                  <TrendingUp className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h4 className="font-semibold text-gray-900 mb-2">Rent Calculator</h4>
                  <p className="text-sm text-gray-600">Estimate rental prices based on location and features</p>
                  <Button variant="outline" className="w-full mt-4">
                    Calculate Rent
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6 text-center">
                  <BookOpen className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h4 className="font-semibold text-gray-900 mb-2">Guides</h4>
                  <p className="text-sm text-gray-600">Expert guides to help you navigate London's rental market</p>
                  <Button variant="outline" className="w-full mt-4">
                    View Guides
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Featured Boroughs */}
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Popular Boroughs</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: "Westminster", avg: "£2,800/month", rating: 4.8 },
                { name: "Camden", avg: "£2,600/month", rating: 4.5 },
                { name: "Islington", avg: "£2,400/month", rating: 4.3 },
                { name: "Hackney", avg: "£1,800/month", rating: 4.6 },
              ].map((borough) => (
                <Card key={borough.name} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 mb-3">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      <h4 className="font-semibold text-gray-900">{borough.name}</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Average Rent: {borough.avg}</p>
                    <p className="text-sm text-yellow-600">★★★★★ {borough.rating}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">© 2025 LondonHomeRent.com - All rights reserved</p>
        </div>
      </footer>
    </div>
  );
}

