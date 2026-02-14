import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, BarChart3, ShieldAlert, Lock } from "lucide-react";
import { scanRepository, RepoAudit } from "../utils/githubScanner"; 

const Index = () => {
  const [repoUrl, setRepoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [auditResult, setAuditResult] = useState<RepoAudit | null>(null);
  const navigate = useNavigate();

  const handleAudit = async () => {
    if (!repoUrl) return;
    setLoading(true);
    try {
      const data = await scanRepository(repoUrl);
      setAuditResult(data);
      // Navigate to audit dashboard with the scan results
      navigate("/audit/result", { state: { auditResult: data } });
    } catch (error) {
      alert("Error scanning repo. Make sure the URL is correct and public!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-mono p-10 flex flex-col items-center">
      <div className="max-w-4xl w-full space-y-8 text-center">
        
        {/* HEADER */}
        <div className="space-y-4">
          <div className="inline-block px-3 py-1 rounded-full bg-green-900/30 text-green-400 text-xs border border-green-800">
            SYSTEM ONLINE
          </div>
          <h1 className="text-5xl font-bold tracking-tighter">
            Capital<span className="text-green-500">Code</span>
          </h1>
          <p className="text-gray-400">Technical Due Diligence Engine</p>
        </div>
        
        {/* INPUT BOX */}
        <div className="flex gap-0 max-w-2xl mx-auto shadow-2xl shadow-green-900/20">
          <input
            type="text"
            placeholder="https://github.com/facebook/react"
            className="flex-1 bg-[#111] border border-gray-800 border-r-0 rounded-l-lg px-6 py-4 outline-none focus:border-green-500 transition-all placeholder:text-gray-600"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
          />
          <button 
            onClick={handleAudit}
            disabled={loading}
            className="bg-green-600 hover:bg-green-500 text-black px-8 py-4 rounded-r-lg font-bold transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? "ANALYZING..." : "AUDIT ASSET"}
            {!loading && <ArrowRight size={18} />}
          </button>
        </div>

        {/* RESULTS GRID */}
        {auditResult && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left pt-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
            
            {/* CARD 1: VALUE */}
            <div className="p-6 bg-[#111] rounded-xl border border-gray-800 hover:border-blue-500/50 transition-colors group">
              <div className="flex justify-between mb-4">
                <BarChart3 className="text-blue-500" />
                <span className="text-xs text-gray-500">MARKET SIGNAL</span>
              </div>
              <div className="text-4xl font-bold">{auditResult.stars.toLocaleString()}</div>
              <div className="text-xs text-gray-400 mt-2">Total Stars (Social Proof)</div>
            </div>

            {/* CARD 2: RISK */}
            <div className="p-6 bg-[#111] rounded-xl border border-gray-800 hover:border-red-500/50 transition-colors group">
              <div className="flex justify-between mb-4">
                <ShieldAlert className="text-red-500" />
                <span className="text-xs text-gray-500">RISK INDEX</span>
              </div>
              <div className={`text-4xl font-bold ${auditResult.riskScore > 50 ? 'text-red-500' : 'text-green-500'}`}>
                {auditResult.riskScore}/100
              </div>
              <div className="text-xs text-gray-400 mt-2">
                Based on {auditResult.openIssues} open issues
              </div>
            </div>

            {/* CARD 3: ACTIVITY */}
            <div className="p-6 bg-[#111] rounded-xl border border-gray-800 hover:border-purple-500/50 transition-colors group">
              <div className="flex justify-between mb-4">
                <Lock className="text-purple-500" />
                <span className="text-xs text-gray-500">LATEST COMMIT</span>
              </div>
              <div className="text-xl font-bold truncate">
                {new Date(auditResult.lastCommitDate).toLocaleDateString()}
              </div>
              <div className="text-xs text-gray-400 mt-2">
                Top Contributor: <span className="text-white">{auditResult.topContributor}</span>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default Index;