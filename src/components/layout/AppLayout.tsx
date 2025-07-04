
import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useIsMobile } from '@/hooks/use-mobile';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  const handleCloseSidebar = () => {
    console.log('Closing sidebar');
    setSidebarOpen(false);
  };

  const handleOpenSidebar = () => {
    console.log('Opening sidebar');
    setSidebarOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={handleCloseSidebar} 
        isMobile={isMobile} 
      />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${!isMobile ? (sidebarOpen ? 'ml-64' : 'ml-0') : ''}`}>
        <Header onMenuClick={handleOpenSidebar} />
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          {children}
        </main>
      </div>
      {/* Mobile overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={handleCloseSidebar}
        />
      )}
    </div>
  );
};
