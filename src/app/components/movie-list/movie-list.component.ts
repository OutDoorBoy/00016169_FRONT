import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Movie } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent implements OnInit {
  movies: any[] = []; // Using any[] to handle both camelCase and PascalCase
  loading = false;
  error: string | null = null;

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.loading = true;
    this.error = null;
    
    this.movieService.getAllMovies().subscribe({
      next: (movies) => {
        console.log('Movies loaded:', movies);
        this.movies = movies;
        this.loading = false;
      },
      error: (error: any) => {
        this.error = 'Failed to load movies. Please try again.';
        this.loading = false;
        console.error('Error loading movies:', error);
      }
    });
  }

  deleteMovie(id: number): void {
    if (confirm('Are you sure you want to delete this movie?')) {
      this.movieService.deleteMovie(id).subscribe({
        next: () => {
          this.loadMovies(); // Reload the list
        },
        error: (error: any) => {
          this.error = 'Failed to delete movie. Please try again.';
          console.error('Error deleting movie:', error);
        }
      });
    }
  }
}
