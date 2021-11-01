import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MovieService } from 'src/app/Services/movie.service';
import { Movie } from 'src/app/models/movie.model';
import { ModalService } from 'src/app/Services/modal.service';
import { MovieByGroupComponent } from '../movies-by-group/movies-by-group.component';

@Component({
    selector: 'modal-template',
    templateUrl: './modal-template.component.html',
    styleUrls: ['./modal-template.component.scss']
})
export class ModalTemplateComponent implements OnInit {

    moviesByGroup: MoviesByGroup[];
    @ViewChild(MovieByGroupComponent) moviesByGroupComponent: MovieByGroupComponent;

    display: string;
    reportType: string;

    constructor(public movieService: MovieService, public modalService: ModalService) {
        this.modalService.show.subscribe(displayType => {
            this.display = displayType;
            this.showGenreReport();
        });
    }

    ngOnInit(): void {
    }

    getMoviesByYear() {
        let groupByMovies = this.getMoviesByType('Release_Date');
        this.moviesByGroup = new Array<MoviesByGroup>();
        for (const key in groupByMovies) {
            this.moviesByGroup.push(new MoviesByGroup(key, groupByMovies[key]?.movies));
        }
    }

    getGroupMoviesByGenre() {
        let groupByMovies = this.getMoviesByType('Major_Genre');
        this.moviesByGroup = new Array<MoviesByGroup>();
        for (const key in groupByMovies) {
            this.moviesByGroup.push(new MoviesByGroup(key, groupByMovies[key]?.movies));
        }
    }

    getGroupMoviesByYear() {
        let groupByMovies = this.getMoviesByTypeYear();
        this.moviesByGroup = new Array<MoviesByGroup>();
        for (const key in groupByMovies) {
            this.moviesByGroup.push(new MoviesByGroup(key, groupByMovies[key]?.movies));
        }
    }

    private getMoviesByType(type: string) {
        let groupByMovies = {};
        this.movieService.getMovies.forEach(movie => {
            if (!movie[type]) {
                this.pushToOtherMovieType(groupByMovies, movie);
                return;
            }
            this.pushToSpecificMovieTye(groupByMovies, movie, type);
        });
        return groupByMovies;
    }

    private pushToSpecificMovieTye(groupByMovies: {}, movie: Movie, type: string) {
        if (groupByMovies[movie[type]]) {
            groupByMovies[movie[type]].movies.push(movie);
        }
        else {
            groupByMovies[movie[type]] = { movies: new Array<Movie>() };
            groupByMovies[movie[type]].movies.push(movie);
        }
    }

    private pushToOtherMovieType(groupByMovies: {}, movie: Movie) {
        if (groupByMovies['Others']) {
            groupByMovies['Others'].movies.push(movie);
        }
        else {
            groupByMovies['Others'] = { movies: new Array<Movie>() };
            groupByMovies['Others'].movies.push(movie);
        }
    }

    private getMoviesByTypeYear() {
        let groupByMovies = {};
        this.movieService.getMovies.forEach(movie => {
            if (!movie.Release_Date)
                return;

            let year = new Date(movie.Release_Date).getFullYear();
            if (groupByMovies[year]) {
                groupByMovies[year].movies.push(movie);
            }
            else {
                groupByMovies[year] = { movies: new Array<Movie>() };
                groupByMovies[year].movies.push(movie);
            }
        });
        return groupByMovies;
    }

    closeModal() {
        this.display = 'none';
    }

    showGenreReport() {
        this.reportType = 'genre';
        this.getGroupMoviesByGenre();
        this.moviesByGroupComponent.ngOnInit();
    }

    showYearReport() {
        this.reportType = 'year';
        this.getGroupMoviesByYear();
        this.moviesByGroupComponent.ngOnInit();
    }
}

export class MoviesByGroup {
    Type: string;
    Movies: Movie[];

    constructor(type: string, movies: Movie[]) {
        this.Type = type;
        this.Movies = movies;
    }
}
