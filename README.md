
# CryptoPredict Minute CLI

This Node.js script fetches the current Bitcoin price, generates a relevant crypto news snippet using the Gemini API, and predicts Bitcoin's market value for the next minute using the Gemini API. All output is displayed in the command line.

## Prerequisites

1.  **Node.js:** You need Node.js installed on your Linux VPS. Version 18.x or newer is recommended (as it includes native `fetch`).
    *   You can install Node.js using NVM (Node Version Manager) for easier management:
        ```bash
        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
        export NVM_DIR="$HOME/.nvm"
        [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
        [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
        nvm install --lts # Installs the latest LTS version
        nvm use --lts
        ```
    *   Verify installation: `node -v` and `npm -v`.

2.  **Google Gemini API Key:** You need an API key for the Gemini API.
    *   Visit [Google AI Studio](https://aistudio.google.com/app/apikey) to get your API key.

## Setup

1.  **Clone or Download:**
    If this project were in a git repository, you would clone it. For now, create a directory and place the `crypto_predictor_cli.mjs` and `package.json` files into it.
    ```bash
    mkdir crypto-predictor-cli
    cd crypto-predictor-cli
    # Now, create/copy package.json and crypto_predictor_cli.mjs into this directory
    ```

2.  **Install Dependencies:**
    Navigate to the project directory in your terminal and run:
    ```bash
    npm install
    ```
    This will install the `@google/genai` package.

3.  **Set API Key Environment Variable:**
    You **must** set your Gemini API key as an environment variable named `API_KEY`.
    You can set it for your current session:
    ```bash
    export API_KEY="YOUR_GEMINI_API_KEY_HERE"
    ```
    Replace `"YOUR_GEMINI_API_KEY_HERE"` with your actual API key.

    For persistence across sessions, add this line to your shell's configuration file (e.g., `~/.bashrc`, `~/.zshrc`):
    ```bash
    echo 'export API_KEY="YOUR_GEMINI_API_KEY_HERE"' >> ~/.bashrc
    source ~/.bashrc # Apply changes for the current session
    ```

## Running the Script

Once the setup is complete and the `API_KEY` is set, you can run the script using:

```bash
npm start
```

Alternatively, you can run it directly with node:

```bash
node crypto_predictor_cli.mjs
```

The script will start, perform an initial fetch and prediction, and then repeat the cycle every minute, printing output to your console.

## Output Example

You will see output similar to this, updated every minute:

```
[10:30:00 AM] CryptoPredict Minute CLI started.
[10:30:00 AM] Will refresh data every 60 seconds.
[10:30:00 AM] Make sure your API_KEY environment variable is set.
[10:30:00 AM] Fetching new data cycle started...
[10:30:02 AM] Current Bitcoin Price: $65,123.45
[10:30:05 AM] AI News: Bitcoin Sees Bullish Indicator - Analysts point to strong on-chain metrics suggesting upward momentum.
[10:30:08 AM] AI Prediction for 10:31:08 AM: $65,180.20 - Rationale: "Positive news and recent stability suggest a slight short-term price increase."
-----------------------------------------------------

[10:31:08 AM] Fetching new data cycle started...
... and so on ...
```

To stop the script, press `Ctrl+C`.
