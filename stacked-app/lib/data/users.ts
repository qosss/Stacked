export interface User {
  id: string;
  username: string;
  displayName: string;
  phone: string;
  netWorth: number;
  joinedDate: Date;
  isOG?: boolean;
  isEarly?: boolean;
  rank?: number;
}

export const formatNetWorth = (value: number): string => {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}K`;
  }
  return `$${value}`;
};

// First names and last names for generating users
const firstNames = [
  "Alex", "Sarah", "Jordan", "Mark", "Emily", "David", "Lisa", "Max", "Rachel", "Chris",
  "Samantha", "Tobias", "Natalie", "James", "Olivia", "Ryan", "Sophie", "Ethan", "Ava", "Lucas",
  "Maria", "Zoe", "Jackson", "Mia", "Isaac", "Grace", "Noah", "Liam", "Charlotte", "Mason",
  "Bella", "Logan", "Harper", "Elijah", "Avery", "Marcus", "Scarlett", "Amul", "Sofia", "Daniel",
  "Emma", "Benjamin", "Chloe", "Henry", "Lily", "Sebastian", "Aria", "Jack", "Luna", "Owen",
  "Riley", "Carter", "Zoey", "Wyatt", "Nora", "Grayson", "Stella", "Leo", "Hazel", "Ezra",
  "Aurora", "Asher", "Savannah", "Lincoln", "Brooklyn", "Kai", "Claire", "Theo", "Lucy", "Hunter",
  "Violet", "Miles", "Elena", "Dominic", "Maya", "Adrian", "Ivy", "Xavier", "Willow", "Roman",
  "Audrey", "Jose", "Skylar", "Jaxon", "Paisley", "Evan", "Evelyn", "Cooper", "Naomi", "Landon",
  "Eliana", "Angel", "Caroline", "Easton", "Aaliyah", "Axel", "Quinn", "Brooks", "Ruby", "Wesley"
];

const lastNames = [
  "Chen", "Dev", "Vault", "Builder", "Stacks", "Codes", "Venture", "Tech", "Grow", "Builds",
  "Wave", "Asset", "Flow", "Stack", "Grind", "Dream", "Rocket", "Jump", "Savvy", "Wise",
  "Pro", "Vector", "Prime", "Swift", "Forge", "Craft", "Peak", "Rise", "Core", "Pulse",
  "Nexus", "Edge", "Force", "Stone", "Storm", "Blaze", "Frost", "Vale", "Haze", "Dusk",
  "Dawn", "Moon", "Star", "Sun", "Sky", "Cloud", "Rain", "Wind", "Fire", "Lake"
];

// Generate 100 mock users
const generateMockUsers = (): User[] => {
  const users: User[] = [];

  // Starting net worth descends from $5.2M down
  const baseNetWorth = 5200000;
  const decrement = 51500; // Roughly $51.5K decrease per rank

  // Starting date for OG users
  const ogStartDate = new Date("2023-01-15");

  for (let i = 0; i < 100; i++) {
    const firstName = firstNames[i % firstNames.length];
    const lastName = lastNames[i % lastNames.length];
    const username = `${firstName.toLowerCase()}${lastName.toLowerCase()}${i > 49 ? i - 49 : ""}`;

    // Calculate join date (spreads across 2 years)
    const joinDate = new Date(ogStartDate);
    joinDate.setDate(joinDate.getDate() + Math.floor(i * 7.3)); // ~7 days apart

    // Calculate net worth with deterministic variation (based on index to avoid hydration mismatch)
    const variation = ((i * 7919) % 10000); // Deterministic pseudo-random using prime number
    const netWorth = Math.max(10000, baseNetWorth - (i * decrement) + variation);

    users.push({
      id: String(i + 1),
      username,
      displayName: `${firstName} ${lastName}`,
      phone: `+1-555-${String(i + 101).padStart(4, "0")}`,
      netWorth,
      joinedDate: joinDate,
      isOG: i < 10, // First 10 are OG
      isEarly: i >= 10 && i < 25, // Next 15 are Early
      rank: i + 1,
    });
  }

  return users;
};

// Mock user data - Top 100 users
export const mockUsers: User[] = generateMockUsers();

// Helper to get user by username
export const getUserByUsername = (username: string): User | undefined => {
  return mockUsers.find(
    (user) => user.username.toLowerCase() === username.toLowerCase()
  );
};

// Helper to get user by phone
export const getUserByPhone = (phone: string): User | undefined => {
  return mockUsers.find((user) => user.phone === phone);
};

// Helper to get user rank
export const getUserRank = (userId: string): number => {
  const user = mockUsers.find((u) => u.id === userId);
  if (!user) return mockUsers.length + 1;
  return mockUsers.filter((u) => u.netWorth > user.netWorth).length + 1;
};
