export type Student = {
  id: string;
  rollNumber: string;
  name: string;
  email: string;
  phone: string;
  departmentId: string;
  departmentName: string;
  courseId: string;
  courseName: string;
  semester: number;
  year: number;
  status: 'Active' | 'Graduated' | 'Suspended' | 'On Leave';
  admissionDate: string;
  cgpa: number;
  photo: string;
};

export const students: Student[] = [
  { id: 's1', rollNumber: 'SVIT21CSE001', name: 'Arun Reddy', email: 'arun.reddy@svit.ac.in', phone: '+91 90000 11111', departmentId: 'cse', departmentName: 'CSE', courseId: 'btech-cse', courseName: 'B.Tech CSE', semester: 7, year: 4, status: 'Active', admissionDate: '2021-08-01', cgpa: 8.7, photo: 'https://images.pexels.com/photos/220457/pexels-photo-220457.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 's2', rollNumber: 'SVIT21CSE002', name: 'Sneha Patel', email: 'sneha.patel@svit.ac.in', phone: '+91 90000 22222', departmentId: 'cse', departmentName: 'CSE', courseId: 'btech-cse', courseName: 'B.Tech CSE', semester: 7, year: 4, status: 'Active', admissionDate: '2021-08-01', cgpa: 9.1, photo: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 's3', rollNumber: 'SVIT22ECE015', name: 'Karthik Naidu', email: 'karthik.naidu@svit.ac.in', phone: '+91 90000 33333', departmentId: 'ece', departmentName: 'ECE', courseId: 'btech-ece', courseName: 'B.Tech ECE', semester: 5, year: 3, status: 'Active', admissionDate: '2022-08-01', cgpa: 8.3, photo: 'https://images.pexels.com/photos/220457/pexels-photo-220457.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 's4', rollNumber: 'SVIT23MECH021', name: 'Divya Lakshmi', email: 'divya.l@svit.ac.in', phone: '+91 90000 44444', departmentId: 'mech', departmentName: 'MECH', courseId: 'btech-mech', courseName: 'B.Tech Mech', semester: 3, year: 2, status: 'Active', admissionDate: '2023-08-01', cgpa: 7.9, photo: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 's5', rollNumber: 'SVIT21CIVIL010', name: 'Rahul Verma', email: 'rahul.verma@svit.ac.in', phone: '+91 90000 55555', departmentId: 'civil', departmentName: 'CIVIL', courseId: 'btech-civil', courseName: 'B.Tech Civil', semester: 7, year: 4, status: 'Active', admissionDate: '2021-08-01', cgpa: 8.5, photo: 'https://images.pexels.com/photos/220457/pexels-photo-220457.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 's6', rollNumber: 'SVIT24EEE033', name: 'Priya Reddy', email: 'priya.reddy@svit.ac.in', phone: '+91 90000 66666', departmentId: 'eee', departmentName: 'EEE', courseId: 'btech-eee', courseName: 'B.Tech EEE', semester: 1, year: 1, status: 'Active', admissionDate: '2024-08-01', cgpa: 8.0, photo: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 's7', rollNumber: 'SVIT20CSE005', name: 'Vikram Singh', email: 'vikram.singh@svit.ac.in', phone: '+91 90000 77777', departmentId: 'cse', departmentName: 'CSE', courseId: 'btech-cse', courseName: 'B.Tech CSE', semester: 8, year: 4, status: 'Graduated', admissionDate: '2020-08-01', cgpa: 9.3, photo: 'https://images.pexels.com/photos/220457/pexels-photo-220457.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 's8', rollNumber: 'SVIT23MBA002', name: 'Ananya Iyer', email: 'ananya.iyer@svit.ac.in', phone: '+91 90000 88888', departmentId: 'mba', departmentName: 'MBA', courseId: 'mba-finance', courseName: 'MBA Finance', semester: 3, year: 2, status: 'Active', admissionDate: '2023-08-01', cgpa: 8.8, photo: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 's9', rollNumber: 'SVIT22CSE040', name: 'Manoj Kumar', email: 'manoj.kumar@svit.ac.in', phone: '+91 90000 99999', departmentId: 'cse', departmentName: 'CSE', courseId: 'btech-cse', courseName: 'B.Tech CSE', semester: 5, year: 3, status: 'On Leave', admissionDate: '2022-08-01', cgpa: 7.5, photo: 'https://images.pexels.com/photos/220457/pexels-photo-220457.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 's10', rollNumber: 'SVIT24CSE051', name: 'Sai Teja', email: 'sai.teja@svit.ac.in', phone: '+91 90000 10101', departmentId: 'cse', departmentName: 'CSE', courseId: 'btech-cse', courseName: 'B.Tech CSE', semester: 1, year: 1, status: 'Active', admissionDate: '2024-08-01', cgpa: 8.2, photo: 'https://images.pexels.com/photos/220457/pexels-photo-220457.jpeg?auto=compress&cs=tinysrgb&w=400' },
];

export const getStudentById = (id: string) => students.find((s) => s.id === id);

export type Admission = {
  id: string;
  applicationId: string;
  studentName: string;
  email: string;
  phone: string;
  courseId: string;
  courseName: string;
  applicationDate: string;
  status: 'Pending' | 'Under Review' | 'Approved' | 'Rejected';
  percentage10: number;
  percentage12: number;
  entranceRank: number;
  documents: string[];
};

export const admissions: Admission[] = [
  { id: 'a1', applicationId: 'APP2026-001', studentName: 'Ravi Teja', email: 'ravi.teja@gmail.com', phone: '+91 98000 11111', courseId: 'btech-cse', courseName: 'B.Tech CSE', applicationDate: '2025-11-01', status: 'Pending', percentage10: 92, percentage12: 88, entranceRank: 1245, documents: ['10th Certificate', '12th Certificate', 'Transfer Certificate', 'Aadhaar Card', 'Passport Photo'] },
  { id: 'a2', applicationId: 'APP2026-002', studentName: 'Lakshmi Prasad', email: 'lakshmi.p@gmail.com', phone: '+91 98000 22222', courseId: 'btech-ece', courseName: 'B.Tech ECE', applicationDate: '2025-11-02', status: 'Under Review', percentage10: 89, percentage12: 91, entranceRank: 980, documents: ['10th Certificate', '12th Certificate', 'Transfer Certificate', 'Aadhaar Card', 'Passport Photo'] },
  { id: 'a3', applicationId: 'APP2026-003', studentName: 'Sai Krishna', email: 'sai.k@gmail.com', phone: '+91 98000 33333', courseId: 'btech-mech', courseName: 'B.Tech Mech', applicationDate: '2025-11-03', status: 'Approved', percentage10: 95, percentage12: 93, entranceRank: 450, documents: ['10th Certificate', '12th Certificate', 'Transfer Certificate', 'Aadhaar Card', 'Passport Photo'] },
  { id: 'a4', applicationId: 'APP2026-004', studentName: 'Bhavya Sri', email: 'bhavya.s@gmail.com', phone: '+91 98000 44444', courseId: 'mba-finance', courseName: 'MBA Finance', applicationDate: '2025-11-05', status: 'Pending', percentage10: 88, percentage12: 90, entranceRank: 2100, documents: ['10th Certificate', '12th Certificate', 'Degree Certificate', 'Aadhaar Card', 'Passport Photo'] },
  { id: 'a5', applicationId: 'APP2026-005', studentName: 'Gowtham Raj', email: 'gowtham.r@gmail.com', phone: '+91 98000 55555', courseId: 'btech-cse', courseName: 'B.Tech CSE', applicationDate: '2025-11-06', status: 'Rejected', percentage10: 72, percentage12: 68, entranceRank: 8500, documents: ['10th Certificate', '12th Certificate', 'Transfer Certificate', 'Aadhaar Card'] },
  { id: 'a6', applicationId: 'APP2026-006', studentName: 'Harika Reddy', email: 'harika.r@gmail.com', phone: '+91 98000 66666', courseId: 'mtech-ai', courseName: 'M.Tech AI', applicationDate: '2025-11-08', status: 'Under Review', percentage10: 93, percentage12: 95, entranceRank: 320, documents: ['10th Certificate', '12th Certificate', 'B.Tech Certificate', 'Aadhaar Card', 'Passport Photo'] },
  { id: 'a7', applicationId: 'APP2026-007', studentName: 'Naveen Kumar', email: 'naveen.k@gmail.com', phone: '+91 98000 77777', courseId: 'btech-civil', courseName: 'B.Tech Civil', applicationDate: '2025-11-10', status: 'Approved', percentage10: 91, percentage12: 87, entranceRank: 1850, documents: ['10th Certificate', '12th Certificate', 'Transfer Certificate', 'Aadhaar Card', 'Passport Photo'] },
  { id: 'a8', applicationId: 'APP2026-008', studentName: 'Sravani', email: 'sravani@gmail.com', phone: '+91 98000 88888', courseId: 'btech-eee', courseName: 'B.Tech EEE', applicationDate: '2025-11-12', status: 'Pending', percentage10: 86, percentage12: 84, entranceRank: 3200, documents: ['10th Certificate', '12th Certificate', 'Transfer Certificate', 'Aadhaar Card', 'Passport Photo'] },
];

export const getAdmissionById = (id: string) => admissions.find((a) => a.id === id);
export const getAdmissionByApplicationId = (appId: string) => admissions.find((a) => a.applicationId === appId);

export type StudyMaterial = {
  id: string;
  subject: string;
  faculty: string;
  departmentId: string;
  semester: number;
  fileType: 'PDF' | 'DOCX' | 'PPTX' | 'ZIP';
  fileSize: string;
  uploadDate: string;
  downloads: number;
};

export const studyMaterials: StudyMaterial[] = [
  { id: 'm1', subject: 'Data Structures & Algorithms', faculty: 'Dr. Anjali Mehta', departmentId: 'cse', semester: 3, fileType: 'PDF', fileSize: '4.2 MB', uploadDate: '2025-09-15', downloads: 342 },
  { id: 'm2', subject: 'Operating Systems', faculty: 'Prof. Arun Kumar', departmentId: 'cse', semester: 4, fileType: 'PPTX', fileSize: '12.8 MB', uploadDate: '2025-09-18', downloads: 289 },
  { id: 'm3', subject: 'Machine Learning — Notes', faculty: 'Dr. Anjali Mehta', departmentId: 'cse', semester: 6, fileType: 'PDF', fileSize: '6.5 MB', uploadDate: '2025-10-01', downloads: 451 },
  { id: 'm4', subject: 'Thermodynamics', faculty: 'Dr. R. Srinivasa Reddy', departmentId: 'mech', semester: 2, fileType: 'PDF', fileSize: '3.8 MB', uploadDate: '2025-09-10', downloads: 178 },
  { id: 'm5', subject: 'VLSI Design — Lab Manual', faculty: 'Dr. Priya Sharma', departmentId: 'ece', semester: 6, fileType: 'DOCX', fileSize: '2.1 MB', uploadDate: '2025-09-20', downloads: 203 },
  { id: 'm6', subject: 'Structural Analysis', faculty: 'Dr. K. Lakshmi Narayana', departmentId: 'civil', semester: 5, fileType: 'PDF', fileSize: '5.6 MB', uploadDate: '2025-10-05', downloads: 156 },
  { id: 'm7', subject: 'Power Electronics', faculty: 'Dr. S. Venkatesh', departmentId: 'eee', semester: 6, fileType: 'PPTX', fileSize: '9.3 MB', uploadDate: '2025-10-08', downloads: 134 },
  { id: 'm8', subject: 'Financial Accounting', faculty: 'Dr. Geetha Iyer', departmentId: 'mba', semester: 1, fileType: 'PDF', fileSize: '3.2 MB', uploadDate: '2025-09-25', downloads: 198 },
  { id: 'm9', subject: 'Cybersecurity — Case Studies', faculty: 'Prof. Sandhya Rao', departmentId: 'cse', semester: 7, fileType: 'ZIP', fileSize: '15.4 MB', uploadDate: '2025-10-12', downloads: 167 },
  { id: 'm10', subject: 'Embedded Systems', faculty: 'Prof. Deepa Nair', departmentId: 'ece', semester: 6, fileType: 'PDF', fileSize: '4.8 MB', uploadDate: '2025-10-15', downloads: 145 },
];

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  status: 'Unread' | 'Read' | 'Replied';
};

