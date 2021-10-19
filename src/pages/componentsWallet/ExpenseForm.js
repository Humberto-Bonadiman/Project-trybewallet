import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrency, receiveExpenses, fetchExpense } from '../../actions/index';

// import Input from '../../components/Input';
import Select from '../../components/Select';
import Button from '../../components/Button';
import './ExpenseForm.css';

const methodPayment = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
class ExpenseForm extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      valor: '',
      description: '',
      coins: 'USD',
      paymentMethod: methodPayment[0],
      tag: tags[0],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.onClickSubmit = this.onClickSubmit.bind(this);
  }

  componentDidMount() {
    const { currencyFetch, expenseFetch } = this.props;
    return currencyFetch() && expenseFetch();
  }

  // Nesta parte eu consultei o repositório do Luiz Gustavo
  // Fonte: https://github.com/tryber/sd-014-b-project-trybewallet/pull/32/commits/1177635a8cbc401cf6c30ae794a2106271a3fb09
  onClickSubmit() {
    const { saveWalletExpenses, expenseFetch, expenses } = this.props;
    expenseFetch();
    saveWalletExpenses({ ...this.state, exchangeRates: expenses });
    this.setState((prevState) => ({
      id: prevState.id + 1,
      valor: '',
      description: '',
      coins: 'USD',
      paymentMethod: methodPayment[0],
      tag: tags[0],
    }));
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
    const { valor, description, coins } = this.state;
    const { currencies } = this.props;
    const withoutUSDT = currencies.filter((currency) => currency !== 'USDT');
    return (
      <form className="expenseForm">
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
          <select name={ coins } id="currency">
            { withoutUSDT.map((coin) => (
              <option key={ coin } value={ coin }>
                { coin }
              </option>))}
          </select>
        </label>
        { this.handleSelect() }
        <Button
          onClick={ this.onClickSubmit }
          disabled={ false }
          label="Adicionar despesa"
        />
      </form>
    );
  }
}

ExpenseForm.propTypes = {
  currencies: PropTypes.arrayOf().isRequired,
  currencyFetch: PropTypes.func.isRequired,
  saveWalletExpenses: PropTypes.func.isRequired,
  expenseFetch: PropTypes.func.isRequired,
  expenses: PropTypes.objectOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  currencyFetch: () => dispatch(fetchCurrency()),
  expenseFetch: () => dispatch(fetchExpense()),
  saveWalletExpenses: (data) => dispatch(receiveExpenses(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
