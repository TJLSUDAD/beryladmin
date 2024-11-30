import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Home } from '@/components/lens/home/Home';
import { DeploymentControls } from '@/components/deployment/DeploymentControls';
import { ChatBox } from '@/components/lens/chat/ChatBox';
import { OverlayPreview } from '@/components/lens/overlay/OverlayPreview';
import { OverlayConfig } from '@/components/lens/overlay/OverlayConfig';
import { ActionSequencer } from '@/components/lens/sequencer/ActionSequencer';
import { AutonomousPanel } from '@/components/lens/autonomous/AutonomousPanel';
import { AwarenessControls } from '@/components/lens/awareness/AwarenessControls';
import { BrowserControl, BrowserType } from '@/lib/browser-control';
import { Toaster } from '@/components/ui/sonner';

export function LensContent() {
  const [isRunning, setIsRunning] = useState(false);
  const [sequence, setSequence] = useState<string[]>([]);
  const browserControl = new BrowserControl();

  const handleStart = async ({ url, browserType }: { url: string; browserType: BrowserType }) => {
    try {
      await browserControl.launch({ type: browserType, headless: true });
      await browserControl.navigate(url);
      setIsRunning(true);
    } catch (error) {
      console.error('Failed to start browser:', error);
    }
  };

  const handleStop = async () => {
    try {
      await browserControl.close();
      setIsRunning(false);
    } catch (error) {
      console.error('Failed to stop browser:', error);
    }
  };

  return (
    <div className="grid h-full grid-cols-[1fr_300px] gap-4">
      <Tabs defaultValue="workspace" className="flex-1">
        <TabsList className="mb-4 border border-amber-400/20 bg-black/30">
          <TabsTrigger value="home" className="text-amber-400 data-[state=active]:bg-amber-400/10">
            Home
          </TabsTrigger>
          <TabsTrigger value="workspace" className="text-amber-400 data-[state=active]:bg-amber-400/10">
            Workspace
          </TabsTrigger>
          <TabsTrigger value="autonomous" className="text-amber-400 data-[state=active]:bg-amber-400/10">
            Autonomous
          </TabsTrigger>
          <TabsTrigger value="config" className="text-amber-400 data-[state=active]:bg-amber-400/10">
            Configuration
          </TabsTrigger>
        </TabsList>

        <TabsContent value="home" className="mt-0">
          <Home />
        </TabsContent>

        <TabsContent value="workspace" className="mt-0 space-y-4">
          <DeploymentControls
            onDeploy={handleStart}
            onStop={handleStop}
            isDeployed={isRunning}
          />
          <AwarenessControls />
          <OverlayPreview
            elements={[]}
            onElementMove={() => {}}
            onElementSelect={() => {}}
          />
        </TabsContent>

        <TabsContent value="autonomous" className="mt-0">
          <AutonomousPanel />
        </TabsContent>

        <TabsContent value="config" className="mt-0">
          <OverlayConfig onSaveConfig={() => {}} />
        </TabsContent>
      </Tabs>
      
      <ChatBox onSendCommand={() => {}} />
      <Toaster />
    </div>
  );
}