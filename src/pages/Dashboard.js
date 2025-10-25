import React, { useState, useEffect } from "react";
import { Vehicle } from "../entities/Vehicle";
import { ChargingSession } from "../entities/ChargingSession";
import { TripLog } from "../entities/TripLog";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Car,
  Zap,
  Leaf,
  DollarSign,
  TrendingUp,
  Battery,
  MapPin,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

// For now, let's create a simple version of createPageUrl
const createPageUrl = (pageName) => `/${pageName.toLowerCase()}`;

// CONFIGURABLE MOCK STATS - Change these values as needed
const MOCK_MILES_DRIVEN = 6301;
const MOCK_MONEY_SAVED = 690;
const MOCK_CO2_SAVED = 3596;
const MOCK_EFFICIENCY = 3.7;
const MOCK_TOTAL_CHARGING_SESSIONS = 10;

// Mock data for charging sessions - scaled up
const mockChargingSessions = [
  {
    id: 1,
    location: "Tesla Supercharger - Downtown",
    energy_added: 65.5,
    cost: 19.65,
    date: "2025-06-29",
    duration: "32 min",
  },
  {
    id: 2,
    location: "ChargePoint - Whole Foods",
    energy_added: 48.2,
    cost: 14.46,
    date: "2025-06-12",
    duration: "1h 15min",
  },
  {
    id: 3,
    location: "EVgo Fast Charger - Mall",
    energy_added: 72.1,
    cost: 21.63,
    date: "2025-05-23",
    duration: "28 min",
  },
  {
    id: 4,
    location: "Electrify America - Highway",
    energy_added: 58.8,
    cost: 17.64,
    date: "2024-01-08",
    duration: "35 min",
  },
  {
    id: 5,
    location: "Home Charging",
    energy_added: 85.0,
    cost: 11.05,
    date: "2024-01-07",
    duration: "6h 30min",
  },
  {
    id: 6,
    location: "Tesla Supercharger - Highway 101",
    energy_added: 78.3,
    cost: 23.49,
    date: "2024-01-06",
    duration: "29 min",
  },
  {
    id: 7,
    location: "ChargePoint - Hotel",
    energy_added: 92.1,
    cost: 27.63,
    date: "2024-01-05",
    duration: "4h 20min",
  },
  {
    id: 8,
    location: "Electrify America - Walmart",
    energy_added: 66.4,
    cost: 19.92,
    date: "2024-01-04",
    duration: "31 min",
  },
  {
    id: 9,
    location: "Home Charging",
    energy_added: 95.2,
    cost: 12.38,
    date: "2024-01-03",
    duration: "7h 15min",
  },
  {
    id: 10,
    location: "Tesla Supercharger - Rest Area",
    energy_added: 81.7,
    cost: 24.51,
    date: "2024-01-02",
    duration: "33 min",
  },
];

// Mock data for trip logs - scaled up significantly
const mockTripLogs = [
  {
    id: 1,
    destination: "San Francisco",
    distance: 624.5,
    energy_used: 160.1,
    date: "2025-06-29",
    efficiency: 3.9,
  },
  {
    id: 2,
    destination: "Los Angeles Airport",
    distance: 245.2,
    energy_used: 70.1,
    date: "2025-06-24",
    efficiency: 3.5,
  },
  {
    id: 3,
    destination: "Santa Barbara",
    distance: 489.7,
    energy_used: 132.4,
    date: "2025-06-20",
    efficiency: 3.7,
  },
  {
    id: 4,
    destination: "Office Complex",
    distance: 328.3,
    energy_used: 91.2,
    date: "2024-01-09",
    efficiency: 3.6,
  },
  {
    id: 5,
    destination: "Costco",
    distance: 215.8,
    energy_used: 56.8,
    date: "2024-01-08",
    efficiency: 3.8,
  },
  {
    id: 6,
    destination: "Seattle",
    distance: 756.2,
    energy_used: 198.5,
    date: "2024-01-07",
    efficiency: 3.8,
  },
  {
    id: 7,
    destination: "Phoenix",
    distance: 892.4,
    energy_used: 241.2,
    date: "2024-01-06",
    efficiency: 3.7,
  },
  {
    id: 8,
    destination: "Las Vegas",
    distance: 345.6,
    energy_used: 94.2,
    date: "2024-01-05",
    efficiency: 3.7,
  },
  {
    id: 9,
    destination: "Portland",
    distance: 567.8,
    energy_used: 148.9,
    date: "2024-01-04",
    efficiency: 3.8,
  },
  {
    id: 10,
    destination: "Denver",
    distance: 1124.3,
    energy_used: 315.2,
    date: "2024-01-03",
    efficiency: 3.6,
  },
  {
    id: 11,
    destination: "Sacramento",
    distance: 298.7,
    energy_used: 82.4,
    date: "2024-01-02",
    efficiency: 3.6,
  },
  {
    id: 12,
    destination: "Monterey",
    distance: 412.1,
    energy_used: 108.2,
    date: "2024-01-01",
    efficiency: 3.8,
  },
];

