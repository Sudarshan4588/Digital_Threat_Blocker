const apiKey = "AIzaSyCdq8aZVqTf6g7Nz4_xAfNDBbY5_oDTXWI"; // Replace with your actual Google API key
const checkBtn = document.getElementById("checkBtn");
const urlInput = document.getElementById("urlInput");
const resultDiv = document.getElementById("result");
const statusDiv = document.getElementById("status");

checkBtn.addEventListener("click", async () => {
  const url = urlInput.value.trim();
  if (!url) {
    resultDiv.textContent = "Please enter a valid URL.";
    resultDiv.className = "error";
    return;
  }

  resultDiv.textContent = "Checking...";
  resultDiv.className = "";
  checkBtn.disabled = true;

  try {
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

    if (data && data.matches && data.matches.length > 0) {
      resultDiv.textContent =
        "⚠️ Warning! This URL is flagged as unsafe/phishing/malware.";
      resultDiv.className = "danger";
    } else {
      resultDiv.textContent = "✅ This URL appears to be safe.";
      resultDiv.className = "safe";
    }
  } catch (error) {
    resultDiv.textContent = `Error: ${error.message}`;
    resultDiv.className = "error";
  }

  checkBtn.disabled = false;
});

// Show status on popup open
statusDiv.textContent = "Monitoring active...";
statusDiv.style.color = "green";
