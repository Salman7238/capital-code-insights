import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getCompanyById } from "@/data/mockData";
import { HealthScoreGauge } from "@/components/HealthScoreGauge";
import { RiskHeatmap } from "@/components/RiskHeatmap";
import { TechDebtCard } from "@/components/TechDebtCard";
import { ComplianceSection } from "@/components/ComplianceSection";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, ExternalLink } from "lucide-react";

const AuditDashboard = () => {
  const { companyId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const auditResult = location.state?.auditResult;
  const company = auditResult || getCompanyById(companyId || "novapay");
  const isGitHubScan = !!auditResult;

  if (!company) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="font-mono text-muted-foreground">Company not found</p>
      </div>
    );
  }

  // For GitHub scan results, use enhanced premium layout
  if (isGitHubScan) {
    const riskScore = company.riskScore;
    const riskLevel = riskScore > 70 ? "High Risk" : riskScore > 40 ? "Medium Risk" : "Low Risk";
    const riskVariant = riskScore > 70 ? "destructive" : riskScore > 40 ? "secondary" : "default";
    const githubUrl = `https://github.com/${company.owner}/${company.name}`;
    // Map risk score to health score for gauge (inverse: higher risk = lower health)
    const healthScore = Math.max(0, 100 - riskScore);

    // Mock module ownership data for RiskHeatmap visualization
    const mockModuleOwnership = [
      { module: "API", contributors: 5, primaryContributor: company.topContributor, primaryPercentage: 35, risk: "low" as const },
      { module: "Core", contributors: 8, primaryContributor: company.topContributor, primaryPercentage: 28, risk: "low" as const },
      { module: "Auth", contributors: 3, primaryContributor: "Security Team", primaryPercentage: 45, risk: "medium" as const },
      { module: "Database", contributors: 4, primaryContributor: "Data Team", primaryPercentage: 38, risk: "low" as const },
      { module: "Frontend", contributors: 6, primaryContributor: "UI Team", primaryPercentage: 32, risk: "medium" as const },
      { module: "DevOps", contributors: 2, primaryContributor: "Infra Team", primaryPercentage: 52, risk: "high" as const },
    ];

    return (
      <div className="min-h-screen bg-background">
        {/* Top bar */}
        <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 font-mono text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              CapitalCode
            </button>
            <button
              onClick={() => navigate("/portfolio")}
              className="font-mono text-sm text-muted-foreground hover:text-foreground"
            >
              Portfolio
            </button>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-6 py-8">
          {/* Header Section */}
          <section className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <h1 className="font-mono text-3xl font-bold text-foreground">{company.owner}/{company.name}</h1>
                <Badge variant={riskVariant} className="font-mono text-xs">
                  {riskLevel}
                </Badge>
              </div>
              <div className="flex items-center gap-4 font-mono text-xs text-muted-foreground">
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-foreground"
                >
                  <ExternalLink className="h-3 w-3" />
                  {githubUrl}
                </a>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Last Scan: {new Date(company.lastCommitDate).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-8">
              <HealthScoreGauge score={healthScore} />
              <div className="text-right">
                <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Risk Score</p>
                <p className="font-mono text-2xl font-bold text-foreground">{riskScore}/100</p>
              </div>
            </div>
          </section>

          {/* Top Stats Section */}
          <section className="grid gap-6 md:grid-cols-3 mb-8">
            <div className="p-6 bg-card border border-border rounded-lg">
              <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-2">GitHub Stars</p>
              <p className="font-mono text-3xl font-bold text-foreground">{company.stars.toLocaleString()}</p>
            </div>
            <div className="p-6 bg-card border border-border rounded-lg">
              <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-2">Open Issues</p>
              <p className="font-mono text-3xl font-bold text-foreground">{company.openIssues}</p>
            </div>
            <div className="p-6 bg-card border border-border rounded-lg">
              <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-2">Forks</p>
              <p className="font-mono text-3xl font-bold text-foreground">{company.forks}</p>
            </div>
          </section>

          {/* AI Analysis - Executive Summary */}
          <section className="mb-8">
            {(() => {
              const summaryPoints = [];
              if (company.stars > 10000) {
                summaryPoints.push("High market signal detected.");
              }
              if (company.riskScore < 50) {
                summaryPoints.push("Security posture appears stable.");
              }
              if (company.openIssues > 500) {
                summaryPoints.push("Maintenance load is high, suggesting potential technical debt.");
              }
              const aiSummary = summaryPoints.length > 0
                ? summaryPoints.join(" ")
                : "Repository under review. Limited public metrics available.";

              return (
                <div className="p-6 bg-gradient-to-br from-slate-900 to-slate-950 border border-green-900/30 rounded-lg shadow-lg">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                    <p className="font-mono text-xs uppercase tracking-widest text-green-400 font-semibold">EXECUTIVE SUMMARY</p>
                  </div>
                  <p className="font-mono text-sm leading-relaxed text-green-300/90">
                    {aiSummary}
                  </p>
                  <p className="font-mono text-xs text-green-900/60 mt-3">Generated by CapitalCode AI Analysis</p>
                </div>
              );
            })()}
          </section>

          {/* Risk Heatmap */}
          <section className="mb-8">
            <RiskHeatmap modules={mockModuleOwnership} />
          </section>

          {/* Bottom Contributing Info */}
          <section className="grid gap-6 md:grid-cols-2">
            <div className="p-6 bg-card border border-border rounded-lg">
              <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-3">Repository Metrics</p>
              <div className="space-y-3">
                <div>
                  <p className="font-mono text-xs text-muted-foreground">Last Commit</p>
                  <p className="font-mono text-sm font-bold text-foreground">
                    {new Date(company.lastCommitDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="font-mono text-xs text-muted-foreground">Top Contributor</p>
                  <p className="font-mono text-sm font-bold text-foreground">{company.topContributor}</p>
                </div>
              </div>
            </div>
            <div className="p-6 bg-card border border-border rounded-lg">
              <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-3">Assessment Summary</p>
              <div className="space-y-3">
                <div>
                  <p className="font-mono text-xs text-muted-foreground">Repository Health</p>
                  <p className="font-mono text-sm font-bold text-foreground">{riskLevel}</p>
                </div>
                <div>
                  <p className="font-mono text-xs text-muted-foreground">Data Freshness</p>
                  <p className="font-mono text-sm font-bold text-foreground">Live Scan</p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }

  // Original mock data dashboard
  const riskLevel = company.healthScore < 40 ? "High Risk" : company.healthScore < 65 ? "Medium Risk" : "Low Risk";
  const riskVariant = company.healthScore < 40 ? "destructive" : company.healthScore < 65 ? "secondary" : "default";

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 font-mono text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            CapitalCode
          </button>
          <button
            onClick={() => navigate("/portfolio")}
            className="font-mono text-sm text-muted-foreground hover:text-foreground"
          >
            Portfolio
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* Header Section */}
        <section className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <h1 className="font-mono text-3xl font-bold text-foreground">{company.name}</h1>
              <Badge variant={riskVariant} className="font-mono text-xs">
                {riskLevel}
              </Badge>
              <Badge variant="outline" className="font-mono text-xs">
                {company.dealStage}
              </Badge>
            </div>
            <div className="flex items-center gap-4 font-mono text-xs text-muted-foreground">
              <a
                href={company.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-foreground"
              >
                <ExternalLink className="h-3 w-3" />
                {company.githubUrl}
              </a>
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                Audit: {company.auditDate}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <HealthScoreGauge score={company.healthScore} />
            <div className="text-right">
              <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Valuation Est.</p>
              <p className="font-mono text-2xl font-bold text-foreground">{company.valuationEstimate}</p>
            </div>
          </div>
        </section>

        {/* Risk Heatmap */}
        <section className="mb-8">
          <RiskHeatmap modules={company.moduleOwnership} />
        </section>

        {/* Bottom grid */}
        <section className="grid gap-6 lg:grid-cols-2">
          <TechDebtCard
            liability={company.techDebtLiability}
            trend={company.techDebtTrend}
            breakdown={company.techDebtBreakdown}
          />
          <ComplianceSection
            licenseItems={company.licenseCompliance}
            securityItems={company.securityPosture}
          />
        </section>
      </main>
    </div>
  );
};

export default AuditDashboard;
