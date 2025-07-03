
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
    setSidebarOpen(false);
  };

  const handleOpenSidebar = () => {
    setSidebarOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={handleCloseSidebar} 
        isMobile={isMobile} 
      />
      <div className={`flex-1 flex flex-col ${!isMobile ? 'ml-64' : ''}`}>
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
