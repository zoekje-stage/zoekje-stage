# Business Plan: Zoek je stage
## Internship Aggregation & Search Platform

**Version:** 1.0  
**Date:** January 2026  
**Location:** Netherlands  
**Website:** zoekjestage.nl

---

## Executive Summary

**Zoek je stage** is a comprehensive internship aggregation platform that consolidates internship opportunities from across the Netherlands into a single, searchable database. By scraping public internship listings from various sources and providing an intelligent search engine with real-time notifications, we solve the fragmented internship discovery problem for Dutch students.

### Mission Statement
To empower students to find their ideal internship by providing instant access to all available opportunities in the Netherlands, personalized to their interests and needs.

### Key Value Propositions
- **Comprehensive Coverage**: All Dutch internship opportunities in one place
- **Instant Search**: Fast, intelligent search across thousands of listings
- **Real-time Notifications**: Alerts when new matching opportunities appear
- **Personalized Matching**: Recommendations based on student interests and profile
- **Time-Saving**: No need to check dozens of websites manually

---

## Market Analysis

### Target Market

#### Primary Audience
- **MBO Students** (Secondary Vocational Education): ~500,000 students
- **HBO Students** (Higher Professional Education): ~450,000 students  
- **WO Students** (University Education): ~290,000 students
- **Total Addressable Market**: ~1.24 million students in the Netherlands

#### Secondary Audience
- Career changers seeking internship opportunities
- International students studying in the Netherlands
- Educational institutions seeking placement partners

### Market Need

**Current Pain Points:**
1. **Fragmentation**: Internships scattered across 50+ websites
2. **Time-Consuming**: Students spend 10+ hours/week searching
3. **Missing Opportunities**: New listings appear and fill quickly
4. **Poor Matching**: Generic job boards don't understand student needs
5. **Outdated Listings**: Many sites have expired opportunities

**Market Opportunity:**
- Dutch students are required to complete internships (1-2 per degree)
- Average student searches for internships 2-3 times during studies
- Estimated 400,000+ internship searches annually
- Growing trend toward practical education and dual learning

### Competition Analysis

| Competitor | Strengths | Weaknesses | Our Advantage |
|------------|-----------|------------|---------------|
| **Stageplaza.nl** | Established brand | Limited search, no aggregation | Real-time, comprehensive |
| **Indeed.nl** | Large general job board | Not internship-focused | Student-specific |
| **Nationale Vacaturebank** | Government-backed | Outdated UI, slow | Modern, fast search |
| **LinkedIn** | Professional network | Complex for students | Simplified, focused |
| **School Career Portals** | Direct from schools | Fragmented per school | Nationwide coverage |

**Competitive Advantages:**
- Only true aggregator for Dutch internships
- Real-time notification system
- Instant search technology
- Student-first design
- Free for students

---

## Product & Services

### Core Platform Features

#### 1. **Internship Aggregation Engine**
- Web scraping system collecting data from:
  - University career portals
  - Company career pages
  - Job boards (Indeed, Glassdoor, etc.)
  - Government sites
  - Industry-specific platforms
  - Company LinkedIn pages
- Daily updates (minimum), hourly for major sources
- Data normalization and deduplication
- Quality scoring and spam filtering

#### 2. **Instant Search Engine**
- Full-text search across all listings
- Filters by:
  - Study field/discipline
  - Location (city, province, remote)
  - Company size
  - Industry sector
  - Start date
  - Duration
  - Compensation (paid/unpaid)
- Real-time results (< 100ms response time)
- Intelligent ranking based on relevance

#### 3. **Smart Notifications System**
- Email alerts for new matching internships
- Daily/weekly digest options
- Push notifications (PWA)
- Custom search tracking (save searches)
- "Dream company" alerts

#### 4. **Student Profile & Matching**
- Create profile with interests, skills, preferences
- AI-powered recommendations
- Match score for each listing
- Saved internships and applications tracking
- Application deadline reminders

#### 5. **Company Insights**
- Company profiles aggregated from multiple sources
- Employee reviews (where available)
- Previous internship experiences (ratings)
- Company culture indicators
- Response rate statistics

### Technical Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    User Interface                        │
│              (Next.js, React, TailwindCSS)              │
└─────────────────────────────────────────────────────────┘
                            │
