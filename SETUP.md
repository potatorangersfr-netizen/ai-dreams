\# AI Dreams - Setup Guide



\## Quick Start for Team Members



\### 1. Clone \& Install

```bash

git clone \[repo]

cd ai-dreams

npm install

```



\### 2. Environment Variables

Create `.env.local`:

```

VITE\_ANTHROPIC\_API\_KEY=sk-ant-xxx

```



Get key from Person A or create at: https://console.anthropic.com



\### 3. Run Development Server

```bash

npm run dev

```



Visit: http://localhost:5173



\### 4. Your Component Locations



\*\*Person A (Brain Architect)\*\*:

\- `src/lib/claude.ts` - API integration

\- `src/lib/dreamEngine.ts` - Dream logic

\- `src/components/ChatInterface.tsx` - Chat UI



\*\*Person B (Visual Wizard)\*\*:

\- `src/components/DreamVisualization/` - All 3D stuff

\- `src/components/StateTransitions.tsx` - Animations



\*\*Person C (State Master)\*\*:

\- `src/store/aiStore.ts` - Main state

\- `src/store/memoryStore.ts` - Memory system

\- `src/components/ControlPanel.tsx` - Controls

\- `src/components/PersonalityDashboard.tsx` - Dashboard



\*\*Person D (Demo Director)\*\*:

\- `src/components/DemoControls.tsx` - Demo interface

\- `pitch/` - All presentation materials

\- Integration/deployment



\### 5. Testing Your Component

```bash

\# In your component file, add:

if (import.meta.env.DEV) {

&nbsp; console.log('My component loaded!');

}

```



\### 6. Commit Strategy

```bash

git add .

git commit -m "feat(your-area): what you built"

git push origin main

```



\## Deployment



\### Preview Deployment

```bash

npm run deploy:dev

```



\### Production Deployment

```bash

npm run deploy

```



\## Demo Mode



\### Enable Demo Controls

\- Add `?demo=true` to URL

\- Or press `Shift+D` in dev mode



\### Load Scenarios

\- Click "Load Scenario" in demo controls

\- Scenarios defined in `public/demo-data/demo-scenarios.json`



\## Troubleshooting



\### "Module not found"

```bash

npm install

```



\### "API key not working"

Check `.env.local` has correct format (no quotes)



\### "3D not rendering"

Person B will handle - just mock it for now



\### "Deployment failed"

Contact Person D (that's you!)



\## Communication



\*\*Slack/Discord Channel\*\*: #ai-dreams-build



\*\*Sync Points\*\*:

\- Hour 2: Integration check

\- Hour 6: Checkpoint meeting

\- Hour 18: Demo prep



\*\*Ask for Help\*\*: Don't spend more than 15 min stuck!

