import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Car, X, Save, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

const popularEVs = [
  { make: "Tesla", model: "Model 3", efficiency: 4.2, batteryCapacity: 75 },
  { make: "Tesla", model: "Model Y", efficiency: 3.8, batteryCapacity: 81 },
  { make: "Tesla", model: "Model S", efficiency: 4.1, batteryCapacity: 100 },
  { make: "Chevrolet", model: "Bolt EV", efficiency: 3.9, batteryCapacity: 65 },
  { make: "Nissan", model: "Leaf", efficiency: 3.5, batteryCapacity: 62 },
  {
    make: "Ford",
    model: "Mustang Mach-E",
    efficiency: 3.4,
    batteryCapacity: 88,
  },
  { make: "Hyundai", model: "Ioniq 5", efficiency: 3.3, batteryCapacity: 77 },
  { make: "BMW", model: "i3", efficiency: 3.8, batteryCapacity: 42 },
  { make: "Audi", model: "e-tron", efficiency: 2.9, batteryCapacity: 95 },
  { make: "Volkswagen", model: "ID.4", efficiency: 3.2, batteryCapacity: 82 },
];

export default function VehicleForm({ vehicle, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(
    vehicle || {
      make: "",
      model: "",
      year: new Date().getFullYear(),
      battery_capacity: "",
      efficiency: "",
      purchase_date: "",
      purchase_price: "",
      previous_vehicle_mpg: 25,
    }
  );

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentYear = new Date().getFullYear();
  const minYear = 2008;

  const validateForm = () => {
    const newErrors = {};

    // Required fields
    if (!formData.make?.trim()) {
      newErrors.make = "Make is required";
    }
    if (!formData.model?.trim()) {
      newErrors.model = "Model is required";
    }

    // Year validation
    const year = parseInt(formData.year);
    if (!year || year < minYear || year > currentYear + 1) {
      newErrors.year = `Year must be between ${minYear} and ${currentYear + 1}`;
    }

    // Battery capacity validation
    if (
      formData.battery_capacity &&
      (parseFloat(formData.battery_capacity) < 1 ||
        parseFloat(formData.battery_capacity) > 250)
    ) {
      newErrors.battery_capacity =
        "Battery capacity must be between 1 and 250 kWh";
    }

    // Efficiency validation
    if (
      formData.efficiency &&
      (parseFloat(formData.efficiency) < 0.5 ||
        parseFloat(formData.efficiency) > 10)
    ) {
      newErrors.efficiency = "Efficiency must be between 0.5 and 10 mi/kWh";
    }

    // Purchase price validation
    if (
      formData.purchase_price &&
      (parseFloat(formData.purchase_price) < 0 ||
        parseFloat(formData.purchase_price) > 500000)
    ) {
      newErrors.purchase_price =
        "Purchase price must be between $0 and $500,000";
    }

    // Previous vehicle MPG validation
    if (
      formData.previous_vehicle_mpg &&
      (parseFloat(formData.previous_vehicle_mpg) < 5 ||
        parseFloat(formData.previous_vehicle_mpg) > 60)
    ) {
      newErrors.previous_vehicle_mpg = "MPG must be between 5 and 60";
    }

    // Purchase date validation
    if (formData.purchase_date) {
      const purchaseDate = new Date(formData.purchase_date);
      const today = new Date();
      const minDate = new Date("2008-01-01");

      if (purchaseDate > today) {
        newErrors.purchase_date = "Purchase date cannot be in the future";
      } else if (purchaseDate < minDate) {
        newErrors.purchase_date = "Purchase date cannot be before 2008";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handlePresetSelect = (preset) => {
    setFormData((prev) => ({
      ...prev,
      make: preset.make,
      model: preset.model,
      efficiency: preset.efficiency,
      battery_capacity: preset.batteryCapacity,
    }));

    // Clear any related errors
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors.make;
      delete newErrors.model;
      delete newErrors.efficiency;
      delete newErrors.battery_capacity;
      return newErrors;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const processedData = {
        ...formData,
        make: formData.make.trim(),
        model: formData.model.trim(),
        year: parseInt(formData.year),
        battery_capacity: parseFloat(formData.battery_capacity) || null,
        efficiency: parseFloat(formData.efficiency) || null,
        purchase_price: parseFloat(formData.purchase_price) || null,
        previous_vehicle_mpg: parseFloat(formData.previous_vehicle_mpg) || null,
      };

      await onSubmit(processedData);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const InputWithError = ({ id, label, error, helpText, ...props }) => (
    <div>
      <Label htmlFor={id} className="text-sm font-medium text-slate-700">
        {label}
      </Label>
      <Input
        id={id}
        className={`mt-1 ${
          error ? "border-red-300 focus:border-red-500 focus:ring-red-200" : ""
        }`}
        {...props}
      />
      {error && (
        <div className="flex items-center gap-1 mt-1 text-red-600">
          <AlertCircle className="w-3 h-3" />
          <p className="text-xs">{error}</p>
        </div>
      )}
      {helpText && !error && (
        <p className="text-xs text-slate-500 mt-1">{helpText}</p>
      )}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 border-b border-slate-200">
          <div className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center shadow-sm">
                <Car className="w-5 h-5 text-white" />
              </div>
              <CardTitle className="text-xl font-bold text-slate-800">
                {vehicle ? "Edit Vehicle" : "Add New Vehicle"}
              </CardTitle>
            </div>
            <Button
              size="icon"
              type="button"
              onClick={onCancel}
              variant="ghost"
              className="hover:bg-red-100 hover:text-red-600 rounded-full transition-colors"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="m-2 p-6 space-y-6">
          {/* Popular EV Presets */}
          {(!vehicle || Object.keys(vehicle).length === 0) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ delay: 0.2 }}
            >
              <Label className="text-sm font-medium text-slate-700 mb-3 block">
                Quick Select Popular EVs
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {popularEVs.slice(0, 6).map((preset, index) => (
                  <motion.div
                    key={`${preset.make}-${preset.model}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="text-xs justify-start w-full bg-green-500
                               hover:bg-gradient-to-r hover:from-green-100 hover:to-green-300 
                               hover:border-green-300 transition-all duration-200
                               border-slate-200"
                      onClick={() => handlePresetSelect(preset)}
                    >
                      <div className="flex items-center gap-1">
                        <Car className="w-3 h-3" />
                        <span className="truncate">
                          {preset.make} {preset.model}
                        </span>
                      </div>
                    </Button>
                  </motion.div>
                ))}
              </div>
              <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-xs text-green-700">
                  💡 <strong>Tip:</strong> Select a preset above to auto-fill
                  specifications, then customize as needed.
                </p>
              </div>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2">
                Vehicle Information
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <InputWithError
                  id="make"
                  label="Make *"
                  value={formData.make}
                  onChange={(e) => handleInputChange("make", e.target.value)}
                  placeholder="Tesla, Nissan, etc."
                  required
                  error={errors.make}
                />
                <InputWithError
                  id="model"
                  label="Model *"
                  value={formData.model}
                  onChange={(e) => handleInputChange("model", e.target.value)}
                  placeholder="Model 3, Leaf, etc."
                  required
                  error={errors.model}
                />
                <InputWithError
                  id="year"
                  label="Year *"
                  type="number"
                  min={minYear}
                  value={formData.year}
                  onChange={(e) => handleInputChange("year", e.target.value)}
                  required
                  error={errors.year}
                  helpText={`${minYear}-${currentYear + 1}`}
                />
              </div>
            </div>

            {/* Technical Specs */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2">
                Technical Specifications
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <InputWithError
                  id="battery_capacity"
                  label="Battery Capacity (kWh)"
                  type="number"
                  step="0.1"
                  min="1"
                  max="250"
                  value={formData.battery_capacity}
                  onChange={(e) =>
                    handleInputChange("battery_capacity", e.target.value)
                  }
                  placeholder="75"
                  error={errors.battery_capacity}
                  helpText="Total usable battery capacity (1-250 kWh)"
                />
                <InputWithError
                  id="efficiency"
                  label="Efficiency (mi/kWh)"
                  type="number"
                  step="0.1"
                  min="0.5"
                  max="10"
                  value={formData.efficiency}
                  onChange={(e) =>
                    handleInputChange("efficiency", e.target.value)
                  }
                  placeholder="4.2"
                  error={errors.efficiency}
                  helpText="Miles per kWh - EPA rating (0.5-10 mi/kWh)"
                />
              </div>
            </div>

            {/* Purchase Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2">
                Purchase Information
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <InputWithError
                  id="purchase_date"
                  label="Purchase Date"
                  type="date"
                  min="2008-01-01"
                  max={new Date().toISOString().split("T")[0]}
                  value={formData.purchase_date}
                  onChange={(e) =>
                    handleInputChange("purchase_date", e.target.value)
                  }
                  error={errors.purchase_date}
                  helpText="When you purchased the vehicle"
                />
                <InputWithError
                  id="purchase_price"
                  label="Purchase Price ($)"
                  type="number"
                  min="0"
                  max="500000"
                  value={formData.purchase_price}
                  onChange={(e) =>
                    handleInputChange("purchase_price", e.target.value)
                  }
                  placeholder="45000"
                  error={errors.purchase_price}
                  helpText="Total purchase price in USD"
                />
              </div>
            </div>

            {/* Comparison */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2">
                Comparison Data
              </h3>
              <div className="grid md:grid-cols-1 gap-4">
                <InputWithError
                  id="previous_vehicle_mpg"
                  label="Previous Gas Vehicle MPG"
                  type="number"
                  step="0.1"
                  min="5"
                  max="60"
                  value={formData.previous_vehicle_mpg}
                  onChange={(e) =>
                    handleInputChange("previous_vehicle_mpg", e.target.value)
                  }
                  placeholder="25"
                  error={errors.previous_vehicle_mpg}
                  helpText="Used for calculating fuel savings comparisons (5-60 MPG)"
                />
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex justify-end gap-3 pt-6 border-t border-slate-200">
              <Button
                type="button"
                onClick={onCancel}
                variant="outline"
                disabled={isSubmitting}
                className="border-slate-300 hover:bg-slate-50"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-green-500 to-green-500 hover:from-green-600 hover:to-green-700 
                          shadow-lg hover:shadow-xl transition-all duration-200
                          disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Saving...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    {vehicle ? "Update Vehicle" : "Add Vehicle"}
                  </div>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
