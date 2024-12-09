import React, {FormEvent, useRef} from 'react';
import {Header} from '../components/header.tsx';
import {useAppDispatch} from '../hooks/use-app-dispatch.ts';
import {loginAction} from '../store/api-actions.ts';
import {useNavigate} from 'react-router-dom';
import {AppRoute} from '../app-route.ts';

const validatePassword = (password: string): boolean => {
  const digits = /\d/.test(password);
  const letters = /[a-zA-Z]/.test(password);
  const spaces = !/\s/.test(password);

  return letters && digits && spaces;
};

export const LoginPage: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!formRef.current) {
      return;
    }

    const formData = new FormData(formRef.current);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!validatePassword(password)) {
      alert('Invalid password');
      return;
    }

    if (email && password) {
      dispatch(loginAction({
        email,
        password
      }));
      navigate(AppRoute.Main);
    }
  };

  return (
    <div className="page page--gray page--login">
      <Header addNavigation={false}/>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="" method="post" onSubmit={handleSubmit} ref={formRef}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input className="login__input form__input" type="email" name="email" placeholder="Email" required/>
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input className="login__input form__input" type="password" name="password" placeholder="Password"/>
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
