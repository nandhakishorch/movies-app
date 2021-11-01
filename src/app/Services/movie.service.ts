import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie.model';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root'
})
export class MovieService {

    constructor(public apiService: ApiService) {

    }

    public GetAllMovies(): Observable<Movie[]> {
        return this.apiService.get('assets/movies-copy.json');
    }

    private _moives: Movie[];
    public get getMovies(): Movie[] {
        return this._moives;
    }
    public set setMovies(v: Movie[]) {
        this._moives = v;
    }

}