<template>
  <div class="page container register">
    <ValidationObserver ref="form">
      <form class="register__form">
        <validate-input rules="required">
          <label for="">Nombres</label>
          <input v-model="first_name" type="text" class="input-text" />
        </validate-input>
        <validate-input rules="required">
          <label for="">Apellidos</label>
          <input v-model="last_name" type="text" class="input-text" />
        </validate-input>
        <validate-input rules="required|integer|minmax:0,10">
          <label for="">Edad</label>
          <input v-model="age" type="text" class="input-text" />
        </validate-input>
        <validate-input rules="required">
          <label for="">Género</label>
          <select v-model="gender">
            <option value="Femenino">Femenino</option>
            <option value="Masculino">Masculino</option>
          </select>
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
        <div>
          <label for="">Dirección</label>
          <input v-model="address" type="text" class="input-text" />
        </div>
        <div>
          <label for="">Profesión</label>
          <input v-model="profession" type="text" class="input-text" />
        </div>
        <div>
          <label>
            <input v-model="pregnant" class="" type="checkbox" />
            <span>
              ¿Embarazo?
            </span>
          </label>
        </div>
        <div>
          <label for="">Detalles embarazo</label>
          <input
            v-model="pregnant_details"
            :disabled="!pregnant"
            type="text"
            class="input-text"
            placeholder=""
          />
        </div>
        <div>
          <label>
            <input v-model="disability" class="" type="checkbox" />
            <span>
              ¿Discapacidad?
            </span>
          </label>
        </div>
        <div>
          <label for="">Detalles de la incapacidad</label>
          <input
            v-model="disability_details"
            :disabled="!disability"
            type="text"
            class="input-text"
            placeholder=""
          />
        </div>
        <div>
          <label>
            <input v-model="disease" class="" type="checkbox" />
            <span>
              ¿Enfermedad crónica?
            </span>
          </label>
        </div>
        <div>
          <label for="">Detalles enfermedad</label>
          <input
            v-model="disease_details"
            :disabled="!disease"
            type="text"
            class="input-text"
            placeholder=""
          />
        </div>
        <div>
          <label>
            <input v-model="prescription" class="" type="checkbox" />
            <span>
              ¿Medicamento?
            </span>
          </label>
        </div>
        <div>
          <label for="">Detalles medicamento</label>
          <input
            v-model="prescription_details"
            :disabled="!prescription"
            type="text"
            class="input-text"
            placeholder=""
          />
        </div>
        <validate-input rules="required">
          <label for="">Filtro albergues</label>
          <select class="" @change="changeDepartmentHostelsFilter">
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
          <label for="">Albergue</label>
          <select v-model="hostel" class="">
            <option v-for="h in hostelsFiltered" :key="h._id" :value="h._id">
              {{ h.name }}
            </option>
          </select>
        </validate-input>
        <div>
          <span>{{ messageRequest }}</span>
        </div>
        <div>
          <button type="button" class="save-button" @click="savePerson">
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
      first_name: '',
      last_name: '',
      age: null,
      gender: 'Femenino',
      address: '',
      profession: '',
      pregnant: false,
      pregnant_details: '',
      disability: false,
      disability_details: '',
      disease: false,
      disease_details: '',
      prescription: false,
      prescription_details: '',
      municipality: null,
      departments: [],
      municipalities: [],
      municipalitiesFiltered: [],
      hostel: null,
      hostels: [],
      hostelsFiltered: [],
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

    this.$axios
      .get('hostels')
      .then((res) => {
        this.hostels = res.data
        this.changeDepartmentHostelsFilter(this.departments[0]._id)
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
    changeDepartmentHostelsFilter(depto) {
      const deptoId = _.get(depto, 'target.value') ? depto.target.value : depto
      this.hostelsFiltered = _.filter(
        this.hostels,
        (h) => h.municipality.department === deptoId
      )
      this.hostel =
        this.hostelsFiltered.length > 0
          ? _.values(this.hostelsFiltered)[0]._id
          : null
    },
    savePerson() {
      this.$refs.form.validate().then((success) => {
        if (!success) {
          return
        }
        const data = {
          first_name: this.first_name,
          last_name: this.last_name,
          age: this.age,
          gender: this.gender,
          address: this.address,
          profession: this.profession,
          pregnant: this.pregnant,
          pregnant_details: this.pregnant_details,
          disability: this.disability,
          disability_details: this.disability_details,
          disease: this.disease,
          disease_details: this.disease_details,
          prescription: this.prescription,
          prescription_details: this.prescription_details,
          municipality: this.municipality,
          hostel: this.hostel
        }
        this.messageRequest = 'Espera...'
        this.$axios
          .post('people', data)
          .then(() => (this.messageRequest = 'Persona registrada con éxito'))
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