export const contactMessages: ContactMessage[] = [
  { id: 'msg1', name: 'Ramesh Babu', email: 'ramesh.babu@gmail.com', phone: '+91 98765 11111', subject: 'Admission enquiry for B.Tech CSE 2026', message: 'My son has completed 12th with 89% in MPC. He is interested in B.Tech CSE. Could you please share the admission process, fee structure, and hostel facilities available?', date: '2025-11-18', status: 'Unread' },
  { id: 'msg2', name: 'Sita Devi', email: 'sita.devi@gmail.com', phone: '+91 98765 22222', subject: 'Scholarship information request', message: 'I am a first-year B.Tech ECE student. I would like to know about the merit scholarships available and the eligibility criteria for the post-matric scholarship.', date: '2025-11-16', status: 'Read' },
  { id: 'msg3', name: 'Mohan Rao', email: 'mohan.rao@gmail.com', phone: '+91 98765 33333', subject: 'Campus visit for school group', message: 'We are a government high school from Chittoor. We would like to bring 50 students for a campus visit to understand engineering education. Is it possible to arrange a guided tour?', date: '2025-11-14', status: 'Replied' },
  { id: 'msg4', name: 'Lakshmi Devi', email: 'lakshmi.d@gmail.com', phone: '+91 98765 44444', subject: 'Transcript request for higher studies', message: 'I am a 2023 passed-out student from B.Tech Civil. I need official transcripts for my MS application to the US. What is the process and how long will it take?', date: '2025-11-12', status: 'Unread' },
  { id: 'msg5', name: 'Venkat Rao', email: 'venkat.rao@gmail.com', phone: '+91 98765 55555', subject: 'Industry collaboration for placement', message: 'I am the HR Manager at Infosys Tirupati. We would like to explore campus placement opportunities and MoU for internships. Can we schedule a meeting?', date: '2025-11-10', status: 'Read' },
];

