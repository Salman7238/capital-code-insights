

# CapitalCode — Due Diligence Deal Room

## Design System
- **Dark mode only** with a Bloomberg Terminal / Linear aesthetic
- Monospaced fonts (e.g., JetBrains Mono) for data displays
- Red/green color indicators for risk levels
- Minimal, high-contrast UI with sharp borders and subtle grid patterns
- Card-based layout with dark backgrounds and muted borders

---

## Page 1: Landing Page
- Full-screen dark landing with the **CapitalCode** logo/wordmark
- Centered input field: *"Enter GitHub Repository URL"*
- **"Generate Audit"** button that navigates to the audit dashboard
- Subtle tagline: *"Technical Due Diligence for Venture Capital"*
- Minimal, no-distraction design

---

## Page 2: Audit Report Dashboard
Pre-populated with mock data for a fictional company showing high risk signals.

### Header Section
- Company name, GitHub URL, and date of audit
- **Technical Health Score** (0–100) displayed as a large gauge/ring
- **Valuation Estimate** placeholder (e.g., "$14.5M")
- Status badges (e.g., "Series A", "High Risk")

### Risk Heatmap
- Visual grid representing code ownership across modules
- Red squares = single-contributor code (Key Person Risk)
- Green squares = well-distributed contributions
- Hover tooltips showing contributor details
- Legend explaining the color scale

### Asset Valuation Card
- **Technical Debt Liability** displayed in dollar format (e.g., "$1.2M")
- Breakdown bars: legacy code, test coverage gaps, dependency risks
- Trend indicator (increasing/decreasing)

### Compliance Section
- **License Risk** checklist (GPL detection, copyleft flags)
- **Security Posture** checklist (dependency vulnerabilities, secrets scanning)
- Red/green/yellow status indicators per item

---

## Page 3: Portfolio View
- Table listing multiple mock companies
- Columns: Company Name, Deal Stage, Technical Health Score, Bus Factor Risk, Capital Efficiency Score, Last Audit Date
- Sortable columns with red/green risk coloring
- Click a row to navigate to that company's audit report

---

## Mock Data
- One primary company ("NovaPay") with deliberately **high Key Person Risk** — 70% of code touched by one developer, GPL dependency flagged, 3 critical vulnerabilities
- 4–5 additional companies in the portfolio view at various risk levels to demonstrate range

---

## Technical Approach
- React + Tailwind + TypeScript (frontend only for now)
- Recharts for the health score gauge and heatmap visualization
- All data hardcoded as mock JSON — structured for easy Supabase migration later
- React Router for page navigation (Landing → Dashboard → Portfolio)

