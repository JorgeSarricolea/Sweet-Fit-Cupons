# Back-End

This documentation provides an overview of the back-end application built with Node.js, Prisma, and several other services such as Bcrypt for hashing passwords and Nodemailer for sending emails. The application follows a well-organized architecture to ensure maintainability, scalability, and ease of development.

## Table of Contents

- [Back-End](#back-End)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Description of Folders and Files](#description-of-folders-and-files)
  - [Migrations](#migrations)
 
# Introduction

The software architecture implemented in this project is a modular and service-oriented architecture, organized into distinct layers for configuration, handling services, defining routes, and controlling business logic. This architecture ensures:

- **Maintainability:** Code is organized into specific directories based on functionality, making it easier to manage and update individual parts of the application without affecting the entire system.
- **Scalability:** The modular nature allows for easy expansion. New features and services can be integrated with minimal changes to the existing codebase.
- **Separation of Concerns:** Different responsibilities are separated into different modules, promoting clean code practices and enabling independent development and testing.

# Getting Started

> [!TIP]
> I recommend installing Node Version Manager and using the stable version.

```bash
# Install nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

# Check the version of nvm installed
nvm --version

# Install the stable version of Node
nvm install stable

# Check the version of Node installed
node -v
```

### Prerequisites

> [!IMPORTANT]
> **Node.js:** Ensure that you have Node.js installed on your system.

# Installation

1. Remember that there are two servers, one for the front-end and another for the back-end. To run the back-end, go to the **server** folder and execute the following commands:
```
pnpm install
pnpm run dev
```
> [!TIP]
> The back-end server uses **nodemon** to automatically restart when code changes are detected, improving the development experience by allowing for faster iteration.

# Description of Folders and Files

**`config/`**
This folder contains configuration files necessary for the application to run. It includes configurations for connecting to various services and settings for the application.

- **config.js:** Manages the client URL and other global configuration settings.
- **nodemailer.js:** Manages the connection settings for the Nodemailer service used for sending emails.

**`controllers/`**
Contains the controller files which define the business logic for handling requests and responses for different resources in the API.

**`handlers/`**
This folder contains utility functions and services used by controllers and other parts of the application. These include functions for services such as **Bcrypt** for password hashing and **Nodemailer** for sending emails.

**`prisma/shema.prisma`**
Contains the database models defined using Prisma. Defines the data models and relationships for the Prisma ORM.

**`routes/`**
Defines the endpoints for the API. Each file in this directory corresponds to a set of related routes for different resources in the application.

**`index.js`**
The entry point of the application. This file initializes the server, connects to the database, sets up middleware, and defines the main routes.

# Migrations

To perform migrations automatically, you can take a look at the script located within the **scripts** folder: [auto_migrate.sh](scripts/auto_migrate.sh)

> [!TIP]
> Just run this script following the next command:
> **./scripts/auto_migrate.sh**

This allows the **'migrate'** command to be executed with the next command without the need to specify a name; by default, it is set to **'auto_migrate'**.
