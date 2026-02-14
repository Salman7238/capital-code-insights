import { Octokit } from "@octokit/rest";
// Initialize the GitHub Client
// It uses your token if you have one, otherwise it works in public mode
const octokit = new Octokit({
  auth: import.meta.env.VITE_GITHUB_TOKEN, 
});

export interface RepoAudit {
  name: string;
  owner: string;
  stars: number;
  openIssues: number;
  forks: number;
  lastCommitDate: string;
  topContributor: string;
  riskScore: number;
}

export const scanRepository = async (repoUrl: string): Promise<RepoAudit> => {
  try {
    // 1. Clean the URL to get "owner" and "repo"
    const cleanUrl = repoUrl.replace("https://github.com/", "").replace(/\/$/, "");
    const [owner, repo] = cleanUrl.split("/");

    if (!owner || !repo) throw new Error("Invalid GitHub URL");

    console.log(`Scanning ${owner}/${repo}...`);

    // 2. Fetch Repository Details (Stars, Issues)
    const { data: repoData } = await octokit.rest.repos.get({ owner, repo });

    // 3. Fetch Last 5 Commits (Activity)
    const { data: commits } = await octokit.rest.repos.listCommits({ owner, repo, per_page: 5 });

    const lastCommit = commits[0];
    const authorName = lastCommit.commit.author?.name || "Unknown";

    // 4. Calculate a Mock Risk Score
    let risk = 0;
    if (repoData.open_issues_count > 50) risk += 30;
    if (repoData.forks_count < 5) risk += 10;
    
    // Check if the last update was over 30 days ago
    const lastDate = new Date(lastCommit.commit.author?.date || "");
    const daysSinceCommit = (new Date().getTime() - lastDate.getTime()) / (1000 * 3600 * 24);
    if (daysSinceCommit > 30) risk += 40;

    return {
      name: repoData.name,
      owner: repoData.owner.login,
      stars: repoData.stargazers_count,
      openIssues: repoData.open_issues_count,
      forks: repoData.forks_count,
      lastCommitDate: lastDate.toISOString(),
      topContributor: authorName,
      riskScore: Math.min(risk, 100), // Cap score at 100
    };

  } catch (error) {
    console.error("Scan failed:", error);
    throw error;
  }
};