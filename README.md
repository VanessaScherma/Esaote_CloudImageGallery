# Cloud Image GalleryAll mutations update the <b>DynamoDB table</b>, ensuring the metadata remains consistent across sessions.


A schema-driven image gallery built with React, GraphQL, and AWS.

# 📌 Features
- <b>Dynamic Schema-Driven UI</b> – Easily modify layout & actions via JSON schema.
- <b>GraphQL API</b> – Optimized image queries and mutations.
- <b>AWS Cloud Integration</b> – S3 for image storage, DynamoDB for metadata, EC2 for backend.


# Run Locally (Development setup)
<b>Prerequisites</b> Node.js, Yarn
## Backend
1. Clone the repo and navigate to `server/`
2. Install dependencies:
```
yarn install
```
3. Start the server:
```
yarn start
```
4. Test GraphQL Api at:
```
http://localhost:4000/graphql
```

## Frontend
1. Navigate to `client/`
2. Install dependencies:
```
yarn install
```
3. Start the frontend:
```
yarn dev
```
4. Open `http://localhost:5173` in the browser.


# Cloud Deployment (AWS)

The application is deployed on AWS using <b>S3, EC2, DynamoDB, and CloudFront</b>.

### CI/CD Pipeline

GitHub Actions triggers deploy on every push to `main`:

- Frontend → Uploaded to S3 + CloudFront cache invalidation.
- Backend → Deployed to EC2 via SSH.

## Understanding the Schema-Driven UI
The UI structure is controlled by `schema.json`, which defines how images are displayed and interacted with.
```json
{
    "layout": {
      "type": "grid",
      "spacing": 4,
      "columns": 3
    },
    "actions": [
      {
        "name": "Like",
        "icon": "Favorite",
        "action": "toggleLike",
        "color": "error"
      },
      {
        "name": "Feature",
        "icon": "Star",
        "action": "toggleFeature",
        "color": "warning"
      },
      {
        "name": "Delete",
        "icon": "Delete",
        "action": "deleteImage",
        "color": "default"
      }
    ]
  }
  
```
Modifying schema.json changes UI layout & behavior without altering code!

## GraphQL and mutations
The GraphQL API enables interaction with the gallery by retrieving image metadata from DynamoDB and updating the stored information.

### Queries
```
query GetImages {
  schema {
    layout {
      type
      spacing
    }
    actions {
      name
      icon
      action
      color
    }
  }
  images {
    id
    src
    alt
    likes
    isFeatured
  }
}
```

### Mutations
```
mutation AddLike($id: ID!) {
  addLike(id: $id) {
    id
    likes
  }
}

mutation RemoveLike($id: ID!) {
  removeLike(id: $id) {
    id
    likes
  }
}

mutation DeleteImage($id: ID!) {
  deleteImage(id: $id)
}

mutation MarkFeatured($id: ID!) {
  markFeatured(id: $id) {
    id
    isFeatured
  }
}
```
All mutations update the <b>DynamoDB table</b>, ensuring the metadata remains consistent across sessions.