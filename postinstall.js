const fs = require("fs");
const path = require("path");

// Get the path to the user's package.json
const userPackageJsonPath = path.join(process.cwd(), "package.json");

// Check if the user's package.json file exists
if (fs.existsSync(userPackageJsonPath)) {
  try {
    // Read the user's package.json
    const userPackageJson = require(userPackageJsonPath);

    // Add or update the "setup-tailwind" script
    userPackageJson.scripts = userPackageJson.scripts || {};
    userPackageJson.scripts["setup-tailwind"] =
      "node node_modules/setup-tailwind/setup-tailwind.js";

    // Write the modified package.json back to the user's directory
    fs.writeFileSync(
      userPackageJsonPath,
      JSON.stringify(userPackageJson, null, 2)
    );

    console.log('Added "setup-tailwind" script to your package.json.');
  } catch (error) {
    console.error("Error modifying package.json:", error);
  }
} else {
  console.error(
    "User package.json not found. Make sure you are in the project directory."
  );
}
