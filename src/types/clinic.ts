export type CategoryType = 'facial' | 'corporal' | 'bem-estar';

export interface Treatment {
  id: string;
  name: string;
  category: CategoryType;
  shortDesc: string;
  fullDesc: string;
  image: string;
  benefits: string[];
  indication: string;
  contraindications: string;
  sessionDuration: string;
  recommendedSessions: string;
  expectedResults: string;
  price: string;
  isPopular?: boolean;
}

export interface BeforeAfterItem {
  id: string;
  title: string;
  category: 'gordura-localizada' | 'flacidez' | 'celulite' | 'limpeza-de-pele';
  categoryLabel: string;
  beforeImage: string;
  afterImage: string;
  description: string;
  treatmentName: string;
  sessionsCount: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  photo: string;
  rating: number;
  text: string;
  treatmentTaken: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface SmartLead {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  treatmentName: string;
  objective: string;
  description: string;
  status: 'new' | 'contacted' | 'scheduled';
}

export interface ClinicSettings {
  brandName: string;
  subTitle: string;
  heroHeadline: string;
  heroTagline: string;
  phone: string;
  whatsapp: string;
  instagram: string;
  address: string;
  cityState: string;
  workingHours: string;
  draLaisBio: string;
  experienceYears: number;
  patientsCount: string;
  protocolsCount: number;
}
