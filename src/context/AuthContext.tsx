"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface ScholarUser {
  name: string;
  email: string;
  role: "student" | "teachingAssistant" | "professor" | "advisor";
  faculty: string;
  scholarId: string;
  matriculatedAt: string;
}

interface AuthContextType {
  user: ScholarUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email?: string, name?: string, role?: ScholarUser["role"], faculty?: string) => void;
  signUp: (name: string, email: string, role?: ScholarUser["role"], faculty?: string) => void;
  signOut: () => void;
}

const STORAGE_KEY = "studysync_scholar_session";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<ScholarUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {
      // Ignore storage read errors
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveUser = (newUser: ScholarUser | null) => {
    setUser(newUser);
    try {
      if (newUser) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // Ignore storage write errors
    }
  };

  const signIn = (
    email = "demo.scholar@studysync.edu",
    name = "Tariq Al-Mansour",
    role: ScholarUser["role"] = "student",
    faculty = "College of Computing & AI"
  ) => {
    const newUser: ScholarUser = {
      name,
      email,
      role,
      faculty,
      scholarId: "SS-4410298",
      matriculatedAt: "Fall 2026",
    };
    saveUser(newUser);
  };

  const signUp = (
    name: string,
    email: string,
    role: ScholarUser["role"] = "student",
    faculty = "College of Computing & AI"
  ) => {
    const newUser: ScholarUser = {
      name: name || "Scholar Candidate",
      email: email || "scholar@studysync.edu",
      role,
      faculty: faculty || "College of Computing & AI",
      scholarId: `SS-${Math.floor(1000000 + Math.random() * 9000000)}`,
      matriculatedAt: "Academic Year 2026/2027",
    };
    saveUser(newUser);
  };

  const signOut = () => {
    saveUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
