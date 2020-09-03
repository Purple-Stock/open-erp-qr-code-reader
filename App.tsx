import 'react-native-gesture-handler';

import React from 'react';
import { useFonts } from 'expo-font';

import Routes from './src/routes';
import AppProvider from './src/hooks';

const App: React.FC = () => {
  const [loaded] = useFonts({
    Roboto: require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <AppProvider>
      <Routes />
    </AppProvider>
  );
};

export default App;
