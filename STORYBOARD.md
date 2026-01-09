# Lead Signals - Application Storyboard

## 📋 Executive Summary

**Lead Signals** is a government contract intelligence platform that helps businesses track federal contract opportunities, monitor deadlines, and receive alerts for relevant solicitations.

**Target Users:** Government contractors, business development professionals, proposal managers
**Core Value:** Never miss a government contract opportunity

---

## 👥 User Personas

### Persona 1: Sarah - Business Development Manager
- **Role:** BD Manager at mid-sized defense contractor
- **Goals:** Find new contract opportunities, track deadlines, stay ahead of competition
- **Pain Points:** Manual SAM.gov searches, missed deadlines, information overload
- **Tech Savvy:** High - uses multiple SaaS tools daily

### Persona 2: Mike - Small Business Owner
- **Role:** Owner of IT consulting firm
- **Goals:** Grow business through federal contracts, automate opportunity tracking
- **Pain Points:** Limited time, unfamiliar with government contracting process
- **Tech Savvy:** Medium - prefers simple, intuitive interfaces

---

## 🗺️ User Journey Map

### Phase 1: Discovery & Onboarding
```
Landing Page → Sign Up → Authentication (Clerk) → Dashboard
```

**Key Actions:**
- User discovers Lead Signals through search or referral
- Reviews value proposition and features
- Creates account using email or OAuth (Google, GitHub)
- Completes Clerk authentication flow
- Lands on dashboard

**Success Metrics:** Account creation rate, time to first dashboard view

---

### Phase 2: Dashboard Overview
```
Dashboard → View Stats → Explore Charts → Review Recent Signals
```

**Screen Layout:**
1. **Header**
   - Logo with lightning bolt icon
   - "Lead Signals" branding with gradient
   - User profile button (Clerk UserButton)
   
2. **Welcome Banner**
   - Gradient background (blue-600 to blue-800)
   - Personalized greeting
   - Motivational tagline
   
3. **Key Metrics (3 Stat Cards)**
   - Active Opportunities (Blue border, document icon)
   - Subscriptions (Green border, bell icon)
   - Urgent Deadlines (Red border, clock icon)
   - Each card shows: Icon, Label, Large Number, Subtitle
   - Hover effect: Lift + shadow
   
4. **Analytics Section (2 Charts)**
   - **Office Chart:** Bar chart showing active solicitations by office
   - **Deadline Histogram:** Color-coded bars for deadline urgency
   
5. **Budget Trends Chart**
   - Multi-line stock chart showing agency funding over time
   - Toggle between "All Agencies" and "DoD Breakdown"
   - 6 agencies tracked: DOD, HHS, VA, DHS, NASA, DOE
   - DoD drill-down: Army, Navy, Air Force, Defense Logistics

**User Actions:**
- Scan key metrics at a glance
- Interact with charts (hover for details, toggle views)
- Understand trends and patterns

---

### Phase 3: Subscription Management
```
Dashboard → Subscription Section → Toggle Subscription Types → Save Preferences
```

**Screen Elements:**
1. **Subscription Card**
   - Gradient header (blue-600 to blue-700)
   - Title: "Your Subscriptions"
   - Subtitle: "Get notified about new opportunities"
   
2. **Subscription Buttons (6 Types)**
   - Funding Announcements
   - New Job Postings
   - Technology Changes
   - Company Growth
   - Executive Changes
   - Government Contracts
   
3. **Interaction States:**
   - Default: White background, gray border
   - Active: Blue border, blue-50 background, checkmark icon
   - Hover: Shadow, slight border color change
   
**User Actions:**
- Click to subscribe/unsubscribe to signal types
- Visual feedback with checkmark icon
- Immediate save (no submit button needed)

---

### Phase 4: Signal Discovery & Filtering
```
Subscription Section → Signals Feed → Apply Filters → Sort Results → Paginate
```

**Screen Elements:**
1. **Feed Header**
   - Gradient background (gray-800 to gray-900)
   - Title: "Recent Signals"
   - Filter Controls:
     - Sort dropdown (Newest, Most Elapsed, Least Elapsed)
     - Type filter (All Types, or specific signal type)
     - Subtier filter (for government contracts)
   
2. **Pagination Controls**
   - Shows: "X-Y of Z opportunities"
   - Items per page selector (10, 20, 50, 100)
   - Navigation: ← Previous | Page X of Y | Next →
   - Blue badge highlighting current page
   
3. **Signal Cards**
   Each card displays:
   - Icon badge (matching signal type)
   - Company/Agency name (bold, large text)
   - Signal type badge
   - Contract type badge (for gov contracts)
   - Solicitation number
   - Description
   - Timeline progress bar (posted date → deadline)
   - Document attachments (if available)
   - Action buttons:
     - "View Opportunity" (primary blue button)
     - Bookmark icon (for saving)

