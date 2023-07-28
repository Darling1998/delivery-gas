import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  plugins: {
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"],
    },
  },
  appId: 'io.ionic.starter',
  appName: 'proyectoGas',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