export type Result = {
  rollNumber: string;
  name: string;
  course: string;
  semester: number;
  subjects: { subject: string; code: string; credits: number; internalMarks: number; externalMarks: number; total: number; grade: string; status: 'Pass' | 'Fail' }[];
  sgpa: number;
  cgpa: number;
  result: 'Pass' | 'Fail' | 'Withheld';
};

export const results: Record<string, Result> = {
  SVIT21CSE001: {
    rollNumber: 'SVIT21CSE001', name: 'Arun Reddy', course: 'B.Tech CSE', semester: 6,
    subjects: [
      { subject: 'Machine Learning', code: 'CS601', credits: 4, internalMarks: 28, externalMarks: 68, total: 96, grade: 'A+', status: 'Pass' },
      { subject: 'Computer Networks', code: 'CS602', credits: 4, internalMarks: 25, externalMarks: 62, total: 87, grade: 'A', status: 'Pass' },
      { subject: 'Software Engineering', code: 'CS603', credits: 3, internalMarks: 27, externalMarks: 65, total: 92, grade: 'A+', status: 'Pass' },
      { subject: 'Web Technologies', code: 'CS604', credits: 3, internalMarks: 29, externalMarks: 70, total: 99, grade: 'O', status: 'Pass' },
      { subject: 'Design & Analysis of Algorithms', code: 'CS605', credits: 4, internalMarks: 26, externalMarks: 60, total: 86, grade: 'A', status: 'Pass' },
    ],
    sgpa: 8.7, cgpa: 8.7, result: 'Pass',
  },
  SVIT21CSE002: {
    rollNumber: 'SVIT21CSE002', name: 'Sneha Patel', course: 'B.Tech CSE', semester: 6,
    subjects: [
      { subject: 'Machine Learning', code: 'CS601', credits: 4, internalMarks: 30, externalMarks: 72, total: 102, grade: 'O', status: 'Pass' },
      { subject: 'Computer Networks', code: 'CS602', credits: 4, internalMarks: 28, externalMarks: 70, total: 98, grade: 'O', status: 'Pass' },
      { subject: 'Software Engineering', code: 'CS603', credits: 3, internalMarks: 29, externalMarks: 68, total: 97, grade: 'A+', status: 'Pass' },
      { subject: 'Web Technologies', code: 'CS604', credits: 3, internalMarks: 30, externalMarks: 75, total: 105, grade: 'O', status: 'Pass' },
      { subject: 'Design & Analysis of Algorithms', code: 'CS605', credits: 4, internalMarks: 28, externalMarks: 71, total: 99, grade: 'O', status: 'Pass' },
    ],
    sgpa: 9.1, cgpa: 9.1, result: 'Pass',
  },
};

