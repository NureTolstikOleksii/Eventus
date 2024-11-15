/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(tabs)` | `/(tabs)/` | `/(tabs)/HomeScreen` | `/(tabs)/ProfileOrder` | `/(tabs)/WelcomeScreen` | `/(tabs)/explore` | `/(tabs)\Orders` | `/(tabs)\Packeti` | `/(tabs)\Reviews` | `/HomeScreen` | `/ProfileOrder` | `/WelcomeScreen` | `/_sitemap` | `/explore` | `/types`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
