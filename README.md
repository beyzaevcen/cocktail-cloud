# Cocktail Cloud 🍹

## Overview
Cocktail Cloud is a modern web application designed for cocktail enthusiasts who want to discover recipes and learn about unique flavor combinations. The app allows users to embark on a journey through the world of cocktails. It leverages TheCocktailDB API to provide a comprehensive database of cocktail recipes and information.

## Features
- **Cocktail Discovery**: Explore a variety of cocktail recipes
- **Detailed Recipes**: Ingredients, preparation steps, and tips for each cocktail
- **Search Functionality**: Find cocktails by name, ingredients, or type
- **Responsive Design**: Perfect viewing on mobile, tablet, and desktop devices

## Technology Stack
- **Frontend**: Vue 3 + Vite
- **Styling**: Tailwind CSS
- **Routing**: Vue Router
- **API**: TheCocktailDB API
- **Deployment**: Vercel

## Installation & Running

### Requirements
- Node.js (v14.0.0 or higher)
- npm or yarn

### Setting Up Local Development Environment
```bash
# Clone the repository
git clone https://github.com/yourusername/cocktail-cloud.git
cd cocktail-cloud

# Install dependencies
npm install
# or
yarn install

# Start the development server
npm run dev
# or
yarn dev
```

The application will be running at: `http://localhost:5173/`

### Production Deployment
```bash
# Build for production
npm run build
# or
yarn build
```

## Project Structure
```
cocktail-cloud/
├── public/            # Static files
├── src/
│   ├── assets/        # Images and styles
│   ├── components/    # Vue components
│   ├── pages/         # Page components
│   ├── router/        # Vue router configuration
│   ├── App.vue        # Main application component
│   └── main.js        # Application entry point
├── .gitignore
├── index.html
├── package.json
├── README.md
└── vite.config.js
```

## Known Issues and Solutions
- **Vercel Deployment Error**: When referencing image files, use relative paths or imports instead of absolute paths.
  - ❌ `src="/Users/username/cocktail-cloud/src/assets/cocktail.webp"` (Wrong)
  - ✅ `import cocktailImage from '@/assets/cocktail.webp'` (Correct) or
  - ✅ `src="/assets/cocktail.webp"` (Correct - for files in the public folder)

## Contributing
Contributions are welcome! Please:
1. Fork this repository
2. Create a feature branch (`git checkout -b new-feature`)
3. Commit your changes (`git commit -m 'New feature: Description'`)
4. Push to the branch (`git push origin new-feature`)
5. Open a Pull Request

## License
MIT

---

Created with ❤️ by [Your Name]