export const timetable = {
  semester: 'Odd Semester 2025-26',
  days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  periods: [
    { time: '09:00 - 09:50', label: 'P1' },
    { time: '09:50 - 10:40', label: 'P2' },
    { time: '10:40 - 11:30', label: 'P3' },
    { time: '11:30 - 12:20', label: 'P4' },
    { time: '12:20 - 01:10', label: 'Lunch' },
    { time: '01:10 - 02:00', label: 'P5' },
    { time: '02:00 - 02:50', label: 'P6' },
    { time: '02:50 - 03:40', label: 'P7' },
  ],
  schedule: {
    Monday: ['Machine Learning', 'Computer Networks', 'Software Eng.', 'Web Tech', 'Lunch', 'DAA Lab', 'DAA Lab', 'Library'],
    Tuesday: ['Computer Networks', 'DAA', 'Machine Learning', 'Software Eng.', 'Lunch', 'Web Tech', 'ML Lab', 'ML Lab'],
    Wednesday: ['Software Eng.', 'Web Tech', 'DAA', 'Computer Networks', 'Lunch', 'CN Lab', 'CN Lab', 'Seminar'],
    Thursday: ['DAA', 'Machine Learning', 'Web Tech', 'Computer Networks', 'Lunch', 'SE Lab', 'SE Lab', 'Library'],
    Friday: ['Web Tech', 'Software Eng.', 'Computer Networks', 'Machine Learning', 'Lunch', 'Project', 'Project', 'Sports'],
  } as Record<string, string[]>,
};

