import ProfessionalJourney from "./components/ProfessionalJourney";
import PieceGuide from "./components/PieceGuide";
import ModuleView from "./components/ModuleView";
import Meetings from "./components/Meetings";
import { moduleIdFromLocation } from "./lib/atlas";

export default function App() {
  const page = new URLSearchParams(window.location.search).get("page");
  if (page === "professionnels") return <ProfessionalJourney />;
  if (page === "guide") return <PieceGuide />;
  const module = moduleIdFromLocation();
  if (module) return <ModuleView moduleId={module} />;
  return <Meetings />;
}
