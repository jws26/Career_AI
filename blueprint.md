# Project Blueprint

## Overview

This project is a React application built with Vite. It currently displays a basic landing page. The goal is to add a new feature that integrates with the Anthropic Claude API.

## Implemented Features

*   Initial project setup with React and Vite.
*   Basic landing page with links.

## Current Plan: Add Claude Chatbot

Integrate a chatbot powered by Anthropic's Claude into the application.

### Steps:

1.  **Install Dependencies:** Add the `@anthropic-ai/sdk` package to the project.
2.  **API Key Setup:** Guide the user to create a `.env` file and add their `VITE_ANTHROPIC_API_KEY`. Create a `.gitignore` file.
3.  **Create Chat Component:**
    *   Build a new React component `src/components/Chat.tsx` for the chat interface.
    *   Create a corresponding stylesheet `src/components/Chat.css`.
4.  **Create API Service:**
    *   Implement `src/services/claude.ts` to handle communication with the Claude API.
    *   The service will use the API key from the environment variables.
5.  **Integrate into App:**
    *   Add the new `Chat` component to the main `App.tsx` file.
    *   Update the UI to make the chatbot accessible.
6.  **Testing:** Ensure the chatbot UI works and API calls are being made correctly (or handled gracefully if the API key is missing).
