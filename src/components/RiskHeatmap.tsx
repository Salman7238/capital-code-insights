import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { ModuleOwnership } from "@/data/mockData";

interface RiskHeatmapProps {
  modules: ModuleOwnership[];
}

const riskColors: Record<string, string> = {
  critical: "bg-destructive",
  high: "bg-risk-high",
  medium: "bg-risk-medium",
  low: "bg-primary/60",
  safe: "bg-primary",
};

const riskLabels: Record<string, string> = {
  critical: "Critical",
  high: "High",
  medium: "Medium",
  low: "Low",
  safe: "Safe",
};

export const RiskHeatmap = ({ modules }: RiskHeatmapProps) => {
  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-3">
        <CardTitle className="font-mono text-sm font-semibold uppercase tracking-wider text-foreground">
          Key Person Risk — Code Ownership Heatmap
        </CardTitle>
        <p className="font-mono text-xs text-muted-foreground">
          Each square represents a code module. Color indicates single-contributor risk.
        </p>
      </CardHeader>
      <CardContent>
        <div className="mb-4 grid grid-cols-4 gap-2 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-10">
          {modules.map((mod) => (
            <Tooltip key={mod.module}>
              <TooltipTrigger asChild>
                <div
                  className={`group relative flex aspect-square cursor-default items-center justify-center rounded-sm ${riskColors[mod.risk]} transition-all hover:scale-110 hover:ring-2 hover:ring-foreground/20`}
                >
                  <span className="font-mono text-[9px] font-medium text-primary-foreground opacity-80 group-hover:opacity-100 text-center leading-tight px-0.5">
                    {mod.module.split("/").pop()}
                  </span>
                </div>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                className="border-border bg-card font-mono text-xs"
              >
                <p className="font-semibold text-foreground">{mod.module}</p>
                <p className="text-muted-foreground">
                  {mod.primaryContributor}: {mod.primaryPercentage}%
                </p>
                <p className="text-muted-foreground">
                  Contributors: {mod.contributors} · Risk: {riskLabels[mod.risk]}
                </p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 border-t border-border pt-3">
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Risk Level:</span>
          {Object.entries(riskColors).map(([level, color]) => (
            <div key={level} className="flex items-center gap-1.5">
              <div className={`h-3 w-3 rounded-sm ${color}`} />
              <span className="font-mono text-[10px] text-muted-foreground capitalize">{level}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
