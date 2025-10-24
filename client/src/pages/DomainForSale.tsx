import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Mail } from "lucide-react";

export default function DomainForSale() {
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
          <Button asChild variant="ghost">
            <a href="/">← Back to Home</a>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-2xl">
          {/* Domain Name */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              londonhomerent.com
            </h1>
            <p className="text-xl text-gray-600">
              Premium Domain for Sale
            </p>
          </div>

          {/* Purchase Options */}
          <Card className="border-0 shadow-xl mb-8">
            <CardContent className="pt-12 pb-12">
              <div className="space-y-6">
                {/* Atom Option */}
                <div className="border-b pb-6 last:border-b-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Option 1: Buy on Atom
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Purchase this domain directly through Atom's marketplace
                  </p>
                  <Button
                    asChild
                    className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-base"
                  >
                    <a
                      href="https://www.atom.com/view/name/LondonHomeRent.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <ExternalLink className="w-5 h-5" />
                      View on Atom
                    </a>
                  </Button>
                </div>

                {/* Sedo Option */}
                <div className="border-b pb-6 last:border-b-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Option 2: Buy on Sedo
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Purchase this domain through Sedo's trusted marketplace
                  </p>
                  <Button
                    asChild
                    className="w-full bg-green-600 hover:bg-green-700 h-12 text-base"
                  >
                    <a
                      href="https://sedo.com/search/details/?domain=londonhomerent.com&origin=domaindetails"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <ExternalLink className="w-5 h-5" />
                      View on Sedo
                    </a>
                  </Button>
                </div>

                {/* Direct Contact */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Option 3: Make a Direct Offer
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Contact us directly to negotiate a custom price
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full h-12 text-base border-2"
                  >
                    <a
                      href="mailto:contact@londonhomerent.com?subject=Domain%20Purchase%20Inquiry"
                      className="flex items-center justify-center gap-2"
                    >
                      <Mail className="w-5 h-5" />
                      Send Offer
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Info */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-6 pb-6">
              <h3 className="font-semibold text-gray-900 mb-4">About This Domain</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>Premium niche: London rental market</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>Professional website with content</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>SEO optimized and ready to grow</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>High-demand market with continuous growth</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">© 2025 LondonHomeRent.com - All rights reserved</p>
        </div>
      </footer>
    </div>
  );
}

