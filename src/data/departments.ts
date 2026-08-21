export type Department = {
  id: string;
  name: string;
  shortName: string;
  hod: string;
  hodId: string;
  facultyCount: number;
  students: number;
  established: number;
  description: string;
  longDescription: string;
  courses: string[];
  facilities: string[];
  email: string;
  phone: string;
  image: string;
  color: string;
};

export const departments: Department[] = [
  {
    id: 'cse',
    name: 'Computer Science & Engineering',
    shortName: 'CSE',
    hod: 'Dr. Anjali Mehta',
    hodId: 'f1',
    facultyCount: 18,
    students: 720,
    established: 1998,
    description: 'A premier department focusing on computing systems, AI, data science, and software engineering.',
    longDescription:
      'The Department of Computer Science & Engineering was established in 1998 as one of the founding departments of SVIT. It offers a vibrant learning environment with state-of-the-art laboratories in artificial intelligence, cloud computing, cybersecurity, and data science. The department maintains active research collaborations with industry leaders and has published over 300 research papers in the last five years.',
    courses: ['B.Tech CSE', 'M.Tech CSE', 'M.Tech AI & Data Science', 'Ph.D. Computer Science'],
    facilities: ['AI & ML Lab', 'Cloud Computing Lab', 'Cybersecurity Lab', 'IoT Lab', 'High-Performance Computing Cluster'],
    email: 'cse@svit.ac.in',
    phone: '+91 877 224 5810',
    image: 'https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=800',
    color: 'navy',
  },
  {
    id: 'mech',
    name: 'Mechanical Engineering',
    shortName: 'MECH',
    hod: 'Dr. R. Srinivasa Reddy',
    hodId: 'f2',
    facultyCount: 16,
    students: 540,
    established: 1998,
    description: 'One of the oldest departments, excelling in thermal sciences, design, and manufacturing.',
    longDescription:
      'The Department of Mechanical Engineering is a cornerstone of SVIT, established in 1998. It is renowned for its work in thermal sciences, machine design, robotics, and advanced manufacturing. The department houses modern workshops, CAD/CAM centers, and a robotics laboratory. Students regularly win national-level design competitions and secure placements in core manufacturing and automotive companies.',
    courses: ['B.Tech Mechanical', 'M.Tech Thermal Engineering', 'M.Tech CAD/CAM', 'Ph.D. Mechanical'],
    facilities: ['Thermal Engineering Lab', 'CAD/CAM Center', 'Robotics Lab', 'Machine Shop', 'Fluid Mechanics Lab'],
    email: 'mech@svit.ac.in',
    phone: '+91 877 224 5811',
    image: 'https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=800',
    color: 'gold',
  },
  {
    id: 'civil',
    name: 'Civil Engineering',
    shortName: 'CIVIL',
    hod: 'Dr. K. Lakshmi Narayana',
    hodId: 'f3',
    facultyCount: 14,
    students: 480,
    established: 2000,
    description: 'Building the nation — structural, environmental, and transportation engineering excellence.',
    longDescription:
      'The Department of Civil Engineering, established in 2000, focuses on structural engineering, geotechnics, environmental engineering, and transportation systems. The department is known for its consultancy services and has executed over 50 real-world structural audits. Students benefit from a well-equipped materials testing lab, surveying instruments, and a dedicated GIS lab.',
    courses: ['B.Tech Civil', 'M.Tech Structural Engineering', 'M.Tech Transportation', 'Ph.D. Civil'],
    facilities: ['Structural Engineering Lab', 'Geotechnical Lab', 'Environmental Lab', 'Surveying Lab', 'GIS Lab'],
    email: 'civil@svit.ac.in',
    phone: '+91 877 224 5812',
    image: 'https://images.pexels.com/photos/159306/pexels-photo-159306.jpeg?auto=compress&cs=tinysrgb&w=800',
    color: 'navy',
  },
  {
    id: 'ece',
    name: 'Electronics & Communication',
    shortName: 'ECE',
    hod: 'Dr. Priya Sharma',
    hodId: 'f4',
    facultyCount: 17,
    students: 660,
    established: 1999,
    description: 'Pioneering VLSI, embedded systems, and 5G communication research.',
    longDescription:
      'The Department of Electronics & Communication Engineering was established in 1999 and has grown into a hub for VLSI design, embedded systems, and wireless communication. The department has a dedicated VLSI design center with industry-standard EDA tools and a 5G/6G research lab. Students have filed 30+ patents in IoT and communication systems.',
    courses: ['B.Tech ECE', 'M.Tech VLSI Design', 'M.Tech Embedded Systems', 'Ph.D. ECE'],
    facilities: ['VLSI Design Center', 'Embedded Systems Lab', 'Microwave Lab', 'Digital Signal Processing Lab', '5G Research Lab'],
    email: 'ece@svit.ac.in',
    phone: '+91 877 224 5813',
    image: 'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=800',
    color: 'gold',
  },
  {
    id: 'eee',
    name: 'Electrical Engineering',
    shortName: 'EEE',
    hod: 'Dr. S. Venkatesh',
    hodId: 'f5',
    facultyCount: 13,
    students: 420,
    established: 2001,
    description: 'Power systems, renewable energy, and electric vehicle technology.',
    longDescription:
      'The Department of Electrical Engineering, established in 2001, specializes in power systems, renewable energy, and electric vehicle technology. The department runs a solar microgrid on campus and collaborates with NTPC and APGENCO on research projects. Students gain hands-on experience in the power electronics, machines, and smart grid laboratories.',
    courses: ['B.Tech EEE', 'M.Tech Power Systems', 'M.Tech Power Electronics', 'Ph.D. EEE'],
    facilities: ['Power Systems Lab', 'Machines Lab', 'Power Electronics Lab', 'Renewable Energy Lab', 'Smart Grid Lab'],
    email: 'eee@svit.ac.in',
    phone: '+91 877 224 5814',
    image: 'https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg?auto=compress&cs=tinysrgb&w=800',
    color: 'navy',
  },
  {
    id: 'mba',
    name: 'Management Studies',
    shortName: 'MBA',
    hod: 'Dr. Geetha Iyer',
    hodId: 'f6',
    facultyCount: 12,
    students: 300,
    established: 2008,
    description: 'Shaping future business leaders with analytics, finance, and entrepreneurship.',
    longDescription:
      'The Department of Management Studies, established in 2008, offers a two-year full-time MBA program with specializations in Finance, Marketing, Human Resources, and Business Analytics. The department emphasizes case-based learning, live industry projects, and entrepreneurship. It has an active incubation cell that has supported 25+ student startups.',
    courses: ['MBA (Finance)', 'MBA (Marketing)', 'MBA (HR)', 'MBA (Business Analytics)'],
    facilities: ['Case Study Hall', 'Analytics Lab', 'Incubation Cell', 'Trading Lab', 'Seminar Hall'],
    email: 'mba@svit.ac.in',
    phone: '+91 877 224 5815',
    image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
    color: 'gold',
  },
  {
    id: 'sh',
    name: 'Science & Humanities',
    shortName: 'S&H',
    hod: 'Dr. Meena Krishnan',
    hodId: 'f7',
    facultyCount: 22,
    students: 1200,
    established: 1998,
    description: 'Foundational sciences, mathematics, and humanities for all engineering programs.',
    longDescription:
      'The Department of Science & Humanities is the foundational pillar of SVIT, teaching mathematics, physics, chemistry, and professional communication to first-year students across all branches. The department also runs a dedicated English language lab and a soft-skills training program that prepares students for placements and higher studies.',
    courses: ['B.Sc. Mathematics', 'B.Sc. Physics', 'B.Sc. Chemistry', 'M.Sc. Mathematics'],
    facilities: ['Physics Lab', 'Chemistry Lab', 'Language Lab', 'Mathematics Computing Lab', 'Soft Skills Studio'],
    email: 'sh@svit.ac.in',
    phone: '+91 877 224 5816',
    image: 'https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&w=800',
    color: 'navy',
  },
];

export const getDepartmentById = (id: string) => departments.find((d) => d.id === id);
