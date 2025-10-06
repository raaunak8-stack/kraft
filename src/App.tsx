import React, { useEffect, useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { StrategyStudio } from './components/StrategyStudio';
import { StrategyStudio1 } from './components/StrategyStudio1';
import { CreatorStudio } from './components/CreatorStudio';
import { Simulations } from './components/Simulations';
import { AgentManagement } from './components/AgentManagement';
import { PerformanceCockpit } from './components/PerformanceCockpit';
import { AdminControls } from './components/AdminControls';
import { BrandKit } from './components/BrandKit';
import { Integrations } from './components/Integrations';
import Login from './components/Login';
import { BrandManagerView } from './components/BrandManagerView';
import { PerformanceAgentView } from './components/PerformanceAgentView';
import { MarketingStudio } from './components/MarketingStudio';
import Marketing from './components/MarketingStucio1';
import { MarketingStudio3 } from './components/MarketingStudio3';
import { Chatbot } from './components/Chatbot';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
        case 'strategy':
        return <StrategyStudio onTabChange={setActiveTab}/>;
      case 'strategy1':
        return <StrategyStudio1 />;
      case 'dashboard':
        return <Dashboard onTabChange={setActiveTab} />;
      case 'creator':
        return <CreatorStudio setActiveTab={setActiveTab}/>;
      case 'brandkit':
        return <BrandKit />;
      case 'integrations':
        return <Integrations />;
      case 'simulations':
        return <Simulations />;
      case 'agents':
        return <AgentManagement />;
      case 'performance':
        return <PerformanceCockpit />;
          case 'performanceagent':
        return <PerformanceAgentView />;
      case 'admin':
        return <AdminControls />;
          case 'brandmanager':
        return <BrandManagerView />;
          case 'marketingstudio':
        return <MarketingStudio />;
        case 'marketingstudio2':
        return <Marketing />;
        case 'marketingstudio3':
        return <MarketingStudio3 />;
      default:
        return <Dashboard />;
    }
  };

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token")=="09AG7bzvGE4WESUSPVMXa68uRZgSWcqZeSODV7aJD0qrm1tu-KsHpjQwbAsw8vyv7P6y1BFaSZgkzkP5yoO7XSHqoPtbUIl-p9aZ74TVlwB0Ll6FYemrSN0Cxz3cr7XJXP"?true:false);

  useEffect(()=>{
    if(isLoggedIn){
      localStorage.setItem("token","09AG7bzvGE4WESUSPVMXa68uRZgSWcqZeSODV7aJD0qrm1tu-KsHpjQwbAsw8vyv7P6y1BFaSZgkzkP5yoO7XSHqoPtbUIl-p9aZ74TVlwB0Ll6FYemrSN0Cxz3cr7XJXP")
    }
  },[isLoggedIn])

  return (
  <ThemeProvider>
      {!isLoggedIn ? (
        <Login onLoginSuccess={() => setIsLoggedIn(true)} />
      ) : (
        <div className="min-h-screen bg-gray-50 flex overflow-hidden">
          <Sidebar activeTab={activeTab} onTabChange={setActiveTab} setIsLoggedIn={setIsLoggedIn}/>
          <main className="flex-1 overflow-auto w-full">
            <div className="w-full">{renderContent()}</div>
          </main>
          <Chatbot activeTab={activeTab} />
        </div>
      )}
    </ThemeProvider>
  );
}

export default App;