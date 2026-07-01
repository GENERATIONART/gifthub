import { Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "./components/AppShell";
import { Landing } from "./screens/Landing";
import { Auth } from "./screens/Auth";
import { Onboarding } from "./screens/Onboarding";
import { Home } from "./screens/app/Home";
import { Calendar } from "./screens/app/Calendar";
import { Discover } from "./screens/app/Discover";
import { Studio } from "./screens/app/Studio";
import { Refine } from "./screens/app/Refine";
import { Approve } from "./screens/app/Approve";
import { Tracking } from "./screens/app/Tracking";
import { Reaction } from "./screens/app/Reaction";
import { Memory } from "./screens/app/Memory";
import { Notifications } from "./screens/app/Notifications";
import { Alerts } from "./screens/app/Alerts";
import { Settings } from "./screens/app/Settings";
import { Profile } from "./screens/app/Profile";
import { Empty } from "./screens/app/Empty";

export default function App() {
  return (
    <Routes>
      {/* Standalone full-page routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/onboarding" element={<Onboarding />} />

      {/* Authenticated app — responsive three-pane shell */}
      <Route path="/app" element={<AppShell />}>
        <Route index element={<Home />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="discover" element={<Discover />} />
        <Route path="studio" element={<Studio />} />
        <Route path="refine" element={<Refine />} />
        <Route path="approve" element={<Approve />} />
        <Route path="tracking" element={<Tracking />} />
        <Route path="reaction" element={<Reaction />} />
        <Route path="memory" element={<Memory />} />
        <Route path="from-fondly" element={<Notifications />} />
        <Route path="alerts" element={<Alerts />} />
        <Route path="settings" element={<Settings />} />
        <Route path="empty" element={<Empty />} />
        <Route path="profile/:id" element={<Profile />} />
      </Route>

      <Route path="*" element={<Navigate to="/app" replace />} />
    </Routes>
  );
}
