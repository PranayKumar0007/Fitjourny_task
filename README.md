# FitJourney

FitJourney is a premium, web-based fitness tracker application designed to help users monitor their physical activity, workouts, and overall fitness progress. With a sleek, dark-themed UI and interactive charts, FitJourney makes tracking your health goals engaging and effortless.

## Features

-   **Dashboard**: Get a quick overview of your daily stats (Steps, Calories, Active Minutes) and activity trends.
-   **Workout Log**: Log various activities (Running, Cycling, Gym, etc.) with details like duration, intensity, and calories burned.
-   **Goal Setting**: Set and track daily goals for steps, calories, and active time.
-   **Progress Visualization**: View detailed charts for weekly calorie burn and active minutes trends.
-   **Body Metrics**: Track your weight and view your BMI.
-   **Responsive Design**: Fully optimized for both desktop and mobile devices.
-   **Local Persistence**: All data is saved locally in your browser, ensuring privacy and convenience without needing a backend.

## Tech Stack

-   **Frontend**: React (Vite)
-   **Styling**: Vanilla CSS (Custom Properties, Glassmorphism)
-   **Routing**: React Router DOM
-   **Charts**: Recharts
-   **Icons**: Lucide React
-   **State Management**: React Context API

## Installation & Running Locally

1.  **Clone the repository** (or download the source code):
    ```bash
    git clone <repository-url>
    cd fit-journey
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Start the development server**:
    ```bash
    npm run dev
    ```

4.  **Open in Browser**:
    Visit the URL shown in the terminal (usually `http://localhost:5173`).

## Building for Production

To create a production-ready build:

```bash
npm run build
```

The output will be in the `dist` directory.
