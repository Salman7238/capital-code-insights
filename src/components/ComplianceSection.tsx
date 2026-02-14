import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, XCircle, AlertTriangle } from "lucide-react";
import type { ComplianceItem } from "@/data/mockData";

interface ComplianceSectionProps {
  licenseItems: ComplianceItem[];
  securityItems: ComplianceItem[];
}

const StatusIcon = ({ status }: { status: ComplianceItem["status"] }) => {
  if (status === "pass") return <CheckCircle2 className="h-4 w-4 text-primary" />;
  if (status === "fail") return <XCircle className="h-4 w-4 text-destructive" />;
  return <AlertTriangle className="h-4 w-4 text-risk-medium" />;
};

const ComplianceList = ({ title, items }: { title: string; items: ComplianceItem[] }) => (
  <div>
    <h4 className="mb-3 font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</h4>
    <div className="space-y-2">
      {items.map((item) => (
        <div
          key={item.label}
          className="flex items-start gap-3 rounded border border-border bg-background/50 px-3 py-2"
        >
          <StatusIcon status={item.status} />
          <div className="flex-1">
            <p className="font-mono text-xs font-medium text-foreground">{item.label}</p>
            <p className="font-mono text-[10px] text-muted-foreground">{item.detail}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const ComplianceSection = ({ licenseItems, securityItems }: ComplianceSectionProps) => {
  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-3">
        <CardTitle className="font-mono text-sm font-semibold uppercase tracking-wider text-foreground">
          Compliance & Security
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <ComplianceList title="License Risk" items={licenseItems} />
        <ComplianceList title="Security Posture" items={securityItems} />
      </CardContent>
    </Card>
  );
};
