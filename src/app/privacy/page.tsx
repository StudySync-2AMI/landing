"use client";

import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/ui/PageHeader";
import { PaperCard } from "@/ui/PaperCard";
import { ArchivalStamp } from "@/ui/ArchivalStamp";
import { WorkspaceSection } from "@/components/sections/WorkspaceSection";
import { useLanguage } from "@/context/LanguageContext";
import { ShieldCheck, Lock } from "lucide-react";

export default function PrivacyPage() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-paper)] text-[var(--ink-primary)] paper-grain-overlay">
      <Header />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-10 md:py-16 space-y-20">
        <PageHeader
          code="GOV-PRIV-07"
          stamp="ZERO-KNOWLEDGE VAULT"
          title={
            language === "ar"
              ? "الخصوصية، المساحة الشخصية والحوكمة الأكاديمية"
              : "Privacy, Student Vault & Academic Governance"
          }
          subtitle={
            language === "ar"
              ? "ميثاق الخصوصية المطلقة، المساحة السحابية الخاصة بالطالب، وحوكمة البيانات الجامعية دون أي تتبع خارجي."
              : "Institutional privacy charter, zero-access personal academic workspace, and strict zero-telemetry geofencing policies."
          }
        />

        {/* Workspace Feature (Section 7) */}
        <WorkspaceSection />

        {/* Institutional Privacy & Security Declarations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <PaperCard variant="ruled" className="p-8 border-s-4 border-s-[#3D5A40]">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="w-5 h-5 text-[#3D5A40] dark:text-[#69A384]" />
              <h3 className="font-serif font-bold text-xl text-[var(--ink-primary)]">
                {language === "ar" ? "ضمانات خصوصية النطاق الجغرافي (GPS)" : "Geofencing Ephemeral Validation"}
              </h3>
            </div>
            <p className="text-sm text-[var(--ink-secondary)] leading-relaxed font-medium">
              {language === "ar"
                ? "يتم التحقق من النطاق الجغرافي الاختياري حصراً في لحظة مسح QR Code داخل قاعة المحاضرة. لا يقوم النظام بتخزين إحداثيات الطالب ولا تتبع تحركاته خارج القاعة إطلاقاً."
                : "Geographical proximity verification occurs solely in-memory at the scan instant within the lecture auditorium. The platform does not log coordinates nor execute background location tracking."}
            </p>
          </PaperCard>

          <PaperCard variant="ruled" className="p-8 border-s-4 border-s-[#2B3A4A]">
            <div className="flex items-center gap-2 mb-3">
              <Lock className="w-5 h-5 text-[#2B3A4A] dark:text-[#7AA2C7]" />
              <h3 className="font-serif font-bold text-xl text-[var(--ink-primary)]">
                {language === "ar" ? "سياسة الصفر-وصول للمساحة الخاصة" : "Zero-Access Student Workspace Policy"}
              </h3>
            </div>
            <p className="text-sm text-[var(--ink-secondary)] leading-relaxed font-medium">
              {language === "ar"
                ? "الملاحظات، التسجيلات الصوتية، ومرفقات المساحة الشخصية مشفرة بصفة خاصة للطالب. لا يملك أعضاء هيئة التدريس أو المعيدون أو الزملاء أي صلاحية للاطلاع عليها."
                : "Student study notes, voice memos, and vault attachments remain strictly encrypted and confidential. Faculty, TAs, and peer students possess zero visibility."}
            </p>
          </PaperCard>
        </div>

        {/* Academic Governance Matrix */}
        <PaperCard variant="plain" className="p-8 md:p-10">
          <div className="flex items-center justify-between pb-4 mb-6 border-b-2 border-[var(--border-paper)]/20">
            <h3 className="font-serif font-black text-2xl text-[var(--ink-primary)]">
              {language === "ar" ? "معايير الامتثال الأكاديمي واللوائح الجامعية" : "Institutional Academic Compliance"}
            </h3>
            <ArchivalStamp variant="sage">ISO & FERPA ALIGNED</ArchivalStamp>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-[var(--ink-secondary)]">
            <div className="p-5 rounded-lg bg-[var(--surface-subtle)] border-2 border-[var(--border-paper)]/30">
              <div className="font-bold text-[var(--ink-primary)] mb-1.5 font-serif text-base">
                {language === "ar" ? "النزاهة الأكاديمية الصارمة" : "Academic Integrity"}
              </div>
              <p className="leading-relaxed">
                {language === "ar"
                  ? "أدوات الذكاء الاصطناعي ترتكز على سلايدات الدكتور الرسمية فقط، وتمتنع عن حل التكليفات والامتحانات."
                  : "AI tools ground strictly on official course slides and explicitly decline to solve graded homework."}
              </p>
            </div>

            <div className="p-5 rounded-lg bg-[var(--surface-subtle)] border-2 border-[var(--border-paper)]/30">
              <div className="font-bold text-[var(--ink-primary)] mb-1.5 font-serif text-base">
                {language === "ar" ? "التشفير والرموز المؤقتة" : "Cryptographic Tokens"}
              </div>
              <p className="leading-relaxed">
                {language === "ar"
                  ? "رموز الحضور قصيرة الصلاحية ومشفرة لمنع تسريب صور الـ QR أو تناقلها بين الطلاب."
                  : "Attendance session tokens expire in seconds and are digitally signed to eliminate proxy photo check-ins."}
              </p>
            </div>

            <div className="p-5 rounded-lg bg-[var(--surface-subtle)] border-2 border-[var(--border-paper)]/30">
              <div className="font-bold text-[var(--ink-primary)] mb-1.5 font-serif text-base">
                {language === "ar" ? "مراجعة المسؤول HITL" : "Human-in-the-Loop"}
              </div>
              <p className="leading-relaxed">
                {language === "ar"
                  ? "لا تُعتمد مخرجات تصنيف المسارات أو فرص التدريب تلقائياً دون مراجعة المسؤول الأكاديمي."
                  : "All ML track classifications and external opportunities require explicit academic administrator audit."}
              </p>
            </div>
          </div>
        </PaperCard>
      </main>

      <Footer />
    </div>
  );
}
