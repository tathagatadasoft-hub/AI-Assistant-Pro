// ==========================================================
// AI Assistant Pro
// Configuration File
// ==========================================================

// -------------------------
// Application
// -------------------------
const APP_NAME = "AI Assistant Pro";
const APP_VERSION = "1.0.0";

// -------------------------
// Google Gemini API
// -------------------------

// Replace this with your own Gemini API Key
const GEMINI_API_KEY = "AQ.Ab8RN6JiReHRFJyAo4R618EqROblfk6l4t5R_1z5ZjxR9B4Stg";

// Gemini Model
const GEMINI_MODEL = "gemini-2.5-flash";

// Gemini API URL
const GEMINI_API_URL =
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;


// -------------------------
// Application Settings
// -------------------------

// Maximum messages kept in browser
const MAX_CHAT_HISTORY = 100;

// Automatically scroll to latest message
const AUTO_SCROLL = true;

// Enable Markdown Rendering
const ENABLE_MARKDOWN = true;

// Enable Code Highlighting
const ENABLE_CODE_HIGHLIGHT = true;

// Default Welcome Message
const WELCOME_MESSAGE = `
Hello 👋

Welcome to AI Assistant Pro.

I'm powered by Google Gemini.

How can I help you today?
`;

// -------------------------
// Theme
// -------------------------

const DEFAULT_THEME = "dark";
