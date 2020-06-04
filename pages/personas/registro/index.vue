<template>
  <div class="page container register">
    <form class="register__form">
      <div>
        <label for="">Nombres</label>
        <input v-model="first_name" type="text" class="input-text" />
      </div>
      <div>
        <label for="">Apellidos</label>
        <input v-model="last_name" type="text" class="input-text" />
      </div>
      <div>
        <label for="">Edad</label>
        <input v-model="age" type="number" min="0" class="input-text" />
      </div>
      <div>
        <label for="">Género</label>
        <select v-model="gender">
          <option value="Femenino">Femenino</option>
          <option value="Masculino">Masculino</option>
        </select>
      </div>
      <div>
        <label for="">Departamento</label>
        <select class="" @change="changeDepartment">
          <option
            v-for="depto in departments"
            :key="depto.id"
            :value="depto.id"
          >
            {{ depto.name }}
          </option>
        </select>
      </div>
      <div>
        <label for="">Municipio</label>
        <select v-model="municipality" class="">
          <option
            v-for="mun in municipalitiesFiltered"
            :key="mun.id"
            :value="mun.id"
          >
            {{ mun.name }}
          </option>
        </select>
      </div>
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
      <div>
        <button type="button" @click="savePerson">Guardar</button>
      </div>
    </form>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  components: {},
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
      department: null,
      municipality: null,
      departments: [],
      municipalities: [],
      municipalitiesFiltered: []
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
        this.changeDepartment(this.departments[0].id)
      })
      .catch((err) => err)
  },
  methods: {
    changeDepartment(depto) {
      const deptoId = _.get(depto, 'target') ? +depto.target.value : depto
      this.municipalitiesFiltered = _.filter(
        this.municipalities,
        (m) => m.department.id === deptoId
      )
      this.municipality = _.values(this.municipalitiesFiltered)[0].id
    },
    savePerson() {
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
        municipality: this.municipality
      }
      this.$axios
        .post('people', data)
        .then((res) => res)
        .catch((err) => err)
    }
  }
}
</script>

<style lang="scss" scoped>
.register {
}
</style>
