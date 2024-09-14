# MediMate

MediMate is an all-in-one healthcare solution. Quickly schedule medication reminders, access documents, schedule appointments, and more! 

## Getting Started

MediMate is using Laravel 11+ and React, Interia, and Tailwinds. A local env is available via Docker container using Laravel Sail https://laravel.com/docs/11.x/sail. 

After cloning the repo, make a copy of .env.example `cp .env.example .env`

To set the local env run 

    ```docker run --rm \
    -u "$(id -u):$(id -g)" \
    -v "$(pwd):/var/www/html" \
    -w /var/www/html \
    laravelsail/php83-composer:latest \
    composer install --ignore-platform-reqs```

Then run `npm install`

It is best to add an alias for Laravel Sail by following the steps here: https://laravel.com/docs/11.x/sail#configuring-a-shell-alias

The front end is built using React, Inertia, and Tailwinds CSS. More info about these frameworks can be found here: 
https://inertiajs.com/
https://react.dev/
https://tailwindcss.com/

## Contributing

All contributions should be placed in their own branch with the following format `feature/{feature name}`

A pull request is necessary for all merges to main. 
