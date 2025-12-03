import { useEffect } from "react";
import AnimatedBackground from "@/components/AnimatedBackground";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CrisisResources = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen relative">
      {/* Global Animated Background */}
      <div className="fixed inset-0 z-0">
        <AnimatedBackground />
      </div>

      {/* Sticky Header */}
      <Header />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 max-w-5xl">

        {/* 988 Quick Access */}
        <section
          className="mb-8 bg-gradient-to-b from-card/40 to-card/20 backdrop-blur-md border-2 border-red-500 rounded-2xl p-6 text-center shadow-[0_10px_30px_rgba(0,0,0,.35)]"
          aria-label="Immediate help"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Need help now?
          </h1>
          <p className="text-muted-foreground mb-5">
            Reach support immediately. Free and available 24/7.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mb-2" role="group" aria-label="Call or text">
            <a
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-b from-red-500 to-red-600 text-white font-bold text-lg shadow-[0_10px_30px_rgba(0,0,0,.35)] hover:brightness-105 hover:-translate-y-0.5 transition-all focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
              href="sms:988"
            >
              📱 Text 988
            </a>
            <a
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-transparent border-2 border-red-500 text-white font-bold text-lg shadow-[0_10px_30px_rgba(0,0,0,.35)] hover:brightness-105 hover:-translate-y-0.5 transition-all focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
              href="tel:988"
            >
              ☎️ Call 988
            </a>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            <em>UK users dial 111</em>
          </p>
        </section>

        {/* Intro */}
        <section className="mb-8 bg-card/60 backdrop-blur-md rounded-2xl p-5 text-muted-foreground shadow-[0_6px_18px_rgba(0,0,0,.22)]">
          The resources below are independent, trusted organizations. We are not taking submissions at this time. Thank you for your consideration!
        </section>

        {/* Crisis Management */}
        <section className="mb-10" aria-labelledby="crisis-management">
          <div className="flex items-center gap-3 mb-3">
            <h2 id="crisis-management" className="text-2xl sm:text-3xl font-bold text-foreground">
              Crisis management
            </h2>
          </div>
          <div className="flex justify-center mb-5">
            <div className="w-72 h-0.5 bg-gradient-to-r from-transparent via-neon-blue to-transparent rounded shadow-[0_0_8px_rgba(0,210,255,.6)]" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <a
              className="flex items-center justify-between gap-3 min-h-14 px-5 py-4 rounded-xl bg-gradient-to-b from-red-500 to-red-600 border border-black/35 text-white font-bold shadow-[0_6px_18px_rgba(0,0,0,.22)] hover:shadow-[0_0_18px_rgba(255,77,77,.35)] hover:-translate-y-0.5 transition-all text-shadow-sm focus-visible:outline-2 focus-visible:outline-neon-blue focus-visible:outline-offset-2"
              href="https://988lifeline.org"
              target="_blank"
              rel="noopener"
            >
              988 Suicide & Crisis Lifeline
              <span className="text-red-100 text-xs font-semibold ml-3 opacity-95">
                24/7 emotional support
              </span>
            </a>
            <a
              className="flex items-center justify-between gap-3 min-h-14 px-5 py-4 rounded-xl bg-gradient-to-b from-red-500 to-red-600 border border-black/35 text-white font-bold shadow-[0_6px_18px_rgba(0,0,0,.22)] hover:shadow-[0_0_18px_rgba(255,77,77,.35)] hover:-translate-y-0.5 transition-all text-shadow-sm focus-visible:outline-2 focus-visible:outline-neon-blue focus-visible:outline-offset-2"
              href="https://www.crisistextline.org/"
              target="_blank"
              rel="noopener"
            >
              Crisis Text Line
              <span className="text-red-100 text-xs font-semibold ml-3 opacity-95">
                Text HOME to 741741
              </span>
            </a>
            <a
              className="flex items-center justify-between gap-3 min-h-14 px-5 py-4 rounded-xl bg-gradient-to-b from-red-500 to-red-600 border border-black/35 text-white font-bold shadow-[0_6px_18px_rgba(0,0,0,.22)] hover:shadow-[0_0_18px_rgba(255,77,77,.35)] hover:-translate-y-0.5 transition-all text-shadow-sm focus-visible:outline-2 focus-visible:outline-neon-blue focus-visible:outline-offset-2"
              href="https://www.samhsa.gov/find-help/disaster-distress-helpline"
              target="_blank"
              rel="noopener"
            >
              SAMHSA Disaster Distress Hotline
              <span className="text-red-100 text-xs font-semibold ml-3 opacity-95">
                Support after disasters
              </span>
            </a>
            <a
              className="flex items-center justify-between gap-3 min-h-14 px-5 py-4 rounded-xl bg-gradient-to-b from-red-500 to-red-600 border border-black/35 text-white font-bold shadow-[0_6px_18px_rgba(0,0,0,.22)] hover:shadow-[0_0_18px_rgba(255,77,77,.35)] hover:-translate-y-0.5 transition-all text-shadow-sm focus-visible:outline-2 focus-visible:outline-neon-blue focus-visible:outline-offset-2"
              href="https://www.thehotline.org/"
              target="_blank"
              rel="noopener"
            >
              National Domestic Violence Hotline
              <span className="text-red-100 text-xs font-semibold ml-3 opacity-95">
                800-799-7233
              </span>
            </a>
            <a
              className="flex items-center justify-between gap-3 min-h-14 px-5 py-4 rounded-xl bg-gradient-to-b from-red-500 to-red-600 border border-black/35 text-white font-bold shadow-[0_6px_18px_rgba(0,0,0,.22)] hover:shadow-[0_0_18px_rgba(255,77,77,.35)] hover:-translate-y-0.5 transition-all text-shadow-sm focus-visible:outline-2 focus-visible:outline-neon-blue focus-visible:outline-offset-2"
              href="https://www.rainn.org/"
              target="_blank"
              rel="noopener"
            >
              RAINN Sexual Assault Hotline
              <span className="text-red-100 text-xs font-semibold ml-3 opacity-95">
                800-656-4673
              </span>
            </a>
            <a
              className="flex items-center justify-between gap-3 min-h-14 px-5 py-4 rounded-xl bg-gradient-to-b from-red-500 to-red-600 border border-black/35 text-white font-bold shadow-[0_6px_18px_rgba(0,0,0,.22)] hover:shadow-[0_0_18px_rgba(255,77,77,.35)] hover:-translate-y-0.5 transition-all text-shadow-sm focus-visible:outline-2 focus-visible:outline-neon-blue focus-visible:outline-offset-2"
              href="https://www.lgbthotline.org/"
              target="_blank"
              rel="noopener"
            >
              LGBT National Help Center
              <span className="text-red-100 text-xs font-semibold ml-3 opacity-95">
                Peer support
              </span>
            </a>
            <a
              className="flex items-center justify-between gap-3 min-h-14 px-5 py-4 rounded-xl bg-gradient-to-b from-red-500 to-red-600 border border-black/35 text-white font-bold shadow-[0_6px_18px_rgba(0,0,0,.22)] hover:shadow-[0_0_18px_rgba(255,77,77,.35)] hover:-translate-y-0.5 transition-all text-shadow-sm focus-visible:outline-2 focus-visible:outline-neon-blue focus-visible:outline-offset-2"
              href="https://www.thetrevorproject.org/"
              target="_blank"
              rel="noopener"
            >
              The Trevor Project
              <span className="text-red-100 text-xs font-semibold ml-3 opacity-95">
                LGBTQ youth crisis
              </span>
            </a>
            <a
              className="flex items-center justify-between gap-3 min-h-14 px-5 py-4 rounded-xl bg-gradient-to-b from-red-500 to-red-600 border border-black/35 text-white font-bold shadow-[0_6px_18px_rgba(0,0,0,.22)] hover:shadow-[0_0_18px_rgba(255,77,77,.35)] hover:-translate-y-0.5 transition-all text-shadow-sm focus-visible:outline-2 focus-visible:outline-neon-blue focus-visible:outline-offset-2"
              href="https://translifeline.org/"
              target="_blank"
              rel="noopener"
            >
              Trans Lifeline
              <span className="text-red-100 text-xs font-semibold ml-3 opacity-95">
                By and for trans people
              </span>
            </a>
            <a
              className="flex items-center justify-between gap-3 min-h-14 px-5 py-4 rounded-xl bg-gradient-to-b from-red-500 to-red-600 border border-black/35 text-white font-bold shadow-[0_6px_18px_rgba(0,0,0,.22)] hover:shadow-[0_0_18px_rgba(255,77,77,.35)] hover:-translate-y-0.5 transition-all text-shadow-sm focus-visible:outline-2 focus-visible:outline-neon-blue focus-visible:outline-offset-2"
              href="https://strongheartshelpline.org/"
              target="_blank"
              rel="noopener"
            >
              StrongHearts Native Helpline
              <span className="text-red-100 text-xs font-semibold ml-3 opacity-95">
                Culturally sensitive help
              </span>
            </a>
          </div>
        </section>

        {/* Addiction & Recovery */}
        <section className="mb-10" aria-labelledby="recovery">
          <div className="flex items-center gap-3 mb-3">
            <h2 id="recovery" className="text-2xl sm:text-3xl font-bold text-foreground">
              Addiction & recovery
            </h2>
          </div>
          <div className="flex justify-center mb-5">
            <div className="w-72 h-0.5 bg-gradient-to-r from-transparent via-neon-blue to-transparent rounded shadow-[0_0_8px_rgba(0,210,255,.6)]" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <a
              className="flex items-center justify-between gap-3 min-h-14 px-5 py-4 rounded-xl bg-gradient-to-b from-green-500 to-green-600 border border-black/35 text-green-950 font-bold shadow-[0_6px_18px_rgba(0,0,0,.22)] hover:shadow-[0_0_18px_rgba(0,199,136,.35)] hover:-translate-y-0.5 transition-all focus-visible:outline-2 focus-visible:outline-neon-blue focus-visible:outline-offset-2"
              href="https://www.samhsa.gov/find-help/national-helpline"
              target="_blank"
              rel="noopener"
            >
              SAMHSA National Helpline
              <span className="text-green-800 text-xs font-semibold ml-3 opacity-95">
                800-662-HELP
              </span>
            </a>
            <a
              className="flex items-center justify-between gap-3 min-h-14 px-5 py-4 rounded-xl bg-gradient-to-b from-green-500 to-green-600 border border-black/35 text-green-950 font-bold shadow-[0_6px_18px_rgba(0,0,0,.22)] hover:shadow-[0_0_18px_rgba(0,199,136,.35)] hover:-translate-y-0.5 transition-all focus-visible:outline-2 focus-visible:outline-neon-blue focus-visible:outline-offset-2"
              href="https://www.aa.org/"
              target="_blank"
              rel="noopener"
            >
              Alcoholics Anonymous
              <span className="text-green-800 text-xs font-semibold ml-3 opacity-95">
                Find meetings
              </span>
            </a>
            <a
              className="flex items-center justify-between gap-3 min-h-14 px-5 py-4 rounded-xl bg-gradient-to-b from-green-500 to-green-600 border border-black/35 text-green-950 font-bold shadow-[0_6px_18px_rgba(0,0,0,.22)] hover:shadow-[0_0_18px_rgba(0,199,136,.35)] hover:-translate-y-0.5 transition-all focus-visible:outline-2 focus-visible:outline-neon-blue focus-visible:outline-offset-2"
              href="https://na.org/"
              target="_blank"
              rel="noopener"
            >
              Narcotics Anonymous
              <span className="text-green-800 text-xs font-semibold ml-3 opacity-95">
                Find meetings
              </span>
            </a>
            <a
              className="flex items-center justify-between gap-3 min-h-14 px-5 py-4 rounded-xl bg-gradient-to-b from-green-500 to-green-600 border border-black/35 text-green-950 font-bold shadow-[0_6px_18px_rgba(0,0,0,.22)] hover:shadow-[0_0_18px_rgba(0,199,136,.35)] hover:-translate-y-0.5 transition-all focus-visible:outline-2 focus-visible:outline-neon-blue focus-visible:outline-offset-2"
              href="https://www.smartrecovery.org/"
              target="_blank"
              rel="noopener"
            >
              SMART Recovery
              <span className="text-green-800 text-xs font-semibold ml-3 opacity-95">
                Science based tools
              </span>
            </a>
            <a
              className="flex items-center justify-between gap-3 min-h-14 px-5 py-4 rounded-xl bg-gradient-to-b from-green-500 to-green-600 border border-black/35 text-green-950 font-bold shadow-[0_6px_18px_rgba(0,0,0,.22)] hover:shadow-[0_0_18px_rgba(0,199,136,.35)] hover:-translate-y-0.5 transition-all focus-visible:outline-2 focus-visible:outline-neon-blue focus-visible:outline-offset-2"
              href="https://findtreatment.gov/"
              target="_blank"
              rel="noopener"
            >
              Find local mental health services
              <span className="text-green-800 text-xs font-semibold ml-3 opacity-95">
                Affordable care near you
              </span>
            </a>
          </div>
        </section>

        {/* Sexual Assault & Violence */}
        <section className="mb-10" aria-labelledby="sa-violence">
          <div className="flex items-center gap-3 mb-3">
            <h2 id="sa-violence" className="text-2xl sm:text-3xl font-bold text-foreground">
              Sexual assault & violence
            </h2>
          </div>
          <div className="flex justify-center mb-5">
            <div className="w-72 h-0.5 bg-gradient-to-r from-transparent via-neon-blue to-transparent rounded shadow-[0_0_8px_rgba(0,210,255,.6)]" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <a
              className="flex items-center justify-between gap-3 min-h-14 px-5 py-4 rounded-xl bg-gradient-to-b from-blue-400 to-blue-500 border border-black/35 text-blue-950 font-bold shadow-[0_6px_18px_rgba(0,0,0,.22)] hover:shadow-[0_0_18px_rgba(0,168,255,.35)] hover:-translate-y-0.5 transition-all focus-visible:outline-2 focus-visible:outline-neon-blue focus-visible:outline-offset-2"
              href="https://www.rainn.org/"
              target="_blank"
              rel="noopener"
            >
              RAINN
              <span className="text-blue-800 text-xs font-semibold ml-3 opacity-95">
                Resources and hotline
              </span>
            </a>
            <a
              className="flex items-center justify-between gap-3 min-h-14 px-5 py-4 rounded-xl bg-gradient-to-b from-blue-400 to-blue-500 border border-black/35 text-blue-950 font-bold shadow-[0_6px_18px_rgba(0,0,0,.22)] hover:shadow-[0_0_18px_rgba(0,168,255,.35)] hover:-translate-y-0.5 transition-all focus-visible:outline-2 focus-visible:outline-neon-blue focus-visible:outline-offset-2"
              href="https://www.childhelp.org/childhelp-hotline/"
              target="_blank"
              rel="noopener"
            >
              Childhelp National Child Abuse Hotline
              <span className="text-blue-800 text-xs font-semibold ml-3 opacity-95">
                800-4-A-CHILD
              </span>
            </a>
            <a
              className="flex items-center justify-between gap-3 min-h-14 px-5 py-4 rounded-xl bg-gradient-to-b from-blue-400 to-blue-500 border border-black/35 text-blue-950 font-bold shadow-[0_6px_18px_rgba(0,0,0,.22)] hover:shadow-[0_0_18px_rgba(0,168,255,.35)] hover:-translate-y-0.5 transition-all focus-visible:outline-2 focus-visible:outline-neon-blue focus-visible:outline-offset-2"
              href="https://sakitta.org/"
              target="_blank"
              rel="noopener"
            >
              SAKITTA Sexual Assault Kit Initiative
              <span className="text-blue-800 text-xs font-semibold ml-3 opacity-95">
                Kit testing guidance
              </span>
            </a>
            <a
              className="flex items-center justify-between gap-3 min-h-14 px-5 py-4 rounded-xl bg-gradient-to-b from-blue-400 to-blue-500 border border-black/35 text-blue-950 font-bold shadow-[0_6px_18px_rgba(0,0,0,.22)] hover:shadow-[0_0_18px_rgba(0,168,255,.35)] hover:-translate-y-0.5 transition-all focus-visible:outline-2 focus-visible:outline-neon-blue focus-visible:outline-offset-2"
              href="https://strongheartshelpline.org/"
              target="_blank"
              rel="noopener"
            >
              StrongHearts Native Helpline
              <span className="text-blue-800 text-xs font-semibold ml-3 opacity-95">
                Support for survivors
              </span>
            </a>
          </div>
        </section>

        {/* Cancer Patients & Families */}
        <section className="mb-10" aria-labelledby="cancer">
          <div className="flex items-center gap-3 mb-3">
            <h2 id="cancer" className="text-2xl sm:text-3xl font-bold text-foreground">
              Cancer patients & families
            </h2>
          </div>
          <div className="flex justify-center mb-5">
            <div className="w-72 h-0.5 bg-gradient-to-r from-transparent via-neon-blue to-transparent rounded shadow-[0_0_8px_rgba(0,210,255,.6)]" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <a
              className="flex items-center justify-between gap-3 min-h-14 px-5 py-4 rounded-xl bg-gradient-to-b from-purple-400 to-purple-500 border border-black/35 text-purple-950 font-bold shadow-[0_6px_18px_rgba(0,0,0,.22)] hover:shadow-[0_0_18px_rgba(166,107,255,.35)] hover:-translate-y-0.5 transition-all focus-visible:outline-2 focus-visible:outline-neon-blue focus-visible:outline-offset-2"
              href="https://www.cancer.org/"
              target="_blank"
              rel="noopener"
            >
              Mental Health Guide
              <span className="text-purple-800 text-xs font-semibold ml-3 opacity-95">
                Patients and caregivers
              </span>
            </a>
            <a
              className="flex items-center justify-between gap-3 min-h-14 px-5 py-4 rounded-xl bg-gradient-to-b from-purple-400 to-purple-500 border border-black/35 text-purple-950 font-bold shadow-[0_6px_18px_rgba(0,0,0,.22)] hover:shadow-[0_0_18px_rgba(166,107,255,.35)] hover:-translate-y-0.5 transition-all focus-visible:outline-2 focus-visible:outline-neon-blue focus-visible:outline-offset-2"
              href="https://www.cancer.org/"
              target="_blank"
              rel="noopener"
            >
              American Cancer Society Patient Programs
              <span className="text-purple-800 text-xs font-semibold ml-3 opacity-95">
                Comprehensive support
              </span>
            </a>
            <a
              className="flex items-center justify-between gap-3 min-h-14 px-5 py-4 rounded-xl bg-gradient-to-b from-purple-400 to-purple-500 border border-black/35 text-purple-950 font-bold shadow-[0_6px_18px_rgba(0,0,0,.22)] hover:shadow-[0_0_18px_rgba(166,107,255,.35)] hover:-translate-y-0.5 transition-all focus-visible:outline-2 focus-visible:outline-neon-blue focus-visible:outline-offset-2"
              href="tel:8002272345"
            >
              American Cancer Society 24/7 Helpline
              <span className="text-purple-800 text-xs font-semibold ml-3 opacity-95">
                800-227-2345
              </span>
            </a>
            <a
              className="flex items-center justify-between gap-3 min-h-14 px-5 py-4 rounded-xl bg-gradient-to-b from-purple-400 to-purple-500 border border-black/35 text-purple-950 font-bold shadow-[0_6px_18px_rgba(0,0,0,.22)] hover:shadow-[0_0_18px_rgba(166,107,255,.35)] hover:-translate-y-0.5 transition-all focus-visible:outline-2 focus-visible:outline-neon-blue focus-visible:outline-offset-2"
              href="https://mesothelioma.net/"
              target="_blank"
              rel="noopener"
            >
              Mesothelioma.net Support
              <span className="text-purple-800 text-xs font-semibold ml-3 opacity-95">
                Mental health and guidance
              </span>
            </a>
          </div>
        </section>

        {/* LGBTQ+ Resources */}
        <section className="mb-10" aria-labelledby="lgbtq">
          <div className="flex items-center gap-3 mb-3">
            <h2 id="lgbtq" className="text-2xl sm:text-3xl font-bold text-foreground">
              LGBTQ+ resources
            </h2>
          </div>
          <div className="flex justify-center mb-5">
            <div className="w-72 h-0.5 bg-gradient-to-r from-transparent via-neon-blue to-transparent rounded shadow-[0_0_8px_rgba(0,210,255,.6)]" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <a
              className="relative flex items-center justify-between gap-3 min-h-14 px-5 py-4 rounded-xl bg-card/90 border-2 border-transparent text-white font-bold shadow-[0_6px_18px_rgba(0,0,0,.22)] hover:shadow-[0_0_10px_rgba(255,59,59,.35),0_0_10px_rgba(0,210,255,.35),0_0_12px_rgba(192,107,255,.35)] hover:-translate-y-0.5 transition-all focus-visible:outline-2 focus-visible:outline-neon-blue focus-visible:outline-offset-2"
              style={{
                background: 'linear-gradient(#0a0a0a, #0a0a0a) padding-box, linear-gradient(90deg,#ff3b3b,#ff7a00,#ffd400,#10ff8c,#00d2ff,#5a5aff,#c07bff,#ff3bba) border-box'
              }}
              href="https://translifeline.org/"
              target="_blank"
              rel="noopener"
            >
              Trans Lifeline
              <span className="text-blue-100 text-xs font-semibold ml-3 opacity-95">
                By and for trans people
              </span>
            </a>
            <a
              className="relative flex items-center justify-between gap-3 min-h-14 px-5 py-4 rounded-xl bg-card/90 border-2 border-transparent text-white font-bold shadow-[0_6px_18px_rgba(0,0,0,.22)] hover:shadow-[0_0_10px_rgba(255,59,59,.35),0_0_10px_rgba(0,210,255,.35),0_0_12px_rgba(192,107,255,.35)] hover:-translate-y-0.5 transition-all focus-visible:outline-2 focus-visible:outline-neon-blue focus-visible:outline-offset-2"
              style={{
                background: 'linear-gradient(#0a0a0a, #0a0a0a) padding-box, linear-gradient(90deg,#ff3b3b,#ff7a00,#ffd400,#10ff8c,#00d2ff,#5a5aff,#c07bff,#ff3bba) border-box'
              }}
              href="https://www.hrc.org/resources"
              target="_blank"
              rel="noopener"
            >
              Human Rights Campaign Resources
              <span className="text-blue-100 text-xs font-semibold ml-3 opacity-95">
                Advocacy and support
              </span>
            </a>
            <a
              className="relative flex items-center justify-between gap-3 min-h-14 px-5 py-4 rounded-xl bg-card/90 border-2 border-transparent text-white font-bold shadow-[0_6px_18px_rgba(0,0,0,.22)] hover:shadow-[0_0_10px_rgba(255,59,59,.35),0_0_10px_rgba(0,210,255,.35),0_0_12px_rgba(192,107,255,.35)] hover:-translate-y-0.5 transition-all focus-visible:outline-2 focus-visible:outline-neon-blue focus-visible:outline-offset-2"
              style={{
                background: 'linear-gradient(#0a0a0a, #0a0a0a) padding-box, linear-gradient(90deg,#ff3b3b,#ff7a00,#ffd400,#10ff8c,#00d2ff,#5a5aff,#c07bff,#ff3bba) border-box'
              }}
              href="https://www.thetrevorproject.org/"
              target="_blank"
              rel="noopener"
            >
              The Trevor Project
              <span className="text-blue-100 text-xs font-semibold ml-3 opacity-95">
                Youth crisis intervention
              </span>
            </a>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </main>
  );
};

export default CrisisResources;
