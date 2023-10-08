// setup-tailwind.js

const { execSync, writeFileSync } = require("child_process");
const fs = require("fs");

// Get the project name from the command-line arguments
const projectName = process.argv[2] || "my-project";

// Run setup commands
execSync("npm install -D tailwindcss postcss autoprefixer vite", {
  stdio: "inherit",
});
execSync("npx tailwindcss init -p", { stdio: "inherit" }); // Added -p flag for parallel mode

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

// Check if package.json exists, and if not, create it
if (!fs.existsSync("package.json")) {
  const newPackageJson = {
    name: projectName, // Use the provided or default project name
    version: "1.0.0",
    scripts: {
      start: "vite",
    },
    devDependencies: {},
  };
  fs.writeFileSync("package.json", JSON.stringify(newPackageJson, null, 2));
} else {
  // If package.json exists, ensure it has a "scripts" section with a "start" script
  const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
  if (!packageJson.scripts || !packageJson.scripts.start) {
    packageJson.scripts = {
      start: "vite",
    };
    fs.writeFileSync("package.json", JSON.stringify(packageJson, null, 2));
  }
}

console.log(
  `Tailwind CSS setup for project "${projectName}" complete with updated content property and parallel Vite execution!`
);
