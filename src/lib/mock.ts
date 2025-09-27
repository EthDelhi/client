// Mock data type
export type AnalysisData = typeof mockData;

// Mock API response type
export interface ApiResponse {
  data: AnalysisData;
}

// Mock API functions
export const mockApis = {
  analyze: async (params: { url: string; start_date: string; end_date: string }): Promise<ApiResponse> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { data: mockData };
  },

  secondAnalysis: async (params: { url: string; start_date: string; end_date: string }): Promise<ApiResponse> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    return { data: mockData };
  }
};

export const mockData = {
    repository: {
      owner: "fetchai",
      name: "asi-alliance-wallet",
      url: "https://github.com/fetchai/asi-alliance-wallet"
    },
    metadata: {
      total_commits: 100,
      analyzed_commits: 10,
      total_contributors: 51,
      hackathon_period: {
        start: "2025-09-25T00:00:00+00:00",
        end: "2025-09-27T23:59:59+00:00"
      },
      commit_timing: {
        before_hackathon: 100,
        during_hackathon: 12,
        after_hackathon: 98
      }
    },
    authenticity_summary: {
      trust_score: 0.5,
      risk_level: "Medium",
      verdict_summary: "Analysis of 100 commits shows some concerns. Found 100 commits before hackathon start date (2025-09-25T00:00:00+00:00). Earliest: b5599f5.",
      key_anomalies: [
        "Found 100 commits before hackathon start date (2025-09-25T00:00:00+00:00). Earliest: b5599f5"
      ]
    },
    graph_data: {
      line_changes_map: [
        { date: "2024-07-02T08:49:27Z", additions: 7770, deletions: 193, total: 7963 },
        { date: "2024-07-08T12:37:34Z", additions: 64292, deletions: 16623, total: 80915 },
        { date: "2024-08-28T07:48:32Z", additions: 65862, deletions: 9, total: 65871 },
        { date: "2025-07-28T11:03:21Z", additions: 6512, deletions: 3185, total: 9697 }
      ],
      contributor_map: [
        { user: "Thunnini", percentage: 22.77 },
        { user: "agent-dominatrix", percentage: 12.49 },
        { user: "sh-wallet", percentage: 10.61 },
        { user: "AbbasAliLokhandwala", percentage: 6.25 },
        { user: "delivan", percentage: 5.7 },
        { user: "HeesungB", percentage: 5.49 },
        { user: "dependabot[bot]", percentage: 5.49 },
        { user: "imvinay84", percentage: 3.31 },
        { user: "dimiandre", percentage: 3.28 },
        { user: "Others", percentage: 24.81 } // Aggregated others
      ]
    }
  }