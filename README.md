# Cricket Scoring Project Specification Document

![Admin Panel UI](https://github.com/vishalshahh/cricstat_Lifeease_Solutions/blob/main/apps/frontend/public/images/User%20Interface.png)

## Project Overview

The **Cricket Scoring Project** aims to develop a robust backend system using **Node.js** and **TypeScript** for accurately tracking and updating cricket scores. This system will handle various cricket scoring scenarios, including special cases like overthrows, no-balls, wides, and wickets. Additionally, the project will involve creating a flexible and dynamic data schema to manage scoring outcomes and an **Admin Panel frontend interface** for real-time scoring and editing capabilities.

---

## Backend Requirements

### Technology Stack

- **Backend**: Node.js with TypeScript  
- **Database**: MongoDB  
- **API Framework**: Nest.js or Express.js (or equivalent framework)  
- **Frontend**: Next.js, TailwindCSS  

---

## Schema Design

The developer is responsible for designing the payload schema sent from the frontend. The schema must account for various cricket scoring scenarios, including but not limited to:

- **Normal**
- **Normal with Overthrow**
- **Overthrow**
- **Bye**
- **Bye with Overthrow**
- **Legbye**
- **Legbye with Overthrow**
- **Noball**
- **Noball with Overthrow**
- **Noball with Bye**
- **Noball with Bye and Overthrow**
- **Noball with Legbye**
- **Noball with Legbye and Overthrow**
- **Wide**
- **Wide with Overthrow**
- **Wide with Bye**
- **Wide with Bye and Overthrow**
- **Wide with Legbye**
- **Wide with Legbye and Overthrow**
- **Wicket**

---

## Outcome Effects

Each scenario will have unique effects on **batsman stats**, **bowler stats**, **extras**, **team stats**, and **match progress**. Below are some detailed examples:

### Wide + Runs
- **Bowler Stats**:
  - Increase in "No Balls" count.
  - 1 run conceded.  
- **Batsman Stats**:
  - No runs credited.  
- **Team Stats**:
  - All runs added to the team's total.  
- **Extras**:
  - All runs categorized under "Wide Extras."

### Noball + Bye
- **Bowler Stats**:
  - 1 run conceded.  
- **Batsman Stats**:
  - "Balls Faced" increases by 1.  
  - No runs credited.  
- **Team Stats**:
  - All runs added to the team's total.  
- **Extras**:
  - 1 run categorized as "No Ball Extras."
  - Remaining runs categorized under "Bye Extras."

### Noball + Runs
- **Bowler Stats**:
  - All runs conceded are accounted for.  
- **Batsman Stats**:
  - "Balls Faced" increases by 1.  
  - All runs (except 1) credited to the batsman.  
- **Team Stats**:
  - All runs added to the team's total.  
- **Extras**:
  - 1 run categorized as "No Ball Extras."

### Noball + Legbye
- **Bowler Stats**:
  - 1 run conceded.  
- **Batsman Stats**:
  - "Balls Faced" increases by 1.  
  - No runs credited.  
- **Team Stats**:
  - All runs added to the team's total.  
- **Extras**:
  - 1 run categorized as "No Ball Extras."
  - Remaining runs categorized as "Leg Bye Extras."

### Legbye/Bye + Overthrow
- **Extras**:
  - All runs categorized under "Bye" or "Leg Bye Extras."  
- **Team Stats**:
  - Runs added to the team's total.

### Runs + Overthrow
- **Batsman Stats**:
  - All runs credited to the batsman.  
- **Team Stats**:
  - Runs added to the team's total.

---

## Frontend Requirements

### Admin Panel UI
The **Admin Panel** will include a comprehensive and interactive UI for real-time scoring. Key features include:

- **Buttons**:
  - Adding extras (Wides, No Balls, Byes, Leg Byes).
  - Managing overthrows.  
- **Scorecards**:
  - **Batsman**: Balls faced, runs scored.
  - **Bowler**: Overs bowled, runs conceded, maidens bowled.  
- **Game Details**:
  - Last wicket details.
  - Runs scored per over.  
- **Functionalities**:
  - Tick/untick options for delivery scenarios.
  - Adding or removing deliveries for error correction.

---

## Difference Between Delivery and Ball

- **Delivery**:  
  Includes all types of deliveries, both legal and illegal (e.g., Wides, No Balls).  

- **Ball**:  
  Refers to only legal deliveries (excludes No Balls).  

---

## Conclusion

This project aims to create a comprehensive cricket scoring solution by combining backend robustness, frontend interactivity, and detailed data tracking. The flexibility in managing various scoring scenarios ensures accuracy and usability for end users.
