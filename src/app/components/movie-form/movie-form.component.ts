import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { MovieDto } from '../../models/movie.model';

@Component({
  selector: 'app-movie-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './movie-form.component.html',
  styleUrl: './movie-form.component.css'
})
export class MovieFormComponent implements OnInit {
  movieForm: FormGroup;
  isEditMode = false;
  movieId: number | null = null;
  loading = false;
  error: string | null = null;

  genres = [
    'Action', 'Adventure', 'Animation', 'Biography', 'Comedy', 'Crime',
    'Documentary', 'Drama', 'Family', 'Fantasy', 'Horror', 'Mystery',
    'Romance', 'Sci-Fi', 'Thriller', 'War', 'Western'
  ];

  constructor(
    private fb: FormBuilder,
    private movieService: MovieService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.movieForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(200)]],
      description: ['', [Validators.maxLength(1000)]],
      genre: ['', [Validators.required, Validators.maxLength(50)]],
      releaseYear: [null, [Validators.required, Validators.min(1900), Validators.max(2030)]],
      duration: [null, [Validators.required, Validators.min(1), Validators.max(500)]],
      director: ['', [Validators.required, Validators.maxLength(100)]]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.movieId = +id;
      this.loadMovie();
    }
  }

  loadMovie(): void {
    if (this.movieId) {
      this.loading = true;
      this.movieService.getMovie(this.movieId).subscribe({
        next: (movie: any) => {
          console.log('Loading movie for edit:', movie);
          
          // Handle both PascalCase and camelCase properties
          this.movieForm.patchValue({
            title: movie.Title || movie.title || '',
            description: movie.Description || movie.description || '',
            genre: movie.Genre || movie.genre || '',
            releaseYear: movie.ReleaseYear || movie.releaseYear || null,
            duration: movie.Duration || movie.duration || null,
            director: movie.Director || movie.director || ''
          });
          
          console.log('Form values after patch:', this.movieForm.value);
          console.log('Form valid after patch:', this.movieForm.valid);
          this.loading = false;
        },
        error: (error: any) => {
          this.error = 'Failed to load movie details';
          this.loading = false;
          console.error('Error loading movie:', error);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.movieForm.valid) {
      this.loading = true;
      this.error = null;

      const formValue = this.movieForm.value;
      const movieData: MovieDto = {
        title: formValue.title,
        description: formValue.description || '',
        genre: formValue.genre,
        releaseYear: parseInt(formValue.releaseYear),
        duration: parseInt(formValue.duration),
        director: formValue.director
      };

      console.log('Submitting movie data:', movieData);

      if (this.isEditMode && this.movieId) {
        this.movieService.updateMovie(this.movieId, movieData).subscribe({
          next: () => {
            console.log('Movie updated successfully');
            this.router.navigate(['/movies']);
          },
          error: (error: any) => {
            this.error = 'Failed to update movie';
            this.loading = false;
            console.error('Error updating movie:', error);
          }
        });
      } else {
        this.movieService.createMovie(movieData).subscribe({
          next: (response) => {
            console.log('Movie created successfully:', response);
            this.router.navigate(['/movies']);
          },
          error: (error: any) => {
            this.error = 'Failed to create movie. Please check if the backend is running.';
            this.loading = false;
            console.error('Error creating movie:', error);
            
            if (error.status === 0) {
              this.error = 'Cannot connect to server. Please ensure the backend is running on http://localhost:7183';
            } else if (error.status === 404) {
              this.error = 'API endpoint not found. Please check the backend URL.';
            } else if (error.status === 500) {
              this.error = 'Server error. Please check the backend logs.';
            }
          }
        });
      }
    } else {
      console.log('Form is invalid:', this.movieForm.errors);
      console.log('Form controls status:');
      Object.keys(this.movieForm.controls).forEach(key => {
        const control = this.movieForm.get(key);
        console.log(`${key}: valid=${control?.valid}, value=${control?.value}, errors=`, control?.errors);
      });
      this.movieForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.router.navigate(['/movies']);
  }

  getFieldError(fieldName: string): string | null {
    const field = this.movieForm.get(fieldName);
    if (field && field.invalid && (field.dirty || field.touched)) {
      if (field.errors?.['required']) {
        return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
      }
      if (field.errors?.['maxlength']) {
        return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is too long`;
      }
      if (field.errors?.['min']) {
        return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is too small`;
      }
      if (field.errors?.['max']) {
        return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is too large`;
      }
    }
    return null;
  }
}
