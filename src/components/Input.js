// este parte eu peguei do repositório de exercícios da Trybe
// Fonte: https://github.com/tryber/exercise-forms-redux/blob/gabarito/src/components/Input.jsx
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Input extends Component {
  render() {
    const { type, name, label, onChange, value, dataTestid } = this.props;
    return (
      <label htmlFor={ name }>
        { label }
        <input
          type={ type }
          name={ name }
          value={ value }
          onChange={ onChange }
          data-testid={ dataTestid }
        />
      </label>
    );
  }
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  dataTestid: PropTypes.string,
  onChange: PropTypes.func,
};

Input.defaultProps = {
  label: '',
  value: '',
  name: '',
  onChange: null,
  dataTestid: '',
};

export default Input;
