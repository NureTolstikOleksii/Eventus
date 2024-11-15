/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(tabs)` | `/(tabs)/` | `/(tabs)/CustomerProfile` | `/(tabs)/HomeScreen` | `/(tabs)/OrdersScreen` | `/(tabs)/UserProfile` | `/(tabs)/WelcomeScreen` | `/(tabs)/explore` | `/(tabs)\Wishlist` | `/CustomerProfile` | `/HomeScreen` | `/OrdersScreen` | `/UserProfile` | `/WelcomeScreen` | `/_sitemap` | `/explore` | `/types`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
