# Product Requirements Document (PRD)
**Project Name:** Capital Code Insights  
**Version:** 1.0  
**Status:** Released  
**Last Updated:** February 14, 2026  
**Author:** Salman

## 1. Executive Summary
**Capital Code** is an automated technical due diligence platform designed for Venture Capitalists and Software Auditors. It replaces manual code reviews with an AI-driven "Health Check" engine. The system scans public GitHub repositories in real-time, analyzes key metrics (stars, issues, commit frequency), and generates a "Risk Score" and "Executive Summary" to help investors make data-driven decisions.

## 2. Problem Statement
* **The Problem:** Investors often fund software startups without deeply understanding the technical quality of the product. Manual code audits are slow, expensive, and require technical expertise.
* **The Opportunity:** A "TurboTax for Tech Due Diligence"—a simple tool that takes a URL and outputs a clear "Pass/Fail" report.

## 3. User Personas
* **Vincent the VC:** A non-technical investor who needs to know if a startup's tech is legitimate before writing a check. He cares about "Market Signal" (Stars) and "Risk" (Abandonment).
* **Auditor Alice:** A technical consultant who needs a quick snapshot of a codebase's activity and maintenance levels before diving deeper.

## 4. Functional Requirements

### 4.1 Core Features
| ID | Feature | Description | Priority |
| :--- | :--- | :--- | :--- |
| **F-01** | **Repository Scanner** | Input field accepts any public GitHub URL and validates its existence. | P0 (Critical) |
| **F-02** | **Live Data Fetch** | Connects to GitHub REST API to pull real-time stats (Stars, Forks, Issues). | P0 (Critical) |
| **F-03** | **Risk Engine** | Proprietary algorithm that calculates a "Risk Score" (0-100) based on issue-to-star ratios and recent activity. | P1 (High) |
| **F-04** | **AI Analyst** | Generative logic that produces a natural language "Executive Summary" based on the raw data. | P1 (High) |
| **F-05** | **Visual Dashboard** | "Glassmorphic" UI displaying data via Gauge Charts, Heatmaps, and Metric Cards. | P1 (High) |

### 4.2 Non-Functional Requirements
* **Performance:** Scan results must load in under 2 seconds.
* **Reliability:** System must handle "Rate Limiting" from GitHub gracefully.
* **Availability:** Hosted on a global CDN (Netlify) for 99.9% uptime.

## 5. Technical Architecture
* **Frontend Framework:** React (Vite) for high-performance rendering.
* **Language:** TypeScript for type safety and code reliability.
* **Styling:** Tailwind CSS for rapid, responsive UI development.
* **API Integration:** Octokit (GitHub SDK) for data fetching.
* **Deployment:** Netlify (Continuous Deployment via Git).

## 6. Future Roadmap (v2.0)
* **Private Repo Scanning:** OAuth integration to scan private codebases.
* **Competitor Comparison:** Compare two repositories side-by-side.
* **PDF Export:** Download the audit report as a PDF file.

## 7. Success Metrics
* **Accuracy:** The Risk Score accurately reflects the "health" of a repo (e.g., React = Low Risk).
* **Usability:** A non-technical user can successfully generate an audit without reading instructions.
