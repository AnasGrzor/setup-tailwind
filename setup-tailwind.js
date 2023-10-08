const { execSync, writeFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const readline = require("readline");

// Create a readline interface to get user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

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

// Get the user's project name based on the current working directory
const projectName = path.basename(process.cwd());

// Check if package.json exists, and if not, create it
const packageJsonPath = path.join(process.cwd(), "package.json");
if (!fs.existsSync(packageJsonPath)) {
  const newPackageJson = {
    name: projectName,
    version: "1.0.0",
    scripts: {},
    devDependencies: {},
  };

  // Prompt the user for the script name
  rl.question(
    "Enter the name for the script in your package.json: ",
    (scriptName) => {
      newPackageJson.scripts[scriptName] = "node setup-tailwind.js";
      fs.writeFileSync(
        packageJsonPath,
        JSON.stringify(newPackageJson, null, 2)
      );

      console.log(
        `Tailwind CSS setup complete with updated content property and parallel Vite execution. You can now run it with "npm run ${scriptName}".`
      );

      // Close the readline interface
      rl.close();
    }
  );
} else {
  // If package.json exists, ensure it has a "scripts" section with a user-defined script name
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

  // Prompt the user for the script name if it's not already defined
  if (!packageJson.scripts || !Object.keys(packageJson.scripts).length) {
    rl.question(
      "Enter the name for the script in your package.json: ",
      (scriptName) => {
        packageJson.scripts[scriptName] = "node setup-tailwind.js";
        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

        console.log(
          `Tailwind CSS setup complete with updated content property and parallel Vite execution. You can now run it with "npm run ${scriptName}".`
        );

        // Close the readline interface
        rl.close();
      }
    );
  } else {
    // No need to prompt if a script is already defined
    console.log(
      "A script is already defined in your package.json. You can run it as configured."
    );

    // Close the readline interface
    rl.close();
  }
}
