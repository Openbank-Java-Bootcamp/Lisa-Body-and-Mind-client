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
} from "./pages/exportedPages";
import { NavBar } from "./components/exportedComponents";
import { PrivateRoute } from "./auth/exportedAuth";
import { ErrorPage } from "./utils/exportedUtils";

function App() {
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
          path="/exercises/:exerciseId"
          element={<PrivateRoute component={<ExerciseDetailsPage />} />}
        />
        <Route
          path="/sets/edit/:setId"
          element={<PrivateRoute component={<ExerciseDetailsPage />} />}
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
