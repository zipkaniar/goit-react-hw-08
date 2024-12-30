// Kullanıcının giriş yapıp yapmadığını kontrol eden selector
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;

// Diğer selectorlar da buraya eklenebilir
export const selectUser = (state) => state.auth.user;
export const selectAuthToken = (state) => state.auth.token;