// Mock vehicle data
const mockVehicles = [
  {
    id: 1,
    make: "Tesla",
    model: "Model 3",
    year: 2023,
    battery_capacity: 75,
    efficiency: 4.1,
  },
];

export default function Dashboard() {
  const [vehicles, setVehicles] = useState([]);
  const [chargingSessions, setChargingSessions] = useState([]);
  const [tripLogs, setTripLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setVehicles(mockVehicles);
      setChargingSessions(mockChargingSessions);
      setTripLogs(mockTripLogs);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Mock stats using the configurable constants
  const stats = {
    totalMilesDriven: MOCK_MILES_DRIVEN,
    moneySaved: MOCK_MONEY_SAVED,
    co2Saved: MOCK_CO2_SAVED,
    efficiency: MOCK_EFFICIENCY,
    totalChargingSessions: MOCK_TOTAL_CHARGING_SESSIONS,
  };

  const hasVehicle = vehicles.length > 0;

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="h-32 bg-white/50 rounded-2xl animate-pulse"
              />
            ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen p-4 md:p-8"
      style={{
        background:
          "linear-gradient(135deg, rgb(248, 250, 252) 0%, rgb(236, 253, 245) 50%, rgb(220, 252, 231) 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
              Welcome to EVolution
            </h1>
            <p className="text-slate-600">
              {hasVehicle
                ? "Track your journey towards sustainable driving"
                : "Let's get started with your EV journey"}
            </p>
          </div>

          {!hasVehicle && (
            <div>
              <Link to={createPageUrl("Vehicle")}>
                <Button className="bg-green-600 hover:bg-green-700 shadow-lg">
                  <Car className="w-4 h-4 mr-2" />
                  Add Your Vehicle
                </Button>
              </Link>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Miles Driven</p>
                  <p className="text-2xl font-bold text-slate-800">
                    {stats.totalMilesDriven.toLocaleString()}
                  </p>
                </div>
                <Car className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Money Saved</p>
                  <p className="text-2xl font-bold text-green-600">
                    ${stats.moneySaved.toLocaleString()}
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">CO₂ Saved</p>
                  <p className="text-2xl font-bold text-cyan-600">
                    {stats.co2Saved.toLocaleString()} lbs
                  </p>
                </div>
                <Leaf className="w-8 h-8 text-cyan-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Efficiency</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {stats.efficiency} mi/kWh
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {!hasVehicle && (
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="pt-16 pb-12 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Car className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                Ready to start your EV journey?
              </h3>
              <p className="text-slate-600 mb-6">
                Add your electric vehicle to begin tracking your environmental
                impact, savings, and charging efficiency.
              </p>
              <Link to={createPageUrl("Vehicle")}>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Car className="w-4 h-4 mr-2" />
                  Add Your First Vehicle
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}

        {hasVehicle && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-slate-800 flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-yellow-500" />
                    Recent Charging
                  </CardTitle>
                  <Link to={createPageUrl("ChargingSession")}>
                    <Button
                      size="sm"
                      className="bg-green-500 hover:bg-green-700 text-black"
                    >
                      View All <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {chargingSessions.slice(0, 3).map((session, index) => (
                    <div
                      key={session.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-slate-800">
                          {session.location}
                        </p>
                        <p className="text-sm text-slate-600">
                          {session.energy_added} kWh • ${session.cost} •{" "}
                          {session.duration}
                        </p>
                      </div>
                      <Badge variant="outline" className="ml-2">
                        {new Date(session.date).toLocaleDateString()}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-slate-800 flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-blue-500" />
                    Recent Trips
                  </CardTitle>
                  <Link to={createPageUrl("TripLog")}>
                    <Button
                      size="sm"
                      className="bg-green-500 hover:bg-green-700 text-black"
                    >
                      View All <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {tripLogs.slice(0, 3).map((trip, index) => (
                    <div
                      key={trip.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-slate-800">
                          {trip.destination}
                        </p>
                        <p className="text-sm text-slate-600">
                          {trip.distance} mi • {trip.energy_used} kWh •{" "}
                          {trip.efficiency} mi/kWh
                        </p>
                      </div>
                      <Badge variant="outline" className="ml-2">
                        {new Date(trip.date).toLocaleDateString()}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {hasVehicle && (
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-800 flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-purple-500" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link to={createPageUrl("ChargingSession")}>
                  <Button
                    className="w-full justify-start bg-green-500 hover:bg-green-700 text-black"
                    variant="outline"
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Log Charging Session
                  </Button>
                </Link>
                <Link to={createPageUrl("TripLog")}>
                  <Button
                    className="w-full justify-start bg-green-500 hover:bg-green-700 text-black"
                    variant="outline"
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Log Trip
                  </Button>
                </Link>
                <Link to={createPageUrl("Vehicle")}>
                  <Button
                    className="w-full justify-start bg-green-500 hover:bg-green-700 text-black"
                    variant="outline"
                  >
                    <Car className="w-4 h-4 mr-2" />
                    Manage Vehicles
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
