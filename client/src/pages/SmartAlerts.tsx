import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Plus, Trash2, CheckCircle } from "lucide-react";

export default function SmartAlerts() {
  const { user, isAuthenticated } = useAuth();
  const [alerts, setAlerts] = useState([
    {
      id: "1",
      borough: "Westminster",
      minPrice: 2000,
      maxPrice: 3000,
      bedrooms: 2,
      notificationEmail: true,
      notificationWhatsApp: false,
      createdAt: new Date(),
    },
  ]);

  const [showForm, setShowForm] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="text-center py-12">
            <CardHeader>
              <CardTitle>Sign in Required</CardTitle>
              <CardDescription>Please sign in to create and manage smart alerts</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">Smart Alerts</h1>
          </div>
          <p className="text-lg text-gray-600">
            Get instant notifications when properties matching your criteria are listed
          </p>
        </div>

        {/* Create Alert Button */}
        {!showForm && (
          <Button
            onClick={() => setShowForm(true)}
            className="mb-8 bg-blue-600 hover:bg-blue-700"
            size="lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create New Alert
          </Button>
        )}

        {/* Create Alert Form */}
        {showForm && (
          <Card className="mb-8 border-blue-200">
            <CardHeader>
              <CardTitle>Create New Alert</CardTitle>
              <CardDescription>Set your preferences to receive notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Borough</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Select a borough...</option>
                    <option>Westminster</option>
                    <option>Camden</option>
                    <option>Islington</option>
                    <option>Hackney</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Any</option>
                    <option>Studio</option>
                    <option>1 Bedroom</option>
                    <option>2 Bedrooms</option>
                    <option>3+ Bedrooms</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Min Price (£/month)</label>
                  <input
                    type="number"
                    placeholder="1000"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Price (£/month)</label>
                  <input
                    type="number"
                    placeholder="3000"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-4">Notification Preferences</label>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                      <span className="ml-3 text-gray-700">Email notifications</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                      <span className="ml-3 text-gray-700">WhatsApp notifications</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <Button className="bg-blue-600 hover:bg-blue-700">Create Alert</Button>
                <Button variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Active Alerts */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Active Alerts ({alerts.length})</h2>

          {alerts.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">No active alerts yet. Create one to get started!</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {alerts.map((alert) => (
                <Card key={alert.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <h3 className="text-lg font-semibold text-gray-900">{alert.borough}</h3>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Bedrooms</p>
                            <p className="font-semibold text-gray-900">{alert.bedrooms}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Price Range</p>
                            <p className="font-semibold text-gray-900">
                              £{alert.minPrice} - £{alert.maxPrice}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600">Email</p>
                            <p className="font-semibold text-gray-900">
                              {alert.notificationEmail ? "✓ Enabled" : "Disabled"}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600">WhatsApp</p>
                            <p className="font-semibold text-gray-900">
                              {alert.notificationWhatsApp ? "✓ Enabled" : "Disabled"}
                            </p>
                          </div>
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setAlerts(alerts.filter((a) => a.id !== alert.id))}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Benefits */}
        <Card className="mt-8 bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900">Why Use Smart Alerts?</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-blue-900">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                Never miss a property that matches your criteria
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                Get instant notifications via email or WhatsApp
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                Save time by filtering properties automatically
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                Be the first to contact landlords about new listings
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

