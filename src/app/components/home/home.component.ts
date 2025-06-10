import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Movie, Review } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';
import { ReviewService } from '../../services/review.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  recentMovies: any[] = []; // Using any[] to handle both camelCase and PascalCase
  recentReviews: any[] = []; // Using any[] to handle both camelCase and PascalCase
  movieCount = 0;
  reviewCount = 0;
  loading = false;

  constructor(
    private movieService: MovieService,
    private reviewService: ReviewService
  ) { }

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.loading = true;

    // Load movies
    this.movieService.getAllMovies().subscribe({
      next: (movies) => {
        console.log('Dashboard movies loaded:', movies);
        this.movieCount = movies.length;
        this.recentMovies = movies.slice(0, 6); // Get first 6 movies
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Error loading movies:', error);
        this.loading = false;
      }
    });

    // Load reviews
    this.reviewService.getAllReviews().subscribe({
      next: (reviews) => {
        console.log('Dashboard reviews loaded:', reviews);
        this.reviewCount = reviews.length;
        this.recentReviews = reviews.slice(0, 5); // Get first 5 reviews
      },
      error: (error: any) => {
        console.error('Error loading reviews:', error);
      }
    });
  }

  getStarArray(rating: number): number[] {
    return Array(5).fill(0).map((_, i) => i + 1);
  }
}
