/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: 
        `/` |
        `/(tabs)` |
        `/(tabs)/` |
        `/(tabs)/HomeScreen` |
        `/(tabs)/ProfileOrder` |
        `/(tabs)/WelcomeScreen` |
        `/(tabs)/explore` |
        `/(tabs)/Orders` |
        `/(tabs)/Packeti` |
        `/(tabs)/Reviews` |
        `/(tabs)/CustomerProfile` |
        `/(tabs)/OrdersScreen` |
        `/(tabs)/UserProfile` |
        `/(tabs)/Wishlist` |
        `/HomeScreen` |
        `/ProfileOrder` |
        `/WelcomeScreen` |
        `/Orders` |
        `/Packeti` |
        `/Reviews` |
        `/CustomerProfile` |
        `/OrdersScreen` |
        `/UserProfile` |
        `/Wishlist` |
        `/_sitemap` |
        `/explore` |
        `/types`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}