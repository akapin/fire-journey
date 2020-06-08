<template>
  <section class="portfolio">
    <h1>Портфель</h1>
    <table class="portfolio__table">
      <thead>
        <tr>
          <th>Тип</th>
          <th>Тикер</th>
          <th>Название</th>
          <th>Количество</th>
          <th>Цена</th>
          <th>Сумма</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="position in positions" :key="position.figi">
          <td>{{ position.instrumentType }}</td>
          <td>{{ position.ticker }}</td>
          <td>{{ position.name }}</td>
          <td>{{ position.balance }}</td>
          <td>{{ position.price }} {{ position.currency | formatCurrency }}</td>
          <td>{{ getPositionTotal(position.balance, position.price) }}
            {{ position.currency | formatCurrency }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import api from '@/api';

export default {
  name: 'Portfolio',

  data() {
    return {
      positions: [],
    };
  },

  filters: {
    formatCurrency(value) {
      switch (value) {
        case 'USD':
          return '$';
        case 'RUB':
          return '₽';
        default:
          break;
      }
      return value;
    },
  },

  methods: {
    async loadPortfolio() {
      this.positions = await api('portfolio')
        .then((response) => response.json())
        .then((json) => json.payload.positions)
        .then((positions) => Promise.all(positions.map(async (position) => {
          const positionClone = { ...position };
          const price = await this.loadPrice(positionClone.figi);
          const instrument = await this.loadInstrument(positionClone.figi);
          positionClone.price = price;
          positionClone.currency = instrument.currency;
          return positionClone;
        })));
    },

    loadPrice(figi) {
      return api(`market/orderbook?figi=${figi}&depth=1`)
        .then((response) => response.json())
        .then((json) => json.payload.lastPrice);
    },

    loadInstrument(figi) {
      return api(`market/search/by-figi?figi=${figi}`)
        .then((response) => response.json())
        .then((json) => json.payload);
    },

    getPositionTotal(balance, price) {
      return (balance * price).toFixed(2);
    },
  },

  created() {
    this.loadPortfolio();
  },
};
</script>

<style lang="scss">
.portfolio {
  width: auto;
  margin: 0 auto;

  background-color: #ffffff;
}

.portfolio__table {
  width: 100%;
  border-collapse: collapse;
}

.portfolio__table td, .portfolio__table th {
  padding: 6px;
  font-size: 24px;
  text-align: center;
  border: 1px solid #ccc;
}

@media (min-width: 1200px) {
  .portfolio {
    width: 1200px;
  }
}
</style>
