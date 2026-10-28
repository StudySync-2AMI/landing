"use client";

import React, { useState } from "react";
import { Mail, Lock, User, GraduationCap, Building2, Eye, EyeOff } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface AuthFormFieldsProps {
  mode: "signin" | "signup";
  formState: {
    email: string;
    password: string;
    fullName: string;
    role: string;
    faculty: string;
    rememberMe: boolean;
  };
  onChange: (field: string, value: any) => void;
}

export function AuthFormFields({ mode, formState, onChange }: AuthFormFieldsProps) {
  const { dict } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-4">
      {/* Sign Up Exclusive: Full Name */}
      {mode === "signup" && (
        <div className="space-y-1">
          <label className="block font-mono text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-[var(--ink-secondary)]">
            {dict.auth.fullNameLabel}
          </label>
          <div className="relative flex items-center">
            <User className="absolute start-3 w-4 h-4 text-[var(--ink-muted)] pointer-events-none" />
            <input
              type="text"
              required
              value={formState.fullName}
              onChange={(e) => onChange("fullName", e.target.value)}
              placeholder={dict.auth.fullNamePlaceholder}
              className="w-full ps-9 pe-3 py-2 text-xs sm:text-sm font-sans rounded-md border-2 border-[var(--border-paper)] dark:border-[#3E4A5C] bg-[var(--surface-subtle)] dark:bg-[#11161F] text-[var(--ink-primary)] focus:border-[var(--accent-terracotta)] focus:outline-none transition-colors"
            />
          </div>
        </div>
      )}

      {/* Common: Academic Email / ID */}
      <div className="space-y-1">
        <label className="block font-mono text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-[var(--ink-secondary)]">
          {dict.auth.emailLabel}
        </label>
        <div className="relative flex items-center">
          <Mail className="absolute start-3 w-4 h-4 text-[var(--ink-muted)] pointer-events-none" />
          <input
            type="text"
            required
            value={formState.email}
            onChange={(e) => onChange("email", e.target.value)}
            placeholder={dict.auth.emailPlaceholder}
            className="w-full ps-9 pe-3 py-2 text-xs sm:text-sm font-mono rounded-md border-2 border-[var(--border-paper)] dark:border-[#3E4A5C] bg-[var(--surface-subtle)] dark:bg-[#11161F] text-[var(--ink-primary)] focus:border-[var(--accent-terracotta)] focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Sign Up Exclusive: Academic Affiliation & Faculty */}
      {mode === "signup" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="block font-mono text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-[var(--ink-secondary)]">
              {dict.auth.roleLabel}
            </label>
            <div className="relative flex items-center">
              <GraduationCap className="absolute start-3 w-4 h-4 text-[var(--ink-muted)] pointer-events-none" />
              <select
                value={formState.role}
                onChange={(e) => onChange("role", e.target.value)}
                className="w-full ps-9 pe-3 py-2 text-xs sm:text-sm font-sans rounded-md border-2 border-[var(--border-paper)] dark:border-[#3E4A5C] bg-[var(--surface-subtle)] dark:bg-[#11161F] text-[var(--ink-primary)] focus:border-[var(--accent-terracotta)] focus:outline-none transition-colors appearance-none cursor-pointer"
              >
                <option value="student">{dict.auth.roles.student}</option>
                <option value="ta">{dict.auth.roles.teachingAssistant}</option>
                <option value="professor">{dict.auth.roles.professor}</option>
                <option value="advisor">{dict.auth.roles.advisor}</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="block font-mono text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-[var(--ink-secondary)]">
              {dict.auth.facultyLabel}
            </label>
            <div className="relative flex items-center">
              <Building2 className="absolute start-3 w-4 h-4 text-[var(--ink-muted)] pointer-events-none" />
              <input
                type="text"
                value={formState.faculty}
                onChange={(e) => onChange("faculty", e.target.value)}
                placeholder={dict.auth.facultyPlaceholder}
                className="w-full ps-9 pe-3 py-2 text-xs sm:text-sm font-sans rounded-md border-2 border-[var(--border-paper)] dark:border-[#3E4A5C] bg-[var(--surface-subtle)] dark:bg-[#11161F] text-[var(--ink-primary)] focus:border-[var(--accent-terracotta)] focus:outline-none transition-colors"
              />
            </div>
          </div>
        </div>
      )}

      {/* Common: Encrypted Password Cipher */}
      <div className="space-y-1">
        <label className="block font-mono text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-[var(--ink-secondary)]">
          {dict.auth.passwordLabel}
        </label>
        <div className="relative flex items-center">
          <Lock className="absolute start-3 w-4 h-4 text-[var(--ink-muted)] pointer-events-none" />
          <input
            type={showPassword ? "text" : "password"}
            required
            value={formState.password}
            onChange={(e) => onChange("password", e.target.value)}
            placeholder={dict.auth.passwordPlaceholder}
            className="w-full ps-9 pe-10 py-2 text-xs sm:text-sm font-mono rounded-md border-2 border-[var(--border-paper)] dark:border-[#3E4A5C] bg-[var(--surface-subtle)] dark:bg-[#11161F] text-[var(--ink-primary)] focus:border-[var(--accent-terracotta)] focus:outline-none transition-colors"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute end-3 text-[var(--ink-muted)] hover:text-[var(--ink-primary)] transition-colors cursor-pointer"
            title="Toggle Cipher Visibility"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Remember Me & Recovery Row */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={formState.rememberMe}
            onChange={(e) => onChange("rememberMe", e.target.checked)}
            className="w-4 h-4 rounded border-2 border-[var(--border-paper)] dark:border-[#3E4A5C] accent-[var(--accent-terracotta)] cursor-pointer"
          />
          <span className="font-sans text-[11px] sm:text-xs text-[var(--ink-secondary)]">
            {dict.auth.rememberMe}
          </span>
        </label>

        {mode === "signin" && (
          <button
            type="button"
            onClick={() => alert("Registrar inquiry dispatched: Please visit Academic Affairs desk or check recovery link sent to registered university email.")}
            className="font-mono text-[10px] sm:text-[11px] text-[var(--accent-terracotta)] hover:underline cursor-pointer"
          >
            {dict.auth.forgotPassword}
          </button>
        )}
      </div>
    </div>
  );
}
