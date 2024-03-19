import { createStore } from 'vuex';
import axios from 'axios'

export default createStore({
  state() {
    return {
      formData: {
        name: '',
        mail: '',
        message: ''
      },
      responseText: ''
    };
  },
  mutations: {
    updateFormData(state, formData) {
      state.formData = formData;
    },
    setResponseText(state, text) {
      state.responseText = text;
    }
  },
  actions: {
    submitForm({ commit, state }) {
      axios.post('http://localhost:3000/forms', state.formData)
        .then(response => {
          commit('setResponseText', "Data sent successfully. " + response);
        })
        .catch(error => {
          commit('setResponseText', "There was an error sending the data. " + error);
        });
    }
  }
});
