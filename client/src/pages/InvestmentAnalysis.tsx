import { TrendingUp, BarChart3, Target } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface BoroughInvestment {
  borough: string;
  averageRent: number;
  rentYield: number;
  capitalGrowth: number;
  investmentScore: number;
  demandLevel: string;
  pros: string[];
  cons: string[];
}

const investmentData: BoroughInvestment[] = [
  {
    borough: "Westminster",
    averageRent: 2800,
    rentYield: 4.2,
    capitalGrowth: 3.5,
    investmentScore: 92,
    demandLevel: "Very High",
    pros: ["Prime location", "High rental demand", "Strong capital appreciation", "Excellent transport"],
    cons: ["Very high prices", "Limited inventory", "Competitive market"],
  },
  {
    borough: "Hackney",
    averageRent: 1800,
    rentYield: 5.8,
    capitalGrowth: 7.2,
    investmentScore: 88,
    demandLevel: "High",
    pros: ["Rising area", "High yield potential", "Affordable entry price", "Strong growth trajectory"],
    cons: ["Still developing", "Mixed neighborhoods", "Transport improvements ongoing"],
  },
  {
    borough: "Camden",
    averageRent: 2600,
    rentYield: 4.5,
    capitalGrowth: 4.1,
    investmentScore: 85,
    demandLevel: "Very High",
    pros: ["Vibrant community", "Cultural hub", "Young demographic", "Good transport"],
    cons: ["Crowded", "Noise levels", "Higher prices"],
  },
  {
    borough: "Tower Hamlets",
    averageRent: 2100,
    rentYield: 5.1,
    capitalGrowth: 5.8,
    investmentScore: 82,
    demandLevel: "High",
    pros: ["Good value", "Growing area", "Tech hub", "Regeneration projects"],
    cons: ["Mixed quality", "Some areas less desirable"],
  },
  {
    borough: "Islington",
    averageRent: 2400,
    rentYield: 4.8,
    capitalGrowth: 3.9,
    investmentScore: 80,
    demandLevel: "High",
    pros: ["Established area", "Strong rental market", "Good schools", "Community feel"],
    cons: ["Mature market", "Limited growth potential"],
  },
];

export default function InvestmentAnalysis() {
  const getScoreColor = (score: number) => {
    if (score >= 85) return "bg-green-100 text-green-800";
    if (score >= 75) return "bg-blue-100 text-blue-800";
    return "bg-yellow-100 text-yellow-800";
  };

  const getDemandColor = (demand: string) => {
    if (demand === "Very High") return "text-red-600";
    if (demand === "High") return "text-orange-600";
    return "text-green-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <BarChart3 className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">Investment Analysis</h1>
          </div>
          <p className="text-lg text-gray-600">Analyze London boroughs for investment opportunities</p>
        </div>

        {/* Top Opportunities */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Top Investment Opportunities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {investmentData.map((borough) => (
              <Card
                key={borough.borough}
                className={`cursor-pointer hover:shadow-lg transition-shadow ${
                  borough.investmentScore >= 85 ? "border-green-200 bg-green-50" : ""
                }`}
              >
                <CardContent className="pt-6">
                  <h3 className="font-bold text-gray-900 mb-3">{borough.borough}</h3>

                  <div className={`inline-block px-3 py-1 rounded-full text-sm font-bold mb-3 ${getScoreColor(borough.investmentScore)}`}>
                    Score: {borough.investmentScore}
                  </div>

                  <div className="space-y-2 text-sm">
                    <div>
                      <p className="text-gray-600">Avg Rent</p>
                      <p className="font-bold text-gray-900">£{borough.averageRent.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Rent Yield</p>
                      <p className="font-bold text-green-600">{borough.rentYield}%</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Growth</p>
                      <p className="font-bold text-blue-600">{borough.capitalGrowth}%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Detailed Analysis */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Detailed Borough Analysis</h2>
          <div className="space-y-6">
            {investmentData.map((borough) => (
              <Card key={borough.borough} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-blue-600" />
                        {borough.borough}
                      </CardTitle>
                      <CardDescription>Investment Score: {borough.investmentScore}/100</CardDescription>
                    </div>
                    <div className={`text-right ${getDemandColor(borough.demandLevel)}`}>
                      <p className="text-xs font-semibold">Demand</p>
                      <p className="font-bold">{borough.demandLevel}</p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Average Rent</p>
                      <p className="text-2xl font-bold text-gray-900">£{borough.averageRent.toLocaleString()}</p>
                      <p className="text-xs text-gray-600 mt-1">/month</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Rent Yield</p>
                      <p className="text-2xl font-bold text-green-600">{borough.rentYield}%</p>
                      <p className="text-xs text-gray-600 mt-1">Annual return</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Capital Growth</p>
                      <p className="text-2xl font-bold text-blue-600">{borough.capitalGrowth}%</p>
                      <p className="text-xs text-gray-600 mt-1">Year-on-year</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Investment Score</p>
                      <p className="text-2xl font-bold text-indigo-600">{borough.investmentScore}</p>
                      <p className="text-xs text-gray-600 mt-1">Out of 100</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="text-green-600">✓</span> Pros
                      </h4>
                      <ul className="space-y-2">
                        {borough.pros.map((pro, idx) => (
                          <li key={idx} className="text-sm text-gray-700">
                            • {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="text-red-600">✗</span> Cons
                      </h4>
                      <ul className="space-y-2">
                        {borough.cons.map((con, idx) => (
                          <li key={idx} className="text-sm text-gray-700">
                            • {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Investment Tips */}
        <Card className="mt-8 bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900">Investment Tips</CardTitle>
          </CardHeader>
          <CardContent className="text-blue-900 space-y-2">
            <p>
              • <strong>High Yield Areas:</strong> Hackney and Tower Hamlets offer the best rental yields for investors
              seeking cash flow
            </p>
            <p>
              • <strong>Capital Growth:</strong> Emerging areas like Hackney show strong capital appreciation potential
            </p>
            <p>
              • <strong>Established Markets:</strong> Westminster and Camden offer stability but lower yields
            </p>
            <p>
              • <strong>Diversification:</strong> Consider mixing high-yield and capital growth areas for balanced
              returns
            </p>
            <p className="text-sm italic mt-4">
              Disclaimer: This analysis is for informational purposes only. Consult with a financial advisor before
              making investment decisions.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

