# Munene Denis - Personal Portfolio

A dynamic, cyberpunk-themed personal portfolio website showcasing projects, skills, and educational background. Built with pure HTML and CSS, featuring stunning animations and a fully responsive layout without any JavaScript dependencies.

## 🚀 Features

- **Cyberpunk Aesthetic**: Modern, futuristic design with dark themes and vibrant neon colors
- **Pure CSS Animations**: Dynamic effects for backgrounds, hero images, project cards, and interactive buttons
- **Fully Responsive**: Seamlessly adapts to all screen sizes with CSS-only hamburger menu
- **Static Site**: Lightning-fast performance, perfect for any static hosting service
- **Zero JavaScript**: Built entirely with HTML5 and CSS3 for maximum compatibility

## 📁 Project Structure

```
.
├── cv.pdf                    # Downloadable CV
├── index.html               # Main landing page
├── resume.html              # Resume page (optional)
├── Dockerfile               # Docker configuration
├── docker-compose.yml       # Docker Compose setup
└── static/
    ├── css/
    │   └── styles.css       # Main stylesheet
    ├── images/              # Image assets
    │   └── [image files...]
    └── videos/              # Video assets
        └── [video files...]
```

## 🌐 Live Demo

The portfolio is hosted on GitHub Pages:  
**[View Live Portfolio](https://munene1212.github.io)**

## 🐳 Getting Started with Docker

Run the portfolio locally using Docker with a lightweight Nginx server.

### Prerequisites

- Docker installed on your machine
- Docker Compose (usually included with Docker)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd <your-repo-name>
   ```

2. **Build and run with Docker Compose**
   ```bash
   docker-compose up -d
   ```

3. **View the website**
   Open your browser and navigate to [http://localhost:8080](http://localhost:8080)

4. **Stop the container**
   ```bash
   docker-compose down
   ```

### Docker Configuration

**Dockerfile**
```dockerfile
# Use a lightweight Nginx base image
FROM nginx:alpine

# Copy all project files into the Nginx web root
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80
```

**docker-compose.yml**
```yaml
version: '3.8'

services:
  web:
    build:
      context: .
    ports:
      - "8080:80"
    restart: unless-stopped
```

## 🛠️ Technologies Used

- **HTML5** - Semantic markup and structure
- **CSS3** - Styling, animations, and responsive design
- **Nginx** - Web server (via Docker)
- **Docker** - Containerization and deployment

## 📱 Responsive Design

The portfolio is fully responsive and optimized for:
- 📱 Mobile devices (320px and up)
- 📱 Tablets (768px and up)
- 💻 Desktop computers (1024px and up)
- 🖥️ Large screens (1440px and up)

## 🎨 Design Philosophy

This portfolio embraces a cyberpunk aesthetic with:
- Dark color schemes with neon accents
- Smooth CSS animations and transitions
- Modern typography and layout principles
- Accessibility-first design approach

## 📧 Contact

**Munene Denis**
- Portfolio: [https://munene1212.github.io]
- Email: [mnent2025@gmail.com]
- LinkedIn: [https://www.linkedin.com/in/munene-ndegwa-7167b718a/]
- GitHub: [munene1212]

---

⭐ **Star this repository if you found it helpful!**
