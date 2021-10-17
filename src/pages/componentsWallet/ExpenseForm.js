import React, { Component } from 'react';
// import PropTypes from 'prop-types';

// import Input from '../../components/Input';
import Select from '../../components/Select';

const methodPayment = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
class ExpenseForm extends Component {
  constructor() {
    super();
    this.state = {
      valor: '',
      description: '',
      currency: '',
      paymentMethod: methodPayment[0],
      tag: tags[0],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleSelect() {
    const { paymentMethod, tag } = this.state;
    return (
      <>
        <Select
          label="Método de pagamento"
          options={ methodPayment }
          name="paymentMethod"
          onChange={ this.handleChange }
          value={ paymentMethod }
        />
        <Select
          label="Tag"
          options={ tags }
          onChange={ this.handleChange }
          value={ tag }
        />
      </>
    );
  }

  render() {
    const { valor, description, currency } = this.state;
    return (
      <form>
        <label htmlFor="valor">
          Valor
          <input
            id="valor"
            type="number"
            name="valor"
            value={ valor }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description">
          Descrição
          <input
            id="description"
            type="text"
            name="description"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="currency">
          Moeda
          <select name={ currency } id="currency">
            <option value="primeiro">primeiro</option>
          </select>
        </label>
        { this.handleSelect() }
      </form>
    );
  }
}

export default ExpenseForm;
