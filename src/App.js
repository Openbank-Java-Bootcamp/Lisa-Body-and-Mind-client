import "./styles/App.css";
import { Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import {
  HomePage,
  ProfilePage,
  ProgramsPage,
  ProgramDetailsPage,
  WorkoutDetailsPage,
  ExerciseDetailsPage,
  CreateProgramPage,
  NewUser,
} from "./pages/exportedPages";
import { NavBar } from "./components/exportedComponents";
import { PrivateRoute } from "./auth/exportedAuth";
import { ErrorPage } from "./utils/exportedUtils";

function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="App">
      <NavBar />

      {isAuthenticated && <NewUser />}

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
          path="/workouts/:workoutId"
          element={<PrivateRoute component={<WorkoutDetailsPage />} />}
        />
        <Route
          path="/exercises/:exerciseId"
          element={<PrivateRoute component={<ExerciseDetailsPage />} />}
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
