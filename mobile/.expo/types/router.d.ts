/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(tabs)` | `/(tabs)/` | `/(tabs)/HomeScreen` | `/(tabs)/Orders` | `/(tabs)/OrdersScreen` | `/(tabs)/Packeti` | `/(tabs)/ProfileOrder` | `/(tabs)/ProviderProfile` | `/(tabs)/Reviews` | `/(tabs)/ServicesProviderProfile` | `/(tabs)/UserProfile` | `/(tabs)/WelcomeScreen` | `/(tabs)/Wishlist` | `/(tabs)/explore` | `/HomeScreen` | `/Orders` | `/OrdersScreen` | `/Packeti` | `/ProfileOrder` | `/ProviderProfile` | `/Reviews` | `/ServicesProviderProfile` | `/UserProfile` | `/WelcomeScreen` | `/Wishlist` | `/_sitemap` | `/explore` | `/types`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
