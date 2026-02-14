import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { companies } from "@/data/mockData";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowUpDown } from "lucide-react";

type SortKey = "name" | "dealStage" | "healthScore" | "busFactor" | "capitalEfficiency" | "auditDate";

const Portfolio = () => {
  const navigate = useNavigate();
  const [sortKey, setSortKey] = useState<SortKey>("healthScore");
  const [sortAsc, setSortAsc] = useState(false);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(key === "name" || key === "dealStage");
    }
  };

  const sorted = [...companies].sort((a, b) => {
    const aVal = a[sortKey];
    const bVal = b[sortKey];
    const cmp = typeof aVal === "string" ? aVal.localeCompare(bVal as string) : (aVal as number) - (bVal as number);
    return sortAsc ? cmp : -cmp;
  });

  const riskColor = (score: number) =>
    score < 40 ? "text-destructive" : score < 65 ? "text-risk-medium" : "text-primary";

  const busFactorBadge = (bf: number) => {
    if (bf <= 1) return <Badge variant="destructive" className="font-mono text-xs">Critical ({bf})</Badge>;
    if (bf <= 2) return <Badge className="bg-risk-medium text-primary-foreground font-mono text-xs">Low ({bf})</Badge>;
    return <Badge variant="default" className="font-mono text-xs">Healthy ({bf})</Badge>;
  };

  const SortHeader = ({ label, sortKeyName }: { label: string; sortKeyName: SortKey }) => (
    <button
      onClick={() => handleSort(sortKeyName)}
      className="flex items-center gap-1 font-mono text-xs uppercase tracking-wider hover:text-foreground"
    >
      {label}
      <ArrowUpDown className="h-3 w-3" />
    </button>
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 font-mono text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            CapitalCode
          </button>
          <h2 className="font-mono text-sm font-semibold text-foreground">Portfolio Overview</h2>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="rounded-lg border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead><SortHeader label="Company" sortKeyName="name" /></TableHead>
                <TableHead><SortHeader label="Deal Stage" sortKeyName="dealStage" /></TableHead>
                <TableHead><SortHeader label="Health Score" sortKeyName="healthScore" /></TableHead>
                <TableHead><SortHeader label="Bus Factor" sortKeyName="busFactor" /></TableHead>
                <TableHead><SortHeader label="Cap. Efficiency" sortKeyName="capitalEfficiency" /></TableHead>
                <TableHead><SortHeader label="Last Audit" sortKeyName="auditDate" /></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sorted.map((company) => (
                <TableRow
                  key={company.id}
                  onClick={() => navigate(`/audit/${company.id}`)}
                  className="cursor-pointer transition-colors hover:bg-secondary/50"
                >
                  <TableCell className="font-mono font-semibold text-foreground">{company.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-mono text-xs">{company.dealStage}</Badge>
                  </TableCell>
                  <TableCell>
                    <span className={`font-mono font-bold ${riskColor(company.healthScore)}`}>
                      {company.healthScore}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">/100</span>
                  </TableCell>
                  <TableCell>{busFactorBadge(company.busFactor)}</TableCell>
                  <TableCell>
                    <span className={`font-mono font-bold ${riskColor(company.capitalEfficiency)}`}>
                      {company.capitalEfficiency}%
                    </span>
                  </TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">{company.auditDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
};

export default Portfolio;
