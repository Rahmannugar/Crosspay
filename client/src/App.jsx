import { Navbar, Welcome, Services, Transactions } from "./components";
import TransactionsPage from "./components/TransactionsPage";

const App = () => (
  <div className="min-h-screen">
    <div className="gradient-bg-welcome">
      <Navbar />
      <Welcome />
    </div>
    <Services />
    <TransactionsPage />
  </div>
);

export default App;
