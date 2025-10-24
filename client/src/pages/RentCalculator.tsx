import { useState } from "react";
import { Calculator, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function RentCalculator() {
  const [borough, setBorough] = useState("Westminster");
  const [bedrooms, setBedrooms] = useState(2);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [calculatedRent, setCalculatedRent] = useState<number | null>(null);

  const baseRents: Record<string, number> = {
    Westminster: 2800,
    Camden: 2600,
    "Kensington & Chelsea": 3616,
    Islington: 2400,
    Hackney: 1800,
    "Tower Hamlets": 2100,
    Southwark: 2200,
    Lambeth: 2000,
  };

  const bedroomMultipliers: Record<number, number> = {
    0: 0.6,
    1: 0.8,
    2: 1.0,
    3: 1.3,
    4: 1.6,
    5: 2.0,
  };

  const amenityPremiums: Record<string, number> = {
    gym: 50,
    parking: 100,
    garden: 150,
    balcony: 75,
    furnished: 200,
    modern_kitchen: 100,
    air_conditioning: 80,
  };

  const handleCalculate = () => {
    let rent = baseRents[borough] || 2500;

    // Apply bedroom multiplier
    rent = rent * (bedroomMultipliers[bedrooms] || 1.0);

    // Add amenity premiums
    amenities.forEach((amenity) => {
      rent += amenityPremiums[amenity] || 0;
    });

    setCalculatedRent(Math.round(rent));
  };

  const toggleAmenity = (amenity: string) => {
    setAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Calculator className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">Rent Calculator</h1>
          </div>
          <p className="text-lg text-gray-600">Estimate rental prices based on location and features</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calculator Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Calculate Estimated Rent</CardTitle>
                <CardDescription>Adjust the parameters to see how they affect rental prices</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Borough Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Borough</label>
                  <select
                    value={borough}
                    onChange={(e) => setBorough(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    {Object.keys(baseRents).map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Bedrooms */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bedrooms: <span className="text-blue-600 font-bold">{bedrooms}</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    value={bedrooms}
                    onChange={(e) => setBedrooms(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-600 mt-2">
                    <span>Studio</span>
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5+</span>
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Amenities</label>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(amenityPremiums).map(([amenity, premium]) => (
                      <label key={amenity} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={amenities.includes(amenity)}
                          onChange={() => toggleAmenity(amenity)}
                          className="w-4 h-4 text-blue-600 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700 capitalize">
                          {amenity.replace("_", " ")} (+£{premium})
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <Button onClick={handleCalculate} className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
                  Calculate Rent
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div>
            {calculatedRent && (
              <Card className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white border-0">
                <CardHeader>
                  <CardTitle className="text-white">Estimated Monthly Rent</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-5xl font-bold mb-4">£{calculatedRent.toLocaleString()}</div>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span>Borough Base:</span>
                      <span>£{Math.round(baseRents[borough] || 2500).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Bedroom Adjustment:</span>
                      <span>
                        {bedroomMultipliers[bedrooms] > 1
                          ? `+${Math.round((bedroomMultipliers[bedrooms] - 1) * 100)}%`
                          : `-${Math.round((1 - bedroomMultipliers[bedrooms]) * 100)}%`}
                      </span>
                    </div>
                    {amenities.length > 0 && (
                      <div className="flex justify-between">
                        <span>Amenities Premium:</span>
                        <span>
                          +£
                          {amenities
                            .reduce((sum, a) => sum + (amenityPremiums[a] || 0), 0)
                            .toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 pt-6 border-t border-white border-opacity-20">
                    <p className="text-xs opacity-90 mb-3">Annual Cost:</p>
                    <p className="text-2xl font-bold">£{(calculatedRent * 12).toLocaleString()}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {!calculatedRent && (
              <Card className="bg-gray-50">
                <CardContent className="pt-6 text-center">
                  <TrendingUp className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">Adjust the parameters and click Calculate to see the estimated rent</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Information */}
        <Card className="mt-8 bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900">How This Calculator Works</CardTitle>
          </CardHeader>
          <CardContent className="text-blue-900 space-y-2">
            <p>
              • <strong>Borough Base:</strong> Average rental price for a 2-bedroom apartment in the selected borough
            </p>
            <p>
              • <strong>Bedroom Adjustment:</strong> Prices scale based on the number of bedrooms (studios are cheaper,
              larger properties are more expensive)
            </p>
            <p>
              • <strong>Amenities Premium:</strong> Additional features like parking, gym, or furnished apartments add to
              the base price
            </p>
            <p className="text-sm italic mt-4">
              Note: This is an estimate based on average market data. Actual prices may vary depending on specific
              location, condition, and current market demand.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

