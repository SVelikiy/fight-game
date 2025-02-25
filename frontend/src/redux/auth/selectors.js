export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;

export const selectUser = (state) => state.auth.name;

export const selectIsRefresing = (state) => state.auth.isRefresing;

export const selectIsLoading = (state) => state.auth.isLoading;

export const selectIsError = (state) => state.auth.isError;
