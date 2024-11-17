/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(tabs)` | `/(tabs)/` | `/(tabs)/HomeScreen` | `/(tabs)/Orders` | `/(tabs)/OrdersScreen` | `/(tabs)/Packeti` | `/(tabs)/ProfileOrder` | `/(tabs)/Reviews` | `/(tabs)/UserProfile` | `/(tabs)/WelcomeScreen` | `/(tabs)/Wishlist` | `/(tabs)/explore` | `/(tabs)\ProviderProfile` | `/(tabs)\ServicesProviderProfile` | `/HomeScreen` | `/Orders` | `/OrdersScreen` | `/Packeti` | `/ProfileOrder` | `/Reviews` | `/UserProfile` | `/WelcomeScreen` | `/Wishlist` | `/_sitemap` | `/explore` | `/types`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
