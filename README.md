## Cricket Scoring Project Specification Document

<h2>Project Overview</h2>

The Cricket Scoring Project aims to develop a robust backend system using Node.js and TypeScript for accurately tracking and updating cricket scores. The system will handle various scenarios in cricket scoring, including special cases like overthrows, no-balls, wides, and wickets. The project will involve creating a flexible and dynamic data schema to manage scoring outcomes and an admin panel frontend interface for real-time scoring and editing capabilities.

## Backend Requirements

<h2>Technology Stack</h2>

●	Backend: Node.js with TypeScript
●	Database: MongoDB
●	API Framework: Nest.js/Express.js (or an equivalent framework)
●	Frontend: No specification

## Schema Design

The developer is responsible for designing the payload schema to be sent from the frontend. The schema should handle various cricket scoring scenarios, including but not limited to:

●	normal
●	normal with overthrow
●	overthrow
●	bye
●	bye with overthrow
●	legbye
●	legbye with overthrow
●	noball
●	noball with overthrow
●	noball with bye
●	noball with bye and overthrow
●	noball with legbye
●	noball with legbye and overthrow
●	wide 
●	wide with overthrow
●	wide with bye
●	wide with bye and overthrow
●	wide with legbye
●	wide with legbye and overthrow
●	wicket

## Outcome Effects

Each scenario will have specific effects on the batsman stats, bowler stats, extras, team stats, and the overall match progress. The developer must clearly implement some of these unique effects as described below:

1.	Wide + runs:
○	No balls increase.
○	1 run conceded in bowler data.
○	All runs are added to the team data.
○	No runs are credited to the batsman.
○	Wide extra includes all runs.
</br>
3.	Noball + bye:
○	Batsman balls increase by 1.
○	1 run conceded to bowler data.
○	All runs are added to the team data.
○	No runs are credited to the batsman.
○	1 run credited to noball in extras and others added as bye.
</br>
4.	Noball + runs:
○	Batsman balls increase by 1.
○	All runs are considered for bowler data.
○	All runs, except 1, are credited to the batsman.
○	1 run is credited to noball in extras.
</br>
6.	Noball + legbye:
○	Batsman balls increase by 1.
○	1 run conceded to bowler data.
○	All runs are added to team data.
○	No runs are credited to the batsman.
○	1 run is added to noball in extras and others as legbye.
</br>
8.	Legbye/Bye + Overthrow:
○	Treated as a normal legbye/bye.
○	All runs added in extras as bye or legbye.
9.	Runs + OT (Overthrow):
○	All runs credited to the batsman account.
 
## Frontend Requirements

●	The frontend will include an Admin Panel UI. The actual project UI will be provided as a reference. The developer will need to incorporate several buttons and features in the UI, such as:
○	Buttons for adding extras, overthrows, byes, legbyes.
○	Batsman and bowler scorecards (balls/runs for batsman; over/runs/maidens for bowler).
○	Last wicket details, runs/over.
○	Handling tick/untick functionality on buttons.
○	Adding or removing deliveries in case of scoring errors.

## Difference between delivery and ball

●	Delivery: All deliveries (legal and illegal) such as wides and no balls should be counted.
●	Ball: Only legal balls (excluding no balls) should be counted.
