// vm = vue model
const vm = Vue.createApp({
  data() {
    return {
      firstName: 'John',
      middleName: '',
      lastName: 'Doe',
      url: 'https://google.com',
      raw_url: '<a href="https://google.com" target="_blank">Google</a>',
      age: 20
    }
  },
  methods: {
    increment() {
      this.age++
    },
    updateLastName(msg, event) {
      // console.log(msg)
      this.lastName = event.target.value
    },
    updateMiddleName(event) {
      this.middleName = event.target.value
    }
  },
  // computed properties are used to calculate a value / you can't pass a data here
  // in this case better to use methods // no asynchronous tasks
  computed: {
    fullName() {
      console.log('Full name computed property was called')

      return `${this.firstName} ${this.middleName} ${this.lastName.toUpperCase()}`
    },
  },
  // Watchers can be used for asynchronous tasks
  watch: {
    age(newVal, oldVal) {
      setTimeout(() => {
        this.age = 20
      }, 3000);
    }
  }
}).mount('#app')

// setTimeout(() => {
//   vm.firstName = 'Bob';
// }, 2000);

// Vue.createApp({
//   data() {
//     return {
//       firstName: 'Jane',
//       lastName: 'Doe'
//     }
//   }
// }).mount('#app2')
