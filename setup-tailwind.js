const { execSync, writeFileSync } = require("child_process");
const fs = require("fs");

// Run setup commands
execSync("npm install -D tailwindcss postcss autoprefixer vite", {
  stdio: "inherit",
});
execSync("npx tailwindcss init -p", { stdio: "inherit" });

// Update the content property in tailwind.config.js to ["*"]
const configPath = "tailwind.config.js";
const configContent = fs.readFileSync(configPath, "utf8");
const updatedConfigContent = configContent.replace(
  /content: \[\]/,
  'content: ["*"]'
);
fs.writeFileSync(configPath, updatedConfigContent);

// Create input.css file
const cssContent = `@tailwind base;\n@tailwind components;\n@tailwind utilities;`;
fs.writeFileSync("input.css", cssContent);

// Update package.json scripts
const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
packageJson.scripts.start = "vite";
fs.writeFileSync("package.json", JSON.stringify(packageJson, null, 2));

console.log("Tailwind CSS setup complete with updated content property!");
