export interface User {
  id: string;
  username: string;
  displayName: string;
  phone: string;
  netWorth: number;
  joinedDate: Date;
  isOG?: boolean;
  isEarly?: boolean;
  isVerified?: boolean;
  rank?: number;
  previousRank?: number;
  socialX?: string;
  socialInstagram?: string;
  socialLinkedIn?: string;
  bio?: string;
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

    // Add previousRank for some users to show rank changes
    // Pattern: some moved up, some moved down, some are new (no previousRank)
    let previousRank: number | undefined;
    if (i === 0) {
      previousRank = 3; // #1 was #3 (moved up 2)
    } else if (i === 1) {
      previousRank = 1; // #2 was #1 (moved down 1)
    } else if (i === 2) {
      previousRank = 7; // #3 was #7 (moved up 4)
    } else if (i === 3) {
      previousRank = 2; // #4 was #2 (moved down 2)
    } else if (i === 5) {
      previousRank = 12; // #6 was #12 (moved up 6)
    } else if (i === 7) {
      previousRank = 5; // #8 was #5 (moved down 3)
    } else if (i === 9) {
      previousRank = 15; // #10 was #15 (moved up 5)
    } else if (i === 14) {
      previousRank = 10; // #15 was #10 (moved down 5)
    } else if (i === 19) {
      previousRank = 25; // #20 was #25 (moved up 5)
    } else if (i === 24) {
      previousRank = 20; // #25 was #20 (moved down 5)
    } else if (i === 4 || i === 6 || i === 10 || i === 15 || i === 20) {
      previousRank = i + 1; // Same rank - no change (shows dot)
    }
    // Other users have no previousRank (show nothing in leaderboard)

    // Add social links to some users for testing
    let socialX: string | undefined;
    let socialInstagram: string | undefined;
    let socialLinkedIn: string | undefined;
    let bio: string | undefined;
    if (i === 0) {
      socialX = "alexchen";
      socialInstagram = "alex.chen";
      socialLinkedIn = "alexchen";
      bio = "Building wealth one day at a time. Tech entrepreneur & investor.";
    } else if (i === 1) {
      socialX = "sarahdev";
      socialLinkedIn = "sarahdev";
      bio = "Software engineer turned investor. Love startups.";
    } else if (i === 2) {
      socialInstagram = "jordanvault";
      bio = "Finance nerd. Early crypto adopter.";
    } else if (i === 3) {
      socialX = "markbuilder";
      socialInstagram = "mark_builder";
      socialLinkedIn = "markbuilder";
    } else if (i === 5) {
      socialX = "lisatech";
      bio = "Venture capital & angel investing.";
    } else if (i === 8) {
      socialInstagram = "chrisgrind";
      socialLinkedIn = "chrisgrind";
    } else if (i === 12) {
      socialX = "james_codes";
      socialInstagram = "james.codes";
      bio = "Full-stack dev. Building my way to financial freedom.";
    }

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
      previousRank,
      socialX,
      socialInstagram,
      socialLinkedIn,
      bio,
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
