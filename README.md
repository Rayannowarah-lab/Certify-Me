
# CertsHub

CertsHub is a platform dedicated to helping university students find free, industry-recognized certifications from major providers like Google, Microsoft, IBM, Cisco, and more.

## Tech Stack
- **Next.js 14** (App Router)
- **TypeScript**
- **TailwindCSS**
- **Lucide Icons**
- **Local JSON Database**

## Key Features
- **Search & Discovery**: Find certifications by keyword, organization, or skill.
- **Categorization**: Browse by university major (Cyber Security, Data Science, Marketing, etc.).
- **Bookmarking**: Save certifications for later using local storage.
- **Direct Access**: One-click links to start certifications on official platforms.
- **Mobile Responsive**: Fully optimized for browsing on any device.

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally
Run the development server:
```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the results.

## Data Structure
Certifications are stored in `src/app/data/certifications.json`. To add new ones, follow the existing schema:

```json
{
  "id": "unique-id",
  "title": "Certification Name",
  "organization": "Company Name",
  "category": "Major Category",
  "categorySlug": "url-friendly-slug",
  "duration": "Estimated time",
  "difficulty": "Beginner/Intermediate/Advanced",
  "description": "Full description",
  "skills": ["Skill 1", "Skill 2"],
  "link": "https://direct-link.com"
}
```

## UI Design
The application follows a professional educational aesthetic using:
- **Primary Color**: #2D4F86 (Deep Blue)
- **Background Color**: #F1F3F8 (Light Blue-Grey)
- **Accent Color**: #6ECADE (Sky Blue)
- **Typography**: 'Space Grotesk' for headlines, 'Inter' for body text.
