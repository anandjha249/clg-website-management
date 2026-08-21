import { Breadcrumbs } from '@/components/ui/index';
import { college, historyTimeline, achievements, infrastructure, visionMission, principal } from '@/data/college';
import { Award, BadgeCheck, TrendingUp, Leaf, Handshake, Lightbulb, Library, Mic, HeartPulse, Bus, Coffee, Target, Compass, CheckCircle2 } from 'lucide-react';

const achievementIcons: Record<string, typeof Award> = { Award, BadgeCheck, TrendingUp, Leaf, Handshake, Lightbulb };
const infraIcons: Record<string, typeof Library> = { Library, Lightbulb, Mic, HeartPulse, Bus, Coffee };

export function AboutPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-navy-900 py-16">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-800 to-navy-950" />
        <div className="container-page relative">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'About Us' }]} />
          <h1 className="mt-4 font-display text-4xl font-bold text-white">About Our Institution</h1>
          <p className="mt-3 max-w-2xl text-slate-300">Discover the legacy, vision, and values that make {college.name} a center of academic excellence.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-page">
          <div className="mb-10 text-center"><h2 className="font-display text-3xl font-bold text-slate-800 dark:text-white">Our Journey Through Time</h2><p className="mt-2 text-slate-500 dark:text-slate-400">From a small institution to a premier engineering college</p></div>
          <div className="relative">
            <div className="absolute left-4 top-0 h-full w-0.5 bg-navy-200 dark:bg-navy-800 md:left-1/2 md:-translate-x-1/2" />
            <div className="space-y-8">
              {historyTimeline.map((item, i) => (
                <div key={item.year} className={`relative flex flex-col gap-4 md:flex-row md:items-center ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="flex-1 md:px-8"><div className="card p-5"><span className="font-display text-2xl font-bold text-navy-600 dark:text-navy-400">{item.year}</span><h3 className="mt-1 text-lg font-semibold text-slate-800 dark:text-white">{item.title}</h3><p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{item.description}</p></div></div>
                  <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy-700 text-white ring-4 ring-slate-50 dark:ring-slate-900 md:mx-auto"><span className="text-xs font-bold">{i + 1}</span></div>
                  <div className="hidden flex-1 md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 dark:bg-slate-800/50">
        <div className="container-page">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="card overflow-hidden">
              <div className="bg-gradient-to-br from-navy-700 to-navy-900 p-6"><div className="flex items-center gap-3"><div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-gold-400"><Target className="h-6 w-6" /></div><h3 className="font-display text-xl font-bold text-white">Our Vision</h3></div></div>
              <div className="p-6"><p className="leading-relaxed text-slate-600 dark:text-slate-300">{visionMission.vision}</p></div>
            </div>
            <div className="card overflow-hidden">
              <div className="bg-gradient-to-br from-gold-500 to-gold-700 p-6"><div className="flex items-center gap-3"><div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white"><Compass className="h-6 w-6" /></div><h3 className="font-display text-xl font-bold text-white">Our Mission</h3></div></div>
              <div className="p-6"><ul className="space-y-3">{visionMission.mission.map((m, i) => <li key={i} className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold-500" /><span className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{m}</span></li>)}</ul></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-page">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-3">
            <div className="text-center">
              <img src={principal.photo} alt={principal.name} className="mx-auto h-72 w-64 rounded-2xl object-cover shadow-card" />
              <div className="mt-4"><p className="font-display text-lg font-bold text-slate-800 dark:text-white">{principal.name}</p><p className="text-sm text-slate-500 dark:text-slate-400">{principal.designation}</p></div>
            </div>
            <div className="lg:col-span-2">
              <span className="badge bg-navy-100 text-navy-700 dark:bg-navy-900/30 dark:text-navy-300">Principal's Message</span>
              <h2 className="mt-4 font-display text-2xl font-bold text-slate-800 dark:text-white">Leading with Vision and Purpose</h2>
              <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-300">{principal.message}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 dark:bg-slate-800/50">
        <div className="container-page">
          <div className="mb-10 text-center"><h2 className="font-display text-3xl font-bold text-slate-800 dark:text-white">Our Achievements</h2><p className="mt-2 text-slate-500 dark:text-slate-400">Recognition that reflects our commitment to excellence</p></div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {achievements.map((item) => {
              const Icon = achievementIcons[item.icon] || Award;
              return <div key={item.title} className="card card-hover p-6"><div className="flex h-14 w-14 items-center justify-center rounded-xl bg-navy-100 text-navy-700 dark:bg-navy-900/30 dark:text-navy-300"><Icon className="h-7 w-7" /></div><h3 className="mt-4 font-semibold text-slate-800 dark:text-white">{item.title}</h3><p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{item.description}</p></div>;
            })}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-page">
          <div className="mb-10 text-center"><h2 className="font-display text-3xl font-bold text-slate-800 dark:text-white">Infrastructure & Facilities</h2><p className="mt-2 text-slate-500 dark:text-slate-400">Modern amenities that support a complete learning experience</p></div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {infrastructure.map((item) => {
              const Icon = infraIcons[item.icon] || Library;
              return <div key={item.title} className="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800"><div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold-100 text-gold-700 dark:bg-gold-900/30 dark:text-gold-300"><Icon className="h-6 w-6" /></div><div><h3 className="font-semibold text-slate-800 dark:text-white">{item.title}</h3><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{item.description}</p></div></div>;
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
