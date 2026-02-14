export interface Contributor {
  name: string;
  commits: number;
  linesChanged: number;
  percentage: number;
}

export interface ModuleOwnership {
  module: string;
  contributors: number;
  primaryContributor: string;
  primaryPercentage: number;
  risk: "critical" | "high" | "medium" | "low" | "safe";
}

export interface ComplianceItem {
  label: string;
  status: "pass" | "fail" | "warning";
  detail: string;
}

export interface TechDebtBreakdown {
  category: string;
  amount: number;
  percentage: number;
}

export interface Company {
  id: string;
  name: string;
  githubUrl: string;
  auditDate: string;
  dealStage: string;
  healthScore: number;
  valuationEstimate: string;
  busFactor: number;
  capitalEfficiency: number;
  techDebtLiability: string;
  techDebtTrend: "increasing" | "decreasing" | "stable";
  techDebtBreakdown: TechDebtBreakdown[];
  contributors: Contributor[];
  moduleOwnership: ModuleOwnership[];
  licenseCompliance: ComplianceItem[];
  securityPosture: ComplianceItem[];
}

export const companies: Company[] = [
  {
    id: "novapay",
    name: "NovaPay",
    githubUrl: "https://github.com/novapay/core-platform",
    auditDate: "2026-02-10",
    dealStage: "Series A",
    healthScore: 34,
    valuationEstimate: "$14.5M",
    busFactor: 1,
    capitalEfficiency: 42,
    techDebtLiability: "$1.2M",
    techDebtTrend: "increasing",
    techDebtBreakdown: [
      { category: "Legacy Code", amount: 480000, percentage: 40 },
      { category: "Test Coverage Gaps", amount: 360000, percentage: 30 },
      { category: "Dependency Risks", amount: 240000, percentage: 20 },
      { category: "Documentation Debt", amount: 120000, percentage: 10 },
    ],
    contributors: [
      { name: "Alex Chen", commits: 1847, linesChanged: 142000, percentage: 70 },
      { name: "Sarah Kim", commits: 312, linesChanged: 28000, percentage: 14 },
      { name: "James Wu", commits: 198, linesChanged: 18500, percentage: 9 },
      { name: "Maria Lopez", commits: 145, linesChanged: 14200, percentage: 7 },
    ],
    moduleOwnership: [
      { module: "payments/core", contributors: 1, primaryContributor: "Alex Chen", primaryPercentage: 96, risk: "critical" },
      { module: "payments/gateway", contributors: 1, primaryContributor: "Alex Chen", primaryPercentage: 91, risk: "critical" },
      { module: "auth/oauth", contributors: 2, primaryContributor: "Alex Chen", primaryPercentage: 78, risk: "high" },
      { module: "auth/session", contributors: 1, primaryContributor: "Alex Chen", primaryPercentage: 88, risk: "critical" },
      { module: "api/routes", contributors: 3, primaryContributor: "Sarah Kim", primaryPercentage: 52, risk: "medium" },
      { module: "api/middleware", contributors: 2, primaryContributor: "Alex Chen", primaryPercentage: 73, risk: "high" },
      { module: "db/migrations", contributors: 2, primaryContributor: "James Wu", primaryPercentage: 61, risk: "medium" },
      { module: "db/models", contributors: 3, primaryContributor: "Alex Chen", primaryPercentage: 45, risk: "low" },
      { module: "ui/dashboard", contributors: 2, primaryContributor: "Maria Lopez", primaryPercentage: 68, risk: "high" },
      { module: "ui/components", contributors: 4, primaryContributor: "Maria Lopez", primaryPercentage: 38, risk: "safe" },
      { module: "utils/crypto", contributors: 1, primaryContributor: "Alex Chen", primaryPercentage: 100, risk: "critical" },
      { module: "utils/logging", contributors: 3, primaryContributor: "Sarah Kim", primaryPercentage: 42, risk: "safe" },
      { module: "tests/unit", contributors: 2, primaryContributor: "Sarah Kim", primaryPercentage: 55, risk: "medium" },
      { module: "tests/e2e", contributors: 1, primaryContributor: "James Wu", primaryPercentage: 89, risk: "critical" },
      { module: "infra/docker", contributors: 2, primaryContributor: "Alex Chen", primaryPercentage: 82, risk: "high" },
      { module: "infra/ci-cd", contributors: 1, primaryContributor: "Alex Chen", primaryPercentage: 95, risk: "critical" },
      { module: "docs/api", contributors: 3, primaryContributor: "Sarah Kim", primaryPercentage: 40, risk: "safe" },
      { module: "docs/internal", contributors: 2, primaryContributor: "James Wu", primaryPercentage: 58, risk: "medium" },
      { module: "config/env", contributors: 1, primaryContributor: "Alex Chen", primaryPercentage: 100, risk: "critical" },
      { module: "config/feature-flags", contributors: 2, primaryContributor: "Alex Chen", primaryPercentage: 75, risk: "high" },
    ],
    licenseCompliance: [
      { label: "GPL-3.0 Dependency Detected", status: "fail", detail: "libpayment-core v2.3.1 uses GPL-3.0 — copyleft risk" },
      { label: "MIT License Coverage", status: "pass", detail: "87% of dependencies use MIT license" },
      { label: "Apache-2.0 Compatibility", status: "pass", detail: "All Apache-2.0 deps are compatible" },
      { label: "AGPL Detection", status: "warning", detail: "mongodb-driver has AGPL clause — review needed" },
      { label: "License File Present", status: "pass", detail: "Root LICENSE file exists (MIT)" },
    ],
    securityPosture: [
      { label: "Critical Vulnerabilities", status: "fail", detail: "3 critical CVEs in production dependencies" },
      { label: "Secrets in Repository", status: "fail", detail: "2 API keys found in commit history" },
      { label: "Dependency Audit", status: "warning", detail: "12 moderate vulnerabilities pending update" },
      { label: "Branch Protection", status: "pass", detail: "Main branch requires PR reviews" },
      { label: "2FA Enforcement", status: "warning", detail: "Only 2 of 4 contributors have 2FA enabled" },
    ],
  },
  {
    id: "cloudvault",
    name: "CloudVault",
    githubUrl: "https://github.com/cloudvault/platform",
    auditDate: "2026-02-08",
    dealStage: "Series B",
    healthScore: 78,
    valuationEstimate: "$52M",
    busFactor: 4,
    capitalEfficiency: 81,
    techDebtLiability: "$340K",
    techDebtTrend: "decreasing",
    techDebtBreakdown: [
      { category: "Legacy Code", amount: 102000, percentage: 30 },
      { category: "Test Coverage Gaps", amount: 68000, percentage: 20 },
      { category: "Dependency Risks", amount: 102000, percentage: 30 },
      { category: "Documentation Debt", amount: 68000, percentage: 20 },
    ],
    contributors: [
      { name: "Team Alpha", commits: 890, linesChanged: 67000, percentage: 32 },
      { name: "Team Beta", commits: 780, linesChanged: 54000, percentage: 28 },
      { name: "Team Gamma", commits: 650, linesChanged: 48000, percentage: 22 },
      { name: "Team Delta", commits: 480, linesChanged: 31000, percentage: 18 },
    ],
    moduleOwnership: [
      { module: "core/engine", contributors: 4, primaryContributor: "Team Alpha", primaryPercentage: 32, risk: "safe" },
      { module: "core/storage", contributors: 3, primaryContributor: "Team Beta", primaryPercentage: 38, risk: "safe" },
      { module: "api/gateway", contributors: 3, primaryContributor: "Team Alpha", primaryPercentage: 41, risk: "low" },
      { module: "auth/sso", contributors: 2, primaryContributor: "Team Gamma", primaryPercentage: 55, risk: "medium" },
    ],
    licenseCompliance: [
      { label: "GPL Detection", status: "pass", detail: "No GPL dependencies found" },
      { label: "MIT License Coverage", status: "pass", detail: "94% MIT coverage" },
      { label: "Apache-2.0 Compatibility", status: "pass", detail: "Fully compatible" },
      { label: "License File Present", status: "pass", detail: "Comprehensive licensing docs" },
    ],
    securityPosture: [
      { label: "Critical Vulnerabilities", status: "pass", detail: "0 critical CVEs" },
      { label: "Secrets in Repository", status: "pass", detail: "No secrets detected" },
      { label: "Dependency Audit", status: "warning", detail: "3 moderate vulnerabilities" },
      { label: "Branch Protection", status: "pass", detail: "Full branch protection enabled" },
      { label: "2FA Enforcement", status: "pass", detail: "All contributors have 2FA" },
    ],
  },
  {
    id: "dataforge",
    name: "DataForge",
    githubUrl: "https://github.com/dataforge/analytics",
    auditDate: "2026-01-28",
    dealStage: "Seed",
    healthScore: 56,
    valuationEstimate: "$3.8M",
    busFactor: 2,
    capitalEfficiency: 63,
    techDebtLiability: "$580K",
    techDebtTrend: "stable",
    techDebtBreakdown: [
      { category: "Legacy Code", amount: 174000, percentage: 30 },
      { category: "Test Coverage Gaps", amount: 232000, percentage: 40 },
      { category: "Dependency Risks", amount: 116000, percentage: 20 },
      { category: "Documentation Debt", amount: 58000, percentage: 10 },
    ],
    contributors: [
      { name: "Lena Park", commits: 1200, linesChanged: 95000, percentage: 55 },
      { name: "Dev Patel", commits: 680, linesChanged: 52000, percentage: 30 },
      { name: "Others", commits: 320, linesChanged: 18000, percentage: 15 },
    ],
    moduleOwnership: [
      { module: "pipeline/etl", contributors: 1, primaryContributor: "Lena Park", primaryPercentage: 82, risk: "high" },
      { module: "pipeline/transform", contributors: 2, primaryContributor: "Lena Park", primaryPercentage: 64, risk: "medium" },
      { module: "viz/charts", contributors: 2, primaryContributor: "Dev Patel", primaryPercentage: 58, risk: "medium" },
      { module: "api/rest", contributors: 3, primaryContributor: "Dev Patel", primaryPercentage: 42, risk: "safe" },
    ],
    licenseCompliance: [
      { label: "GPL Detection", status: "pass", detail: "No GPL found" },
      { label: "MIT License Coverage", status: "pass", detail: "91% MIT" },
      { label: "License File Present", status: "warning", detail: "LICENSE file incomplete" },
    ],
    securityPosture: [
      { label: "Critical Vulnerabilities", status: "warning", detail: "1 high-severity CVE" },
      { label: "Secrets in Repository", status: "pass", detail: "Clean history" },
      { label: "Dependency Audit", status: "warning", detail: "8 moderate issues" },
      { label: "Branch Protection", status: "fail", detail: "No branch protection rules" },
    ],
  },
  {
    id: "meshnet",
    name: "MeshNet",
    githubUrl: "https://github.com/meshnet-io/protocol",
    auditDate: "2026-02-12",
    dealStage: "Pre-Seed",
    healthScore: 71,
    valuationEstimate: "$1.2M",
    busFactor: 3,
    capitalEfficiency: 74,
    techDebtLiability: "$190K",
    techDebtTrend: "decreasing",
    techDebtBreakdown: [
      { category: "Legacy Code", amount: 38000, percentage: 20 },
      { category: "Test Coverage Gaps", amount: 57000, percentage: 30 },
      { category: "Dependency Risks", amount: 57000, percentage: 30 },
      { category: "Documentation Debt", amount: 38000, percentage: 20 },
    ],
    contributors: [
      { name: "Kai Nakamura", commits: 540, linesChanged: 38000, percentage: 38 },
      { name: "Ava Singh", commits: 460, linesChanged: 34000, percentage: 32 },
      { name: "Omar Farid", commits: 380, linesChanged: 28000, percentage: 30 },
    ],
    moduleOwnership: [
      { module: "protocol/core", contributors: 3, primaryContributor: "Kai Nakamura", primaryPercentage: 38, risk: "safe" },
      { module: "network/p2p", contributors: 3, primaryContributor: "Ava Singh", primaryPercentage: 35, risk: "safe" },
      { module: "crypto/keys", contributors: 2, primaryContributor: "Kai Nakamura", primaryPercentage: 62, risk: "medium" },
    ],
    licenseCompliance: [
      { label: "GPL Detection", status: "pass", detail: "No GPL found" },
      { label: "MIT License Coverage", status: "pass", detail: "100% MIT" },
      { label: "License File Present", status: "pass", detail: "Complete" },
    ],
    securityPosture: [
      { label: "Critical Vulnerabilities", status: "pass", detail: "No CVEs" },
      { label: "Secrets in Repository", status: "pass", detail: "Clean" },
      { label: "Branch Protection", status: "pass", detail: "Protected" },
    ],
  },
  {
    id: "syntaxai",
    name: "SyntaxAI",
    githubUrl: "https://github.com/syntaxai/ml-engine",
    auditDate: "2026-02-05",
    dealStage: "Series A",
    healthScore: 62,
    valuationEstimate: "$22M",
    busFactor: 2,
    capitalEfficiency: 58,
    techDebtLiability: "$870K",
    techDebtTrend: "increasing",
    techDebtBreakdown: [
      { category: "Legacy Code", amount: 261000, percentage: 30 },
      { category: "Test Coverage Gaps", amount: 348000, percentage: 40 },
      { category: "Dependency Risks", amount: 174000, percentage: 20 },
      { category: "Documentation Debt", amount: 87000, percentage: 10 },
    ],
    contributors: [
      { name: "Dr. Rachel Torres", commits: 920, linesChanged: 78000, percentage: 48 },
      { name: "Eli Schwartz", commits: 580, linesChanged: 45000, percentage: 30 },
      { name: "Nina Volkov", commits: 340, linesChanged: 22000, percentage: 14 },
      { name: "Others", commits: 160, linesChanged: 12000, percentage: 8 },
    ],
    moduleOwnership: [
      { module: "ml/training", contributors: 1, primaryContributor: "Dr. Rachel Torres", primaryPercentage: 85, risk: "critical" },
      { module: "ml/inference", contributors: 2, primaryContributor: "Dr. Rachel Torres", primaryPercentage: 62, risk: "medium" },
      { module: "api/serving", contributors: 3, primaryContributor: "Eli Schwartz", primaryPercentage: 44, risk: "low" },
      { module: "data/pipeline", contributors: 2, primaryContributor: "Nina Volkov", primaryPercentage: 56, risk: "medium" },
    ],
    licenseCompliance: [
      { label: "GPL Detection", status: "warning", detail: "PyTorch has BSD — review for modifications" },
      { label: "MIT License Coverage", status: "pass", detail: "82% MIT" },
      { label: "License File Present", status: "pass", detail: "Present" },
    ],
    securityPosture: [
      { label: "Critical Vulnerabilities", status: "warning", detail: "2 high-severity in ML deps" },
      { label: "Secrets in Repository", status: "fail", detail: "1 API key in training scripts" },
      { label: "Dependency Audit", status: "warning", detail: "15 moderate issues" },
      { label: "Branch Protection", status: "pass", detail: "Protected main branch" },
    ],
  },
];

export const getCompanyById = (id: string): Company | undefined => {
  return companies.find((c) => c.id === id);
};
