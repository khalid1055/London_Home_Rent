import { useState } from "react";
import { Star, MessageCircle, ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Review {
  id: string;
  borough: string;
  userName: string;
  rating: number;
  title: string;
  content: string;
  helpful: number;
  unhelpful: number;
  createdAt: Date;
}

const mockReviews: Review[] = [
  {
    id: "1",
    borough: "Westminster",
    userName: "Sarah M.",
    rating: 5,
    title: "Amazing location, vibrant area",
    content:
      "Westminster is perfect for professionals. Great transport links, excellent restaurants, and plenty of nightlife. The only downside is the high prices, but you get what you pay for.",
    helpful: 24,
    unhelpful: 2,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  },
  {
    id: "2",
    borough: "Camden",
    userName: "James T.",
    rating: 4,
    title: "Trendy and creative vibe",
    content:
      "Camden has a unique character with its markets and music venues. Very popular with young professionals and students. Can get quite crowded on weekends.",
    helpful: 18,
    unhelpful: 1,
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
  },
];

const boroughRatings: Record<string, number> = {
  Westminster: 4.8,
  Camden: 4.5,
  Islington: 4.3,
  Hackney: 4.6,
  "Tower Hamlets": 4.2,
  Southwark: 4.1,
};

export default function Reviews() {
  const [showForm, setShowForm] = useState(false);

  const renderStars = (rating: number) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <MessageCircle className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">Community Reviews</h1>
          </div>
          <p className="text-lg text-gray-600">Read real reviews from people living in London boroughs</p>
        </div>

        {/* Borough Ratings */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Borough Ratings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(boroughRatings).map(([borough, rating]) => (
              <Card key={borough} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-gray-900 mb-2">{borough}</h3>
                  <div className="flex items-center gap-2">
                    {renderStars(Math.round(rating))}
                    <span className="text-lg font-bold text-gray-900">{rating.toFixed(1)}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Write Review Button */}
        <Button onClick={() => setShowForm(true)} className="mb-8 bg-blue-600 hover:bg-blue-700" size="lg">
          <MessageCircle className="w-5 h-5 mr-2" />
          Write a Review
        </Button>

        {/* Write Review Form */}
        {showForm && (
          <Card className="mb-8 border-blue-200">
            <CardHeader>
              <CardTitle>Share Your Experience</CardTitle>
              <CardDescription>Help others find the perfect neighborhood</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Borough</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option>Select a borough...</option>
                    {Object.keys(boroughRatings).map((borough) => (
                      <option key={borough}>{borough}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button key={star} className="text-3xl hover:scale-110 transition-transform">
                        ⭐
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    placeholder="e.g., Great location, vibrant area"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Review</label>
                  <textarea
                    placeholder="Share your experience living in this borough..."
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex gap-4">
                  <Button className="bg-blue-600 hover:bg-blue-700">Submit Review</Button>
                  <Button variant="outline" onClick={() => setShowForm(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Reviews List */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Latest Reviews</h2>
          <div className="space-y-4">
            {mockReviews.map((review) => (
              <Card key={review.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        {renderStars(review.rating)}
                        <span className="font-semibold text-gray-900">{review.rating}.0</span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">{review.title}</h3>
                      <p className="text-sm text-gray-600">
                        {review.userName} • {review.borough} •{" "}
                        {Math.floor((Date.now() - review.createdAt.getTime()) / (24 * 60 * 60 * 1000))} days ago
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4">{review.content}</p>

                  <div className="flex items-center gap-4 text-sm">
                    <button className="flex items-center gap-1 text-gray-600 hover:text-blue-600">
                      <ThumbsUp className="w-4 h-4" />
                      Helpful ({review.helpful})
                    </button>
                    <button className="flex items-center gap-1 text-gray-600 hover:text-red-600">
                      <ThumbsDown className="w-4 h-4" />
                      Not helpful ({review.unhelpful})
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

