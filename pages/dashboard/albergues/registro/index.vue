<template>
  <div class="page container register">
    <ValidationObserver ref="form">
      <form class="register__form">
        <validate-input rules="required">
          <label for="">Nombre</label>
          <input v-model="name" type="text" class="input-text" />
        </validate-input>
        <validate-input rules="required|integer">
          <label for="">Código</label>
          <input v-model="code" type="text" class="input-text" />
        </validate-input>
        <validate-input rules="required">
          <label for="">Director/a</label>
          <input v-model="director" type="text" class="input-text" />
        </validate-input>
        <validate-input rules="required|integer">
          <label for="">Contacto #1</label>
          <input v-model="director_cont_one" type="text" class="input-text" />
        </validate-input>
        <validate-input rules="required|integer">
          <label for="">Contacto #2</label>
          <input v-model="director_cont_two" type="text" class="input-text" />
        </validate-input>
        <validate-input rules="required">
          <label>
            <input v-model="opening_act" class="" type="checkbox" />
            <span>
              Acta de apertura
            </span>
          </label>
        </validate-input>
        <validate-input rules="required">
          <label for="">Encardago/a del Albergue</label>
          <input v-model="manager" type="text" class="input-text" />
        </validate-input>
        <validate-input rules="required|integer">
          <label for="">Contacto</label>
          <input v-model="manager_cont" type="text" class="input-text" />
        </validate-input>
        <validate-input rules="required">
          <label for="">Departamento</label>
          <select class="" @change="changeDepartment">
            <option
              v-for="depto in departments"
              :key="depto._id"
              :value="depto._id"
            >
              {{ depto.name }}
            </option>
          </select>
        </validate-input>
        <validate-input rules="required">
          <label for="">Municipio</label>
          <select v-model="municipality" class="">
            <option
              v-for="mun in municipalitiesFiltered"
              :key="mun._id"
              :value="mun._id"
            >
              {{ mun.name }}
            </option>
          </select>
        </validate-input>
        <validate-input rules="required">
          <label for="">Dirección</label>
          <input v-model="address" type="text" class="input-text" />
        </validate-input>
        <div>
          <span>{{ messageRequest }}</span>
        </div>
        <div>
          <button type="button" class="save-button" @click="saveHostel">
            Guardar
          </button>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import _ from 'lodash'
import { ValidationObserver } from 'vee-validate'
import ValidateInput from '~/components/form/ValidateInput.vue'

export default {
  components: {
    ValidationObserver,
    ValidateInput
  },
  data() {
    return {
      name: '',
      code: null,
      director: '',
      director_cont_one: '',
      director_cont_two: '',
      opening_act: false,
      manager: '',
      manager_cont: '',
      address: '',
      municipality: null,
      departments: [],
      municipalities: [],
      municipalitiesFiltered: [],
      messageRequest: ''
    }
  },
  mounted() {
    this.$axios
      .get('departments')
      .then((res) => (this.departments = res.data))
      .catch((err) => err)

    this.$axios
      .get('municipalities')
      .then((res) => {
        this.municipalities = res.data
        this.changeDepartment(this.departments[0]._id)
      })
      .catch((err) => err)
  },
  methods: {
    changeDepartment(depto) {
      const deptoId = _.get(depto, 'target.value') ? depto.target.value : depto
      this.municipalitiesFiltered = _.filter(
        this.municipalities,
        (m) => m.department._id === deptoId
      )

      this.municipality =
        this.municipalitiesFiltered.length > 0
          ? _.values(this.municipalitiesFiltered)[0]._id
          : null
    },
    saveHostel() {
      this.$refs.form.validate().then((success) => {
        if (!success) {
          return
        }
        const data = {
          name: this.name,
          code: this.code,
          director: this.director,
          director_cont_one: this.director_cont_one,
          director_cont_two: this.director_cont_two,
          opening_act: this.opening_act,
          manager: this.manager,
          manager_cont: this.manager_cont,
          address: this.address,
          municipality: this.municipality
        }
        this.messageRequest = 'Espera...'
        this.$axios
          .post('hostels', data)
          .then(() => (this.messageRequest = 'Albergue registrado con éxito'))
          .catch(() => (this.messageRequest = 'Ocurrió un error'))
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.save-button {
  @apply border p-4 mb-16 bg-blue-500;
}
</style>
