import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import DomainForSale from "./pages/DomainForSale";
import LeadsManagement from "./pages/LeadsManagement";
import SmartAlerts from "./pages/SmartAlerts";
import Reviews from "./pages/Reviews";
import RentCalculator from "./pages/RentCalculator";
import Guides from "./pages/Guides";
import InvestmentAnalysis from "./pages/InvestmentAnalysis";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"\\"} component={Home} />
      <Route path={"/smart-alerts"} component={SmartAlerts} />
      <Route path={"/reviews"} component={Reviews} />
      <Route path={"/rent-calculator"} component={RentCalculator} />
      <Route path={"/guides"} component={Guides} />
      <Route path={"/investment-analysis"} component={InvestmentAnalysis} />
      <Route path={"/domain-for-sale"} component={DomainForSale} />
      <Route path={"/leads-management"} component={LeadsManagement} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
