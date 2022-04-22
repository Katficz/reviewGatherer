<template>
  <div>
    <table>
      <caption>
        Podgląd ankiety
      </caption>
      <tr>
        <td class="ion-text-center" colspan="2"><b>Dane osobowe</b></td>
      </tr>
      <tr>
        <td>
          <b>Imię</b>
        </td>
        <td>{{ review?.personalData.name }}</td>
      </tr>
      <tr>
        <td>
          <b>Nazwisko</b>
        </td>
        <td>{{ review?.personalData.surname }}</td>
      </tr>
      <tr>
        <td>
          <b>Pesel</b>
        </td>
        <td>
          {{
            !!review?.personalData.pesel
              ? review?.personalData.pesel
              : 'Brak PESELu'
          }}
        </td>
      </tr>
      <tr>
        <td>
          <b>Adres</b>
        </td>
        <td>{{ review?.personalData.address }}</td>
      </tr>
      <tr>
        <td>
          <b>Miasto</b>
        </td>
        <td>{{ review?.personalData.city }}</td>
      </tr>
      <tr>
        <td>
          <b>Kod pocztowy</b>
        </td>
        <td>{{ review?.personalData.zipCode }}</td>
      </tr>
      <tr>
        <td>
          <b>Numer telefonu</b>
        </td>
        <td>{{ review?.personalData.phoneNum }}</td>
      </tr>
      <tr>
        <td class="ion-text-center" colspan="2"><b>Odpowiedzi</b></td>
      </tr>
      <tr>
        <td>
          <b>Data ostatniej konsumpcji</b>
        </td>
        <td>
          {{
            new Date(review?.answers.lastConsumption)
              .toLocaleString()
              .slice(0, 10)
          }}
        </td>
      </tr>
      <tr>
        <td>
          <b>Częstość konsumpcji</b>
        </td>
        <td>
          {{ review?.answers.consumptionFrequency }}
        </td>
      </tr>
      <tr>
        <td>
          <b>Satysfakcja ze smaku</b>
        </td>
        <td>
          {{ review?.answers.tasteSatisfaction ? 'TAK' : 'NIE' }}
        </td>
      </tr>
      <tr>
        <td>
          <b>Ocena ceny</b>
        </td>
        <td>
          {{ review?.answers.priceEvaluation }}
        </td>
      </tr>
      <tr>
        <td>
          <b>Sugestie zmian</b>
        </td>
        <td>
          {{ review?.answers.changeSuggestions }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
//vue
import { defineComponent, PropType } from 'vue'
//store
import { Review } from '@/store/reviewStore'

export default defineComponent({
  name: 'ReviewDetailsPreview',
  props: {
    review: {
      type: Object as PropType<Review>,
    },
  },
  setup() {
    return {}
  },
})
</script>

<style scoped>
table {
  margin-right: auto;
  margin-left: auto;
  /* background-color: #ccc; */
  border-collapse: collapse;
  width: calc(100%);
}

td,
th {
  border: 1px solid var(--ion-color-light-shade);
  text-align: center;
  padding: 12px;
}
tr:nth-child(even) {
  background-color: var(--ion-color-light);
}
caption {
  padding-top: 15px;
  padding-bottom: 10px;
  font-size: 1.5rem;
  font-style: italic;
  margin-top: 10px;
}
.divider-h2-tag {
  margin: auto;
}
p {
  overflow: auto;
  max-width: 100%;
  word-wrap: break-word;
  overflow-wrap: break-word;
}
</style>
