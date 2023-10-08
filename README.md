# Setup Tailwind CSS Package

This npm package automates the setup of a [Tailwind CSS](https://tailwindcss.com/) environment with [Vite](https://vitejs.dev/). It streamlines the process of getting started with Tailwind CSS in your project by installing the necessary dependencies, initializing Tailwind CSS, and configuring a basic project structure.

## Installation

To use this package, you can install it globally using npm:

```bash
npm install -g setup-tailwind
```

Usage
After installing the package,

Add this to the scripts tag of your package.json file and then run the setup command

``` bash
"setup-tailwind": "node node_modules/setup-tailwind/setup-tailwind.js"
```

 you can run the setup command in your project directory:

```bash
npm run setup-tailwind
```

Features
Automated Setup: Quickly set up a Tailwind CSS project with minimal manual configuration.
Tailwind Configuration: The package updates the Tailwind CSS configuration to include all classes by default.
Vite Integration: Vite is used as the build tool for a fast development experience.
Configuration
You can customize the behavior of this package by modifying the setup-tailwind.js script included in your project.

License
This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgments
Tailwind CSS
Vite
Contributing
Contributions are welcome! Feel free to open an issue or create a pull request.

Authors
[AnasGrzor]
Contact
If you have any questions or feedback, you can reach out to [anaskhalid658@gmail.com].
