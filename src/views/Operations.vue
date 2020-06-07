<template>
  <section class="operations">
    <h1>Операции</h1>
    <table class="operations__table">
      <thead>
        <tr>
          <th>Дата</th>
          <th>Тип</th>
          <th>Тикер</th>
          <th>Имя</th>
          <th>Плата</th>
          <th>Цена</th>
          <th>Количество</th>
          <th>Валюта</th>
          <th>Операция</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="operation in operations" :key="operation.id">
          <td>{{ operation.date | formatDate }}</td>
          <td>{{ operation.instrumentType }}</td>
          <td>{{ operation.ticker }}</td>
          <td>{{ operation.name }}</td>
          <td>{{ operation.payment }}</td>
          <td>{{ operation.price }}</td>
          <td>{{ operation.quantity }}</td>
          <td>{{ operation.currency }}</td>
          <td>{{ operation.operationType }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import api from '@/api';
import moment from 'moment';

export default {
  name: 'Operations',

  data() {
    return {
      operations: [],
      dateFrom: new Date(2019, 0, 1).toISOString(),
      dateTo: new Date().toISOString(),
    };
  },

  filters: {
    formatDate(value) {
      if (!value) return '';
      return moment(String(value)).format('DD/MM/YYYY HH:mm');
    },
  },

  methods: {
    async loadOperations() {
      this.operations = await api(`operations?from=${this.dateFrom}&to=${this.dateTo}`)
        .then((response) => response.json())
        .then((json) => json.payload.operations)
        .then((operations) => Promise.all(operations.map(async (operation) => {
          const operationClone = { ...operation };
          const instrument = await this.loadInstrument(operationClone.figi);
          operationClone.ticker = instrument.ticker;
          operationClone.name = instrument.name;
          return operationClone;
        })));
    },

    loadInstrument(figi) {
      return api(`market/search/by-figi?figi=${figi}`)
        .then((response) => response.json())
        .then((json) => json.payload);
    },
  },

  created() {
    this.loadOperations();
  },
};
</script>

<style lang="scss">
.operations {
  width: auto;
  margin: 0 auto;

  background-color: #ffffff;
}

.operations__table {
  width: 100%;
  border-collapse: collapse;
}

.operations__table td, .operations__table th {
  padding: 6px;
  font-size: 24px;
  text-align: center;
  border: 1px solid #ccc;
}

@media (min-width: 1200px) {
  .operations {
    width: 1200px;
  }
}
</style>
