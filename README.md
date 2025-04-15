# LastFm

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.



# Docker

## Build Image
Creates a Docker image from the current directory and tags it as last_fm.
``` bash
docker build -t last_fm .
```
- t last_fm — assigns the name (tag) last_fm to the image.
- sets the build context to the current directory (where the Dockerfile is located).


## Start a Container
Runs a container from the last_fm image in detached mode and maps the port.
``` bash 
docker run -d -p 8070:8080 last_fm
```
- -d — runs the container in detached mode (in the background).
- -p 8070:8080 — maps port 8080 of your local machine to port 8080 inside the container.


Open http://localhost:8070 to view it in the browser