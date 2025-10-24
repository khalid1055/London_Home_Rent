import { useState } from "react";
import { BookOpen, Search, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Guide {
  id: string;
  title: string;
  borough?: string;
  category: string;
  excerpt: string;
  views: number;
  createdAt: Date;
}

const mockGuides: Guide[] = [
  {
    id: "1",
    title: "Complete Guide to Westminster: The Heart of London",
    borough: "Westminster",
    category: "borough-guide",
    excerpt:
      "Discover everything you need to know about living in Westminster, from iconic landmarks to hidden gems, transport links, and local amenities.",
    views: 2450,
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
  },
  {
    id: "2",
    title: "Camden: A Renter's Paradise",
    borough: "Camden",
    category: "borough-guide",
    excerpt:
      "Explore the vibrant culture, markets, music venues, and residential neighborhoods of Camden. Perfect for young professionals and creative types.",
    views: 1890,
    createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
  },
  {
    id: "3",
    title: "First Time Renting in London: Essential Tips",
    category: "tips",
    excerpt:
      "New to London? Learn about the rental process, tenant rights, what to expect, and how to avoid common pitfalls when renting for the first time.",
    views: 5230,
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
  },
  {
    id: "4",
    title: "Hackney Rising: Investment Opportunities",
    borough: "Hackney",
    category: "investment",
    excerpt:
      "Discover why Hackney is becoming one of London's hottest neighborhoods for renters and investors. Analyze the growth potential and market trends.",
    views: 3120,
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
  },
];

const categories = [
  { value: "all", label: "All Guides" },
  { value: "borough-guide", label: "Borough Guides" },
  { value: "tips", label: "Renting Tips" },
  { value: "investment", label: "Investment" },
];

export default function Guides() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredGuides = mockGuides.filter((guide) => {
    const matchesCategory = selectedCategory === "all" || guide.category === selectedCategory;
    const matchesSearch =
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">Comprehensive Guides</h1>
          </div>
          <p className="text-lg text-gray-600">Expert guides to help you navigate London's rental market</p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search guides..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Button
                key={cat.value}
                variant={selectedCategory === cat.value ? "default" : "outline"}
                onClick={() => setSelectedCategory(cat.value)}
                className={selectedCategory === cat.value ? "bg-blue-600 hover:bg-blue-700" : ""}
              >
                {cat.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredGuides.map((guide) => (
            <Card key={guide.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <div className="mb-3">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full capitalize">
                    {guide.category.replace("-", " ")}
                  </span>
                  {guide.borough && (
                    <span className="inline-block ml-2 px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full">
                      {guide.borough}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">{guide.title}</h3>
                <p className="text-gray-600 mb-4">{guide.excerpt}</p>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{guide.views.toLocaleString()} views</span>
                  </div>
                  <span>
                    {Math.floor((Date.now() - guide.createdAt.getTime()) / (24 * 60 * 60 * 1000))} days ago
                  </span>
                </div>

                <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">Read Guide</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredGuides.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No guides found matching your criteria</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

