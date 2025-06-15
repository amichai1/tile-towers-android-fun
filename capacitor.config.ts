
import { CapacitorConfig } from '@capacitor/core';

const config: CapacitorConfig = {
  appId: 'app.lovable.ec08e210579b4eefb3add095c0ea8789',
  appName: 'A Lovable project',
  webDir: 'dist',
  server: {
    url: 'https://ec08e210-579b-4eef-b3ad-d095c0ea8789.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#4C1D95'
    }
  }
};

export default config;
