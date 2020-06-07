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
        </tr>
      </thead>
      <tbody>
        <tr v-for="position in positions" :key="position.figi">
          <td>{{ position.instrumentType }}</td>
          <td>{{ position.ticker }}</td>
          <td>{{ position.name }}</td>
          <td>{{ position.balance }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import api from '@/api';

export default {
  name: 'Home',

  data() {
    return {
      positions: [],
    };
  },

  methods: {
    loadPortfolio() {
      api('portfolio')
        .then((response) => response.json())
        .then((json) => {
          this.positions = json.payload.positions;
        });
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
