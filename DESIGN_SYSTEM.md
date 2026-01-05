# Lead Signals Design System

## Color Palette

### Primary (Blue)
- **Primary-500**: `#3b82f6` - Main brand color
- **Primary-600**: `#2563eb` - Hover states
- **Primary-700**: `#1d4ed8` - Active states

### Semantic Colors
- **Success**: `#22c55e` - Positive actions, success states
- **Warning**: `#eab308` - Warnings, caution
- **Danger**: `#ef4444` - Errors, destructive actions

### Neutrals (Gray)
- **Gray-50**: `#f9fafb` - Backgrounds
- **Gray-100**: `#f3f4f6` - Subtle backgrounds
- **Gray-500**: `#6b7280` - Body text
- **Gray-900**: `#111827` - Headings

## Typography

### Font Family
- **Primary**: Inter (Google Fonts)
- **Fallback**: system-ui, sans-serif

### Font Sizes
- **xs**: 0.75rem (12px)
- **sm**: 0.875rem (14px)
- **base**: 1rem (16px)
- **lg**: 1.125rem (18px)
- **xl**: 1.25rem (20px)
- **2xl**: 1.5rem (24px)
- **3xl**: 1.875rem (30px)

### Font Weights
- **Regular**: 400
- **Medium**: 500
- **Semibold**: 600
- **Bold**: 700

## Spacing Scale
- **1**: 0.25rem (4px)
- **2**: 0.5rem (8px)
- **3**: 0.75rem (12px)
- **4**: 1rem (16px)
- **6**: 1.5rem (24px)
- **8**: 2rem (32px)
- **12**: 3rem (48px)

## Shadows
- **soft**: Subtle elevation
- **medium**: Standard cards
- **large**: Modals, popovers
- **xl**: Maximum elevation

## Border Radius
- **sm**: 0.25rem
- **md**: 0.5rem
- **lg**: 0.75rem
- **xl**: 1rem

## Components

### Button
```tsx
import Button from '@/app/components/ui/Button'

<Button variant="primary" size="md">Click me</Button>
```
**Variants**: primary, secondary, success, danger, ghost
**Sizes**: sm, md, lg

### Card
```tsx
import Card, { CardHeader, CardTitle } from '@/app/components/ui/Card'

<Card padding="md" hover>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  Content here
</Card>
```

### Badge
```tsx
import Badge from '@/app/components/ui/Badge'

<Badge variant="success" size="md">Active</Badge>
```
**Variants**: primary, success, warning, danger, gray
**Sizes**: sm, md

## Usage Guidelines

### Do's ✅
- Use primary color for main CTAs
- Maintain consistent spacing (multiples of 4)
- Use semantic colors appropriately
- Add hover states to interactive elements
- Use shadow-soft for cards by default

### Don'ts ❌
- Don't use more than 2-3 colors in one section
- Avoid inconsistent spacing
- Don't use danger color for non-destructive actions
- Avoid excessive shadows

## Animations
- **Duration**: 150-300ms
- **Easing**: ease-in-out, ease-out
- **Available**: fade-in, slide-up, slide-down, scale-in
