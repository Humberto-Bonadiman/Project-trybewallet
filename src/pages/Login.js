import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveLoginData } from '../actions';
import Input from '../components/Input';
import Button from '../components/Button';

// Esta parte eu peguei de uma thread do slack aberta pelo Michael Caxias
// Fonte: https://trybecourse.slack.com/archives/C023YHXAEGM/p1634319081263300
const isEmailValid = (email) => {
  const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return regexEmail.test(email);
};

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  onSubmitForm() {
    const { history, dispatchSetValue } = this.props;
    dispatchSetValue(this.state);
    history.push('/carteira');
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { email, password } = this.state;
    const minPasswordCharacter = 6;
    const disabled = password.length >= minPasswordCharacter && isEmailValid(email);
    return (
      <fieldset>
        <Input
          label="Email: "
          type="text"
          dataTestid="email-input"
          onChange={ this.handleChange }
          value={ email }
          name="email"
          required
        />
        <Input
          label="Senha: "
          type="password"
          dataTestid="password-input"
          onChange={ this.handleChange }
          value={ password }
          name="password"
        />
        <Button
          type="button"
          label="Entrar"
          onClick={ this.onSubmitForm }
          disabled={ !disabled }
        />
      </fieldset>
    );
  }
}

Login.propTypes = {
  dispatchSetValue: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchSetValue: (value) => dispatch(saveLoginData(value)),
});

// const mapStateToProps = (state) => ({ personalInputs: state.reducer.personalInputs });

export default connect(null, mapDispatchToProps)(Login);
