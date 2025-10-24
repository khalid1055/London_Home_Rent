import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Bell, BookOpen, Calculator, Star } from "lucide-react";

export default function Home() {
  const [searchBorough, setSearchBorough] = useState("all");
  const [searchBedrooms, setSearchBedrooms] = useState("any");
  const [searchMaxPrice, setSearchMaxPrice] = useState("");

  // Lead form state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [interestedIn, setInterestedIn] = useState<"Renting" | "Buying" | "Selling" | "Investing">("Renting");
  const [preferredBorough, setPreferredBorough] = useState("");
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState("");

  const { data: boroughs = [] } = trpc.boroughs.list.useQuery();
  const createLeadMutation = trpc.leads.create.useMutation();

  const handleSearch = () => {
    toast.info("Search functionality coming soon!");
  };

  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fullName || !email) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      await createLeadMutation.mutateAsync({
        fullName,
        email,
        phone: phone || undefined,
        interestedIn,
        preferredBoroughId: preferredBorough ? parseInt(preferredBorough) : undefined,
        budget: budget ? parseInt(budget) : undefined,
        message: message || undefined,
      });

      toast.success("Thank you! We'll be in touch soon.");
      
      // Reset form
      setFullName("");
      setEmail("");
      setPhone("");
      setPreferredBorough("");
      setBudget("");
      setMessage("");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const newsItems = [
    "London rental market up 7.3% YoY",
    "Westminster avg rent: £2,800/month",
    "Demand for 2-bedroom properties highest",
    "Tech hubs driving North London growth",
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Red Banner */}
      <div className="bg-red-600 text-white py-3 text-center font-semibold">
        <div className="container flex flex-wrap items-center justify-center gap-2 sm:gap-4">
          <span>🏠 Domain for Sale</span>
          <span className="hidden sm:inline">|</span>
          <a href="https://sedo.com/search/details/?domain=londonhomerent.com&origin=domaindetails" target="_blank" rel="noopener noreferrer" className="underline hover:text-red-100 transition-colors">
            Buy on Sedo
          </a>
          <span className="hidden sm:inline">|</span>
          <a href="https://www.atom.com/name/LondonHomeRent" target="_blank" rel="noopener noreferrer" className="underline hover:text-red-100 transition-colors">
            Buy on Atom
          </a>
        </div>
      </div>

      {/* News Ticker */}
      <div className="bg-gray-800 text-white py-2 overflow-hidden">
        <div className="flex whitespace-nowrap">
          <div className="flex animate-scroll">
            <span className="mx-8 font-medium">MARKET NEWS:</span>
            {newsItems.map((item, i) => (
              <span key={i} className="mx-8">{item}</span>
            ))}
            <span className="mx-8 font-medium">MARKET NEWS:</span>
            {newsItems.map((item, i) => (
              <span key={`dup-${i}`} className="mx-8">{item}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                LH
              </div>
              <span className="text-xl font-bold">LondonHomeRent</span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#alerts" className="text-gray-700 hover:text-blue-600 font-medium">Smart Alerts</a>
              <a href="#reviews" className="text-gray-700 hover:text-blue-600 font-medium">Reviews</a>
              <a href="#guides" className="text-gray-700 hover:text-blue-600 font-medium">Guides</a>
              <Button variant="default" className="bg-orange-500 hover:bg-orange-600">
                <a href="#domain-sale">Domain for Sale</a>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 bg-cover bg-center" style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/london-hero.jpg)' }}>
        <div className="container">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Find Your Perfect London Home
            </h1>          <p className="text-xl text-gray-100 mb-8">             Discover rental properties across London's best neighborhoods
            </p>
          </div>

          {/* Search Form */}
          <Card className="max-w-4xl mx-auto">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="borough">Borough</Label>
                  <Select value={searchBorough} onValueChange={setSearchBorough}>
                    <SelectTrigger id="borough">
                      <SelectValue placeholder="All Boroughs" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Boroughs</SelectItem>
                      {boroughs.map((borough) => (
                        <SelectItem key={borough.id} value={borough.id.toString()}>
                          {borough.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="bedrooms">Bedrooms</Label>
                  <Select value={searchBedrooms} onValueChange={setSearchBedrooms}>
                    <SelectTrigger id="bedrooms">
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="studio">Studio</SelectItem>
                      <SelectItem value="1">1 Bedroom</SelectItem>
                      <SelectItem value="2">2 Bedrooms</SelectItem>
                      <SelectItem value="3">3+ Bedrooms</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="maxPrice">Max Price</Label>
                  <Input
                    id="maxPrice"
                    type="number"
                    placeholder="£3000"
                    value={searchMaxPrice}
                    onChange={(e) => setSearchMaxPrice(e.target.value)}
                  />
                </div>

                <div className="flex items-end">
                  <Button onClick={handleSearch} className="w-full">
                    Search
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Lead Capture Form */}
      <section className="py-16 bg-white">
        <div className="container">
          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">Interested in London Properties?</CardTitle>
              <CardDescription>
                Tell us what you're looking for and we'll help you find the perfect home
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitLead} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      placeholder="John Smith"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      placeholder="+44 7700 900000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="interestedIn">I'm interested in:</Label>
                    <Select value={interestedIn} onValueChange={(val) => setInterestedIn(val as any)}>
                      <SelectTrigger id="interestedIn">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Renting">Renting</SelectItem>
                        <SelectItem value="Buying">Buying</SelectItem>
                        <SelectItem value="Selling">Selling</SelectItem>
                        <SelectItem value="Investing">Investing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="preferredBorough">Preferred Borough</Label>
                    <Select value={preferredBorough} onValueChange={setPreferredBorough}>
                      <SelectTrigger id="preferredBorough">
                        <SelectValue placeholder="Select a borough..." />
                      </SelectTrigger>
                      <SelectContent>
                        {boroughs.map((borough) => (
                          <SelectItem key={borough.id} value={borough.id.toString()}>
                            {borough.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="budget">Budget (£/month)</Label>
                    <Input
                      id="budget"
                      type="number"
                      placeholder="2000"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="message">Additional Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us more about what you're looking for..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={createLeadMutation.isPending}>
                  {createLeadMutation.isPending ? "Submitting..." : "Submit Interest"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <Bell className="w-10 h-10 text-blue-600 mb-2" />
                <CardTitle>Smart Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Get instant notifications for properties matching your criteria</p>
                <Button variant="outline" size="sm">Learn More</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Star className="w-10 h-10 text-blue-600 mb-2" />
                <CardTitle>Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Read real reviews from people living in London neighborhoods</p>
                <Button variant="outline" size="sm">Read Reviews</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Calculator className="w-10 h-10 text-blue-600 mb-2" />
                <CardTitle>Rent Calculator</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Estimate rental prices based on location and features</p>
                <Button variant="outline" size="sm">Calculate Rent</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <BookOpen className="w-10 h-10 text-blue-600 mb-2" />
                <CardTitle>Guides</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Expert guides to help you navigate London's rental market</p>
                <Button variant="outline" size="sm">View Guides</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Popular Boroughs */}
      <section className="py-16 bg-white">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Boroughs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {boroughs.slice(0, 4).map((borough) => (
              <Card key={borough.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(/${borough.name.toLowerCase()}.jpg)` }} />
                <CardHeader>
                  <CardTitle>{borough.name}</CardTitle>
                  <CardDescription>Average Rent: £{borough.averageRent.toLocaleString()}/month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-1 text-yellow-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < Math.floor(borough.rating / 10) ? 'fill-current' : ''}`} />
                    ))}
                    <span className="ml-2 text-gray-600">{(borough.rating / 10).toFixed(1)}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Domain for Sale Section */}
      <section id="domain-sale" className="py-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="container">
          <Card className="max-w-2xl mx-auto text-center">
            <CardHeader>
              <CardTitle className="text-3xl">This Domain is For Sale</CardTitle>
              <CardDescription className="text-lg">
                Interested in purchasing londonhomerent.com?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-700">
                This premium domain is perfect for real estate agencies, property management companies, 
                or rental platforms focused on the London market.
              </p>
              <div className="bg-blue-50 p-6 rounded-lg">
                <p className="font-semibold text-gray-900 mb-2">Contact us directly:</p>
                <a 
                  href="mailto:info@londonhomerent.com" 
                  className="text-blue-600 hover:text-blue-700 font-medium text-lg"
                >
                  info@londonhomerent.com
                </a>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  <a href="https://sedo.com/search/details/?domain=londonhomerent.com&origin=domaindetails" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    Buy Now on Sedo
                  </a>
                </Button>
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                  <a href="https://www.atom.com/name/LondonHomeRent" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    Buy Now on Atom
                  </a>
                </Button>
              </div>
              <Button size="lg" variant="outline" className="border-2">
                <a href="mailto:info@londonhomerent.com">Make an Offer via Email</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container text-center">
          <p className="text-gray-400">© 2025 LondonHomeRent.com - Premium Domain for Sale</p>
          <p className="text-gray-500 mt-2">Contact: khalid1055@gmail.com</p>
        </div>
      </footer>
    </div>
  );
}

