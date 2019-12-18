import React, { useState } from "react";
import useForm from "react-hook-form";
import { DoubleBounce } from "better-react-spinkit";

import login from "../../utils/login-utils";
import LoginErrors from './LoginErrors';

import logo from "../../images/logo.jpg";
import bg from "../../images/login-bg.jpg";
import "./Login.scss";

const Login = () => {
  const { register, errors, setError, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = data => {
    setLoading(true);

    login(data.login, data.password)
      .then(response => {
        if (response.status < 200 || response.status >= 300)
          throw new Error(response);

        return response.json();
      })
      .then(({ token, username }) => {
        localStorage.setItem("front-user", token);
        setLoading(false);
      })
      .catch(e => {
        setLoading(false);
        setError("apiServer", "connection", "Une erreur est survenue");
      });
  };

  return (
    <div className="uk-container uk-container-expand uk-cover-container login">
      <img src={bg} alt="" uk-cover="true" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="uk-text-center">
          <img src={logo} alt="F2A Logo" />
        </p>
        <LoginErrors errors={errors} />
        <div className="uk-margin-bottom">
          <label htmlFor="login">Login</label>
          <div className="uk-inline">
            <span className="uk-form-icon" uk-icon="icon: user"></span>
            <input
              type="text"
              name="login"
              className="uk-input"
              id="login"
              ref={register({ required: true })}
            />
          </div>
        </div>
        <div>
          <label htmlFor="password">Mot de passe</label>
          <div className="uk-inline">
            <span className="uk-form-icon" uk-icon="icon: lock"></span>
            <input
              type="password"
              name="password"
              className="uk-input"
              id="password"
              ref={register({ required: true })}
            />
          </div>
        </div>
        <div className="uk-text-center uk-margin-top">
          {loading && (
            <div className="uk-flex uk-flex-center">
              <DoubleBounce />
            </div>
          )}
          {!loading && (
            <button className="uk-button uk-button-primary" disabled={loading}>
              Connexion
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
