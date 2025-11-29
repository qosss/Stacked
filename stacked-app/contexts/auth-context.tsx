"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User, mockUsers, getUserByPhone, getUserRank } from "@/lib/data/users";

export interface AuthUser extends User {
  isCurrentUser?: boolean;
}

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  login: (phone: string) => Promise<boolean>;
  signup: (
    phone: string,
    username: string,
    displayName: string,
    netWorth: number
  ) => Promise<boolean>;
  logout: () => void;
  updateNetWorth: (newNetWorth: number) => Promise<boolean>;
  updateSocials: (socials: { x?: string; instagram?: string; linkedin?: string; bio?: string }) => Promise<boolean>;
  verifyNetWorth: (verifiedAmount: number) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("stackedUser");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        // Convert joinedDate string back to Date object
        if (parsedUser.joinedDate) {
          parsedUser.joinedDate = new Date(parsedUser.joinedDate);
        }
        setUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("stackedUser");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (phone: string): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    const foundUser = getUserByPhone(phone);
    if (foundUser) {
      const authUser: AuthUser = {
        ...foundUser,
        isCurrentUser: true,
      };
      setUser(authUser);
      localStorage.setItem("stackedUser", JSON.stringify(authUser));
      return true;
    }
    return false;
  };

  const signup = async (
    phone: string,
    username: string,
    displayName: string,
    netWorth: number
  ): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Check if username already exists
    const existingUser = mockUsers.find(
      (u) => u.username.toLowerCase() === username.toLowerCase()
    );
    if (existingUser) {
      return false;
    }

    // Check if phone already exists
    const existingPhone = getUserByPhone(phone);
    if (existingPhone) {
      return false;
    }

    // Create new user
    const newUser: AuthUser = {
      id: `user_${Date.now()}`,
      username,
      displayName,
      phone,
      netWorth,
      joinedDate: new Date(),
      isCurrentUser: true,
    };

    // Add to mock users for leaderboard purposes
    mockUsers.push({
      ...newUser,
      isCurrentUser: undefined,
    } as User);

    setUser(newUser);
    localStorage.setItem("stackedUser", JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("stackedUser");
    router.push("/");
  };

  const updateNetWorth = async (newNetWorth: number): Promise<boolean> => {
    if (!user) return false;

    // Capture current rank before update
    const currentRank = getUserRank(user.id);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    const updatedUser: AuthUser = {
      ...user,
      netWorth: newNetWorth,
      previousRank: currentRank,
    };

    setUser(updatedUser);
    localStorage.setItem("stackedUser", JSON.stringify(updatedUser));

    // Update in mock users array
    const mockUserIndex = mockUsers.findIndex((u) => u.id === user.id);
    if (mockUserIndex >= 0) {
      mockUsers[mockUserIndex].netWorth = newNetWorth;
      mockUsers[mockUserIndex].previousRank = currentRank;
    }

    return true;
  };

  const updateSocials = async (socials: { x?: string; instagram?: string; linkedin?: string; bio?: string }): Promise<boolean> => {
    if (!user) return false;

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    const updatedUser: AuthUser = {
      ...user,
      socialX: socials.x || undefined,
      socialInstagram: socials.instagram || undefined,
      socialLinkedIn: socials.linkedin || undefined,
      bio: socials.bio || undefined,
    };

    setUser(updatedUser);
    localStorage.setItem("stackedUser", JSON.stringify(updatedUser));

    // Update in mock users array
    const mockUserIndex = mockUsers.findIndex((u) => u.id === user.id);
    if (mockUserIndex >= 0) {
      mockUsers[mockUserIndex].socialX = socials.x || undefined;
      mockUsers[mockUserIndex].socialInstagram = socials.instagram || undefined;
      mockUsers[mockUserIndex].socialLinkedIn = socials.linkedin || undefined;
      mockUsers[mockUserIndex].bio = socials.bio || undefined;
    }

    return true;
  };

  const verifyNetWorth = async (verifiedAmount: number): Promise<boolean> => {
    if (!user) return false;

    // Capture current rank before update
    const currentRank = getUserRank(user.id);

    const updatedUser: AuthUser = {
      ...user,
      netWorth: verifiedAmount,
      isVerified: true,
      previousRank: currentRank,
    };

    setUser(updatedUser);
    localStorage.setItem("stackedUser", JSON.stringify(updatedUser));

    // Update in mock users array
    const mockUserIndex = mockUsers.findIndex((u) => u.id === user.id);
    if (mockUserIndex >= 0) {
      mockUsers[mockUserIndex].netWorth = verifiedAmount;
      mockUsers[mockUserIndex].isVerified = true;
      mockUsers[mockUserIndex].previousRank = currentRank;
    }

    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        signup,
        logout,
        updateNetWorth,
        updateSocials,
        verifyNetWorth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
