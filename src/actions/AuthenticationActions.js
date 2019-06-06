import api from '../api';

const AuthenticationActions = {
  login(user, redirect) {
    api.login(user)
      .then(res => {
        if (res.status === 200) {
          localStorage.setItem('usertoken', res.data);
          return res.data;
        } else {
          return res.data.error;
        }
      })
      .then(() => redirect('tasks'))
      .catch((err) => console.log(err));
  },
};

export default AuthenticationActions;