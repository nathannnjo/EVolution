export class TripLog {
  static async list(sort = "", limit = null) {
    // Get trip logs from localStorage
    let trips = JSON.parse(localStorage.getItem("tripLogs") || "[]");

    // Sort if requested
    if (sort === "-date") {
      trips.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    // Limit if requested
    if (limit) {
      trips = trips.slice(0, limit);
    }

    return trips;
  }

  static async create(data) {
    const trips = JSON.parse(localStorage.getItem("tripLogs") || "[]");
    const newTrip = {
      ...data,
      id: Date.now(),
      created_date: new Date().toISOString(),
    };
    trips.push(newTrip);
    localStorage.setItem("tripLogs", JSON.stringify(trips));
    return newTrip;
  }

  static async update(id, data) {
    const trips = JSON.parse(localStorage.getItem("tripLogs") || "[]");
    const index = trips.findIndex((t) => t.id === id);
    if (index !== -1) {
      trips[index] = { ...trips[index], ...data };
      localStorage.setItem("tripLogs", JSON.stringify(trips));
    }
  }

  static async delete(id) {
    const trips = JSON.parse(localStorage.getItem("tripLogs") || "[]");
    const filtered = trips.filter((t) => t.id !== id);
    localStorage.setItem("tripLogs", JSON.stringify(filtered));
  }
}
