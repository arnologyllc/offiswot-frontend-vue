 export default function ({ route, redirect, app }) {
  if (app.$cookies.get('token')) {
    if (
      app.router.currentRoute.path === '/register' ||
      app.router.currentRoute.fullPath === '/login'
    ) {
      return redirect('/')
    }
  }
}