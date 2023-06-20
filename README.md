# ProAlx

## Introduction

ProAlx is the ultimate app designed to supercharge your productivity and foster connections with like-minded developers. Our purpose is simple: to connect you with fellow productive developers and provide you with valuable insights into your coding journey.

With ProAlx, you can take advantage of the powerful features, which seamlessly visualizes the time you and other users have spent on various coding projects.

By connecting with fellow developers on ProAlx, you gain access to a vibrant community where you can share experiences, exchange ideas, and collaborate on projects. Harness the collective wisdom and support of your peers to unlock new levels of productivity and achieve your coding goals.

## Features

### Supercharge Your Coding Skills
- View and compare Wakatime stats of fellow students to gauge coding productivity and skills.
- Unlock motivation to push yourself further and achieve coding excellence.

### Unleash GitHub Brilliance
- Access visually appealing and informative GitHub data of other students.
- Make better-informed decisions and elevate your coding projects.

### Connect Beyond Coding
- Discover the interests and hobbies of other students beyond coding.
- Create a supportive community and forge connections on a deeper level.

### Manage Your Connections, Your Way
- Seamlessly handle connection requests from students outside your cohort.
- Accept or decline requests based on your preferences and expand your professional network strategically.

### Cohort Insights Unleashed
- Access detailed information about students in your own cohort.
- Collaborate, network, and learn from your peers, fueling your growth as a coder.

## Installation

## Usage

To use this app you vist our website and get started on your journey.

But if you want to run this locally, kindly follow these steps:

### Instructions

- clone the repository:
```
git clone https://github.com/angelofdeity/ProAlx.git
```
You will need some env variables to run the app. Create a `.env` file in the ProAlx directory as a replica of the `.env.example` file [here](env_example). Then you can replace the values if you want to.

- navigate to the backend directory:
```
cd backend/
```

- Run the setup db script:
```
cd setup_db
sudo ./sql_setup.sh
```
- Install the requirements:
```
pip3 install -r requirements.txt
```
- run the flask app:
```
python3 -m api.v1.app
```

- open another terminal and navigate to `pro-alx-UI`:
```
cd pro-alx-Ui
```
You would need the env variables according to the `pro-alx-UI/env.example` file [here](pro-alx-UI/env_example). Then you can replace the values if you want to.
> You would also need to have node installed on your machine
- Now you can run the following commands:
```
npm install
npm run dev
```



## APIs Used

All available endpoints can be found in the `api.v1.views` directory.
Here's a description of some endpoint used:

- GET /cohorts: Retrieves all cohorts and returns them as a JSON response.

- GET /cohort/<id>: Get a cohort by id.

- DELETE /cohort/<id>: Deletes a Cohort object based on its id.

- POST /cohorts: Creates a new cohort instance with the data provided in the request body.

- PUT /cohort/<id>: Update a Cohort object.

- GET /cohorts/<c_number>: Retrieves all users that belong to a given cohort.

- GET /cohorts/<c_number>/needs_partners: Returns a JSON representation of the list of users who need partners for a given cohort.

- GET /cohorts/<c_number>/leaderboard: Retrieves the leaderboard for a given cohort.

- GET /users/<id>/git_stats: Calculates the daily commit count for each date based on the commit data.


## Contributors

The following individuals have contributed to the development of ProAlx:

- Nico Lawani ([@angelofdeity](https://github.com/angelofdeity))
- Efezino Idisi ([@efezinoidisi](https://github.com/efezinoidisi))
- Oluchukwu Haidome ([@Obihai](https://github.com/Obihai))

Thank you for their valuable contributions!

## License

This project is licensed under the [MIT License](LICENSE).
