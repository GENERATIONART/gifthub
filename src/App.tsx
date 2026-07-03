import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "./components/AppShell";

/* Every screen is its own chunk — first paint only pays for the route you're
   actually on instead of all 18 screens up front. */
const Landing = lazy(() => import("./screens/Landing").then((m) => ({ default: m.Landing })));
const Auth = lazy(() => import("./screens/Auth").then((m) => ({ default: m.Auth })));
const Onboarding = lazy(() => import("./screens/Onboarding").then((m) => ({ default: m.Onboarding })));
const Home = lazy(() => import("./screens/app/Home").then((m) => ({ default: m.Home })));
const Calendar = lazy(() => import("./screens/app/Calendar").then((m) => ({ default: m.Calendar })));
const Discover = lazy(() => import("./screens/app/Discover").then((m) => ({ default: m.Discover })));
const Studio = lazy(() => import("./screens/app/Studio").then((m) => ({ default: m.Studio })));
const Refine = lazy(() => import("./screens/app/Refine").then((m) => ({ default: m.Refine })));
const Approve = lazy(() => import("./screens/app/Approve").then((m) => ({ default: m.Approve })));
const Tracking = lazy(() => import("./screens/app/Tracking").then((m) => ({ default: m.Tracking })));
const Reaction = lazy(() => import("./screens/app/Reaction").then((m) => ({ default: m.Reaction })));
const Memory = lazy(() => import("./screens/app/Memory").then((m) => ({ default: m.Memory })));
const Notifications = lazy(() =>
  import("./screens/app/Notifications").then((m) => ({ default: m.Notifications })),
);
const Alerts = lazy(() => import("./screens/app/Alerts").then((m) => ({ default: m.Alerts })));
const Settings = lazy(() => import("./screens/app/Settings").then((m) => ({ default: m.Settings })));
const Profile = lazy(() => import("./screens/app/Profile").then((m) => ({ default: m.Profile })));
const Empty = lazy(() => import("./screens/app/Empty").then((m) => ({ default: m.Empty })));

export default function App() {
  return (
    <Suspense fallback={null}>
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
    </Suspense>
  );
}
