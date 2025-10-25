import React, { useState, useEffect } from "react";
import VehicleForm from "../components/vehicle/VehicleForm";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Vehicle } from "../entities/Vehicle";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Car,
  Calendar,
  Battery,
  DollarSign,
  Plus,
  Edit,
  Trash2,
  TrendingUp,
} from "lucide-react";

export default function VehiclePage() {
  const [vehicles, setVehicles] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadVehicles();
  }, []);

  const getCarLogo = (make) => {
    const carLogos = {
      tesla:
        "https://upload.wikimedia.org/wikipedia/commons/b/bb/Tesla_T_symbol.svg",
      bmw: "https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg",
      mercedes:
        "https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg",
      audi: "https://upload.wikimedia.org/wikipedia/commons/9/92/Audi-Logo_2016.svg",
      volkswagen:
        "https://upload.wikimedia.org/wikipedia/commons/6/60/Volkswagen_logo_2019.svg",
      ford: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Ford_logo_flat.svg",
      chevrolet:
        "https://upload.wikimedia.org/wikipedia/commons/4/49/Chevrolet-logo.svg",
      nissan:
        "https://upload.wikimedia.org/wikipedia/commons/0/00/Nissan-logo.svg",
      hyundai:
        "https://upload.wikimedia.org/wikipedia/commons/4/44/Hyundai_Motor_Company_logo.svg",
      kia: "https://upload.wikimedia.org/wikipedia/commons/7/70/Kia-logo.svg",
      toyota: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Toyota.svg",
      honda:
        "https://upload.wikimedia.org/wikipedia/commons/7/76/Honda_logo.svg",
      volvo:
        "https://upload.wikimedia.org/wikipedia/commons/c/c3/Volvo_iron_mark.svg",
      jaguar:
        "https://upload.wikimedia.org/wikipedia/commons/e/e5/Jaguar_logo_2012.svg",
      porsche:
        "https://upload.wikimedia.org/wikipedia/commons/1/19/Porsche_logo.svg",
      lucid:
        "https://upload.wikimedia.org/wikipedia/commons/6/6a/Lucid_Motors_logo.svg",
      rivian:
        "https://upload.wikimedia.org/wikipedia/commons/8/8e/Rivian_logo.svg",
    };

    return carLogos[make?.toLowerCase()] || null;
  };

  const loadVehicles = async () => {
    try {
      const data = await Vehicle.list("-created_date");
      setVehicles(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading vehicles:", error);
      setIsLoading(false);
    }
  };

  const handleFormSubmit = async (data) => {
    try {
      if (editingVehicle) {
        await Vehicle.update(editingVehicle.id, data);
      } else {
        await Vehicle.create(data);
      }
      setShowForm(false);
      setEditingVehicle(null);
      await loadVehicles();
    } catch (error) {
      console.error("Error saving vehicle:", error);
    }
  };

  const handleEdit = (vehicle) => {
    setEditingVehicle(vehicle);
    setShowForm(true);
  };

  const handleDelete = async (vehicleId) => {
    if (window.confirm("Are you sure you want to delete this vehicle?")) {
      try {
        await Vehicle.delete(vehicleId);
        loadVehicles();
      } catch (error) {
        console.error("Error deleting vehicle:", error);
      }
    }
  };

  if (isLoading) {
    return (
      <div
        className="min-h-screen p-8"
        style={{
          background:
            "linear-gradient(135deg, rgb(248, 250, 252) 0%, rgb(236, 253, 245) 50%, rgb(220, 252, 231) 100%)",
        }}
      >
        <div className="max-w-4xl mx-auto space-y-6">
          {Array(3)
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
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <Car className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
                My Vehicles
              </h1>
            </div>
            <p className="text-slate-600">
              Manage your electric vehicles and their specifications
            </p>
          </div>

          <Button
            onClick={() => {
              setEditingVehicle(null);
              setShowForm(true);
            }}
            className="bg-blue-500 hover:bg-blue-600 shadow-lg"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Vehicle
          </Button>
        </div>

        {showForm && (
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>
                {editingVehicle ? "Edit Vehicle" : "Add New Vehicle"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <VehicleForm
                vehicle={editingVehicle}
                onSubmit={handleFormSubmit}
                onCancel={() => {
                  setShowForm(false);
                  setEditingVehicle(null);
                }}
              />
            </CardContent>
          </Card>
        )}

        <div className="space-y-6">
          {vehicles.length > 0 ? (
            vehicles.map((vehicle) => (
              <Card
                key={vehicle.id}
                className="border-0 shadow-lg bg-white/80 backdrop-blur-sm"
              >
                <CardContent className="pt-6 px-6 pb-6">
                  <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white shadow-sm border border-slate-200">
                          {getCarLogo(vehicle.make) ? (
                            <img
                              src={getCarLogo(vehicle.make)}
                              alt={`${vehicle.make} logo`}
                              className="w-8 h-8 object-contain"
                              onError={(e) => {
                                e.target.style.display = "none";
                                e.target.parentNode.querySelector(
                                  ".fallback-icon"
                                ).style.display = "flex";
                              }}
                            />
                          ) : null}
                          <div
                            className={`fallback-icon w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl items-center justify-center ${
                              getCarLogo(vehicle.make) ? "hidden" : "flex"
                            }`}
                          >
                            <Car className="w-6 h-6 text-white" />
                          </div>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-slate-800">
                            {vehicle.make} {vehicle.model}
                          </h3>
                          <Badge
                            variant="outline"
                            className="text-xs bg-slate-100 text-slate-700 border-slate-300"
                          >
                            {vehicle.year}
                          </Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {vehicle.battery_capacity && (
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-green-50 to-green-100 border border-green-200">
                            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                              <Battery className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <p className="text-xs text-green-700 font-medium">
                                BATTERY CAPACITY
                              </p>
                              <p className="text-sm font-semibold text-green-800">
                                {vehicle.battery_capacity} kWh
                              </p>
                            </div>
                          </div>
                        )}

                        {vehicle.efficiency && (
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200">
                            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                              <TrendingUp className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <p className="text-xs text-blue-700 font-medium">
                                EFFICIENCY
                              </p>
                              <p className="text-sm font-semibold text-blue-800">
                                {vehicle.efficiency} mi/kWh
                              </p>
                            </div>
                          </div>
                        )}

                        {vehicle.purchase_date && (
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200">
                            <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                              <Calendar className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <p className="text-xs text-purple-700 font-medium">
                                PURCHASE DATE
                              </p>
                              <p className="text-sm font-semibold text-purple-800">
                                {new Date(
                                  vehicle.purchase_date
                                ).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}
                              </p>
                            </div>
                          </div>
                        )}

                        {vehicle.purchase_price && (
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-emerald-50 to-emerald-100 border border-emerald-200">
                            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                              <DollarSign className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <p className="text-xs text-emerald-700 font-medium">
                                PURCHASE PRICE
                              </p>
                              <p className="text-sm font-semibold text-emerald-800">
                                $
                                {Number(
                                  vehicle.purchase_price
                                ).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      {vehicle.previous_vehicle_mpg && (
                        <div className="mt-4 p-3 rounded-lg bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                              <Car className="w-3 h-3 text-white" />
                            </div>
                            <div>
                              <span className="text-xs text-amber-700 font-medium">
                                PREVIOUS VEHICLE
                              </span>
                              <p className="text-sm font-semibold text-amber-800">
                                {vehicle.previous_vehicle_mpg} MPG
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 mt-6 md:mt-0 self-start">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(vehicle)}
                        className="bg-blue-500 hover:bg-blue-600 text-white"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleDelete(vehicle.id)}
                        className="bg-blue-500 hover:bg-blue-600 text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="pt-16 pb-12 text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Car className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">
                  No Vehicles Yet
                </h3>
                <p className="text-slate-600 mb-6">
                  Add your first electric vehicle to start tracking your EV
                  journey.
                </p>
                <Button
                  onClick={() => {
                    setEditingVehicle(null);
                    setShowForm(true);
                  }}
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Vehicle
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