export const academicCalendar = [
  { event: 'Odd Semester Classes Begin', date: '2025-08-01' },
  { event: 'Mid-Semester Examinations', date: '2025-09-20' },
  { event: 'Dasara Vacation', date: '2025-10-01' },
  { event: 'Classes Resume', date: '2025-10-10' },
  { event: 'End-Semester Examinations', date: '2025-12-08' },
  { event: 'Winter Vacation', date: '2025-12-20' },
  { event: 'Even Semester Classes Begin', date: '2026-01-05' },
  { event: 'Republic Day Holiday', date: '2026-01-26' },
  { event: 'Mid-Semester Examinations', date: '2026-03-01' },
  { event: 'End-Semester Examinations', date: '2026-05-01' },
];

export const admissionFaqs = [
  { question: 'What is the eligibility for B.Tech admission?', answer: 'Candidates must have passed 10+2 with Physics, Chemistry, and Mathematics with a minimum of 60% aggregate. A valid AP EAPCET or JEE Main rank is required.' },
  { question: 'What is the application fee?', answer: 'The application fee is \u20b91,000 for general/OBC candidates and \u20b9500 for SC/ST candidates. It is non-refundable and payable online.' },
  { question: 'Is hostel accommodation guaranteed?', answer: 'Hostel accommodation is provided subject to availability. Seats are allotted on a first-come-first-served basis after admission confirmation.' },
  { question: 'Can I apply for multiple courses?', answer: 'Yes, you can apply for up to 3 courses in a single application. Separate application fees apply for each course.' },
  { question: 'What documents are required for admission?', answer: '10th and 12th marksheets and certificates, transfer certificate, migration certificate, caste/income certificate (if applicable), Aadhaar card, and passport-size photographs.' },
  { question: 'Is there an entrance exam for MBA admission?', answer: 'Admission to the MBA program is based on CAT/MAT/ICET scores followed by a personal interview. The weightage is 70% entrance score and 30% interview.' },
];

export const importantDates = [
  { event: 'Online Application Opens', date: '2025-11-15', status: 'done' },
  { event: 'Early Bird Application Deadline', date: '2026-01-15', status: 'upcoming' },
  { event: 'Last Date for Application', date: '2026-03-31', status: 'upcoming' },
  { event: 'Counselling & Document Verification', date: '2026-04-15', status: 'upcoming' },
  { event: 'Fee Payment & Seat Allotment', date: '2026-05-01', status: 'upcoming' },
  { event: 'Classes Commence', date: '2026-08-01', status: 'upcoming' },
];

export const requiredDocuments = [
  '10th Class Marks Memo & Certificate',
  '12th Class Marks Memo & Certificate',
  'Transfer Certificate (TC)',
  'Migration Certificate',
  'Caste Certificate (if applicable)',
  'Income Certificate (if applicable)',
  'Aadhaar Card',
  'Passport-size Photographs (6 copies)',
  'Entrance Exam Rank Card (EAPCET/JEE Main)',
  'Medical Fitness Certificate',
];

export const departmentContacts = [
  { department: 'CSE', email: 'cse@svit.ac.in', phone: '+91 877 224 5810' },
  { department: 'Mechanical', email: 'mech@svit.ac.in', phone: '+91 877 224 5811' },
  { department: 'Civil', email: 'civil@svit.ac.in', phone: '+91 877 224 5812' },
  { department: 'ECE', email: 'ece@svit.ac.in', phone: '+91 877 224 5813' },
  { department: 'EEE', email: 'eee@svit.ac.in', phone: '+91 877 224 5814' },
  { department: 'MBA', email: 'mba@svit.ac.in', phone: '+91 877 224 5815' },
  { department: 'Admissions', email: 'admissions@svit.ac.in', phone: '+91 877 224 5800' },
];
