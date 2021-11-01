import { Component, OnInit, Input } from '@angular/core';
import { Movie } from 'src/app/models/movie.model';

@Component({
    selector: 'movies-by-group',
    templateUrl: './movies-by-group.component.html',
    styleUrls: ['./movies-by-group.component.scss']
})
export class MovieByGroupComponent implements OnInit {

    @Input()
    moviesByGroup;

    isShowMovies = false;
    selectedIndex = -1;

    constructor() { }

    ngOnInit(): void {
        this.selectedIndex = -1;
        this.isShowMovies = false;
    }

    showMovies(movie: Movie, index: number) {
        this.isShowMovies = !this.isShowMovies;
        this.selectedIndex = index;
    }
}
