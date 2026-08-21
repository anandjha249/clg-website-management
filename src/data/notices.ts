export type Notice = {
  id: string;
  title: string;
  category: 'Academic' | 'Examination' | 'Admission' | 'General' | 'Placement' | 'Scholarship';
  date: string;
  description: string;
  hasAttachment: boolean;
  attachmentName: string;
  priority: 'High' | 'Normal' | 'Low';
};

export const notices: Notice[] = [
  { id: 'n1', title: 'Odd Semester End Examinations — December 2025 Time Table Released', category: 'Examination', date: '2025-11-20', description: 'The end-semester examination timetable for the odd semester (Dec 2025) has been published. All students must check their exam centers and reporting times. Examinations begin on December 8, 2025.', hasAttachment: true, attachmentName: 'odd_sem_timetable_dec2025.pdf', priority: 'High' },
  { id: 'n2', title: 'Admissions Open for 2026-27 Academic Session', category: 'Admission', date: '2025-11-18', description: 'Online applications for B.Tech, M.Tech, and MBA programs for the 2026-27 academic session are now open. Early-bird applications close on January 15, 2026. Visit the admissions portal to apply.', hasAttachment: true, attachmentName: 'admissions_brochure_2026.pdf', priority: 'High' },
  { id: 'n3', title: 'Campus Placement Drive — TCS, Infosys & Wipro', category: 'Placement', date: '2025-11-15', description: 'Three major IT companies will conduct campus placement drives from November 25 to December 2, 2025. Eligible final-year students must register on the placement portal by November 22.', hasAttachment: true, attachmentName: 'placement_drive_nov2025.pdf', priority: 'High' },
  { id: 'n4', title: 'Post-Matric Scholarship Applications — Last Date Extended', category: 'Scholarship', date: '2025-11-12', description: 'The last date for post-matric scholarship applications for SC/ST/OBC students has been extended to December 10, 2025. Students must submit their applications through the AP ePass portal and submit a copy to the academic office.', hasAttachment: false, attachmentName: '', priority: 'Normal' },
  { id: 'n5', title: 'Workshop on Generative AI & Prompt Engineering', category: 'Academic', date: '2025-11-10', description: 'The Department of CSE is organizing a two-day hands-on workshop on Generative AI and Prompt Engineering on November 28-29, 2025. Registration is free for SVIT students and limited to 120 seats.', hasAttachment: true, attachmentName: 'genai_workshop_flyer.pdf', priority: 'Normal' },
  { id: 'n6', title: 'Library Timings Extended During Exam Season', category: 'General', date: '2025-11-08', description: 'The central library will remain open 24x7 from November 25 to December 20, 2025 to support students during the end-semester examinations. Reading hall access requires a valid student ID.', hasAttachment: false, attachmentName: '', priority: 'Low' },
  { id: 'n7', title: 'Internal Assessment-II Marks Uploaded', category: 'Academic', date: '2025-11-05', description: 'Internal Assessment-II marks for all branches and semesters have been uploaded to the student portal. Students with discrepancies must report to the respective course coordinator by November 12.', hasAttachment: false, attachmentName: '', priority: 'Normal' },
  { id: 'n8', title: 'Sports Day 2025 — Registration Open', category: 'General', date: '2025-11-02', description: 'Annual Sports Day will be held on December 15, 2025. Registrations for athletics, team sports, and indoor games are now open. Contact the physical education department for sign-ups.', hasAttachment: true, attachmentName: 'sports_day_events.pdf', priority: 'Normal' },
  { id: 'n9', title: 'Revaluation Results — Even Semester 2025', category: 'Examination', date: '2025-10-28', description: 'Revaluation results for the even semester examinations (May 2025) have been published. Students can check their results on the student portal under the Results section.', hasAttachment: false, attachmentName: '', priority: 'Normal' },
  { id: 'n10', title: 'Industry Internship — Mandatory for Final Year Students', category: 'Academic', date: '2025-10-25', description: 'All final-year B.Tech and MBA students must complete a 16-week industry internship. The internship offer letter and NOC must be submitted to the training and placement cell by November 30, 2025.', hasAttachment: true, attachmentName: 'internship_guidelines.pdf', priority: 'High' },
  { id: 'n11', title: 'Merit Scholarship for Top 10 Rank Holders', category: 'Scholarship', date: '2025-10-20', description: 'The top 10 rank holders of each branch in the first year will receive a merit scholarship of \u20b950,000. The list of eligible students has been displayed on the notice board.', hasAttachment: false, attachmentName: '', priority: 'Normal' },
  { id: 'n12', title: 'Annual Technical Fest \u2014 Innovision 2026', category: 'General', date: '2025-10-15', description: 'Innovision 2026, the annual technical fest, will be held from February 10-12, 2026. Over 40 events including hackathons, paper presentations, and robotics competitions are planned. Registration opens December 1.', hasAttachment: true, attachmentName: 'innovision2026_brochure.pdf', priority: 'Normal' },
];

export const getNoticeById = (id: string) => notices.find((n) => n.id === id);
export const noticeCategories = ['Academic', 'Examination', 'Admission', 'General', 'Placement', 'Scholarship'] as const;
