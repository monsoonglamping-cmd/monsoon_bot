#!/usr/bin/env node

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

// Запускаем gateway НАПРЯМУЮ (не через CLI)
console.log('🤖 Starting Clawdbot gateway...');

process.env.NODE_ENV = 'production';

// Импортируем и запускаем gateway напрямую
const gatewayPath = require.resolve('clawdbot/dist/gateway/gateway-main.js');
require(gatewayPath);
