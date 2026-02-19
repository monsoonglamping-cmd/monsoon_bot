const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Monsoon Assistant starting...');

const configDir = path.join(process.env.HOME || '/root', '.clawdbot');
const workspaceDir = '/app/workspace';

if (!fs.existsSync(configDir)) {
  fs.mkdirSync(configDir, { recursive: true });
}

if (!fs.existsSync(workspaceDir)) {
  fs.mkdirSync(workspaceDir, { recursive: true });
}

const configSource = path.join(__dirname, 'clawdbot.json');
const configTarget = path.join(configDir, 'clawdbot.json');

if (fs.existsSync(configSource)) {
  fs.copyFileSync(configSource, configTarget);
  console.log('✅ Config copied');
}

console.log('🤖 Starting Clawdbot gateway...');

const gateway = spawn('npx', ['clawdbot', 'gateway', 'run'], {
  stdio: 'inherit',
  env: { ...process.env, NODE_ENV: 'production' }
});

gateway.on('error', (error) => {
  console.error('❌ Gateway error:', error);
  process.exit(1);
});

gateway.on('exit', (code) => {
  console.log(`Gateway exited: ${code}`);
  process.exit(code || 0);
});
