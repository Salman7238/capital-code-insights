import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import type { TechDebtBreakdown } from "@/data/mockData";

interface TechDebtCardProps {
  liability: string;
  trend: "increasing" | "decreasing" | "stable";
  breakdown: TechDebtBreakdown[];
}

export const TechDebtCard = ({ liability, trend, breakdown }: TechDebtCardProps) => {
  const TrendIcon = trend === "increasing" ? TrendingUp : trend === "decreasing" ? TrendingDown : Minus;
  const trendColor = trend === "increasing" ? "text-destructive" : trend === "decreasing" ? "text-primary" : "text-muted-foreground";
  const trendLabel = trend === "increasing" ? "Increasing" : trend === "decreasing" ? "Decreasing" : "Stable";

  const barColors = [
    "bg-destructive",
    "bg-risk-high",
    "bg-risk-medium",
    "bg-primary",
  ];

  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-3">
        <CardTitle className="font-mono text-sm font-semibold uppercase tracking-wider text-foreground">
          Technical Debt Liability
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-end gap-3">
          <span className="font-mono text-4xl font-bold text-foreground">{liability}</span>
          <div className={`flex items-center gap-1 pb-1 ${trendColor}`}>
            <TrendIcon className="h-4 w-4" />
            <span className="font-mono text-xs">{trendLabel}</span>
          </div>
        </div>

        <div className="space-y-3">
          {breakdown.map((item, i) => (
            <div key={item.category}>
              <div className="mb-1 flex items-center justify-between">
                <span className="font-mono text-xs text-muted-foreground">{item.category}</span>
                <span className="font-mono text-xs text-foreground">
                  ${(item.amount / 1000).toFixed(0)}K · {item.percentage}%
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div
                  className={`h-2 rounded-full ${barColors[i % barColors.length]} transition-all`}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
