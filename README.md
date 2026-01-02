# Lead Signals SaaS MVP

A Next.js SaaS application that notifies subscribers about sales lead signals in real-time. Track funding announcements, job postings, technology changes, company growth, and executive changes to never miss a sales opportunity.

## Features

- 🔔 **Real-time Lead Signals**: Track 5 types of signals (funding, hiring, tech changes, growth, executive changes)
- 🎯 **Smart Subscriptions**: Subscribe to specific signal types that matter to you
- 📧 **Multi-channel Notifications**: Email and in-app notifications
- 💰 **Tiered Pricing**: Free tier (10 notifications/month) and Pro tier (unlimited)
- 🔐 **Secure Authentication**: Clerk-powered user authentication
- 📊 **Dashboard**: Beautiful feed UI with filtering and subscription management

## Tech Stack

- **Framework**: Next.js 16 with TypeScript and App Router
- **Styling**: Tailwind CSS
- **Authentication**: Clerk
- **Database**: PostgreSQL with Prisma ORM
- **Email**: Resend
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database (or use a free tier from [Supabase](https://supabase.com) or [Neon](https://neon.tech))
- [Clerk](https://clerk.com) account (free tier available)
- [Resend](https://resend.com) account (optional, for email notifications)

### Installation

1. **Clone and navigate to the project:**
   ```bash
   cd /Users/mandiadams/Documents/SaaSMVP/lead-signals
   npm install
   ```

2. **Set up environment variables:**
   
   Create a `.env.local` file with your credentials:
   ```env
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...

   # Database (PostgreSQL)
   DATABASE_URL="postgresql://user:password@host:5432/database?sslmode=require"

   # Email Notifications (Optional)
   RESEND_API_KEY=re_...
   ```

3. **Get your API keys:**

   **Clerk Authentication:**
   - Go to [dashboard.clerk.com](https://dashboard.clerk.com)
   - Create a new application
   - Copy your Publishable Key and Secret Key from the API Keys page

   **Database (Option 1 - Supabase):**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Go to Project Settings > Database
   - Copy the Connection String (URI) and add `?sslmode=require` at the end

   **Database (Option 2 - Neon):**
   - Go to [neon.tech](https://neon.tech)
   - Create a new project
   - Copy the connection string from your dashboard

   **Resend (Optional):**
   - Go to [resend.com](https://resend.com)
   - Create an API key from your dashboard

4. **Set up the database:**
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

5. **Run the development server:**
   ```bash
   npm run dev
   ```

6. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
lead-signals/
├── app/
│   ├── api/
│   │   ├── signals/         # Lead signals CRUD
│   │   ├── subscriptions/   # Subscription management
│   │   └── user/            # User profile
│   ├── dashboard/           # Main dashboard UI
│   ├── layout.tsx           # Root layout with Clerk
│   └── page.tsx             # Landing page
├── prisma/
│   └── schema.prisma        # Database schema
├── lib/
│   └── prisma.ts            # Prisma client
└── middleware.ts            # Clerk auth middleware
```

## Database Models

- **User**: Stores user info, subscription tier, and notification limits
- **LeadSignal**: All lead signals with type, company, description, source
- **SignalSubscription**: User subscriptions to specific signal types
- **NotificationPreference**: User notification settings (email/in-app/frequency)
- **Notification**: Notification history and delivery status

## API Routes

### `GET /api/signals`
Fetch lead signals (with optional type filtering)
- Query params: `type` (signal type), `limit` (max results)

### `POST /api/signals`
Create a new lead signal (admin only in production)

### `GET /api/subscriptions`
Get user's active subscriptions

### `POST /api/subscriptions`
Subscribe to a signal type
- Body: `{ signalType: string, keywords?: string[] }`

### `DELETE /api/subscriptions?id=xxx`
Unsubscribe from a signal type

### `GET /api/user`
Get current user profile (auto-creates if not exists)

## Signal Types

1. **💰 Funding Announcements**: Companies that raised funding
2. **💼 Job Postings**: New hiring signals indicating growth
3. **⚙️ Technology Changes**: Tech stack migrations and updates
4. **📈 Company Growth**: Revenue, employee count, market expansion
5. **👔 Executive Changes**: New C-level hires and leadership changes

## Adding Sample Data

To test the application, you can add sample signals via the API:

```bash
curl -X POST http://localhost:3000/api/signals \
  -H "Content-Type: application/json" \
  -d '{
    "companyName": "Acme Corp",
    "signalType": "funding",
    "description": "Raised $10M Series A led by XYZ Ventures",
    "source": "TechCrunch",
    "sourceUrl": "https://techcrunch.com/..."
  }'
```

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

The database migrations will run automatically during deployment.

## Pricing Tiers

- **Free**: 10 notifications/month, all signal types, email notifications
- **Pro**: Unlimited notifications, all signal types, email + in-app, priority support

## Future Enhancements

- [ ] Webhook integrations for real-time signal ingestion
- [ ] Slack/Discord notification channels
- [ ] Advanced filtering by company size, industry, location
- [ ] Signal analytics and trends
- [ ] Mobile app (React Native)
- [ ] CRM integrations (Salesforce, HubSpot)
- [ ] AI-powered signal quality scoring
- [ ] Team collaboration features

## Troubleshooting

**Build errors?**
- Make sure all environment variables are set correctly
- Check that your DATABASE_URL is accessible
- Verify Clerk keys are from the same application

**Database connection issues?**
- Ensure `?sslmode=require` is added to PostgreSQL connection strings
- Check firewall settings if using a cloud database
- Verify credentials are correct

**Clerk authentication not working?**
- Confirm you're using matching Publishable and Secret keys
- Check that middleware.ts is protecting the right routes

## License

MIT

## Support

For issues or questions, please open an issue on GitHub or contact support.
