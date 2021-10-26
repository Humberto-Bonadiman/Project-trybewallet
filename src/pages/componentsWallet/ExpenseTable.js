import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class ExpenseTable extends Component {
/*   constructor() {
    super();
  } */

  render() {
    const { expenses } = this.props;
    const currencyValue = expenses.map((id) => id.currency);
    console.log(expenses);
    console.log(currencyValue);
    return (
      <section className="table-component">
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((number, index) => (
              <tr key={ number.id }>
                <td>{number.description}</td>
                <td>{number.tag}</td>
                <td>{number.method}</td>
                <td>{number.value}</td>
                <td>{number.exchangeRates[currencyValue[index]].name.split('/')[0]}</td>
                <td>
                  {Number(number.exchangeRates[currencyValue[index]].ask).toFixed(2)}
                </td>
                <td>
                  {Number(
                    number.value * number.exchangeRates[currencyValue[index]].ask,
                  ).toFixed(2)}
                </td>
                <td>Real</td>
                <td>Editar/Excluir</td>
              </tr>))}
          </tbody>
        </table>
      </section>
    );
  }
}

ExpenseTable.propTypes = {
  expenses: PropTypes.arrayOf().isRequired,
};

function mapStateToProps(state) {
  return {
    expenses: state.wallet.expenses,
  };
}

export default connect(mapStateToProps)(ExpenseTable);
