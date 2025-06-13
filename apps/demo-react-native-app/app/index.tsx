import Constants from 'expo-constants';
import { Stack } from 'expo-router';
import { WebView } from 'react-native-webview';

const devServerIp = Constants.expoConfig?.hostUri?.split(':')[0];

export default function Index() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Callix Demo',
        }}
      />
      <WebView
        useWebView2={true}
        mixedContentMode={'always'}
        originWhitelist={['*']}
        mediaPlaybackRequiresUserAction={false}
        source={{
          uri: `http://${devServerIp}:3333`,
        }}
        injectedJavaScript={injectScript}
        onMessage={(e) => {
          const data = JSON.parse(e.nativeEvent.data);
          switch (data.type) {
            case 'console':
              console[data.method as 'log'](...data.args);
              break;
          }
        }}
        onError={(e) => {
          console.error('WebView error:', e.nativeEvent);
        }}
        onHttpError={(e) => {
          console.error('WebView HTTP error:', e.nativeEvent);
        }}
      />
    </>
  );
}

const injectScript = `
  const webview = window.ReactNativeWebView;

  const consoleCall = (method, args) => {
    try {
      webview.postMessage(
        JSON.stringify({
          type: 'console',
          method,
          args,
        })
      );
    } catch (e) {
      webview.postMessage(
        JSON.stringify({
          type: 'console',
          method: 'error',
          args: ['Error posting message to React Native WebView', e],
        })
      );
    }
  };

  // replace console main methods
  const consoleMethods = ['log', 'warn', 'error', 'info', 'debug'];
  for (const method of consoleMethods) {
    const originalMethod = console[method];
    console[method] = (...args) => {
      consoleCall(method, args);
      originalMethod(...args);
    };
  }

  window.addEventListener('unhandledrejection', (event) => {
    consoleCall('error', [
      'Unhandled promise rejection',
      event.reason,
      event.promise,
      event.detail,
    ]);
  });

  window.addEventListener('error', (event) => {
    consoleCall('error', [
      'Error',
      JSON.stringify(event, ["message", "arguments", "type", "name"])
    ]);
  });

  localStorage.setItem('debug', '*');
`;
