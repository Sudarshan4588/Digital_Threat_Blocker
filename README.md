# 🔐 Digital Threat Blocker Extension

## ✅ Project Overview

**Digital Threat Blocker** is a browser extension designed to **protect users from digital threats** such as phishing, scams, and malware attacks. It scans URLs in real-time and prevents users from visiting suspicious websites based on custom-defined rules. The extension also includes a **cybersecurity awareness module** to educate users about digital safety.

---

## 🎯 Objective

To safeguard users from digital threats such as phishing and malware by blocking suspicious websites and spreading awareness through a browser-based solution.

---

## 🔍 Features

1. **🔎 URL Checker**  
   User can input or visit a link, and the extension checks it against a Google safe Browsing Api to determine its safety.

2. **⛔ Block & Warn**  
   If a URL matches known malicious patterns, the extension **automatically blocks the site** and displays a **custom warning message**.

3. **📘 Awareness Module (info.html)**  
   Educates users on:
   - Cybersecurity best practices via embedded YouTube videos.
   - Real-world cybercrime cases.
   - Step-by-step guidance on how to respond to digital threats.

---

## 🛠️ Tech Stack

- **Frontend:** HTML, CSS, JavaScript  
- **Data Source:** `rules.json` (contains suspicious URLs/patterns)  
- **Platform:** Chrome-compatible Browser Extension

---
🚀 How to Use
Clone the repository.

Add Google Safe Browsing API in background.js to detect  malicious URLs.

Open Chrome and go to chrome://extensions/

Enable Developer Mode.

Click "Load unpacked" and select the project folder.

Use the extension from the toolbar.
