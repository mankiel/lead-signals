# Deploying with SAM.gov Rate Limits

## Problem
SAM.gov API has daily quotas. If you hit the limit, you must wait until the next day (midnight UTC).

## Solution Architecture
```
┌─────────────────┐     Daily @ 2 AM UTC      ┌──────────────┐
│ GitHub Actions  │ ────────────────────────> │  SAM.gov API │
│   (Cron Job)    │                           │   (1 call)   │
└─────────────────┘                           └──────────────┘
         │
         │ Stores data
         ▼
┌─────────────────┐
│   PostgreSQL    │
│   (Supabase)    │
└─────────────────┘
         ▲
         │ Reads cached data
         │
┌─────────────────┐
│  Lead Signals   │
│   Dashboard     │
└─────────────────┘
```

## Deployment Steps

### 1. GitHub Actions (Recommended - Free)

**Benefits:**
- Free for public repos
- Runs daily automatically
- Manual trigger available
- Zero server costs

**Setup:**
1. The workflow file is already created at `.github/workflows/sync-sam-contracts.yml`
2. Add `DATABASE_URL` as a GitHub Secret:
   - Go to your repo → Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `DATABASE_URL`
   - Value: `postgresql://postgres:sumbuK-xonko3-sezwor@db.affkhjhyyrqmibqocohv.supabase.co:5432/postgres?sslmode=require`
3. Push this workflow to GitHub
4. It will run daily at 2 AM UTC

**Manual Trigger:**
- Go to Actions tab → "Sync SAM.gov Contracts" → Run workflow

---

### 2. Vercel Cron Jobs (Alternative)

**Benefits:**
- Integrated with Vercel
- Free tier includes cron jobs

**Setup:**
Create `app/api/cron/sync-contracts/route.ts`:
```typescript
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

export const maxDuration = 300 // 5 minutes timeout

export async function GET(request: Request) {
  // Verify cron secret to prevent unauthorized access
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  // Run your sync script here (same logic as fetch-real-sam-contracts.ts)
  
  return NextResponse.json({ success: true })
}
```

Add to `vercel.json`:
```json
{
  "crons": [{
    "path": "/api/cron/sync-contracts",
    "schedule": "0 2 * * *"
  }]
}
```

---

### 3. Multiple API Keys (Fallback Strategy)

**If you need more quota:**
1. Register additional API keys at https://api.data.gov/signup/ using different email addresses
2. Store in environment variables: `SAM_API_KEY_1`, `SAM_API_KEY_2`, etc.
3. Rotate through keys:

```typescript
const API_KEYS = [
  process.env.SAM_API_KEY_1,
  process.env.SAM_API_KEY_2,
  process.env.SAM_API_KEY_3,
].filter(Boolean)

async function fetchWithRetry() {
  for (const key of API_KEYS) {
    const response = await fetch(`https://api.sam.gov/...?api_key=${key}`)
    if (response.status !== 429) return response
  }
  throw new Error('All API keys exhausted')
}
```

---

### 4. Current Rate Limits

Based on testing:
- **Limit:** Unknown exact number, but ~8-10 calls hit the limit
- **Reset:** Daily at midnight UTC (00:00:00)
- **Error Code:** 429 with message "You have exceeded your quota"

---

### 5. Best Practices

**Optimize API Usage:**
- Fetch once daily (not on every user request)
- Use `limit=50` to get more data per call
- Cache in database (already implemented)
- Only fetch during low-traffic hours (2-4 AM UTC)

**Monitoring:**
- Check GitHub Actions logs for sync status
- Set up alerts for failed syncs
- Monitor database for data freshness

**Fallback:**
- Script already has sample data fallback
- If API fails, users still see placeholder data
- Display "Last updated" timestamp on dashboard

---

### 6. Production Checklist

- [ ] GitHub Actions workflow created
- [ ] `DATABASE_URL` added as GitHub Secret
- [ ] Workflow pushed to GitHub repository
- [ ] First manual run successful
- [ ] Daily sync verified (check after 2 AM UTC)
- [ ] Dashboard shows fresh data
- [ ] Error handling tested (manually trigger when quota exceeded)

---

## Troubleshooting

**"429 Rate Limit" Error:**
- Wait until next day (midnight UTC)
- OR register new API key with different email
- Fallback sample data will be loaded automatically

**GitHub Actions Not Running:**
- Check Actions tab is enabled (Settings → Actions → General)
- Verify `DATABASE_URL` secret is set
- Check workflow file syntax (YAML is sensitive to indentation)

**No Data in Dashboard:**
- Verify database connection works
- Check Prisma schema is generated (`npx prisma generate`)
- Run script manually to test: `npx tsx scripts/fetch-real-sam-contracts.ts`

---

## Cost Analysis

| Solution | Cost | Pros | Cons |
|----------|------|------|------|
| GitHub Actions | **Free** | Easy setup, reliable | Requires public repo or paid plan |
| Vercel Cron | **Free** | Integrated with Vercel | More complex setup |
| Manual Runs | **Free** | Full control | Requires manual intervention |
| Multiple Keys | **Free** | More quota | Manual email registration |

**Recommended:** GitHub Actions for automated, hands-off operation.
