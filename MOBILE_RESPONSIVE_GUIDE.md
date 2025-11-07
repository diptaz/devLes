# Mobile Responsive Design Guide - LesCatur

## Overview
Website LesCatur menggunakan sistem responsive 3-stage adaptive yang intelligent untuk memberikan pengalaman terbaik di semua ukuran layar.

## 3-Stage Responsive System

### Stage 1: Desktop (> 692px)
**Full Text Labels** - Tampilan lengkap dengan semua informasi
- Tabs: "Video Courses", "My Library", "Virtual Classes", "My Sessions", "AI Trainer", "About Us"
- Header buttons: "Cart", "Sign In", nama user lengkap
- Layout: Grid layout yang luas dengan spacing penuh
- Best for: Desktop monitors, large tablets landscape

### Stage 2: Tablet/Medium (421-692px)
**Short Text Labels** - Teks ringkas yang tetap jelas
- Tabs: "Courses", "Library", "Tutor", "Sessions", "AI", "About"
- Header buttons: Tetap menampilkan text
- Layout: Horizontal scrollable tabs dengan padding compact
- Best for: Tablets portrait, small laptops, large phones landscape

### Stage 3: Mobile Small (≤ 420px)
**Icon Only Mode** - Maksimal screen real estate
- Tabs: Hanya icon (Video, BookOpen, GraduationCap, Calendar, Brain, Info)
- Header buttons: Hanya icon (ShoppingCart, User, Avatar)
- Layout: Compact dengan center-aligned icons
- Best for: Smartphones portrait, small devices

## Technical Implementation

### Breakpoints
```css
/* Desktop */
@media (min-width: 693px) { /* Full text */ }

/* Tablet/Medium */
@media (min-width: 421px) and (max-width: 692px) { /* Short text */ }

/* Mobile Small */
@media (max-width: 420px) { /* Icon only */ }
```

### CSS Classes Used

#### Tab Text Classes
- `.tab-text-full` - Text lengkap (e.g., "Video Courses")
- `.tab-text-short` - Text pendek (e.g., "Courses")

Both are hidden automatically based on screen size via CSS media queries.

#### Header Text Class
- `.header-text` - Hides on ≤ 400px screens

### Component Structure

```tsx
<TabsTrigger value="courses" className="flex items-center gap-2">
  <Video className="w-4 h-4 flex-shrink-0" />
  <span className="tab-text-full">Video Courses</span>
  <span className="tab-text-short">Courses</span>
</TabsTrigger>
```

```tsx
<Button>
  <ShoppingCart className="w-5 h-5 mr-2 flex-shrink-0" />
  <span className="header-text">Cart</span>
</Button>
```

## Files Modified

1. **App.tsx**
   - Updated all TabsTrigger components with dual text spans
   - Added `.tab-text-full` and `.tab-text-short` classes
   - Maintains `.header-text` class for header buttons

2. **components/MobileResponsive.css**
   - 3-stage responsive breakpoints
   - Automatic text show/hide logic
   - Scrollable tab behavior for small screens
   - Compact padding adjustments

3. **styles/globals.css**
   - Base utility classes for `.tab-text-full` and `.tab-text-short`
   - Maintains `.header-text` utility class
   - Typography and spacing utilities

## Design Principles

### Progressive Disclosure
- Show more information when space allows
- Gracefully reduce detail as screen size decreases
- Never sacrifice usability for aesthetics

### Touch-Friendly
- All interactive elements maintain minimum 44x44px touch targets
- Icons are sized appropriately (16-20px)
- Adequate spacing between clickable elements

### Readability
- Short text labels are carefully chosen to be immediately recognizable
- Icons are universally understood symbols
- Consistent visual hierarchy across breakpoints

## Testing Checklist

Test the following screen sizes:

- [ ] **1920px** (Desktop FHD) - Full text visible
- [ ] **1366px** (Laptop HD) - Full text visible
- [ ] **768px** (Tablet portrait) - Full text visible
- [ ] **692px** (Breakpoint 1) - Short text begins
- [ ] **600px** (Medium tablet) - Short text visible
- [ ] **480px** (Large phone landscape) - Short text visible
- [ ] **432px** (Large phone) - Short text visible
- [ ] **420px** (Breakpoint 2) - Icon only begins
- [ ] **375px** (iPhone standard) - Icon only
- [ ] **360px** (Android standard) - Icon only
- [ ] **320px** (Small phones) - Icon only

## Maintenance Notes

### Adding New Tabs
When adding a new tab, always include both text versions:

```tsx
<TabsTrigger value="new-feature" className="flex items-center gap-2">
  <NewIcon className="w-4 h-4 flex-shrink-0" />
  <span className="tab-text-full">Full Feature Name</span>
  <span className="tab-text-short">Short</span>
</TabsTrigger>
```

### Guidelines for Short Text
- Keep to 1-2 words maximum
- Use common abbreviations if necessary
- Ensure it's still descriptive enough
- Test with non-technical users

### Icon Selection
- Use lucide-react icons for consistency
- Choose universally recognized symbols
- Avoid abstract or ambiguous icons
- Maintain visual balance across all tabs

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile Safari (iOS 14+)
- Chrome Mobile (Android 8+)

## Performance

- CSS-only media queries (no JavaScript overhead)
- No layout reflow on resize
- Smooth scrolling with `-webkit-overflow-scrolling: touch`
- Hidden elements use `display: none` (not rendered in DOM paint)

## Accessibility

- Screen readers announce full text regardless of display mode
- Touch targets meet WCAG 2.1 AA standards (44x44px minimum)
- Color contrast ratios maintained across all states
- Focus indicators clearly visible

---

Last Updated: November 2025
Version: 3.0 (3-Stage Adaptive System)
