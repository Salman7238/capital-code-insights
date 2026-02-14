import { useParams, useNavigate } from "react-router-dom";
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
  const company = getCompanyById(companyId || "novapay");

  if (!company) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="font-mono text-muted-foreground">Company not found</p>
      </div>
    );
  }

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
