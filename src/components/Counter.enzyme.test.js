import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Counter from './Counter';
configure({ adapter: new Adapter() });

describe('Counter', () => {
  it('renders the component', () => {
    const wrapper = shallow(<Counter />);
    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('button').length).toEqual(3);
    expect(wrapper.find('button').at(0).text()).toEqual('Add');
    expect(wrapper.find('button').at(1).text()).toEqual('Remove');
    expect(wrapper.find('button').at(2).text()).toEqual('Add if odd');
  });

  describe('when the add method is called', () => {
    it('increases the value in state by 1', () => {
      const wrapper = shallow(<Counter />);
      expect(wrapper.state().value).toEqual(0);

      wrapper.instance().add();
      
      expect(wrapper.state().value).toEqual(1);
    });
  });

  describe('when the value in state >= 5', () => {
    it('calls the limitWarnings prop function', () => {
      const limitWarning = jest.fn();
      const wrapper = shallow(<Counter limitWarning={limitWarning} />);
      wrapper.setState({ value: 5 })
      expect(wrapper.state().value).toEqual(5);

      wrapper.instance().add();

      expect(wrapper.state().value).toEqual(6);
      expect(limitWarning).toHaveBeenCalled();
    });
  });

  describe('when the remove method is called', () => {
    it('decreases the value in state by 1', () => {
      const wrapper = shallow(<Counter />);
      expect(wrapper.state().value).toEqual(0);
      
      wrapper.instance().remove();
      
      expect(wrapper.state().value).toEqual(-1);
    });
  });

  describe('when the addIfOdd method is called', () => {
    describe('when the value in state is even', () => {
      it('does not update the value', () => {
        const value = 24;
        const wrapper = shallow(<Counter />);
        wrapper.setState({ value })

        wrapper.instance().addIfOdd();

        expect(wrapper.state().value).toEqual(value);
      });
    });
    
    describe('when the value in state is odd', () => {
      it('increases the value in state by 1', () => {
        const value = 21;
        const wrapper = shallow(<Counter />);
        wrapper.setState({ value })

        wrapper.instance().addIfOdd();

        expect(wrapper.state().value).toEqual(value + 1);
      });
    });
  });
});