export class ChargingSession {
  static async list(sort = "", limit = null) {
    // Get charging sessions from localStorage
    let sessions = JSON.parse(localStorage.getItem("chargingSessions") || "[]");

    // Sort if requested
    if (sort === "-date") {
      sessions.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    // Limit if requested
    if (limit) {
      sessions = sessions.slice(0, limit);
    }

    return sessions;
  }

  static async create(data) {
    const sessions = JSON.parse(
      localStorage.getItem("chargingSessions") || "[]"
    );
    const newSession = {
      ...data,
      id: Date.now(),
      created_date: new Date().toISOString(),
    };
    sessions.push(newSession);
    localStorage.setItem("chargingSessions", JSON.stringify(sessions));
    return newSession;
  }

  static async update(id, data) {
    const sessions = JSON.parse(
      localStorage.getItem("chargingSessions") || "[]"
    );
    const index = sessions.findIndex((s) => s.id === id);
    if (index !== -1) {
      sessions[index] = { ...sessions[index], ...data };
      localStorage.setItem("chargingSessions", JSON.stringify(sessions));
    }
  }

  static async delete(id) {
    const sessions = JSON.parse(
      localStorage.getItem("chargingSessions") || "[]"
    );
    const filtered = sessions.filter((s) => s.id !== id);
    localStorage.setItem("chargingSessions", JSON.stringify(filtered));
  }
}
