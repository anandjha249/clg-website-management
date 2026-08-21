export type Testimonial = {
  id: string;
  name: string;
  role: string;
  batch: string;
  department: string;
  quote: string;
  rating: number;
  photo: string;
  company?: string;
};

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Aarav Sharma',
    role: 'Software Engineer',
    batch: '2023',
    department: 'CSE',
    company: 'Google',
    quote: 'SVIT gave me the perfect blend of theory and hands-on practice. The AI lab and hackathons prepared me for my role at Google.',
    rating: 5,
    photo: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 't2',
    name: 'Priya Nair',
    role: 'Data Scientist',
    batch: '2022',
    department: 'CSE',
    company: 'Microsoft',
    quote: 'The faculty mentorship and research opportunities at SVIT are unmatched. My final year project on ML was published internationally.',
    rating: 5,
    photo: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 't3',
    name: 'Rohan Desai',
    role: 'VLSI Engineer',
    batch: '2021',
    department: 'ECE',
    company: 'Qualcomm',
    quote: 'The VLSI lab with Cadence tools is industry-grade. I secured my dream job thanks to the placement training at SVIT.',
    rating: 5,
    photo: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 't4',
    name: 'Sneha Reddy',
    role: 'MBA Graduate',
    batch: '2023',
    department: 'MBA',
    company: 'Deloitte',
    quote: 'Case studies, live projects and the incubation cell helped me launch my startup while still in college. Incredible ecosystem!',
    rating: 5,
    photo: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 't5',
    name: 'Kiran Kumar',
    role: 'Mechanical Design Engineer',
    batch: '2022',
    department: 'MECH',
    company: 'Tata Motors',
    quote: 'The robotics lab and SAE club at SVIT taught me more than textbooks. We built an EV prototype that won a national competition.',
    rating: 4,
    photo: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 't6',
    name: 'Ananya Gupta',
    role: 'Civil Engineer',
    batch: '2020',
    department: 'CIVIL',
    company: 'L&T Construction',
    quote: 'Field visits, surveying camps and real consultancy projects gave me confidence to handle large infrastructure projects from day one.',
    rating: 5,
    photo: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
];

export type PlacementStat = { year: string; placed: number; highest: string; average: string; companies: number };
export const placementStats: PlacementStat[] = [
  { year: '2023-24', placed: 892, highest: '44 LPA', average: '6.8 LPA', companies: 142 },
  { year: '2022-23', placed: 847, highest: '38 LPA', average: '6.2 LPA', companies: 128 },
  { year: '2021-22', placed: 781, highest: '32 LPA', average: '5.9 LPA', companies: 115 },
];

export const recruiters = [
  'TCS', 'Infosys', 'Wipro', 'Cognizant', 'Accenture', 'Capgemini', 'Deloitte', 'HCL', 'Tech Mahindra', 'L&T',
  'Amazon', 'Microsoft', 'Google', 'Qualcomm', 'Samsung', 'IBM', 'Oracle', 'Cisco', 'Intel', 'Bosch',
];

export const newsTicker = [
  'Admissions Open for 2026-27 — Apply Before 31st March 2026',
  'NAAC A+ Accredited with 3.21 CGPA — SVIT ranked in NIRF 201-250 Band',
  '142 Companies Participated in 2023-24 Placements — Highest Package 44 LPA',
  'Innovision 2026 Tech Fest from Feb 10-12 — Registrations Open Dec 1',
  'New AI & Data Science Research Center Inaugurated',
];

export const whyChooseUs = [
  { title: '25+ Years of Excellence', description: 'Established 1998, trusted by 5000+ students and 15,000+ alumni worldwide.', icon: 'Award' },
  { title: 'Strong Placements', description: '892 students placed in 2023-24 with average package of 6.8 LPA.', icon: 'TrendingUp' },
  { title: 'Research & Innovation', description: '120+ patents filed, 40+ labs, and a 40,000 sq.ft. incubation center.', icon: 'Lightbulb' },
  { title: 'Global Exposure', description: 'MoUs with 12 international universities and semester abroad programs.', icon: 'Globe' },
  { title: 'Holistic Development', description: 'Sports, cultural clubs, NSS, NCC and 30+ student chapters for overall growth.', icon: 'Users' },
  { title: 'Green Campus', description: '60-acre Wi-Fi campus with solar power, hostels, and sports complex.', icon: 'Leaf' },
];

export const faqs = [
  { q: 'What is the eligibility for B.Tech?', a: '10+2 with Physics, Chemistry, Mathematics, 60% aggregate + valid EAPCET/JEE Main rank.' },
  { q: 'Is hostel available?', a: 'Yes, separate hostels for 2,400 boys & girls with Wi-Fi, mess, gym and 24/7 security. First-come-first-served after admission.' },
  { q: 'What is the placement record?', a: 'In 2023-24, 892 students placed across 142 companies. Highest package 44 LPA (Amazon), average 6.8 LPA.' },
];

export const demoCredentials = {
  admin: { email: 'admin@svit.ac.in', password: 'admin123', label: 'Admin Demo' },
  student: { email: 'student@svit.ac.in', password: 'student123', label: 'Student Demo' },
};
