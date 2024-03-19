import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Forms from '@/views/FormsView.vue'
import Vuex from 'vuex';

// Create a mock store
const store = new Vuex.Store({
  state: {
    formData: {
      name: '',
      mail: '',
      message: ''
    },
    responseText: ''
  },
  mutations: {
    updateFormData(state, formData) {
      state.formData = formData;
    },
    setResponseText(state, text) {
      state.responseText = text;
    }
  },
})

describe('Forms', () => {

  // Submit button tests
  it('submit button not disabled when input fields are valid', async () => {
    const wrapper = mount(Forms, {
      global: {
        plugins: [store]
      }
    });
    const nameInput = wrapper.find('#name');
    const mailInput = wrapper.find('#mail');
    const messageInput = wrapper.find('#message');
    const submitButton = wrapper.find("#submit");
    await nameInput.setValue("test name");
    await mailInput.setValue("test@test.com");
    await messageInput.setValue("test message");
    await wrapper.vm.$nextTick();
    expect(submitButton.element.disabled).toBe(false);
  });
  it('submit button disabled when name is an empty string', async () => {
    const wrapper = mount(Forms, {
      global: {
        plugins: [store]
      }
    });
    const nameInput = wrapper.find('#name');
    const mailInput = wrapper.find('#mail');
    const messageInput = wrapper.find('#message');
    const submitButton = wrapper.find("#submit");
    await nameInput.setValue("");
    await mailInput.setValue("test@test.com");
    await messageInput.setValue("test message");
    await wrapper.vm.$nextTick();
    expect(submitButton.element.disabled).toBe(true);
  });
  it('submit button disabled when message is an empty string', async () => {
    const wrapper = mount(Forms, {
      global: {
        plugins: [store]
      }
    });
    const nameInput = wrapper.find('#name');
    const mailInput = wrapper.find('#mail');
    const messageInput = wrapper.find('#message');
    const submitButton = wrapper.find("#submit");
    await nameInput.setValue("test name");
    await mailInput.setValue("test@test.com");
    await messageInput.setValue("");
    await wrapper.vm.$nextTick();
    expect(submitButton.element.disabled).toBe(true);
  });
  it('submit button disabled when mail dose not have @', async () => {
    const wrapper = mount(Forms, {
      global: {
        plugins: [store]
      }
    });
    const nameInput = wrapper.find('#name');
    const mailInput = wrapper.find('#mail');
    const messageInput = wrapper.find('#message');
    const submitButton = wrapper.find("#submit");
    await nameInput.setValue("test name");
    await mailInput.setValue("testtest.com");
    await messageInput.setValue("test message");
    await wrapper.vm.$nextTick();
    expect(submitButton.element.disabled).toBe(true);
  });
  it('submit button disabled when mail dose not have .', async () => {
    const wrapper = mount(Forms, {
      global: {
        plugins: [store]
      }
    });
    const nameInput = wrapper.find('#name');
    const mailInput = wrapper.find('#mail');
    const messageInput = wrapper.find('#message');
    const submitButton = wrapper.find("#submit");
    await nameInput.setValue("test name");
    await mailInput.setValue("test@testcom");
    await messageInput.setValue("test message");
    await wrapper.vm.$nextTick();
    expect(submitButton.element.disabled).toBe(true);
  });
  it('submit button disabled when mail dose not have string in front of @', async () => {
    const wrapper = mount(Forms, {
      global: {
        plugins: [store]
      }
    });
    const nameInput = wrapper.find('#name');
    const mailInput = wrapper.find('#mail');
    const messageInput = wrapper.find('#message');
    const submitButton = wrapper.find("#submit");
    await nameInput.setValue("test name");
    await mailInput.setValue("@test.com");
    await messageInput.setValue("test message");
    await wrapper.vm.$nextTick();
    expect(submitButton.element.disabled).toBe(true);
  });
  it('submit button disabled when mail dose not have string in front of .', async () => {
    const wrapper = mount(Forms, {
      global: {
        plugins: [store]
      }
    });
    const nameInput = wrapper.find('#name');
    const mailInput = wrapper.find('#mail');
    const messageInput = wrapper.find('#message');
    const submitButton = wrapper.find("#submit");
    await nameInput.setValue("test name");
    await mailInput.setValue("test@.com");
    await messageInput.setValue("test message");
    await wrapper.vm.$nextTick();
    expect(submitButton.element.disabled).toBe(true);
  });
  it('submit button disabled when mail dose not have string behind .', async () => {
    const wrapper = mount(Forms, {
      global: {
        plugins: [store]
      }
    });
    const nameInput = wrapper.find('#name');
    const mailInput = wrapper.find('#mail');
    const messageInput = wrapper.find('#message');
    const submitButton = wrapper.find("#submit");
    await nameInput.setValue("test name");
    await mailInput.setValue("test@test.");
    await messageInput.setValue("test message");
    await wrapper.vm.$nextTick();
    expect(submitButton.element.disabled).toBe(true);
  });
});