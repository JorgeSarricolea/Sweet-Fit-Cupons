# Front-End

This documentation provides an overview of the front-end application built with Astro and Tailwind CSS. The application is designed with a component-based architecture to ensure modularity, maintainability, and scalability. By leveraging these technologies and an organized file structure, the front-end is both efficient and easy to manage.

## Table of Contents

- [Front-End](#Front-End)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Description of Folders and Files](description-of-folders-and-files)
  - [Features](#features)
 
# Introduction

The front-end of this application is built using Astro and Tailwind CSS, leveraging a component-based architecture to ensure modularity and maintainability. Astro is chosen for its performance and simplicity in building static sites, while Tailwind CSS is used for its utility-first approach to styling, enabling rapid and consistent design implementation.

The front-end is structured to optimize code reuse and scalability. The src directory is organized into components, pages, and js folders, each serving a specific purpose:

**Components:** Contains reusable UI elements divided into subfolders based on their functionality, such as buttons, inputs, popups, tables, and general components. This structure facilitates easy maintenance and reuse across different parts of the application.

Pages: Contains the main pages of the application, each represented by a file in this directory. This separation ensures that the layout and logic for each page are isolated and manageable.
**JavaScript (js):** Contains the application's logic, including configuration files, handlers for back-end interactions, and utility functions. This directory ensures that the business logic is modular and organized.

The application emphasizes a clear separation of concerns, allowing for independent development and testing of different parts of the system. This approach not only enhances maintainability but also makes it easier to extend the application with new features.

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

1. Remember that there are two servers, one for the front-end and another for the back-end. To run the front-end, go to the **client** folder and execute the following commands:
```
pnpm install
pnpm run dev
```

# Description of Folders and Files

1. **components/**
This folder contains all reusable components divided by their responsibility. This allows for better organization and code reuse.

**`buttons/`** Components related to buttons.
**`inputs/`** Components related to data input.
**`popups/`** Components for pop-up windows.
**`tables/` **Components related to tables.
**`/`** Other general components that do not fit into the above categories.

2. **pages/**
Contains the main pages of the application. Each file in this folder represents a complete page.

3. **js/**
This folder contains JavaScript files related to the application's logic and its interaction with the back-end.

**`config.js`** Main configuration file, where the API URL is defined.
**`handlers/`** Folder containing specific functions that interact with the back-end.
**`objects/`** Folder containing objects used in the application.
**`auth.js`** File where user authorization with the back-end occurs.
