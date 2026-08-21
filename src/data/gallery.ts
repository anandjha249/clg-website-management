export type GalleryItem = {
  id: string;
  type: 'photo' | 'video';
  category: 'Campus' | 'Events' | 'Sports' | 'Cultural' | 'Convocation';
  title: string;
  image: string;
  date: string;
};

export const galleryItems: GalleryItem[] = [
  { id: 'g1', type: 'photo', category: 'Campus', title: 'Aerial View of SVIT Campus', image: 'https://images.pexels.com/photos/2079246/pexels-photo-2079246.jpeg?auto=compress&cs=tinysrgb&w=800', date: '2025-09-15' },
  { id: 'g2', type: 'photo', category: 'Campus', title: 'Central Library Reading Hall', image: 'https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&w=800', date: '2025-08-20' },
  { id: 'g3', type: 'photo', category: 'Events', title: 'Innovision 2025 Hackathon', image: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=800', date: '2025-02-12' },
  { id: 'g4', type: 'photo', category: 'Sports', title: 'Inter-College Cricket Tournament', image: 'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=800', date: '2025-03-10' },
  { id: 'g5', type: 'photo', category: 'Cultural', title: 'Annual Cultural Night Performance', image: 'https://images.pexels.com/photos/1387174/pexels-photo-1387174.jpeg?auto=compress&cs=tinysrgb&w=800', date: '2025-04-05' },
  { id: 'g6', type: 'photo', category: 'Convocation', title: 'Convocation 2025 — Degree Distribution', image: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=800', date: '2025-07-20' },
  { id: 'g7', type: 'photo', category: 'Campus', title: 'Smart Classroom — Interactive Session', image: 'https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=800', date: '2025-09-01' },
  { id: 'g8', type: 'photo', category: 'Events', title: 'Tech Talk by Industry Expert', image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800', date: '2025-10-10' },
  { id: 'g9', type: 'photo', category: 'Sports', title: 'Athletics Meet — 100m Sprint', image: 'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=800', date: '2025-03-15' },
  { id: 'g10', type: 'photo', category: 'Cultural', title: 'Classical Dance Performance', image: 'https://images.pexels.com/photos/1387174/pexels-photo-1387174.jpeg?auto=compress&cs=tinysrgb&w=800', date: '2025-04-05' },
  { id: 'g11', type: 'photo', category: 'Campus', title: 'Research Laboratory — Robotics', image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=800', date: '2025-08-25' },
  { id: 'g12', type: 'photo', category: 'Events', title: 'International Conference ICAIOT', image: 'https://images.pexels.com/photos/3862693/pexels-photo-3862693.jpeg?auto=compress&cs=tinysrgb&w=800', date: '2025-01-15' },
  { id: 'g13', type: 'video', category: 'Events', title: 'Campus Tour — Walkthrough', image: 'https://images.pexels.com/photos/2079246/pexels-photo-2079246.jpeg?auto=compress&cs=tinysrgb&w=800', date: '2025-09-20' },
  { id: 'g14', type: 'video', category: 'Cultural', title: 'Cultural Night Highlights', image: 'https://images.pexels.com/photos/1387174/pexels-photo-1387174.jpeg?auto=compress&cs=tinysrgb&w=800', date: '2025-04-06' },
  { id: 'g15', type: 'video', category: 'Convocation', title: 'Convocation 2025 Ceremony', image: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=800', date: '2025-07-20' },
];

export const galleryCategories = ['Campus', 'Events', 'Sports', 'Cultural', 'Convocation'] as const;
