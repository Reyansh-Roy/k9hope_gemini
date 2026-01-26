# 🐕 K9Hope: India's Canine Blood Donation Platform

India's first AI-powered canine blood donation network connecting verified dog blood donors with veterinary clinics. A final year project by RIT Chennai, CSE Department, in partnership with Madras Veterinary College.

## 🎓 Academic Project

**Institution:** Rajalakshmi Institute of Technology, Chennai  
**Department:** Computer Science & Engineering  
**Academic Year:** 2025-26  
**Medical Partner:** Madras Veterinary College, Vepery, Chennai

## 🚀 Features

- **AI-Powered Triage:** Automated document screening to prioritize critical cases
- **Geospatial Matching:** Find nearest eligible donors within 10km radius
- **Multi-Tier Verification:** Comprehensive vetting of all donors and requesters
- **Real-Time Matching:** Algorithm-based blood type and location matching
- **Ethical Framework:** 100% non-commercial, following government SOPs
- **Secure Platform:** Firebase authentication, encrypted data storage

## 💡 Problem Statement

In India, pet owners facing medical emergencies for their dogs encounter a fragmented, high-stress search for blood donors. The lack of structured systems creates life-threatening delays. K9Hope eliminates these delays through technology.

## 🛠 Tech Stack

- **Frontend:** React, Next.js 14, TypeScript
- **UI Components:** shadcn/ui, Tailwind CSS
- **Backend:** Firebase (Authentication, Firestore, Cloud Functions)
- **File Storage:** Uploadcare
- **Deployment:** Vercel
- **AI/ML:** Basic NLP for document triage

## 📊 System Architecture

┌─────────────────────────────────────────────────────────────┐
│ K9Hope Platform │
├─────────────────────────────────────────────────────────────┤
│ │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ │
│ │ Donors │ │ Requesters │ │ Vet Clinics │ │
│ └──────┬───────┘ └──────┬───────┘ └──────┬───────┘ │
│ │ │ │ │
│ └──────────────────┼──────────────────┘ │
│ │ │
│ ┌────────▼────────┐ │
│ │ Verification │ │
│ │ (AI + Human) │ │
│ └────────┬────────┘ │
│ │ │
│ ┌────────▼────────┐ │
│ │ Matching Engine │ │
│ │ (Geospatial) │ │
│ └────────┬────────┘ │
│ │ │
│ ┌────────▼────────┐ │
│ │ Transfusion │ │
│ │ @ MVC Vepery │ │
│ └─────────────────┘ │
└─────────────────────────────────────────────────────────────┘

## 📥 Installation

```bash
# Clone repository
git clone https://github.com/Reyansh-Roy/k9hope_gemini.git

# Navigate to directory
cd k9hope_gemini

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your Firebase and Uploadcare keys

# Run development server
npm run dev
```
Open http://localhost:3000 (redirects to /login)

## 🔐 Environment Variables
```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY=
```

## 👥 Team
Students:
- Vikram T (4180)
- Prem Kumar (4305)
- Ram Kishore (4126)

Mentor:
- O. Pandithurai, Faculty, Dept. of CSE, RIT Chennai

## 🏥 Partnership
**Madras Veterinary College, Vepery**
Exclusive medical partner for all donation and transfusion procedures.

## 📄 License
This project is developed for academic purposes. All rights reserved by the K9Hope Team, RIT Chennai.

## 🏷 Tags
#CanineBlood #VeterinaryTech #AIforGood #RITChennai #MadrasVetCollege #BloodDonation #PetHealthcare #FinalYearProject #CSE

© 2026 K9Hope - RIT Chennai | Madras Veterinary College
