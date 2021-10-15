import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Input from '../components/Input';
import Button from '../components/Button';

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

export default connect(null, mapDispatchToProps)(Login);
