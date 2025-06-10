import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Movie, Review, ReviewDto } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';
import { ReviewService } from '../../services/review.service';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css'
})
export class MovieDetailComponent implements OnInit {
  movie: any | null = null; // Using any to handle both camelCase and PascalCase
  reviews: any[] = []; // Using any[] to handle both camelCase and PascalCase
  reviewForm: FormGroup;
  loading = false;
  error: string | null = null;
  showReviewForm = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService,
    private reviewService: ReviewService,
    private fb: FormBuilder
  ) {
    this.reviewForm = this.fb.group({
      reviewerName: ['', [Validators.required, Validators.maxLength(100)]],
      rating: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      comment: ['', [Validators.maxLength(500)]]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadMovie(+id);
      this.loadReviews(+id);
    }
  }

  loadMovie(id: number): void {
    this.loading = true;
    this.movieService.getMovie(id).subscribe({
      next: (movie) => {
        console.log('Movie loaded:', movie);
        this.movie = movie;
        this.loading = false;
      },
      error: (error: any) => {
        this.error = 'Failed to load movie details';
        this.loading = false;
        console.error('Error loading movie:', error);
      }
    });
  }

  loadReviews(movieId: number): void {
    this.reviewService.getReviewsByMovie(movieId).subscribe({
      next: (reviews) => {
        console.log('Reviews loaded:', reviews);
        this.reviews = reviews;
      },
      error: (error: any) => {
        console.error('Error loading reviews:', error);
      }
    });
  }

  onSubmitReview(): void {
    if (this.reviewForm.valid && this.movie) {
      const movieId = this.movie.Id || this.movie.id;
      const reviewData: ReviewDto = {
        ...this.reviewForm.value,
        movieId: movieId,
        reviewDate: new Date().toISOString()
      };

      this.reviewService.createReview(reviewData).subscribe({
        next: () => {
          this.reviewForm.reset();
          this.showReviewForm = false;
          this.loadReviews(movieId);
        },
        error: (error: any) => {
          this.error = 'Failed to submit review';
          console.error('Error creating review:', error);
        }
      });
    }
  }

  deleteReview(reviewId: number): void {
    if (confirm('Are you sure you want to delete this review?')) {
      this.reviewService.deleteReview(reviewId).subscribe({
        next: () => {
          const movieId = this.movie.Id || this.movie.id;
          this.loadReviews(movieId);
        },
        error: (error: any) => {
          this.error = 'Failed to delete review';
          console.error('Error deleting review:', error);
        }
      });
    }
  }

  getStarArray(rating: number): number[] {
    return Array(5).fill(0).map((_, i) => i + 1);
  }

  getAverageRating(): number {
    if (this.reviews.length === 0) return 0;
    const sum = this.reviews.reduce((acc, review) => {
      const rating = review.Rating || review.rating || 0;
      return acc + rating;
    }, 0);
    return Number((sum / this.reviews.length).toFixed(1));
  }

  getFieldError(fieldName: string): string | null {
    const field = this.reviewForm.get(fieldName);
    if (field && field.invalid && (field.dirty || field.touched)) {
      if (field.errors?.['required']) {
        return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
      }
      if (field.errors?.['maxlength']) {
        return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is too long`;
      }
      if (field.errors?.['min']) {
        return `Rating must be between 1 and 5`;
      }
      if (field.errors?.['max']) {
        return `Rating must be between 1 and 5`;
      }
    }
    return null;
  }
}
