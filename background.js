const apiKey = "AIzaSyCdq8aZVqTf6g7Nz4_xAfNDBbY5_oDTXWI"; // Put your Google Safe Browsing API key here

// List of trusted netbanking domains - whitelist
const trustedBankDomains = [
  "hdfcbank.com",
  "icicibank.com",
  "axisbank.com",
  "sbi.co.in",
  "statebankofindia.com",
  "kotak.com",
  "yesbank.in",
  "idbi.com",
  // Add more official bank domains here
];

// Function to check URL safety via Google Safe Browsing API
async function checkUrlSafety(url) {
  const body = {
    client: {
      clientId: "yourcompanyname",
      clientVersion: "1.0",
    },
    threatInfo: {
      threatTypes: [
        "MALWARE",
        "SOCIAL_ENGINEERING",
        "POTENTIALLY_HARMFUL_APPLICATION",
        "UNWANTED_SOFTWARE",
      ],
      platformTypes: ["ANY_PLATFORM"],
      threatEntryTypes: ["URL"],
      threatEntries: [{ url }],
    },
  };

  const response = await fetch(
    `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

// Helper: extract hostname from URL
function extractHostname(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.toLowerCase();
  } catch {
    return "";
  }
}

// Listen for navigation events
chrome.webNavigation.onCommitted.addListener(async (details) => {
  // Only check top-level frame (ignore iframes)
  if (details.frameId !== 0) return;

  const url = details.url;
  const hostname = extractHostname(url);

  // Check if the hostname is a banking URL (simple check for "bank" keyword or known domains)
  const isBankingUrl =
    hostname.includes("bank") ||
    trustedBankDomains.some((domain) => hostname.endsWith(domain));

  if (!isBankingUrl) return; // Ignore non-banking URLs

  try {
    // Check if URL is safe
    const data = await checkUrlSafety(url);

    const isUnsafe = data.matches && data.matches.length > 0;

    // Block if unsafe OR if domain NOT in whitelist
    const isUntrustedDomain = !trustedBankDomains.some((domain) =>
      hostname.endsWith(domain)
    );

    if (isUnsafe || isUntrustedDomain) {
      // Redirect tab to warning page
      chrome.tabs.update(details.tabId, {
        url: chrome.runtime.getURL("warning.html"),
      });
    }
  } catch (error) {
    console.error("Safe Browsing API error:", error);
  }
});
