import { router, useSegments } from "expo-router";

/**
 * Utility functions for handling navigation in Expo Router.
 */
const NavigationUtils = {
  /**
   * Navigate to a specified route with optional parameters.
   * @param route - The route to navigate to.
   * @param params - Optional parameters to pass along with the route.
   */
  navigate: (route: string, params?: Record<string, any>) => {
    router.push({ pathname: route, params });
  },

  /**
   * Replace the current route with a new one.
   * @param route - The route to replace with.
   * @param params - Optional parameters for the new route.
   */
  replace: (route: string, params?: Record<string, any>) => {
    router.replace({ pathname: route, params });
  },

  /**
   * Go back to the previous screen in the navigation stack.
   */
  goBack: () => {
    router.back();
  },

  /**
   * Get the current route path.
   * @returns The current route's path as a string.
   */
  getCurrentPath: (): string => {
    const segments = useSegments();
    return `/${segments.join("/")}`;
  },

  /**
   * Reload the current route.
   */
  reload: () => {
    const currentPath = NavigationUtils.getCurrentPath();
    router.replace(currentPath);
  },

  /**
   * Update query parameters for the current route.
   * @param params - The query parameters to update or add.
   */
  updateQueryParams: (params: Record<string, any>) => {
    const currentPath = NavigationUtils.getCurrentPath();
    const queryParams = new URLSearchParams(window.location.search);

    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === null) {
        queryParams.delete(key);
      } else {
        queryParams.set(key, String(value));
      }
    });

    router.push(`${currentPath}?${queryParams.toString()}`);
  },
};

export default NavigationUtils;
