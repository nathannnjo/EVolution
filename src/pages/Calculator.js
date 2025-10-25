import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Calculator as CalculatorIcon,
  DollarSign,
  Zap,
  Car,
  TrendingDown,
  Home,
  MapPin,
} from "lucide-react";

export default function Calculator() {
  const [calculations, setCalculations] = useState({
    // Vehicle Info
    milesPerYear: 12000,
    gasMpg: 25,
    gasPrice: 3.5,

    // EV Info
    evEfficiency: 3.5, // miles per kWh

    // Charging Costs
    homeElectricityRate: 0.13,
    homeChargingPercent: 80,
    publicChargingRate: 0.3,

    // Results
    results: null,
  });

  const handleInputChange = (field, value) => {
    setCalculations((prev) => ({
      ...prev,
      [field]: parseFloat(value) || 0,
    }));
  };

  const calculateSavings = () => {
    const {
      milesPerYear,
      gasMpg,
      gasPrice,
      evEfficiency,
      homeElectricityRate,
      homeChargingPercent,
      publicChargingRate,
    } = calculations;

    // Gas vehicle costs
    const gallonsPerYear = milesPerYear / gasMpg;
    const gasAnnualCost = gallonsPerYear * gasPrice;

    // EV costs
    const kwhPerYear = milesPerYear / evEfficiency;
    const homeKwh = (kwhPerYear * homeChargingPercent) / 100;
    const publicKwh = kwhPerYear - homeKwh;

    const homeChargingCost = homeKwh * homeElectricityRate;
    const publicChargingCost = publicKwh * publicChargingRate;
    const evAnnualCost = homeChargingCost + publicChargingCost;

    // Savings
    const annualSavings = gasAnnualCost - evAnnualCost;
    const monthlySavings = annualSavings / 12;
    const fiveYearSavings = annualSavings * 5;

    // Per mile costs
    const gasCostPerMile = gasAnnualCost / milesPerYear;
    const evCostPerMile = evAnnualCost / milesPerYear;

    const results = {
      gasAnnualCost,
      evAnnualCost,
      annualSavings,
      monthlySavings,
      fiveYearSavings,
      gasCostPerMile,
      evCostPerMile,
      homeChargingCost,
      publicChargingCost,
      percentageSavings: (annualSavings / gasAnnualCost) * 100,
    };

    setCalculations((prev) => ({ ...prev, results }));
  };

  React.useEffect(() => {
    calculateSavings();
  }, [
    calculations.milesPerYear,
    calculations.gasMpg,
    calculations.gasPrice,
    calculations.evEfficiency,
    calculations.homeElectricityRate,
    calculations.homeChargingPercent,
    calculations.publicChargingRate,
  ]);

  const { results } = calculations;

  return (
    <div
      className="min-h-screen p-4 md:p-8"
      style={{
        background:
          "linear-gradient(135deg, rgb(248, 250, 252) 0%, rgb(236, 253, 245) 50%, rgb(220, 252, 231) 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <CalculatorIcon className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
            EV Savings Calculator
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Compare the real costs of driving electric vs gas and discover your
            potential savings
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm sticky top-8">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-slate-800">
                  Your Driving Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                    <Car className="w-4 h-4 text-blue-500" />
                    Driving Habits
                  </h3>

                  <div>
                    <Label htmlFor="milesPerYear">Annual Miles Driven</Label>
                    <Input
                      id="milesPerYear"
                      type="number"
                      value={calculations.milesPerYear}
                      onChange={(e) =>
                        handleInputChange("milesPerYear", e.target.value)
                      }
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-red-500" />
                    Gas Vehicle Comparison
                  </h3>

                  <div>
                    <Label htmlFor="gasMpg">Miles Per Gallon (MPG)</Label>
                    <Input
                      id="gasMpg"
                      type="number"
                      step="0.1"
                      value={calculations.gasMpg}
                      onChange={(e) =>
                        handleInputChange("gasMpg", e.target.value)
                      }
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="gasPrice">Gas Price ($/gallon)</Label>
                    <Input
                      id="gasPrice"
                      type="number"
                      step="0.01"
                      value={calculations.gasPrice}
                      onChange={(e) =>
                        handleInputChange("gasPrice", e.target.value)
                      }
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-green-500" />
                    EV Efficiency
                  </h3>

                  <div>
                    <Label htmlFor="evEfficiency">Miles per kWh</Label>
                    <Input
                      id="evEfficiency"
                      type="number"
                      step="0.1"
                      value={calculations.evEfficiency}
                      onChange={(e) =>
                        handleInputChange("evEfficiency", e.target.value)
                      }
                      className="mt-1"
                    />
                    <p className="text-xs text-slate-500 mt-1">
                      Typical range: 2.5-4.5 mi/kWh
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-slate-800">
                    Charging Costs
                  </h3>

                  <div>
                    <Label
                      htmlFor="homeElectricityRate"
                      className="flex items-center gap-2"
                    >
                      <Home className="w-4 h-4 text-blue-500" />
                      Home Rate ($/kWh)
                    </Label>
                    <Input
                      id="homeElectricityRate"
                      type="number"
                      step="0.001"
                      value={calculations.homeElectricityRate}
                      onChange={(e) =>
                        handleInputChange("homeElectricityRate", e.target.value)
                      }
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="homeChargingPercent">Home Charging %</Label>
                    <Input
                      id="homeChargingPercent"
                      type="number"
                      min="0"
                      max="100"
                      value={calculations.homeChargingPercent}
                      onChange={(e) =>
                        handleInputChange("homeChargingPercent", e.target.value)
                      }
                      className="mt-1"
                    />
                    <p className="text-xs text-slate-500 mt-1">
                      Percentage of charging done at home vs public
                    </p>
                  </div>

                  <div>
                    <Label
                      htmlFor="publicChargingRate"
                      className="flex items-center gap-2"
                    >
                      <MapPin className="w-4 h-4 text-orange-500" />
                      Public Rate ($/kWh)
                    </Label>
                    <Input
                      id="publicChargingRate"
                      type="number"
                      step="0.01"
                      value={calculations.publicChargingRate}
                      onChange={(e) =>
                        handleInputChange("publicChargingRate", e.target.value)
                      }
                      className="mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <div className="space-y-6">
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-slate-800">
                    Annual Cost Comparison
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {results && (
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-red-50 rounded-xl p-6 border border-red-100">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                            <Car className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-slate-800">
                              Gas Vehicle
                            </h3>
                            <p className="text-sm text-slate-600">
                              {calculations.gasMpg} MPG
                            </p>
                          </div>
                        </div>
                        <p className="text-3xl font-bold text-red-600">
                          ${results.gasAnnualCost.toFixed(0)}
                        </p>
                        <p className="text-sm text-slate-600 mt-1">per year</p>
                        <p className="text-sm text-slate-600 mt-2">
                          ${results.gasCostPerMile.toFixed(3)} per mile
                        </p>
                      </div>

                      <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                            <Zap className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-slate-800">
                              Electric Vehicle
                            </h3>
                            <p className="text-sm text-slate-600">
                              {calculations.evEfficiency} mi/kWh
                            </p>
                          </div>
                        </div>
                        <p className="text-3xl font-bold text-green-600">
                          ${results.evAnnualCost.toFixed(0)}
                        </p>
                        <p className="text-sm text-slate-600 mt-1">per year</p>
                        <p className="text-sm text-slate-600 mt-2">
                          ${results.evCostPerMile.toFixed(3)} per mile
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-green-800 flex items-center gap-2">
                    <TrendingDown className="w-5 h-5" />
                    Your Potential Savings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {results && (
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <p className="text-sm text-green-700 mb-1">Monthly</p>
                        <p className="text-2xl font-bold text-green-800">
                          ${results.monthlySavings.toFixed(0)}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-green-700 mb-1">Annual</p>
                        <p className="text-3xl font-bold text-green-800">
                          ${results.annualSavings.toFixed(0)}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-green-700 mb-1">5-Year</p>
                        <p className="text-2xl font-bold text-green-800">
                          ${results.fiveYearSavings.toFixed(0)}
                        </p>
                      </div>
                    </div>
                  )}

                  {results && results.percentageSavings > 0 && (
                    <div className="mt-6 p-4 bg-white rounded-lg border border-green-200">
                      <p className="text-center text-green-800">
                        You could save{" "}
                        <span className="font-bold">
                          {results.percentageSavings.toFixed(1)}%
                        </span>{" "}
                        on fuel costs by going electric!
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-slate-800">
                    EV Charging Cost Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {results && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Home className="w-4 h-4 text-blue-500" />
                          <span className="font-medium">
                            Home Charging ({calculations.homeChargingPercent}%)
                          </span>
                        </div>
                        <span className="font-bold text-blue-600">
                          ${results.homeChargingCost.toFixed(0)}/year
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-orange-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-orange-500" />
                          <span className="font-medium">
                            Public Charging (
                            {100 - calculations.homeChargingPercent}%)
                          </span>
                        </div>
                        <span className="font-bold text-orange-600">
                          ${results.publicChargingCost.toFixed(0)}/year
                        </span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
