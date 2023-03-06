export default function ({ app, redirect }) {
    // If the user is not authenticated
    if(!app.$cookies.get('token')) {
        return redirect('/login');
    }
  }