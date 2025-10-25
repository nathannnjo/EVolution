export class Vehicle {
  static async list(sort = "", limit = null) {
    // Mock data
    return JSON.parse(localStorage.getItem("vehicles") || "[]");
  }

  static async create(data) {
    const vehicles = JSON.parse(localStorage.getItem("vehicles") || "[]");
    const newVehicle = {
      ...data,
      id: Date.now(),
      created_date: new Date().toISOString(),
    };
    vehicles.push(newVehicle);
    localStorage.setItem("vehicles", JSON.stringify(vehicles));
    return newVehicle;
  }

  static async update(id, data) {
    const vehicles = JSON.parse(localStorage.getItem("vehicles") || "[]");
    const index = vehicles.findIndex((v) => v.id === id);
    if (index !== -1) {
      vehicles[index] = { ...vehicles[index], ...data };
      localStorage.setItem("vehicles", JSON.stringify(vehicles));
    }
  }

  static async delete(id) {
    const vehicles = JSON.parse(localStorage.getItem("vehicles") || "[]");
    const filtered = vehicles.filter((v) => v.id !== id);
    localStorage.setItem("vehicles", JSON.stringify(filtered));
  }
}