┌─────────────────────────────────────────────────────────┐
│                      API Layer                           │
│              (Next.js API Routes / Express)             │
└─────────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
┌───────▼────────┐ ┌────────▼────────┐ ┌───────▼────────┐
│ Search Engine  │ │  User Service   │ │ Notifications  │
│  (Algolia/     │ │  (Auth, Prefs)  │ │   Service      │
│   Meilisearch) │ │                 │ │  (Email/Push)  │
└───────┬────────┘ └────────┬────────┘ └───────┬────────┘
        │                   │                   │
┌───────▼───────────────────▼───────────────────▼────────┐
│              Database (PostgreSQL)                      │
│    - Internships  - Users  - Searches  - Notifications │
└────────────────────────────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────┐
│              Scraping Infrastructure                     │
│  - Python scrapers (Scrapy/Playwright)                  │
│  - Job queue (Bull/Redis)                               │
│  - Scheduling (Cron jobs)                               │
│  - Data validation & normalization                      │
└─────────────────────────────────────────────────────────┘
```

---

## Business Model

### Revenue Streams

#### Phase 1: User Growth (Months 1-12)
**Focus:** Free for students, build user base
- Goal: 10,000+ registered users
- No monetization, focus on product-market fit

#### Phase 2: Employer Services (Months 12-24)
1. **Featured Listings** (€99-299/month per company)
   - Highlighted in search results
   - Company logo and branding
   - Priority placement
   - Analytics dashboard

2. **Company Pages** (€49/month)
   - Enhanced company profile
   - Multiple internship slots
   - Direct messaging with students
   - Application tracking

3. **Recruitment Package** (€499-999/month)
   - Unlimited featured listings
   - Access to candidate database
   - Direct contact with matched students
   - Priority support

#### Phase 3: Premium Features (Months 18+)
1. **Premium Student Account** (€4.99/month or €39/year)
   - Advanced filters and search
   - Unlimited saved searches
   - Resume builder
   - Application tracking
   - Interview preparation resources
   - Early access to new listings

2. **Educational Institution Licenses** (€999-4,999/year)
   - White-label integration
   - Student placement tracking
   - Analytics for career services
   - API access

#### Phase 4: Data & Insights (Months 24+)
1. **Market Reports** (€499-1,999/report)
   - Internship market trends
   - Salary benchmarks by field
   - Regional analysis
   - Industry insights

2. **API Access** (€299+/month)
   - For career platforms
   - For educational software
   - For research purposes

### Projected Revenue (Conservative)

| Year | Users | Paid Companies | Revenue (EUR) |
|------|-------|----------------|---------------|
| Year 1 | 10,000 | 0 | €0 |
| Year 2 | 50,000 | 50 | €180,000 |
| Year 3 | 150,000 | 200 | €720,000 |
| Year 4 | 300,000 | 500 | €1,800,000 |
| Year 5 | 500,000 | 1,000 | €3,600,000 |

*Assumptions: Average €300/month per paying company, premium user adoption in Year 3+*

---

## Legal & Compliance

### Web Scraping Legality

**Legal Basis:**
- Scraping **publicly available data** is generally legal in the EU (Case C-202/12)
- Must comply with:
  - Terms of Service of scraped sites
  - GDPR for personal data
  - Database rights (if applicable)
  - robots.txt guidelines

**Best Practices:**
1. **Respect robots.txt**: Honor crawl delays and disallowed paths
2. **Rate Limiting**: Don't overload source servers
3. **Attribution**: Link back to original sources
4. **No Login Required**: Only scrape publicly accessible data
5. **User-Agent**: Identify our bot clearly
6. **Contact Info**: Provide opt-out mechanism

**Risk Mitigation:**
- Legal review of scraping practices
- Terms of Service that clarify we're an aggregator
- Quick response to takedown requests
- Insurance coverage

### GDPR Compliance

**Data We Collect:**
- **Student Data**: Email, study info, preferences (with consent)
- **Internship Data**: Public listings (no personal data)
- **Analytics**: Anonymized usage data

**Compliance Measures:**
- Clear privacy policy
- Cookie consent banner
- Right to access/delete data
- Data minimization
- Secure storage (encryption)
- GDPR officer/contact

### Terms of Service

Key clauses:
- Platform is aggregator, not employer
- No guarantee of accuracy
- Students apply directly to companies
- Limitation of liability
- Intellectual property rights

---

## Marketing Strategy

### Phase 1: Launch & Awareness (Months 1-6)

**Channels:**
1. **Social Media** (Instagram, LinkedIn, TikTok)
   - Student influencer partnerships
   - Educational content
   - Success stories
   - Internship tips

2. **University Partnerships**
   - Present at career fairs
   - Guest lectures
   - Student organization sponsorships
   - Flyers in career centers

3. **Content Marketing**
   - Blog: "How to find internships"
   - YouTube: Application tips
   - Podcast: Student success stories
   - Newsletter: Weekly opportunities

4. **SEO & SEM**
   - Optimize for "stage [field] nederland"
   - Google Ads for high-intent searches
   - Organic content strategy

### Phase 2: Growth (Months 6-18)

**Referral Program:**
- Students refer friends: both get premium features
- Company referrals: discount on services

**Community Building:**
- Student ambassador program (10-20 universities)
- Online forum for internship advice
- LinkedIn group
- Regular webinars

**PR & Media:**
- Press releases for milestones
- Interviews in student media
- Guest articles in education publications
- Award applications

### Phase 3: Scale (Months 18+)

**Partnerships:**
- Educational institutions (official career partner)
- Student unions and organizations
- Professional associations
- Corporate HR software integrations

**Expansion:**
- Additional services (resume review, career coaching)
- International markets (Belgium, Germany)
- Adjacent markets (junior positions, traineeships)

---

## Operations Plan

### Team Structure

**Phase 1 (Months 1-12): Core Team**
- **Founder/CEO** (1) - Strategy, fundraising
- **CTO/Lead Developer** (1) - Technical architecture
- **Full-Stack Developer** (1-2) - Product development
- **Scraping Engineer** (1) - Data collection infrastructure
- **Marketing/Growth** (1) - User acquisition
- **Part-time Legal Advisor** - Compliance

**Phase 2 (Months 12-24): Growth Team**
- Add: Customer Success (2)
- Add: Sales (2)
- Add: Content Creator (1)
- Add: Data Analyst (1)
- Scale: Developers (2-3)

### Development Roadmap

**Q1 2026: MVP Launch**
- [ ] Basic scraping (10-15 sources)
- [ ] Search functionality
- [ ] User registration
- [ ] Email notifications
- [ ] Mobile responsive design
- [ ] Launch with 5,000+ listings

**Q2 2026: Enhancement**
- [ ] Expand to 30+ sources
- [ ] Saved searches
- [ ] Profile creation
- [ ] Improved search filters
- [ ] Analytics dashboard (internal)
- [ ] 10,000+ active listings

**Q3 2026: Monetization Prep**
- [ ] Company portal development
- [ ] Featured listings system
- [ ] Payment integration
- [ ] Company analytics
- [ ] API development

**Q4 2026: Scaling**
- [ ] Premium student features
- [ ] Mobile app (PWA enhancement)
- [ ] AI matching algorithm
- [ ] 50+ scraping sources
- [ ] 50,000+ users target

### Key Metrics (KPIs)

**User Metrics:**
- Monthly Active Users (MAU)
- User registration rate
- Search queries per user
- Time to first application
- User retention (30/60/90 day)

**Data Metrics:**
- Number of active listings
- Scraping success rate
- Data freshness (< 24 hours)
- Duplicate detection accuracy
- Coverage (% of market)

**Business Metrics:**
- Customer Acquisition Cost (CAC)
- Lifetime Value (LTV)
- Conversion rate (free to paid companies)
- Monthly Recurring Revenue (MRR)
- Churn rate

---

## Financial Projections

### Startup Costs (Year 1)

| Category | Cost (EUR) |
|----------|------------|
| **Development** | |
| - Tech infrastructure (hosting, services) | €6,000 |
| - Development tools & licenses | €2,000 |
| **Legal & Admin** | |
| - Business registration | €500 |
| - Legal consultation | €5,000 |
| - Accounting services | €2,400 |
| **Marketing** | |
| - Website & branding | €3,000 |
| - Digital marketing | €12,000 |
| - Events & partnerships | €5,000 |
| **Operations** | |
| - Office/coworking | €3,000 |
| - Software subscriptions | €2,000 |
| - Miscellaneous | €3,000 |
| **Salaries** (if bootstrapped, adjust) | €120,000 |
| **Total Year 1** | **€163,900** |

### Funding Strategy

**Option 1: Bootstrap**
- Founder investment: €20,000-50,000
- Part-time development while employed
- Minimize costs, organic growth
- Monetize early (Month 6-9)

**Option 2: Pre-Seed Funding**
- Target: €150,000-300,000
- Sources:
  - Angel investors (education tech focused)
  - Dutch startup grants (MIT, Innovation Credit)
  - University incubators
  - EdTech accelerators
- Equity: 10-15%

**Option 3: Accelerator**
- Apply to: Rockstart, Startupbootcamp EdTech
- Typical package: €15,000-50,000 + mentorship
- 6-month program
- Access to investor network

### Break-Even Analysis

**Monthly Fixed Costs (Year 2):**
- Infrastructure: €500
- Team (3 people at €3,500 avg): €10,500
- Marketing: €2,000
- Operations: €1,000
- **Total: €14,000/month**

**Break-even:** 47 paying companies at €300/month
**Target:** Achieve by Month 18

---

## Risk Analysis

### Technical Risks

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Scraping blocks | High | Medium | Multiple methods, API partnerships, rate limiting |
| Data quality issues | Medium | Medium | Validation layers, manual review, user reporting |
| Scaling challenges | Medium | Low | Cloud infrastructure, performance monitoring |
| Security breach | High | Low | Security audits, encryption, compliance |

### Business Risks

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Low user adoption | High | Medium | MVP testing, university partnerships, referrals |
| Competitors enter | Medium | High | First-mover advantage, superior UX, community |
| Legal challenges | High | Low | Legal review, compliance, quick response |
| Monetization failure | High | Medium | Multiple revenue streams, B2B focus |

### Market Risks

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Economic downturn | Medium | Medium | Focus on value, free student tier |
| Changes in education | Low | Low | Adapt to trends, diversify offerings |
| Reduced internships | Medium | Low | Expand to junior jobs, international |

---

## Success Factors

### Critical Success Factors

1. **Data Quality & Coverage**
   - Must have 80%+ of available internships
   - Fresh data (updated daily)
   - Accurate information

2. **User Experience**
   - Fast search (< 1 second)
   - Mobile-first design
   - Simple, intuitive interface

3. **Student Trust**
   - Free forever for students
   - No spam or misleading listings
   - Transparent about data sources

4. **Company Value**
   - Quality candidates
   - Easy posting/management
   - Clear ROI

5. **Network Effects**
   - More users attract more companies
   - More companies attract more users
   - Build strong community

### Exit Strategy (5-7 Years)

**Potential Acquirers:**
- **Job Boards**: Indeed, Glassdoor, LinkedIn
- **Education Platforms**: Studocu, Studyflow
- **HR Tech**: Recruitee, Homerun, Jobdigger
- **University Networks**: StudyPortals, Education Group

**Estimated Valuation:** €10-30M (based on 500K users, €3M revenue)

---

## Appendix

### Target Scraping Sources

**University Career Portals (40+):**
- UvA, VU, TU Delft, Erasmus, etc.

**Job Boards:**
- Indeed.nl, Nationale Vacaturebank, Stageplaza, Intermediair

**Company Sites:**
- Direct career pages of Fortune 500 Netherlands

**Government:**
- UWV, ROC portals

**Industry Specific:**
- Zorg & Welzijn, Engineering boards, Marketing platforms

### Technology Stack

**Frontend:**
- Next.js 16+ (React 19)
- TypeScript
- Tailwind CSS
- PWA support

**Backend:**
- Next.js API Routes / Node.js
- PostgreSQL (database)
- Redis (caching, queues)
- Algolia/Meilisearch (search)

**Scraping:**
- Python (Scrapy framework)
- Playwright (JavaScript rendering)
- Proxy rotation
- Queue management (Bull)

**Infrastructure:**
- Vercel (frontend hosting)
- Railway/Render (backend)
- AWS S3 (storage)
- Cloudflare (CDN, DDoS protection)

**Monitoring:**
- Sentry (error tracking)
- Plausible/Google Analytics
- Uptime monitoring
- Log aggregation

---

## Contact & Next Steps

**Immediate Actions:**
1. Validate assumptions with student interviews (50+)
2. Analyze top 10 internship sources
3. Build MVP scraper for 3-5 sources
4. Create landing page + waitlist
5. Pitch to 2-3 university career centers

**Contact:**
- Website: zoekjestage.nl
- Email: info@zoekjestage.nl

---

**Document Status:** Living document, to be updated quarterly
**Next Review:** April 2026
**Owner:** Founder/CEO