**User Actions:**
- Filter by signal type or subtier
- Sort by recency or deadline urgency
- Scan signal cards
- Click to view full opportunity on SAM.gov
- Bookmark interesting signals
- Navigate pages to see more results

---

### Phase 5: Signal Details & Actions
```
Signal Card → View Timeline → Check Documents → Visit Source → Bookmark
```

**Detailed Signal Card Elements:**

1. **Header Section**
   - Icon badge with hover effect
   - Company/Agency name
   - Type badge
   
2. **Contract Metadata** (Government Contracts Only)
   - Contract type badge (FFP, CPFF, T&M, etc.)
   - Solicitation number
   
3. **Description**
   - Full opportunity description
   - Key requirements
   
4. **Timeline Visualization**
   - Progress bar showing time elapsed
   - Posted date → Current time → Deadline
   - Color-coded urgency (red < 7 days, yellow < 14 days, green > 14 days)
   
5. **Documents Section**
   - Count of attached documents
   - Note about contract types in documents
   - Links to first 3 documents
   - "Show more" indicator if > 3 documents
   
6. **Footer Actions**
   - Source attribution
   - Date posted
   - "View Opportunity" button → Opens SAM.gov in new tab
   - Bookmark button for saving

**User Actions:**
- Read full opportunity details
- Assess timeline urgency
- Download contract documents
- Visit SAM.gov for complete information
- Bookmark for later review

---

## 📱 Responsive Design Breakpoints

### Desktop (1280px+)
- Full 3-column stat cards
- Side-by-side chart layout
- 6 subscription buttons per row
- Expanded signal cards

### Tablet (768px - 1279px)
- 2-column stat cards for first two, third wraps
- Stacked charts
- 3 subscription buttons per row
- Compressed signal cards

### Mobile (< 768px)
- Single column stat cards
- Stacked charts with scroll
- 2 subscription buttons per row
- Simplified signal cards
- Condensed pagination controls

---

## 🎨 Visual Design System

### Color Palette
```
Primary Blue: #3b82f6 (blue-600)
Dark Blue: #1e40af (blue-800)
Light Blue: #dbeafe (blue-50)

Success Green: #10b981 (green-500)
Warning Yellow: #eab308 (yellow-500)
Danger Red: #dc2626 (red-600)
Orange: #f97316 (orange-500)

Gray Scale:
- 50: #f9fafb (backgrounds)
- 100: #f3f4f6 (hover states)
- 200: #e5e7eb (borders)
- 600: #4b5563 (text secondary)
- 800: #1f2937 (text primary)
- 900: #111827 (headers)
```

### Typography
```
Font Family: Inter (sans-serif)
Headings: 600-700 weight
Body: 400-500 weight
Small text: 300 weight

Sizes:
- Hero: 3xl (2.25rem)
- Card Numbers: 4xl (2.5rem)
- Headings: xl-2xl (1.25-1.5rem)
- Body: base (1rem)
- Small: sm-xs (0.875-0.75rem)
```

### Spacing
```
Card Padding: 6 (1.5rem)
Section Gaps: 6-8 (1.5-2rem)
Element Gaps: 3-4 (0.75-1rem)
Border Radius: lg-xl (0.5-0.75rem)
```

### Shadows
```
Default: shadow-md
Hover: shadow-lg
Buttons: shadow-sm
```

---

## 🔄 Key Interactions & Animations

### Hover Effects
1. **Stat Cards**
   - Transform: translateY(-4px)
   - Shadow: md → lg
   - Icon scale: 100% → 110%
   - Duration: 300ms

2. **Signal Cards**
   - Background: white → blue-50/30
   - Icon background: blue-100 → blue-200
   - Duration: 200ms

3. **Buttons**
   - Background color shift
   - Shadow increase
   - Duration: 150ms

### Loading States
1. **Initial Dashboard Load**
   - Stat cards: Fade in from top
   - Charts: Slide in from sides
   - Stagger timing: 100ms between elements

2. **Signal Feed Loading**
   - Show 3 skeleton cards
   - Pulse animation on backgrounds
   - Replace with actual data when loaded

3. **Empty States**
   - Icon with gray background circle
   - Bold heading
   - Descriptive text
   - Centered layout

### Transitions
- All color changes: 150-200ms
- All size changes: 300ms
- All position changes: 200ms
- Easing: ease-in-out or ease

---

## 🔔 Notification Flow (Future Feature)

### Email Notifications
```
Signal Matches Subscription → Generate Email → Send via SendGrid → User Receives Alert
```

**Email Content:**
- Subject: "New [Signal Type] Alert - [Company Name]"
- Header with Lead Signals branding
- Signal summary
- Key deadline information
- "View in Dashboard" CTA button
- Unsubscribe link

---

## 📊 Data Flow Architecture

