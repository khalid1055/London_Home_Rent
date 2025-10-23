import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { APP_LOGO, APP_TITLE } from "@/const";
import { ExternalLink, TrendingUp, Globe, Search, Award, Clock, DollarSign, CheckCircle2 } from "lucide-react";

export default function DomainForSale() {
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
              <a href="/">Back to Home</a>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-4">Premium Domain for Sale</h1>
            <p className="text-xl text-blue-100 mb-6">
              <strong>londonhomerent.com</strong> - A high-value domain in the lucrative London rental market
            </p>
            <div className="flex flex-wrap gap-3">
              <Button 
                asChild
                className="bg-white text-blue-600 hover:bg-blue-50 font-semibold"
              >
                <a 
                  href="https://www.atom.com/view/name/LondonHomeRent.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Buy on Atom
                </a>
              </Button>
              <Button 
                asChild
                className="bg-white text-blue-600 hover:bg-blue-50 font-semibold"
              >
                <a 
                  href="https://sedo.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Buy on Sedo
                </a>
              </Button>
              <Button 
                asChild
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                <a href="mailto:contact@londonhomerent.com" className="flex items-center gap-2">
                  Make an Offer
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Domain Stats */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Why This Domain is Valuable</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <Globe className="w-8 h-8 text-blue-600 mb-2" />
                <CardTitle className="text-lg">Premium Niche</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 text-sm">
                  London rental market is worth billions. High-demand niche with continuous search volume.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Search className="w-8 h-8 text-blue-600 mb-2" />
                <CardTitle className="text-lg">SEO Optimized</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 text-sm">
                  Built with modern SEO best practices. Structured data, fast loading, mobile-ready.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <TrendingUp className="w-8 h-8 text-blue-600 mb-2" />
                <CardTitle className="text-lg">Growth Potential</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 text-sm">
                  Established with quality content. Ready to scale with proven monetization strategies.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Award className="w-8 h-8 text-blue-600 mb-2" />
                <CardTitle className="text-lg">Professional Setup</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 text-sm">
                  Full-stack application with database, authentication, and lead capture system.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Domain Features */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">What You Get</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Technical Assets</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-slate-900">Full-Stack Application</p>
                    <p className="text-sm text-slate-600">React 19 + Express.js + MySQL</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-slate-900">Database & Backend</p>
                    <p className="text-sm text-slate-600">MySQL with Drizzle ORM, tRPC API</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-slate-900">Authentication System</p>
                    <p className="text-sm text-slate-600">OAuth integration with user management</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-slate-900">Lead Capture System</p>
                    <p className="text-sm text-slate-600">Forms, database storage, notifications</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-slate-900">S3 Storage Integration</p>
                    <p className="text-sm text-slate-600">File uploads and media management</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Content & Strategy</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-slate-900">Professional Design</p>
                    <p className="text-sm text-slate-600">Modern UI with Tailwind CSS & shadcn/ui</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-slate-900">SEO Strategy</p>
                    <p className="text-sm text-slate-600">500+ keywords, 200+ content recommendations</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-slate-900">Marketing Strategy</p>
                    <p className="text-sm text-slate-600">12-month roadmap with KPIs</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-slate-900">Monetization Setup</p>
                    <p className="text-sm text-slate-600">7 revenue streams ready to implement</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-slate-900">Complete Documentation</p>
                    <p className="text-sm text-slate-600">Deployment guides, setup instructions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Market Opportunity */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Market Opportunity</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <DollarSign className="w-8 h-8 text-green-600 mb-2" />
                <CardTitle>Revenue Potential</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-green-600 mb-2">£27,000+</p>
                <p className="text-sm text-slate-600">Annual revenue from 7 monetization streams</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <TrendingUp className="w-8 h-8 text-blue-600 mb-2" />
                <CardTitle>Growth Projection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-blue-600 mb-2">100,000+</p>
                <p className="text-sm text-slate-600">Monthly visitors by month 12</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Award className="w-8 h-8 text-purple-600 mb-2" />
                <CardTitle>Domain Value</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-purple-600 mb-2">$100K-150K</p>
                <p className="text-sm text-slate-600">Estimated value after 12 months</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Growth Timeline</h2>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">1</div>
                  <div className="w-1 h-16 bg-blue-200 mt-2"></div>
                </div>
                <div className="pt-2">
                  <h3 className="font-bold text-lg text-slate-900">Month 1-3</h3>
                  <p className="text-slate-600">Foundation & SEO Setup</p>
                  <p className="text-sm text-slate-500 mt-1">20,000 visitors | £1,200 revenue</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">2</div>
                  <div className="w-1 h-16 bg-blue-200 mt-2"></div>
                </div>
                <div className="pt-2">
                  <h3 className="font-bold text-lg text-slate-900">Month 4-6</h3>
                  <p className="text-slate-600">Content & Link Building</p>
                  <p className="text-sm text-slate-500 mt-1">50,000 visitors | £4,600 revenue</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">3</div>
                  <div className="w-1 h-16 bg-blue-200 mt-2"></div>
                </div>
                <div className="pt-2">
                  <h3 className="font-bold text-lg text-slate-900">Month 7-12</h3>
                  <p className="text-slate-600">Authority & Monetization</p>
                  <p className="text-sm text-slate-500 mt-1">100,000+ visitors | £12,800+ revenue</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">✓</div>
                </div>
                <div className="pt-2">
                  <h3 className="font-bold text-lg text-slate-900">Domain Value: $100K-150K</h3>
                  <p className="text-slate-600">Ready for acquisition or continued growth</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Acquire This Premium Domain?</h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Don't miss this opportunity to own a high-value domain in the lucrative London rental market.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button 
              asChild
              className="bg-white text-blue-600 hover:bg-blue-50 font-semibold"
            >
              <a 
                href="https://www.atom.com/view/name/LondonHomeRent.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Buy on Atom
              </a>
            </Button>
            <Button 
              asChild
              className="bg-white text-blue-600 hover:bg-blue-50 font-semibold"
            >
              <a 
                href="https://sedo.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Buy on Sedo
              </a>
            </Button>
            <Button 
              asChild
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              <a href="mailto:contact@londonhomerent.com">
                Make an Offer
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">About Domain</h4>
              <p className="text-slate-400 text-sm">
                londonhomerent.com - A premium domain in the London rental market with professional setup and growth potential.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="/" className="hover:text-white">Back to Home</a></li>
                <li><a href="https://www.atom.com/view/name/LondonHomeRent.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">Buy on Atom</a></li>
                <li><a href="https://sedo.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">Buy on Sedo</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <p className="text-slate-400 text-sm mb-2">Email: contact@londonhomerent.com</p>
              <p className="text-slate-400 text-sm">Make an offer or inquire about the domain</p>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8">
            <p className="text-center text-slate-400 text-sm">
              © 2025 londonhomerent.com | Premium Domain for Sale
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

