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
} from "./pages/exportedPages";
import { NavBar } from "./components/exportedComponents";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/programs" element={<ProgramsPage />} />
        <Route path="/programs/:programId" element={<ProgramDetailsPage />} />
        <Route path="/programs/new" element={<CreateProgramPage />} />
        <Route path="/workouts/:workoutId" element={<WorkoutDetailsPage />} />
        <Route
          path="/exercises/:exerciseId"
          element={<ExerciseDetailsPage />}
        />
      </Routes>
    </div>
  );
}

export default App;
