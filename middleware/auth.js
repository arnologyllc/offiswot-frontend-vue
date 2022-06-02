export default function ({ app, redirect, route }) {
    // If the user is not authenticated
    if(!app.$cookies.get('token')) {
        return redirect('/login');
    }
  }