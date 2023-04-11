export default function ({ app, redirect }) {
  if(!app.$cookies.get('token') && !(app.router.currentRoute.path === '/expired')){
    return redirect('/login');
  }
}