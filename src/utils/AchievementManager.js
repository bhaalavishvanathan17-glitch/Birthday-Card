class AchievementManager {
  constructor() {
    this.listeners = [];
  }

  getUnlocked() {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem("birthday_achievements");
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  }

  unlock(id, title) {
    if (typeof window === "undefined") return;
    const current = this.getUnlocked();
    if (!current.includes(id)) {
      const updated = [...current, id];
      try {
        localStorage.setItem("birthday_achievements", JSON.stringify(updated));
      } catch (e) {}

      // Notify listeners
      this.listeners.forEach((fn) => fn({ id, title }));
    }
  }

  onUnlock(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter((fn) => fn !== callback);
    };
  }
}

export const achievementManager = new AchievementManager();
