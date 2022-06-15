import "./styles/App.css";
import { Routes, Route } from "react-router-dom";
import {
  HomePage,
  ProfilePage,
  ProgramsPage,
  ProgramDetailsPage,
  WorkoutDetailsPage,
  ExerciseDetailsPage,
  CreateProgramPage,
  EditProgramPage,
  EditWorkoutPage,
  EditExercisePage,
  EditSetPage,
} from "./pages/exportedPages";
import { NavBar } from "./components/exportedComponents";
import { PrivateRoute } from "./auth/exportedAuth";
import { ErrorPage } from "./utils/exportedUtils";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/profile"
          element={<PrivateRoute component={<ProfilePage />} />}
        />
        <Route
          path="/programs"
          element={<PrivateRoute component={<ProgramsPage />} />}
        />
        <Route
          path="/programs/:programId"
          element={<PrivateRoute component={<ProgramDetailsPage />} />}
        />
        <Route
          path="/programs/new"
          element={<PrivateRoute component={<CreateProgramPage />} />}
        />
        <Route
          path="/programs/edit/:programId"
          element={<PrivateRoute component={<EditProgramPage />} />}
        />
        <Route
          path="/workouts/:workoutId"
          element={<PrivateRoute component={<WorkoutDetailsPage />} />}
        />
        <Route
          path="/workouts/edit/:workoutId"
          element={<PrivateRoute component={<EditWorkoutPage />} />}
        />
        <Route
          path="/exercises/:exerciseId"
          element={<PrivateRoute component={<ExerciseDetailsPage />} />}
        />
        <Route
          path="/exercises/edit/:exerciseId"
          element={<PrivateRoute component={<EditExercisePage />} />}
        />
        <Route
          path="/sets/edit/:setId"
          element={<PrivateRoute component={<EditSetPage />} />}
        />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
