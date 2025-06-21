// API adapter for GitHub Pages deployment
// Switches between live API and static JSON files based on environment

const isGitHubPages = window.location.hostname.includes('github.io') || window.location.hostname.includes('github.dev');

export function getApiUrl(endpoint: string): string {
  if (isGitHubPages) {
    // For GitHub Pages, use static JSON files from root
    return `/api${endpoint}/index.json`;
  }
  
  // For development and other deployments, use live API
  return `/api${endpoint}`;
}

export async function apiRequest(method: string, endpoint: string, data?: any) {
  if (isGitHubPages && method !== 'GET') {
    // For GitHub Pages, simulate API responses for POST requests
    return simulateApiResponse(endpoint, data);
  }
  
  const url = getApiUrl(endpoint);
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: data ? JSON.stringify(data) : undefined,
  });
  
  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }
  
  return response;
}

function simulateApiResponse(endpoint: string, data: any) {
  // Simulate API responses for GitHub Pages
  return new Promise((resolve) => {
    setTimeout(() => {
      if (endpoint === '/transactions') {
        const mockTransaction = {
          id: Date.now(),
          ...data,
          createdAt: new Date().toISOString(),
        };
        resolve({
          ok: true,
          json: () => Promise.resolve(mockTransaction),
        });
      } else {
        resolve({
          ok: true,
          json: () => Promise.resolve({ success: true }),
        });
      }
    }, 1000); // Simulate network delay
  });
}