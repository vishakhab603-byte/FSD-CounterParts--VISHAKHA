import React from 'react';
import { useAppSelector } from './hooks/useAppSelector';
import { selectActiveView } from './features/ui/uiSlice';

import Sidebar from './components/Layout/Sidebar';
import Topbar from './components/Layout/Topbar';
import StatsPanel from './components/Dashboard/StatsPanel';
import PipelineRail from './components/Dashboard/PipelineRail';
import ActivityChart from './components/Dashboard/ActivityChart';
import TopPosts from './components/Dashboard/TopPosts';
import PostList from './components/Posts/PostList';
import PostForm from './components/Posts/PostForm';
import PlatformGrid from './components/Platforms/PlatformGrid';
import DraftList from './components/Drafts/DraftList';
import ToastStack from './components/Common/Toast';

function DashboardView() {
  return (
    <div className="flex flex-col gap-5">
      <StatsPanel />
      <PipelineRail />
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <ActivityChart />
        <TopPosts />
      </div>
    </div>
  );
}

function App() {
  const activeView = useAppSelector(selectActiveView);

  return (
    <div className="flex min-h-screen bg-ink-950">
      <Sidebar />
      <div className="flex min-h-screen flex-1 flex-col">
        <Topbar />
        <main className="flex-1 overflow-y-auto px-8 py-6">
          {activeView === 'dashboard' && <DashboardView />}
          {activeView === 'posts' && <PostList />}
          {activeView === 'platforms' && <PlatformGrid />}
          {activeView === 'drafts' && <DraftList />}
        </main>
      </div>
      <PostForm />
      <ToastStack />
    </div>
  );
}

export default App;
