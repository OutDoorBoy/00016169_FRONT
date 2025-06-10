# 00016169FRONT

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.0.1.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
   dotnet run
   ```

   The API will be available at `https://localhost:7183`

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd D:\WEBProject\00016169_FRONT
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Update API URL (if needed):**
   - Open `src/app/services/movie.service.ts`
   - Open `src/app/services/review.service.ts`
   - Update the `apiUrl` to match your backend URL (default: `https://localhost:7183`)

4. **Run the frontend:**
   ```bash
   ng serve
   ```

   The application will be available at `http://localhost:4200`

## API Endpoints

### Movies
- `GET /api/movies` - Get all movies
- `GET /api/movies/{id}` - Get movie by ID
- `POST /api/movies` - Create new movie
- `PUT /api/movies/{id}` - Update movie
- `DELETE /api/movies/{id}` - Delete movie

### Reviews
- `GET /api/reviews` - Get all reviews
- `GET /api/reviews/{id}` - Get review by ID
- `GET /api/reviews/movie/{movieId}` - Get reviews for a specific movie
- `POST /api/reviews` - Create new review
- `PUT /api/reviews/{id}` - Update review
- `DELETE /api/reviews/{id}` - Delete review

## Project Structure

### Backend Structure
```
00016168_BACKEND/
├── Controllers/
│   ├── MoviesController.cs
│   └── ReviewsController.cs
├── DAL/
│   ├── Data/
│   ├── DTO/
│   ├── Models/
│   └── Repository/
├── Program.cs
└── appsettings.json
```

### Frontend Structure
```
00016169_FRONT/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── home/
│   │   │   ├── movie-list/
│   │   │   ├── movie-detail/
│   │   │   ├── movie-form/
│   │   │   └── navigation/
│   │   ├── models/
│   │   ├── services/
│   │   ├── app.routes.ts
│   │   └── app.config.ts
│   └── styles.css
└── package.json
```

## Features Overview

### Home Page
- Dashboard with movie and review statistics
- Recent movies showcase
- Recent reviews display
- Quick navigation to main features

### Movie Management
- **List View**: Grid layout showing all movies with search and filter options
- **Detail View**: Comprehensive movie information with associated reviews
- **Add/Edit Form**: Form validation and user-friendly input fields
- **Delete**: Confirmation dialogs for safe deletion

### Review System
- **Star Rating**: 1-5 star rating system
- **Comments**: Text-based review comments
- **Reviewer Information**: Track reviewer names and dates
- **Average Ratings**: Calculated average ratings for each movie

### Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Touch-friendly interface
- Optimized for all screen sizes

## Usage Guide

### Adding a Movie
1. Click "Add Movie" from the navigation or home page
2. Fill in the required fields:
   - Title (required)
   - Director (required)
   - Genre (required)
   - Release Year (1900-2030)
   - Duration in minutes (1-500)
   - Description (optional)
3. Click "Create Movie"

### Adding a Review
1. Navigate to a movie detail page
2. Click "Add Review"
3. Fill in your information:
   - Your name (required)
   - Rating (1-5 stars, required)
   - Comment (optional)
4. Click "Submit Review"

### Editing Movies
1. Go to movie list or detail page
2. Click "Edit" button
3. Modify the information
4. Click "Update Movie"

## Troubleshooting

### Common Issues

**Backend not starting:**
- Ensure .NET 8.0 SDK is installed
- Check if SQL Server is running
- Verify connection string in appsettings.json

**Frontend compilation errors:**
- Run `npm install` to ensure all dependencies are installed
- Check Angular CLI version: `ng version`
- Clear npm cache: `npm cache clean --force`

**API connection issues:**
- Verify backend is running on the correct port
- Check CORS settings in the backend
- Update API URLs in frontend services

**Database issues:**
- Run `dotnet ef database update` to apply migrations
- Check SQL Server connection
- Verify database exists and is accessible

### Development Tips

**Backend Development:**
- Use `dotnet watch run` for automatic restart on file changes
- Check Swagger UI at `https://localhost:7183/swagger` for API testing
- Use `dotnet ef migrations add <name>` for database schema changes

**Frontend Development:**
- Use `ng serve --open` to automatically open browser
- Use browser developer tools for debugging
- Install Angular DevTools extension for better debugging

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for educational and demonstration purposes.

## Support

For issues and questions:
1. Check the troubleshooting section
2. Review Angular and .NET documentation
3. Check browser console for errors
4. Verify API responses in network tab
