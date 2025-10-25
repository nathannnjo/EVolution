import React from "react";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";
import {
  Car,
  Calendar,
  Battery,
  DollarSign,
  Edit,
  Trash2,
  Zap,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";

export default function VehicleCard({ vehicle, onEdit, onDelete, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <Card className="card-hover border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Car className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800">
                  {vehicle.make} {vehicle.model}
                </h3>
                <p className="text-slate-600">{vehicle.year}</p>
                {vehicle.purchase_date && (
                  <div className="flex items-center gap-1 mt-1 text-sm text-slate-500">
                    <Calendar className="w-3 h-3" />
                    Owned since{" "}
                    {format(new Date(vehicle.purchase_date), "MMM yyyy")}
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => onEdit(vehicle)}
                className="hover:bg-blue-50 hover:border-blue-200"
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => onDelete(vehicle.id)}
                className="hover:bg-red-50 hover:border-red-200 text-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Vehicle Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {vehicle.battery_capacity && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Battery className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Battery</p>
                  <p className="font-semibold text-slate-800">
                    {vehicle.battery_capacity} kWh
                  </p>
                </div>
              </div>
            )}

            {vehicle.efficiency && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-cyan-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Efficiency</p>
                  <p className="font-semibold text-slate-800">
                    {vehicle.efficiency} mi/kWh
                  </p>
                </div>
              </div>
            )}

            {vehicle.purchase_price && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Purchase Price</p>
                  <p className="font-semibold text-slate-800">
                    ${vehicle.purchase_price?.toLocaleString()}
                  </p>
                </div>
              </div>
            )}

            {vehicle.previous_vehicle_mpg && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Previous MPG</p>
                  <p className="font-semibold text-slate-800">
                    {vehicle.previous_vehicle_mpg} MPG
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Range Estimate */}
          {vehicle.battery_capacity && vehicle.efficiency && (
            <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-cyan-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-700">
                    Estimated Range
                  </p>
                  <p className="text-lg font-bold text-green-600">
                    ~{Math.round(vehicle.battery_capacity * vehicle.efficiency)}{" "}
                    miles
                  </p>
                </div>
                <Badge className="bg-green-100 text-green-700 border-green-200">
                  EPA Estimate
                </Badge>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
