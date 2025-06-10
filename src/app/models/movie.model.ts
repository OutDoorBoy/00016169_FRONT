export interface Movie {
  id: number;
  title: string;
  description: string;
  genre: string;
  releaseYear: number;
  duration: number;
  director: string;
  createdDate: string;
  reviews?: Review[];
}

export interface MovieDto {
  title: string;
  description: string;
  genre: string;
  releaseYear: number;
  duration: number;
  director: string;
}

export interface Review {
  id: number;
  movieId: number;
  reviewerName: string;
  rating: number;
  comment: string;
  reviewDate: string;
  movie?: Movie;
}

export interface ReviewDto {
  movieId: number;
  reviewerName: string;
  rating: number;
  comment: string;
  reviewDate: string;
}
