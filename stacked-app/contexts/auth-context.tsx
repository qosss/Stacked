"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User, mockUsers, getUserByPhone } from "@/lib/data/users";

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
    netWorth: number
  ) => Promise<boolean>;
  logout: () => void;
  updateNetWorth: (newNetWorth: number) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("stackedUser");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
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
  };

  const updateNetWorth = async (newNetWorth: number): Promise<boolean> => {
    if (!user) return false;

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    const updatedUser: AuthUser = {
      ...user,
      netWorth: newNetWorth,
    };

    setUser(updatedUser);
    localStorage.setItem("stackedUser", JSON.stringify(updatedUser));

    // Update in mock users array
    const mockUserIndex = mockUsers.findIndex((u) => u.id === user.id);
    if (mockUserIndex >= 0) {
      mockUsers[mockUserIndex].netWorth = newNetWorth;
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
