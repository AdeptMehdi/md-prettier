# MD Prettier

A modern, responsive web application that converts Markdown to beautiful HTML with live preview and additional features.

## Features

- **Live Markdown Rendering**: Real-time conversion of Markdown to HTML
- **Syntax Highlighting**: Code blocks are highlighted using Highlight.js
- **Dark/Light Theme**: Toggle between light and dark modes
- **Copy Functions**: Copy Markdown input or HTML output to clipboard
- **Download HTML**: Download the rendered HTML as a file
- **Drag & Drop**: Drop .md files directly into the input area
- **Word and Line Counters**: Track input statistics
- **Responsive Design**: Works on desktop and mobile devices
- **Clean UI**: Minimalist design with Tailwind CSS

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/md-prettier.git
   cd md-prettier
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`

5. Run tests (optional):
   ```bash
   npm test
   ```

## Usage

1. Enter Markdown text in the left textarea
2. View the live HTML preview on the right
3. Use the buttons to copy content or download HTML
4. Toggle between light and dark themes
5. Drag and drop .md files to load content

## API

- `GET /`: Serves the main application
- `GET /api/version`: Returns the application version

## Technologies Used

- **Backend**: Node.js, Express.js, Helmet
- **Frontend**: HTML, Tailwind CSS, JavaScript
- **Libraries**: Marked, Highlight.js, SweetAlert2, Font Awesome

## Security

- Uses Helmet for security headers
- Content Security Policy configured for CDNs
- Sanitized HTML output (via Marked's built-in sanitization)

## Deployment

### Local Development
1. Install dependencies: `npm install`
2. Start server: `npm start`
3. Open `http://localhost:3000`

### GitHub Pages Deployment
1. Push code to GitHub repository
2. Go to repository Settings > Pages
3. Set source to "GitHub Actions"
4. The workflow will automatically deploy on push to main branch
5. Access at `https://yourusername.github.io/md-prettier`

### Alternative Deployment
You can also deploy to Vercel, Netlify, or any static hosting service by uploading the `public` folder contents.

## Testing
Run tests with: `npm test`

## License

MIT License
