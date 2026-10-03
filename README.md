# HealthConnect

HealthConnect is a web-based health and fitness planning system developed as a BCA 5th semester minor project.

It helps users understand their BMI, estimate calorie requirements, create personalized diet plans, customize food choices, and plan workouts.

## Features

### 1. BMI Calculator & Assessment
- Calculates BMI based on height and weight
- Supports height in centimeters and feet/inches
- Supports weight in kilograms and pounds
- Displays BMI category
- Provides a recommended fitness goal

### 2. Calorie & Goal Recommendation
- Estimates daily calorie requirements
- Uses activity level and fitness goal
- Provides calorie recommendations for different goals

### 3. Personalized 7-Day Diet Planner
- Generates a 7-day diet plan
- Provides meal suggestions
- Allows food selection and customization
- Saves diet plan data to MongoDB

### 4. Diet Customization
- Allows users to customize their diet preferences
- Provides food selection and calorie information
- Helps create a more personalized meal plan

### 5. Workout Planner
- Provides workout planning based on user requirements
- Includes strength training and cardio suggestions
- Helps users organize their fitness routine

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Node.js
- Express.js
- MongoDB
- MongoDB Atlas
- Local Storage
- JSON

## Project Structure

```text
HealthConnect/
├── data/
├── public/
│   ├── css/
│   ├── js/
│   └── index.html
├── server/
│   └── server.js
├── .gitignore
├── package.json
└── package-lock.json
