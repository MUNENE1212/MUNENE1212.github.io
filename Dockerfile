# Use a lightweight Nginx base image to serve the static files
FROM nginx:alpine

# Copy all files from the current directory (your project root)
# into the default Nginx web root inside the container.
# This includes index.html, resume.html, and the static folder.
COPY . /usr/share/nginx/html
