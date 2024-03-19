import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Calculator from '../CalculatorView.vue'

describe('Calculator', () => {
  it('renders without errors', () => {
    const wrapper = mount(Calculator)
    expect(wrapper.exists()).toBe(true)
  })

  // Test for initial state
  it('initial state is correct', () => {
    const wrapper = mount(Calculator)
    expect(wrapper.vm.calcText).toStrictEqual("")
    expect(wrapper.vm.errorMsg).toStrictEqual("")
    expect(wrapper.vm.buttons).toStrictEqual(['AC', 'ANS', 'DEL', '+', '1', '2', '3', '-', '4', '5', '6', '*', '7', '8', '9', '/', '0', '.', '=', "**"])
    expect(wrapper.vm.loggText).toStrictEqual([])
  })

  // Test for button click functionality
  it('number buttons click updates display', async () => {
    const wrapper = mount(Calculator)
    const numberButtons = ['4', '5', '6', '8', '9', '10', '12', '13', '14', '16']
    for (let num of numberButtons) {
      await wrapper.find(`.area${num}`).trigger('click')
    }
    expect(wrapper.vm.calcText).toBe('1234567890')
  })

  it('operator buttons click updates display', async () => {
    const wrapper = mount(Calculator)
    const operatorButtons = ['3', '7', '11', '15', '19']
    for(let num of operatorButtons) {
      await wrapper.find(`.area${num}`).trigger('click')
    }
    expect(wrapper.vm.calcText).toBe('+-*/**')
  })

  it('AC button click functionality', async () => {
    const wrapper = mount(Calculator)
    const numberButtons = ['4', '5', '6', '0']
    for (let num of numberButtons) {
      await wrapper.find(`.area${num}`).trigger('click')
    }
    expect(wrapper.vm.calcText).toBe('')
  })

  it('ANS button click functionality', async () => {
    const wrapper = mount(Calculator)
    const numberButtons = ['4', '3', '6', '18', '0', '1']
    for (let num of numberButtons) {
      await wrapper.find(`.area${num}`).trigger('click')
    }
    expect(wrapper.vm.calcText).toBe('4')
  })

  it('DEL button click functionality', async () => {
    const wrapper = mount(Calculator)
    const numberButtons = ['4', '5', '6', '2']
    for (let num of numberButtons) {
      await wrapper.find(`.area${num}`).trigger('click')
    }
    expect(wrapper.vm.calcText).toBe('12')
  })

  // Calculation tests
  it('+ button calculation positive solution', async () => {
    const wrapper = mount(Calculator)
    const numberButtons = ['4', '3', '5', '18']
    for (let num of numberButtons) {
      await wrapper.find(`.area${num}`).trigger('click')
    }
    expect(wrapper.vm.calcText).toBe('3')
  })
  it('+ button calculation negative solution', async () => {
    const wrapper = mount(Calculator)
    const numberButtons = ['7', '14', '3', '5', '18']
    for (let num of numberButtons) {
      await wrapper.find(`.area${num}`).trigger('click')
    }
    expect(wrapper.vm.calcText).toBe('-7')
  })
  it('+ button calculation with decimal numbers', async () => {
    const wrapper = mount(Calculator)
    const numberButtons = ['5', '17', '5', '3', '6', '17', '6', '18']
    for (let num of numberButtons) {
      await wrapper.find(`.area${num}`).trigger('click')
    }
    expect(wrapper.vm.calcText).toBe('5.5')
  })

  it('- button calculation positive solution', async () => {
    const wrapper = mount(Calculator)
    const numberButtons = ['14', '7', '5', '18']
    for (let num of numberButtons) {
      await wrapper.find(`.area${num}`).trigger('click')
    }
    expect(wrapper.vm.calcText).toBe('7')
  })
  it('- button calculation negative solution', async () => {
    const wrapper = mount(Calculator)
    const numberButtons = ['4', '7', '5', '18']
    for (let num of numberButtons) {
      await wrapper.find(`.area${num}`).trigger('click')
    }
    expect(wrapper.vm.calcText).toBe('-1')
  })
  it('- button calculation with decimal numbers', async () => {
    const wrapper = mount(Calculator)
    const numberButtons = ['8', '17', '8', '7', '5', '17', '5', '18']
    for (let num of numberButtons) {
      await wrapper.find(`.area${num}`).trigger('click')
    }
    expect(wrapper.vm.calcText).toBe('2.2')
  })

  it('* button calculation positive solution', async () => {
    const wrapper = mount(Calculator)
    const numberButtons = ['9', '11', '5', '18']
    for (let num of numberButtons) {
      await wrapper.find(`.area${num}`).trigger('click')
    }
    expect(wrapper.vm.calcText).toBe('10')
  })
  it('* button calculation negative solution', async () => {
    const wrapper = mount(Calculator)
    const numberButtons = ['7', '9', '11', '5', '18']
    for (let num of numberButtons) {
      await wrapper.find(`.area${num}`).trigger('click')
    }
    expect(wrapper.vm.calcText).toBe('-10')
  })
  it('* button calculation with decimal numbers', async () => {
    const wrapper = mount(Calculator)
    const numberButtons = ['5', '17', '9', '11', '5', '17', '9', '18']
    for (let num of numberButtons) {
      await wrapper.find(`.area${num}`).trigger('click')
    }
    expect(wrapper.vm.calcText).toBe('6.25')
  })

  it('/ button calculation positive solution', async () => {
    const wrapper = mount(Calculator)
    const numberButtons = ['8', '15', '5', '18']
    for (let num of numberButtons) {
      await wrapper.find(`.area${num}`).trigger('click')
    }
    expect(wrapper.vm.calcText).toBe('2')
  })
  it('/ button calculation negative solution', async () => {
    const wrapper = mount(Calculator)
    const numberButtons = ['7', '8', '15', '5', '18']
    for (let num of numberButtons) {
      await wrapper.find(`.area${num}`).trigger('click')
    }
    expect(wrapper.vm.calcText).toBe('-2')
  })
  it('/ button calculation with decimal numbers', async () => {
    const wrapper = mount(Calculator)
    const numberButtons = ['9', '15', '5', '17', '9', '18']
    for (let num of numberButtons) {
      await wrapper.find(`.area${num}`).trigger('click')
    }
    expect(wrapper.vm.calcText).toBe('2')
  })

  it('all operator buttons calculation', async () => {
    const wrapper = mount(Calculator)
    const numberButtons = ['4', '3', '5', '7', '6', '11', '8', '15', '9', '19', '10', '18']
    for (let num of numberButtons) {
      await wrapper.find(`.area${num}`).trigger('click')
    }
    expect(wrapper.vm.calcText).toBe('2.999232')
  })

  // Calculation error tests
  it('divide by zero', async () => {
    const wrapper = mount(Calculator)
    const numberButtons = ['9', '15', '16', '18']
    for (let num of numberButtons) {
      await wrapper.find(`.area${num}`).trigger('click')
    }
    expect(wrapper.vm.errorMsg).toBe('Error: Invalid expression')
  })

  it('calculation with double +', async () => {
    const wrapper = mount(Calculator)
    const numberButtons = ['5', '3', '3', '9', '18']
    for (let num of numberButtons) {
      await wrapper.find(`.area${num}`).trigger('click')
    }
    expect(wrapper.vm.errorMsg).toBe('Error: Invalid expression')
  })
  it('calculation with double -', async () => {
    const wrapper = mount(Calculator)
    const numberButtons = ['5', '7', '7', '9', '18']
    for (let num of numberButtons) {
      await wrapper.find(`.area${num}`).trigger('click')
    }
    expect(wrapper.vm.errorMsg).toBe('Error: Invalid expression')
  })
  it('calculation with double //', async () => {
    const wrapper = mount(Calculator)
    const numberButtons = ['5', '15', '15', '9', '18']
    for (let num of numberButtons) {
      await wrapper.find(`.area${num}`).trigger('click')
    }
    expect(wrapper.vm.errorMsg).toBe('Error: Invalid expression')
  })
  it('calculation with triple *', async () => {
    const wrapper = mount(Calculator)
    const numberButtons = ['5', '11', '11', '11', '9', '18']
    for (let num of numberButtons) {
      await wrapper.find(`.area${num}`).trigger('click')
    }
    expect(wrapper.vm.errorMsg).toBe('Error: Invalid expression')
  })

  // Logg tests
  it('equation is added to logg', async () => {
    const wrapper = mount(Calculator)
    const numberButtons = ['5', '11', '9', '18']
    for (let num of numberButtons) {
      await wrapper.find(`.area${num}`).trigger('click')
    }
    expect(wrapper.vm.loggText).toStrictEqual(['2*5=10\n'])
  })
  it('two equations is added to logg', async () => {
    const wrapper = mount(Calculator)
    const numberButtons1 = ['5', '11', '9', '18']
    for (let num of numberButtons1) {
      await wrapper.find(`.area${num}`).trigger('click')
    }
    const numberButtons2 = ['0', '5', '3', '9', '18']
    for (let num of numberButtons2) {
      await wrapper.find(`.area${num}`).trigger('click')
    }
    expect(wrapper.vm.loggText).toStrictEqual(['2*5=10\n', '2+5=7\n'])
  })
  it('invalid equations is not added to logg', async () => {
    const wrapper = mount(Calculator)
    const numberButtons = ['5', '3', '3', '9', '18']
    for (let num of numberButtons) {
      await wrapper.find(`.area${num}`).trigger('click')
    }
    expect(wrapper.vm.loggText).toStrictEqual([])
  })
})
