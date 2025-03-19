# Design Document: Cloud Image Gallery Prototype

## Overview
The Cloud Image Gallery prototype is a web application that allows users to view and interact with images on the cloud. The system is designed using a <b>schema-driven UI</b> approach, making it highly flexible and configurable. The application consists of a <b>React frontend</b> for image visualization and interaction, and a <b>GraphQL backend</b> hosted on AWS, which manages images, user interactions (likes, favorites), and storage in Amazon S3.

## System Architecture
The architecture follows a <b>microservices-based</b> approach, utilizing AWS services for scalability.

### Components
- <b>Frontend (React + Vite)</b>
    - Hosted on <b>AWS S3</b> with <b>CloudFront</b> for global content delivery
    - Uses <b>Apollo Client</b> for querying GraphQL API
    - Uses <b>Material UI</b> for styling and UI components
    - <b>Redux</b> manages application state, tracking user interactions (likes)
    - Dynamically renders UI based on a JSON schema
- <b>Backend (GraphQL + Node.js)</b>
    - Hosted on <b>AWS EC2</b>
    - Uses <b>Apollo Server</b> for handling GraphQL queries/mutations
    - Stores metadata (image likes, featured images) in <b>AWS DynamoDB</b>
    - Interacts with <b>Amazon S3</b> for image storage
- <b>Database and Storage</b>
    - <b>Amazon DynamoDB</b> to store metadata about images
    - <b>Amazon S3</b> to store images

## Cloud Deployment Strategy
### CI/CD Pipeline
The deployment process is automated using <b>GitHub Actions</b>, which triggers a pipeline when changes are pushed to the `main` branch. The key steps are:

1. <b>Checkout the Repository</b>: GitHub Actions clones the latest code from the repository.

2. <b>Setup SSH Access to EC2</b>: the private SSH key is loaded, and the EC2 instance is added to known_hosts.

3. <b>Install Dependencies</b>: installs necessary packages for both the frontend (client/) and backend (server/).

4. <b>Build Frontend</b>: the frontend is compiled and optimized for production.

5. <b>Upload Frontend to S3</b>: the built frontend is synced with the S3 bucket (esaote-cloud-gallery), ensuring only updated files are deployed.

6. <b>Deploy Backend to EC2</b>: connects to the EC2 instance via SSH, navigates to the backend directory, pulls the latest changes from the repository, exports AWS credentials, installs dependencies and restarts the backend.

This pipeline ensures a fully automated deployment of both the frontend and backend, reducing manual intervention and making updates seamless.