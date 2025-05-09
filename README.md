# NetCore_React_CRUD

A full-stack CRUD (Create, Read, Update, Delete) application built with .NET Core API and React.

## Project Overview

This project demonstrates a simple but complete implementation of a CRUD application with:
- Backend: ASP.NET Core Web API
- Frontend: React.js
- Database: Entity Framework Core with SQL Server

## Features

- RESTful API with .NET Core
- Entity Framework Core for data access
- React frontend with component-based architecture
- Full CRUD operations:
  - Create new items
  - Read/view existing items
  - Update existing items
  - Delete items
- Responsive UI

## Project Structure

### Backend (.NET Core API)

- **Controllers**: Contains API endpoints for CRUD operations
- **Models**: Defines the data model (Item class)
- **Data**: Contains the database context and configuration
- **Migrations**: Entity Framework Core migrations

### Frontend (React)

- **Components**: Reusable UI components
  - ItemList: Displays all items with options to view, edit, or delete
  - ItemDetail: Shows details of a specific item
  - CreateForm: Form for creating new items
  - UpdateForm: Form for updating existing items
- **Services**: API service for handling HTTP requests

## Prerequisites

- [.NET 8.0 SDK](https://dotnet.microsoft.com/download)
- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) (LocalDB or full version)

## Getting Started

### Setting up the Backend

1. Navigate to the API project directory:
   ```
   cd Test.API
   ```

2. Restore NuGet packages:
   ```
   dotnet restore
   ```

3. Update the database connection string in `appsettings.json` if necessary

4. Apply database migrations:
   ```
   dotnet ef database update
   ```

5. Run the API:
   ```
   dotnet run
   ```
   The API should be running at `https://localhost:7123` (or a similar port)

### Setting up the Frontend

1. Navigate to the React app directory:
   ```
   cd reactapp
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```
   The React app should open in your browser at `http://localhost:3000`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | /api/items | Get all items |
| GET    | /api/items/{id} | Get a specific item by ID |
| POST   | /api/items | Create a new item |
| PUT    | /api/items/{id} | Update an existing item |
| DELETE | /api/items/{id} | Delete an item |

## Data Model

The main entity in this application is the `Item` class:

```csharp
public class Item
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
}
```

## Future Improvements

- Add authentication and authorization
- Implement sorting and filtering
- Add pagination for large datasets
- Create more complex data models
- Add unit and integration tests
- Implement error logging and monitoring
