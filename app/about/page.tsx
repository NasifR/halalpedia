import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us – Halalpedia",
  description: "Learn about Halalpedia — our mission to make halal food easy to find and verify across New York City.",
};

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12 space-y-10">
      {/* Header */}
      <div className="space-y-3">
        <div className="text-4xl">🌙</div>
        <h1 className="text-3xl font-bold text-stone-900">About Halalpedia</h1>
        <p className="text-stone-500 text-lg leading-relaxed">
          A community-built guide to halal eating in the greatest city in the world.
        </p>
      </div>

      {/* Mission */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-stone-800">Our Mission</h2>
        <p className="text-stone-600 leading-relaxed">
          Finding truly halal food in New York City shouldn't be a guessing game. Platforms like Google Maps and Yelp display a "halal" label — but they don't distinguish between restaurants that are simply halal-certified and those that serve zabiha-slaughtered meat. For many Muslims, that distinction matters deeply.
        </p>
        <p className="text-stone-600 leading-relaxed">
          Halalpedia exists to fill that gap. We verify zabiha status separately, surface that information clearly on every listing, and build a platform that the Muslim community of New York can actually trust.
        </p>
        <p className="text-stone-600 leading-relaxed">
          Our platform does more than just list restaurants—it lets users save their favorite spots for quick and easy access anytime. (Feature under construction)
        </p>
      </section>

      {/* What zabiha means */}
      <section className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 space-y-3">
        <h2 className="text-lg font-semibold text-emerald-900">What does "Zabiha" mean?</h2>
        <p className="text-emerald-800 text-sm leading-relaxed">
          <strong>Halal</strong> means permissible according to Islamic law. <strong>Zabiha</strong> (also spelled dhabiha) refers specifically to the Islamic method of animal slaughter — where the animal must be alive and healthy, slaughtered by a Muslim with a swift cut to the throat, and God's name must be invoked. Many Muslims only eat zabiha-slaughtered meat; others accept any halal-certified meat. We label both clearly so you can decide for yourself.
        </p>
      </section>

      {/* How it works */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-stone-800">How We Verify</h2>
        <div className="space-y-3">
          {[
            {
              icon: "📞",
              title: "Direct contact",
              desc: "We contact restaurants and ask them directly about their meat sourcing and slaughter method.",
            },
            {
              icon: "🤝",
              title: "Community reports",
              desc: "Local community members share firsthand knowledge — including certificate photos and owner conversations.",
            },
            {
              icon: "⚠️",
              title: "Honest uncertainty",
              desc: "If we can't confirm zabiha status, we say so. We'd rather be transparent than give you false confidence.",
            },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="flex gap-4">
              <div className="text-2xl shrink-0">{icon}</div>
              <div>
                <div className="font-medium text-stone-800">{title}</div>
                <div className="text-stone-500 text-sm">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Built by */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-stone-800">Built For the Community</h2>
        <p className="text-stone-600 leading-relaxed">
          At Halalpedia, our main goal is to make halal food in NYC easier to find and trust. We hope that you will find our platform useful, and it will help you discover your new favorite halal restaurant!
        </p>
      </section>

      {/* CTA */}
      <div className="bg-stone-100 rounded-2xl p-6 text-center space-y-3">
        <p className="font-medium text-stone-800">Know a halal restaurant we're missing?</p>
        <p className="text-stone-500 text-sm">We're always adding new listings. Reach out to suggest a restaurant or update zabiha information.</p>
        <a
          href="mailto:nasifjuhayer@gmail.com"
          className="inline-block bg-emerald-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-emerald-800 transition-colors"
        >
          Contact Us
        </a>
      </div>

      <p className="text-xs text-stone-400 text-center">
        Zabiha status is community-reported and subject to change. Always verify with the restaurant directly before visiting.
      </p>
    </div>
  );
}
