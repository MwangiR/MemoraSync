# MemoraSync

# Link
[MemoraSync](https://serene-reaches-76674-262a59e1f12f.herokuapp.com)

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)
  
## Introduction

The Express Notes App is a simple web application that allows users to create, view, and delete notes. It utilizes the Express.js framework to handle server-side operations, and it interacts with a JSON database (`db.json`) to store and manage note data.

## Installation

1. Clone this repository to your local machine using: `git clone <repository-url>`

2. Navigate to the project directory: `cd MemoraSync`

3. Install the required dependencies using: `npm install`

## Usage

1. Start the server using the following command: `npm start`

2. Open your web browser and navigate to `http://localhost:3001`.

3. You can now create and manage notes using the app's user interface.

## API Endpoints

The Express Notes App provides the following API endpoints:

- `GET /api/notes`: Retrieve a list of all notes in JSON format.
- `POST /api/notes`: Create a new note and add it to the database.
- `DELETE /api/notes/:id`: Delete a note with the specified ID from the database.

## Technologies Used

- Express.js: Fast, unopinionated, minimalist web framework for Node.js.
- fs/promises: Node.js module for asynchronous file system operations.
- uniqid: A unique ID generator.
- HTML/CSS: Frontend languages for user interface design.
- JSON: Data format used for storing notes.

## Contributing

Contributions are welcome! To contribute to the Express Notes App, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature/fix.
3. Make your changes and commit them with descriptive messages.
4. Push your changes to your fork.
5. Submit a pull request to the main repository.

## License

This project is licensed under the [MIT License](LICENSE).
