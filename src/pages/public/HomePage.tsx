import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, ClipboardList, Bell, Trophy, Calendar, FolderOpen, Award, Users, GraduationCap, Target, Compass, ChevronRight, MapPin, Star, Quote, TrendingUp, Building2, Briefcase, Globe, Leaf, Lightbulb } from 'lucide-react';
import { college, principal, stats, quickLinks, visionMission, campusHighlights } from '@/data/college';
import { notices } from '@/data/notices';
import { getUpcomingEvents } from '@/data/events';
import { getFeaturedCourses } from '@/data/courses';
import { galleryItems } from '@/data/gallery';
import { testimonials, placementStats, recruiters, newsTicker, whyChooseUs } from '@/data/demo';
import { Button } from '@/components/ui/Button';

const iconMap: Record<string, typeof Award> = { Award, BookOpen, Users, GraduationCap, ClipboardList, Bell, Trophy, Calendar, FolderOpen, Target, Compass, TrendingUp, Building2, Briefcase, Globe, Leaf, Lightbulb };

export function HomePage() {
  const upcomingEvents = getUpcomingEvents().slice(0, 3);
  const latestNotices = notices.slice(0, 5);
  const featuredCourses = getFeaturedCourses();
  const galleryPreview = galleryItems.filter((g) => g.type === 'photo').slice(0, 6);

  return (
    <div>
      {/* News Ticker */}
      <div className="bg-gold-500 py-2 text-white overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...newsTicker, ...newsTicker].map((news, i) => (
            <span key={i} className="mx-6 flex items-center gap-2 text-sm font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-white" /> {news}
            </span>
          ))}
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=1920" alt="SVIT Campus" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-900/85 to-navy-900/40" />
        </div>
        <div className="container-page relative py-20 sm:py-28 lg:py-36">
          <div className="max-w-2xl animate-fade-in">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm ring-1 ring-white/20"><Award className="h-4 w-4 text-gold-400" /> NAAC A+ Accredited • Estd. {college.established} • NIRF Ranked</span>
            <h1 className="mt-6 font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">Welcome to <span className="text-gold-400">Sri Venkateswara</span> Institute of Technology</h1>
            <p className="mt-5 text-lg leading-relaxed text-slate-200">A premier institution committed to academic excellence, cutting-edge research, and holistic development. Empowering students to become innovators and leaders since {college.established}.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button to="/courses" size="lg" variant="gold" iconRight={<ArrowRight className="h-5 w-5" />}>Explore Courses</Button>
              <Button to="/admissions" size="lg" variant="outline" className="border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20">Apply for Admission</Button>
            </div>
            <div className="mt-6 flex items-center gap-4 text-sm text-slate-300">
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" /> Admissions Open 2026-27</span>
              <span>•</span>
              <span>5000+ Students • 112 Faculty • 142 Recruiters</span>
            </div>
          </div>
        </div>
        <div className="relative border-t border-white/10 bg-navy-950/80 backdrop-blur-sm">
          <div className="container-page grid grid-cols-2 gap-4 py-8 md:grid-cols-4">
            {stats.map((stat) => {
              const Icon = iconMap[stat.icon] || Award;
              return (
                <div key={stat.label} className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-800 text-gold-400"><Icon className="h-6 w-6" /></div>
                  <div><p className="font-display text-2xl font-bold text-white">{stat.value}</p><p className="text-xs text-slate-400">{stat.label}</p></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16">
        <div className="container-page">
          <div className="mb-10 text-center"><h2 className="font-display text-3xl font-bold text-slate-800 dark:text-white">Quick Links</h2><p className="mt-2 text-slate-500 dark:text-slate-400">Everything you need, just a click away</p></div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {quickLinks.map((link) => {
              const Icon = iconMap[link.icon] || BookOpen;
              return (
                <Link key={link.title} to={link.link} className="group card card-hover flex items-center gap-4 p-5">
                  <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${link.color === 'navy' ? 'bg-navy-100 text-navy-700 dark:bg-navy-900/30 dark:text-navy-300' : 'bg-gold-100 text-gold-700 dark:bg-gold-900/30 dark:text-gold-300'}`}><Icon className="h-7 w-7" /></div>
                  <div className="flex-1"><h3 className="font-semibold text-slate-800 dark:text-white">{link.title}</h3><p className="text-sm text-slate-500 dark:text-slate-400">{link.description}</p></div>
                  <ChevronRight className="h-5 w-5 text-slate-300 transition-transform group-hover:translate-x-1" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-16 dark:bg-slate-800/50">
        <div className="container-page">
          <div className="mb-10 text-center"><h2 className="font-display text-3xl font-bold text-slate-800 dark:text-white">Why Choose SVIT?</h2><p className="mt-2 text-slate-500 dark:text-slate-400">What makes us a preferred destination for engineering education</p></div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map((item) => {
              const Icon = iconMap[item.icon] || Award;
              return (
                <div key={item.title} className="card p-6 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-navy-100 text-navy-700 dark:bg-navy-900/30 dark:text-navy-300"><Icon className="h-7 w-7" /></div>
                  <h3 className="mt-4 font-semibold text-slate-800 dark:text-white">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Placement Highlights */}
      <section className="py-16">
        <div className="container-page">
          <div className="mb-10 text-center">
            <h2 className="font-display text-3xl font-bold text-slate-800 dark:text-white">Placement Highlights</h2>
            <p className="mt-2 text-slate-500 dark:text-slate-400">Our students are placed in top MNCs with excellent packages</p>
          </div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {placementStats.map((stat) => (
              <div key={stat.year} className="card p-6 text-center">
                <p className="text-sm font-semibold text-navy-600 dark:text-navy-400">{stat.year}</p>
                <p className="mt-2 font-display text-3xl font-bold text-slate-800 dark:text-white">{stat.placed} Placed</p>
                <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                  <div><p className="text-xs text-slate-400">Highest</p><p className="font-bold text-slate-800 dark:text-white">{stat.highest}</p></div>
                  <div className="border-l border-slate-200 dark:border-slate-700"><p className="text-xs text-slate-400">Average</p><p className="font-bold text-slate-800 dark:text-white">{stat.average}</p></div>
                  <div className="border-l border-slate-200 dark:border-slate-700"><p className="text-xs text-slate-400">Companies</p><p className="font-bold text-slate-800 dark:text-white">{stat.companies}</p></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 card p-6">
            <h3 className="text-center font-semibold text-slate-800 dark:text-white">Our Top Recruiters</h3>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              {recruiters.map((r) => (
                <span key={r} className="rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-sm font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-700/50 dark:text-slate-300">{r}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Principal's Message */}
      <section className="bg-white py-16 dark:bg-slate-800/50">
        <div className="container-page">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div className="relative">
              <div className="absolute -left-4 -top-4 h-64 w-64 rounded-2xl bg-navy-100 dark:bg-navy-900/30" />
              <img src={principal.photo} alt={principal.name} className="relative h-80 w-full rounded-2xl object-cover shadow-card" />
              <div className="absolute -bottom-4 -right-4 rounded-xl bg-navy-700 px-5 py-3 text-white shadow-lg"><p className="font-display text-sm font-bold">{principal.name}</p><p className="text-xs text-navy-200">{principal.designation}</p></div>
            </div>
            <div>
              <span className="badge bg-navy-100 text-navy-700 dark:bg-navy-900/30 dark:text-navy-300">Principal's Message</span>
              <h2 className="mt-4 font-display text-3xl font-bold text-slate-800 dark:text-white">A Message from Our Principal</h2>
              <p className="mt-5 leading-relaxed text-slate-600 dark:text-slate-300">{principal.message}</p>
              <div className="mt-6 border-l-4 border-gold-500 pl-4"><p className="font-semibold text-slate-800 dark:text-white">{principal.name}</p><p className="text-sm text-slate-500 dark:text-slate-400">{principal.designation}</p><p className="text-sm text-slate-500 dark:text-slate-400">{principal.qualification}</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16">
        <div className="container-page">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="card overflow-hidden">
              <div className="bg-gradient-to-br from-navy-700 to-navy-900 p-6"><div className="flex items-center gap-3"><div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-gold-400"><Target className="h-6 w-6" /></div><h3 className="font-display text-xl font-bold text-white">Our Vision</h3></div></div>
              <div className="p-6"><p className="leading-relaxed text-slate-600 dark:text-slate-300">{visionMission.vision}</p></div>
            </div>
            <div className="card overflow-hidden">
              <div className="bg-gradient-to-br from-gold-500 to-gold-700 p-6"><div className="flex items-center gap-3"><div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white"><Compass className="h-6 w-6" /></div><h3 className="font-display text-xl font-bold text-white">Our Mission</h3></div></div>
              <div className="p-6"><ul className="space-y-3">{visionMission.mission.map((m, i) => <li key={i} className="flex items-start gap-3"><span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-100 text-xs font-bold text-gold-700 dark:bg-gold-900/30 dark:text-gold-300">{i + 1}</span><span className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{m}</span></li>)}</ul></div>
            </div>
          </div>
        </div>
      </section>

      {/* Campus Highlights */}
      <section className="bg-white py-16 dark:bg-slate-800/50">
        <div className="container-page">
          <div className="mb-10 text-center"><h2 className="font-display text-3xl font-bold text-slate-800 dark:text-white">Campus Highlights</h2><p className="mt-2 text-slate-500 dark:text-slate-400">World-class infrastructure for a world-class education</p></div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {campusHighlights.map((item) => (
              <div key={item.title} className="group relative overflow-hidden rounded-2xl shadow-card">
                <img src={item.image} alt={item.title} className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5"><h3 className="font-display text-lg font-bold text-white">{item.title}</h3><p className="mt-1 text-sm text-slate-300">{item.description}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container-page">
          <div className="mb-10 text-center"><h2 className="font-display text-3xl font-bold text-slate-800 dark:text-white">What Our Students Say</h2><p className="mt-2 text-slate-500 dark:text-slate-400">Hear from our alumni who are excelling in top companies worldwide</p></div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.id} className="card p-6">
                <div className="flex items-center gap-1 text-gold-500">
                  {Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <div className="relative mt-4">
                  <Quote className="absolute -top-2 -left-1 h-8 w-8 text-navy-100 dark:text-navy-900/30" />
                  <p className="relative text-sm leading-relaxed text-slate-600 dark:text-slate-300">"{t.quote}"</p>
                </div>
                <div className="mt-5 flex items-center gap-3">
                  <img src={t.photo} alt={t.name} className="h-12 w-12 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-semibold text-slate-800 dark:text-white">{t.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{t.role} • {t.company} • {t.batch} • {t.department}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Notices */}
      <section className="bg-white py-16 dark:bg-slate-800/50">
        <div className="container-page">
          <div className="mb-8 flex items-end justify-between">
            <div><h2 className="font-display text-3xl font-bold text-slate-800 dark:text-white">Latest Notices</h2><p className="mt-2 text-slate-500 dark:text-slate-400">Stay updated with the latest announcements</p></div>
            <Button to="/notices" variant="outline" size="sm" iconRight={<ArrowRight className="h-4 w-4" />}>View All Notices</Button>
          </div>
          <div className="space-y-3">
            {latestNotices.map((notice) => (
              <Link key={notice.id} to={`/notices/${notice.id}`} className="group flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 transition hover:border-navy-300 hover:shadow-soft dark:border-slate-700 dark:bg-slate-800">
                <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-navy-50 text-navy-700 dark:bg-navy-900/30 dark:text-navy-300">
                  <span className="text-xs font-bold">{new Date(notice.date).toLocaleDateString('en-US', { month: 'short' })}</span>
                  <span className="text-lg font-bold leading-none">{new Date(notice.date).getDate()}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="badge bg-navy-100 text-navy-700 dark:bg-navy-900/30 dark:text-navy-300">{notice.category}</span>
                    {notice.priority === 'High' && <span className="badge bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300">High Priority</span>}
                  </div>
                  <h3 className="mt-1.5 font-semibold text-slate-800 truncate dark:text-white group-hover:text-navy-600 dark:group-hover:text-navy-300">{notice.title}</h3>
                </div>
                <ChevronRight className="h-5 w-5 shrink-0 text-slate-300 transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16">
        <div className="container-page">
          <div className="mb-8 flex items-end justify-between">
            <div><h2 className="font-display text-3xl font-bold text-slate-800 dark:text-white">Upcoming Events</h2><p className="mt-2 text-slate-500 dark:text-slate-400">Join us at our next big event</p></div>
            <Button to="/events" variant="outline" size="sm" iconRight={<ArrowRight className="h-4 w-4" />}>View All Events</Button>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {upcomingEvents.map((event) => (
              <Link key={event.id} to={`/events/${event.id}`} className="group card card-hover overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img src={event.image} alt={event.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute top-3 left-3 rounded-lg bg-white/95 px-3 py-1.5 text-center shadow-md backdrop-blur-sm"><p className="text-xs font-medium text-slate-500">{new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}</p><p className="text-lg font-bold text-navy-700 leading-none">{new Date(event.date).getDate()}</p></div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-slate-800 dark:text-white group-hover:text-navy-600 dark:group-hover:text-navy-300">{event.title}</h3>
                  <div className="mt-2 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400"><MapPin className="h-4 w-4" /> {event.location}</div>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 line-clamp-2">{event.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="bg-white py-16 dark:bg-slate-800/50">
        <div className="container-page">
          <div className="mb-8 flex items-end justify-between">
            <div><h2 className="font-display text-3xl font-bold text-slate-800 dark:text-white">Featured Courses</h2><p className="mt-2 text-slate-500 dark:text-slate-400">Popular programs chosen by our students</p></div>
            <Button to="/courses" variant="outline" size="sm" iconRight={<ArrowRight className="h-4 w-4" />}>View All Courses</Button>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredCourses.map((course) => (
              <Link key={course.id} to={`/courses/${course.id}`} className="group card card-hover overflow-hidden">
                <div className="relative h-36 overflow-hidden">
                  <img src={course.image} alt={course.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent" />
                  <span className="absolute top-3 right-3 badge bg-white/95 text-navy-700">{course.degree}</span>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-slate-800 dark:text-white group-hover:text-navy-600 dark:group-hover:text-navy-300 line-clamp-2">{course.name}</h3>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 line-clamp-2">{course.description}</p>
                  <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-700"><span className="text-xs text-slate-500 dark:text-slate-400">{course.duration}</span><span className="text-xs font-semibold text-navy-600 dark:text-navy-400">{course.seats} seats</span></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-16">
        <div className="container-page">
          <div className="mb-8 flex items-end justify-between">
            <div><h2 className="font-display text-3xl font-bold text-slate-800 dark:text-white">Campus Gallery</h2><p className="mt-2 text-slate-500 dark:text-slate-400">A glimpse of life at SVIT</p></div>
            <Button to="/gallery" variant="outline" size="sm" iconRight={<ArrowRight className="h-4 w-4" />}>View Gallery</Button>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {galleryPreview.map((item, i) => (
              <Link key={item.id} to="/gallery" className={`group relative overflow-hidden rounded-xl ${i === 0 ? 'col-span-2 row-span-2' : ''}`}>
                <img src={item.image} alt={item.title} className={`w-full object-cover transition-transform duration-500 group-hover:scale-110 ${i === 0 ? 'h-full min-h-[200px]' : 'h-28'}`} />
                <div className="absolute inset-0 bg-navy-950/0 transition-colors group-hover:bg-navy-950/40" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-navy-900 py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-800 to-navy-950" />
        <div className="container-page relative text-center">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">Start Your Journey With Us</h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-300">Take the first step towards a successful career. Applications for the 2026-27 academic session are now open.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button to="/admissions" size="lg" variant="gold" iconRight={<ArrowRight className="h-5 w-5" />}>Apply Now</Button>
            <Button to="/contact" size="lg" variant="outline" className="border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20">Contact Us</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
