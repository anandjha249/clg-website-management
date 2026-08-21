import { admissions, students, contactMessages } from '@/data/students';
import { notices } from '@/data/notices';
import { events } from '@/data/events';
import { galleryItems } from '@/data/gallery';
import { courses } from '@/data/courses';
import { faculty } from '@/data/faculty';
import { getLocal } from './storage';

export function seedDemoData() {
  // Ensures localStorage has initial demo data. Called once on app load.
  if (typeof window === 'undefined') return;
  try {
    getLocal('admissions', admissions);
    getLocal('students', students);
    getLocal('messages', contactMessages);
    getLocal('notices', notices);
    getLocal('events', events);
    getLocal('gallery', galleryItems);
    getLocal('courses', courses);
    getLocal('faculty', faculty);
    // mark seeded
    if (!localStorage.getItem('svit_seeded')) {
      localStorage.setItem('svit_seeded', new Date().toISOString());
      console.log('[svit] Demo data seeded to localStorage');
    }
  } catch (e) {
    console.warn('seed failed', e);
  }
}
