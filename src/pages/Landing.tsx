import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, Terminal } from "lucide-react";

const Landing = () => {
  const [repoUrl, setRepoUrl] = useState("");
  const navigate = useNavigate();

  const handleGenerate = () => {
    navigate("/audit/novapay");
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-background grid-pattern scanline overflow-hidden">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="relative z-10 flex w-full max-w-xl flex-col items-center gap-8 px-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded border border-border bg-card">
            <Terminal className="h-5 w-5 text-primary" />
          </div>
          <h1 className="font-mono text-3xl font-bold tracking-tight text-foreground">
            Capital<span className="text-primary">Code</span>
          </h1>
        </div>

        {/* Tagline */}
        <p className="font-mono text-sm tracking-wide text-muted-foreground">
          Technical Due Diligence for Venture Capital
        </p>

        {/* Input */}
        <div className="flex w-full flex-col gap-3 sm:flex-row">
          <Input
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            placeholder="https://github.com/org/repo"
            className="h-12 flex-1 border-border bg-card font-mono text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
          />
          <Button
            onClick={handleGenerate}
            className="h-12 gap-2 bg-primary px-6 font-mono text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Generate Audit
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Footer hint */}
        <p className="font-mono text-xs text-muted-foreground/60">
          Paste any public GitHub repository URL to begin analysis
        </p>

        {/* Nav link to portfolio */}
        <button
          onClick={() => navigate("/portfolio")}
          className="mt-8 font-mono text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          View Portfolio →
        </button>
      </div>
    </div>
  );
};

export default Landing;
