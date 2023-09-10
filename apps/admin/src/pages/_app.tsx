import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { AppProps } from 'next/app';
import '@/styles/global.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { NavigationProgress, nprogress } from '@mantine/nprogress';
import { DatesProvider } from '@mantine/dates';

export default function CustomApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteStart = (url: string) =>
      url !== router.asPath && nprogress.start();
    const handleRouteComplete = () => nprogress.complete();

    router.events.on('routeChangeStart', handleRouteStart);
    router.events.on('routeChangeComplete', handleRouteComplete);
    router.events.on('routeChangeError', handleRouteComplete);

    return () => {
      // Make sure to remove the event handler on unmount!
      router.events.off('routeChangeStart', handleRouteStart);
      router.events.off('routeChangeComplete', handleRouteComplete);
      router.events.off('routeChangeError', handleRouteComplete);
    };
  }, [router.asPath]);

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        fontFamily: 'Noto Sans Thai, sans-serif',
        headings: { fontFamily: 'Noto Sans Thai, sans-serif' },
      }}
    >
      <DatesProvider
        settings={{ locale: 'th', firstDayOfWeek: 0, weekendDays: [0] }}
      >
        <NavigationProgress autoReset={true} />
        <Notifications />
        <Component {...pageProps} />
      </DatesProvider>
    </MantineProvider>
  );
}
