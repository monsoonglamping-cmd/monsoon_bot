#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Monsoon Assistant starting...');

// Создаём директории
const configDir = path.join(process.env.HOME || '/root', '.clawdbot');
const workspaceDir = '/app/workspace';

if (!fs.existsSync(configDir)) {
  fs.mkdirSync(configDir, { recursive: true });
}

if (!fs.existsSync(workspaceDir)) {
  fs.mkdirSync(workspaceDir, { recursive: true });
}

// Копируем конфиг
const configSource = path.join(__dirname, 'clawdbot.json');
const configTarget = path.join(configDir, 'clawdbot.json');

if (fs.existsSync(configSource)) {
  fs.copyFileSync(configSource, configTarget);
  console.log('✅ Config copied');
}

// Запускаем gateway в foreground режиме
console.log('🤖 Starting Clawdbot gateway...');
try {
  execSync('npx clawdbot gateway run', { 
    stdio: 'inherit',
    env: { 
      ...process.env,
      NODE_ENV: 'production'
    }
  });
} catch (error) {
  console.error('❌ Failed:', error.message);
  process.exit(1);
}