### Signal Creation
```
SAM.gov API → Scripts (fetch-real-sam-contracts.ts) → Database (PostgreSQL/Supabase) → API Route (/api/signals) → Dashboard
```

### Statistics
```
Database → Aggregation Queries → API Routes (/api/stats/*) → Charts
```

### Subscriptions
```
User Action → API Route (/api/subscriptions) → Database → Update UI
```

---

## 🎯 Key User Scenarios

### Scenario 1: New User Onboarding
**Goal:** Find first relevant contract opportunity

1. Sarah signs up for Lead Signals
2. Lands on dashboard, sees welcome banner
3. Scans stat cards - sees 156 active opportunities
4. Scrolls to subscriptions
5. Clicks "Government Contracts" to subscribe
6. Scrolls to signals feed
7. Filters by "Government Contracts"
8. Sorts by "Least Elapsed %" to find newest opportunities
9. Finds relevant Army contract
10. Clicks "View Opportunity" to see full details on SAM.gov
11. Bookmarks for team review

**Success:** User found relevant opportunity in < 2 minutes

---

### Scenario 2: Daily Check-in
**Goal:** Monitor deadlines and new opportunities

1. Mike logs into Lead Signals
2. Checks "Urgent Deadlines" stat - sees 12 due within 7 days
3. Reviews Deadline Histogram - most in "0-3 days" bucket
4. Filters signals by urgent deadlines
5. Reviews top 3 opportunities
6. Downloads contract documents for one
7. Sets calendar reminder for proposal deadline

**Success:** User stays on top of urgent opportunities

---

### Scenario 3: Strategic Planning
**Goal:** Understand agency budget trends

1. Sarah opens dashboard
2. Scrolls to Agency Budget Chart
3. Sees DOD funding trending upward
4. Clicks "View DoD Breakdown"
5. Identifies Navy has highest growth
6. Plans to focus BD efforts on Navy contracts
7. Returns to signals feed
8. Filters for Navy-specific opportunities

**Success:** User makes data-driven BD decisions

---

## 🚀 Future Enhancements

### Phase 2 Features
1. **Advanced Search**
   - Keyword search across descriptions
   - NAICS code filtering
   - Set-aside filtering (Small Business, 8(a), etc.)
   
2. **Saved Searches**
   - Save filter combinations
   - Name and organize searches
   - Quick access from dropdown

3. **Bookmarks/Favorites**
   - Save interesting opportunities
   - Organize into folders
   - Add notes and tags

4. **Team Collaboration**
   - Share opportunities with team
   - Assign opportunities to team members
   - Comment threads on signals

5. **Email Digests**
   - Daily/weekly summary emails
   - Customizable digest frequency
   - Highlight urgent deadlines

6. **Mobile App**
   - Native iOS/Android apps
   - Push notifications
   - Offline access to bookmarked signals

7. **AI Recommendations**
   - ML model learns user preferences
   - Suggests relevant opportunities
   - Predicts win probability

8. **Calendar Integration**
   - Sync deadlines to Google/Outlook
   - Proposal timeline templates
   - Team availability checking

---

## 📈 Success Metrics

### User Engagement
- Daily Active Users (DAU)
- Weekly Active Users (WAU)
- Average session duration
- Signals viewed per session
- Subscription adoption rate

### Feature Usage
- Chart interactions
- Filter usage frequency
- Bookmark conversion rate
- External link clicks (SAM.gov)
- Document downloads

### Business Metrics
- User retention rate (30/60/90 day)
- Conversion from free to paid (future)
- Customer satisfaction (NPS score)
- Support ticket volume

---

## 🛠️ Technical Architecture Notes

### Frontend Stack
- Next.js 16.1.1 (App Router)
- React 19.2.3
- TypeScript 5
- Tailwind CSS v4
- Recharts 3.6.0 (Charts)

### Backend Stack
- Next.js API Routes
- Prisma ORM 6.19.1
- PostgreSQL (Supabase)
- Clerk Authentication 6.36.5

### Deployment
- Vercel (auto-deploy from GitHub)
- GitHub: mankiel/lead-signals
- Environment: Production

### Data Sources
- SAM.gov API
- USASpending.gov API
- Custom web scraping scripts

---

## 🎬 Conclusion

This storyboard outlines the complete user experience for Lead Signals, from initial discovery through daily usage patterns. The application prioritizes:

1. **Clarity** - Clear visual hierarchy and simple navigation
2. **Speed** - Fast loading, efficient filtering, quick access to key info
3. **Intelligence** - Data-driven insights through charts and trends
4. **Actionability** - Easy access to source documents and deadlines

The design balances professional aesthetics with functional usability, ensuring users can quickly find and act on government contract opportunities.

---

**Document Version:** 1.0  
**Last Updated:** January 8, 2026  
**Maintained By:** Lead Signals Team
