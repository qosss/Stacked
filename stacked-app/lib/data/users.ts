export interface User {
  id: string;
  username: string;
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

// Mock user data - 50+ users
export const mockUsers: User[] = [
  {
    id: "1",
    username: "alexchen",
    phone: "+1-555-0101",
    netWorth: 5200000,
    joinedDate: new Date("2023-01-15"),
    isOG: true,
    rank: 1,
  },
  {
    id: "2",
    username: "sarahdev",
    phone: "+1-555-0102",
    netWorth: 4800000,
    joinedDate: new Date("2023-02-20"),
    isOG: true,
    rank: 2,
  },
  {
    id: "3",
    username: "jvault",
    phone: "+1-555-0103",
    netWorth: 4500000,
    joinedDate: new Date("2023-03-10"),
    isOG: true,
    rank: 3,
  },
  {
    id: "4",
    username: "markbuilder",
    phone: "+1-555-0104",
    netWorth: 4200000,
    joinedDate: new Date("2023-04-05"),
    isEarly: true,
    rank: 4,
  },
  {
    id: "5",
    username: "emilystacks",
    phone: "+1-555-0105",
    netWorth: 3950000,
    joinedDate: new Date("2023-05-12"),
    isEarly: true,
    rank: 5,
  },
  {
    id: "6",
    username: "davidcodes",
    phone: "+1-555-0106",
    netWorth: 3800000,
    joinedDate: new Date("2023-06-18"),
    rank: 6,
  },
  {
    id: "7",
    username: "lisaventure",
    phone: "+1-555-0107",
    netWorth: 3650000,
    joinedDate: new Date("2023-07-22"),
    rank: 7,
  },
  {
    id: "8",
    username: "maxtech",
    phone: "+1-555-0108",
    netWorth: 3500000,
    joinedDate: new Date("2023-08-30"),
    rank: 8,
  },
  {
    id: "9",
    username: "rachelgrow",
    phone: "+1-555-0109",
    netWorth: 3350000,
    joinedDate: new Date("2023-09-14"),
    rank: 9,
  },
  {
    id: "10",
    username: "chrisbuilds",
    phone: "+1-555-0110",
    netWorth: 3200000,
    joinedDate: new Date("2023-10-08"),
    rank: 10,
  },
  {
    id: "11",
    username: "samanthaai",
    phone: "+1-555-0111",
    netWorth: 3050000,
    joinedDate: new Date("2023-11-03"),
    rank: 11,
  },
  {
    id: "12",
    username: "tobiaswave",
    phone: "+1-555-0112",
    netWorth: 2950000,
    joinedDate: new Date("2023-12-12"),
    rank: 12,
  },
  {
    id: "13",
    username: "natalieasset",
    phone: "+1-555-0113",
    netWorth: 2850000,
    joinedDate: new Date("2024-01-22"),
    rank: 13,
  },
  {
    id: "14",
    username: "jamesflow",
    phone: "+1-555-0114",
    netWorth: 2750000,
    joinedDate: new Date("2024-02-11"),
    rank: 14,
  },
  {
    id: "15",
    username: "oliviacode",
    phone: "+1-555-0115",
    netWorth: 2650000,
    joinedDate: new Date("2024-03-05"),
    rank: 15,
  },
  {
    id: "16",
    username: "ryanbuild",
    phone: "+1-555-0116",
    netWorth: 2550000,
    joinedDate: new Date("2024-04-09"),
    rank: 16,
  },
  {
    id: "17",
    username: "sophiestack",
    phone: "+1-555-0117",
    netWorth: 2450000,
    joinedDate: new Date("2024-05-17"),
    rank: 17,
  },
  {
    id: "18",
    username: "ethangrind",
    phone: "+1-555-0118",
    netWorth: 2350000,
    joinedDate: new Date("2024-06-23"),
    rank: 18,
  },
  {
    id: "19",
    username: "avagrow",
    phone: "+1-555-0119",
    netWorth: 2250000,
    joinedDate: new Date("2024-07-15"),
    rank: 19,
  },
  {
    id: "20",
    username: "lucaswave",
    phone: "+1-555-0120",
    netWorth: 2150000,
    joinedDate: new Date("2024-08-19"),
    rank: 20,
  },
  {
    id: "21",
    username: "mmendoza",
    phone: "+1-555-0121",
    netWorth: 2050000,
    joinedDate: new Date("2024-09-10"),
    rank: 21,
  },
  {
    id: "22",
    username: "zoetech",
    phone: "+1-555-0122",
    netWorth: 1950000,
    joinedDate: new Date("2024-10-02"),
    rank: 22,
  },
  {
    id: "23",
    username: "jacksonai",
    phone: "+1-555-0123",
    netWorth: 1850000,
    joinedDate: new Date("2024-10-28"),
    rank: 23,
  },
  {
    id: "24",
    username: "miadream",
    phone: "+1-555-0124",
    netWorth: 1750000,
    joinedDate: new Date("2024-11-05"),
    rank: 24,
  },
  {
    id: "25",
    username: "isaacbuild",
    phone: "+1-555-0125",
    netWorth: 1650000,
    joinedDate: new Date("2024-11-18"),
    rank: 25,
  },
  {
    id: "26",
    username: "gracestack",
    phone: "+1-555-0126",
    netWorth: 1550000,
    joinedDate: new Date("2024-11-25"),
    rank: 26,
  },
  {
    id: "27",
    username: "noahrocket",
    phone: "+1-555-0127",
    netWorth: 1450000,
    joinedDate: new Date("2024-11-30"),
    rank: 27,
  },
  {
    id: "28",
    username: "emilyjump",
    phone: "+1-555-0128",
    netWorth: 1350000,
    joinedDate: new Date("2024-12-03"),
    rank: 28,
  },
  {
    id: "29",
    username: "liam_code",
    phone: "+1-555-0129",
    netWorth: 1250000,
    joinedDate: new Date("2024-12-08"),
    rank: 29,
  },
  {
    id: "30",
    username: "charlotteai",
    phone: "+1-555-0130",
    netWorth: 1150000,
    joinedDate: new Date("2024-12-12"),
    rank: 30,
  },
  {
    id: "31",
    username: "masonsavvy",
    phone: "+1-555-0131",
    netWorth: 1050000,
    joinedDate: new Date("2024-12-15"),
    rank: 31,
  },
  {
    id: "32",
    username: "bellawise",
    phone: "+1-555-0132",
    netWorth: 950000,
    joinedDate: new Date("2024-12-18"),
    rank: 32,
  },
  {
    id: "33",
    username: "loganpro",
    phone: "+1-555-0133",
    netWorth: 850000,
    joinedDate: new Date("2024-12-20"),
    rank: 33,
  },
  {
    id: "34",
    username: "harpertech",
    phone: "+1-555-0134",
    netWorth: 750000,
    joinedDate: new Date("2024-12-22"),
    rank: 34,
  },
  {
    id: "35",
    username: "elijah_dev",
    phone: "+1-555-0135",
    netWorth: 650000,
    joinedDate: new Date("2024-12-24"),
    rank: 35,
  },
  {
    id: "36",
    username: "averyslim",
    phone: "+1-555-0136",
    netWorth: 550000,
    joinedDate: new Date("2024-12-25"),
    rank: 36,
  },
  {
    id: "37",
    username: "mvector",
    phone: "+1-555-0137",
    netWorth: 450000,
    joinedDate: new Date("2024-12-26"),
    rank: 37,
  },
  {
    id: "38",
    username: "scarlettx",
    phone: "+1-555-0138",
    netWorth: 350000,
    joinedDate: new Date("2024-12-27"),
    rank: 38,
  },
  {
    id: "39",
    username: "amulasin",
    phone: "+1-555-0139",
    netWorth: 250000,
    joinedDate: new Date("2024-12-28"),
    rank: 39,
  },
  {
    id: "40",
    username: "sofiaone",
    phone: "+1-555-0140",
    netWorth: 150000,
    joinedDate: new Date("2024-12-29"),
    rank: 40,
  },
];

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
  return mockUsers.findIndex((u) => u.netWorth > user.netWorth) + 1;
};
