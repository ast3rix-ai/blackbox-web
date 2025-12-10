# BLACKBOX Digital Agency - Tech Stack & Design Documentation

## 🎨 Design Philosophy

### Design Type
- **Dark Mode Native** - OLED-optimized dark theme with pure blacks (#09090b)
- **Glassmorphism** - Backdrop blur effects with semi-transparent surfaces
- **Gradient Mesh** - Subtle animated gradient backgrounds for depth
- **Motion-First** - Animations as core UX, not decoration
- **Minimalist Brutalism** - Clean typography with bold gradients

### Color Palette
```css
--neon-cyan: #00f5ff
--neon-purple: #b026ff
--neon-pink: #ff2d92
--neon-green: #39ff14
--background: #09090b
--surface: #18181b
--border: #3f3f46
```

### Typography
- **Primary Font**: Inter (Google Fonts)
- **Mono Font**: JetBrains Mono (Google Fonts)
- **Font Weights**: 400, 500, 600, 700, 800

---

## ⚡ Frontend Stack

### Core Framework
| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 14.2.x | React framework with App Router |
| **React** | 18.2.x | UI component library |
| **TypeScript** | 5.3.x | Type-safe JavaScript |

### Styling
| Technology | Version | Purpose |
|------------|---------|---------|
| **Tailwind CSS** | 3.4.x | Utility-first CSS framework |
| **PostCSS** | 8.4.x | CSS processing |
| **Autoprefixer** | 10.4.x | Browser compatibility |

### Animation
| Technology | Version | Purpose |
|------------|---------|---------|
| **Framer Motion** | 11.0.x | Production-ready animations |

### UI Components
| Technology | Version | Purpose |
|------------|---------|---------|
| **Lucide React** | 0.400.x | Icon library |
| **clsx** | 2.1.x | Conditional classNames |
| **tailwind-merge** | 2.2.x | Merge Tailwind classes |

---

## 🔧 Backend & APIs

### Email Service
| Technology | Version | Purpose |
|------------|---------|---------|
| **Resend** | 4.0.x | Transactional email API |

### Analytics
| Technology | Version | Purpose |
|------------|---------|---------|
| **Vercel Analytics** | 1.6.x | Web analytics |

### API Routes
- `/api/contact` - Contact form submission handler

---

## 🛠 Development Tools

### Build & Development
| Tool | Purpose |
|------|---------|
| **ESLint** | Code linting |
| **TypeScript** | Static type checking |
| **Next.js CLI** | Development server & build |

### Type Definitions
- `@types/node`
- `@types/react`
- `@types/react-dom`

---

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts          # Contact form API
│   ├── hire-us/
│   │   ├── layout.tsx
│   │   └── page.tsx              # Hire Us page
│   ├── services/
│   │   ├── ai-bots/
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx          # AI Bots service page
│   │   ├── ui-ux-design/
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx          # UI/UX Design service page
│   │   └── web-development/
│   │       ├── layout.tsx
│   │       └── page.tsx          # Web Development service page
│   ├── favicon.ico
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Homepage
│   ├── robots.ts                 # SEO robots
│   └── sitemap.ts                # SEO sitemap
├── components/
│   ├── BentoGrid.tsx             # Bento grid showcase
│   ├── BotShowcase.tsx           # AI bot demo
│   ├── ErrorBoundary.tsx         # Error handling
│   ├── FloatingNav.tsx           # Navigation bar
│   ├── HeroSection.tsx           # Hero section
│   ├── index.ts                  # Component exports
│   ├── MagneticCTA.tsx           # CTA section
│   └── PageTransition.tsx        # Page transitions
└── lib/
    └── utils.ts                  # Utility functions
```

---

## 🚀 Deployment

### Platform
- **Vercel** - Edge deployment with automatic CI/CD

### Features
- Server-Side Rendering (SSR)
- Static Site Generation (SSG)
- Edge Functions for API routes
- Automatic HTTPS
- Global CDN

---

## 📊 SEO & Performance

### SEO Implementation
- Dynamic metadata per page
- Open Graph tags
- Twitter cards
- JSON-LD structured data
- XML sitemap
- Robots.txt

### Performance Optimizations
- Next.js Image optimization
- Font optimization (Google Fonts)
- Code splitting
- Tree shaking
- CSS purging via Tailwind

---

## 🎯 Key Features

1. **Responsive Design** - Mobile-first approach
2. **Dark Mode** - Native dark theme
3. **Animations** - Smooth 60fps animations with Framer Motion
4. **SEO Optimized** - Full meta tags, sitemap, structured data
5. **Fast Performance** - Optimized Core Web Vitals
6. **Type Safe** - Full TypeScript coverage
7. **Email Integration** - Contact form with Resend API
8. **Analytics** - Vercel Analytics integration

---

## 📝 Scripts

```bash
# Development
npm run dev       # Start dev server at localhost:3000

# Production
npm run build     # Create production build
npm run start     # Start production server

# Quality
npm run lint      # Run ESLint
```

---

## 🔗 Dependencies Summary

### Production Dependencies
```json
{
  "@vercel/analytics": "^1.6.1",
  "clsx": "^2.1.0",
  "framer-motion": "^11.0.0",
  "lucide-react": "^0.400.0",
  "next": "^14.2.33",
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "resend": "^4.0.0",
  "tailwind-merge": "^2.2.0"
}
```

### Development Dependencies
```json
{
  "@types/node": "^20.0.0",
  "@types/react": "^18.2.0",
  "@types/react-dom": "^18.2.0",
  "autoprefixer": "^10.4.0",
  "eslint": "^8.0.0",
  "eslint-config-next": "^14.2.0",
  "postcss": "^8.4.0",
  "tailwindcss": "^3.4.0",
  "typescript": "^5.3.0"
}
```

---

*Built with ❤️ by BLACKBOX Digital Agency*

