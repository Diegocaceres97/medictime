import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'medictime',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  ios: {
    handleApplicationNotifications:false
  },
  plugins: {
    LocalNotifications: {
      smallIcon: "ic_stat_icon_config_sample",
      iconColor: "#488AFF"
    },
  },
};

export default config;
