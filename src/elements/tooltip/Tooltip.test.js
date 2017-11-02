import React from 'react';
import ReactDOM from 'react-dom';
import {shallow} from 'enzyme';
import Tooltip from './Tooltip';

// it('Check Render', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<Field />, div);
// });
//
// test('CheckboxWithLabel changes the text after click', () => {
//
//     // Render a checkbox with label in the document
//     const checkbox = shallow(
//         <Field labelOn="On" labelOff="Off" />
//     );
//
//     expect(checkbox.text()).toEqual('Off');
//
//     checkbox.find('input').simulate('change');
//
//     expect(checkbox.text()).toEqual('On');
// });

describe('Standard Tooltip <Tooltip /> component', () => {

    const message = 'this is a sample tooltip';
    const target = <div id="placement">...</div>;
    const tooltip = <div><Tooltip target="placement">{message}</Tooltip>{target}</div>;

    // it('Check Render', () => {
    //     const div = document.createElement('div');
    //     ReactDOM.render(tooltip, div);
    // });

    it('Check Render', () => {
        const wrapper = shallow(tooltip);
        expect(wrapper.contains(target)).toEqual(true);
    });

    // it('Check hover', () => {
    //     const wrapper = shallow(tooltip);
    //     wrapper.find(target).simulate('hover');
    //     expect(wrapper.contains('tooltip__content')).toEqual(true);
    // });

    // it('Render Component', () => {
    //     const menu = shallow(<Menu />);
    //     const icon = <i className="icon icon--segment" aria-hidden="true"/>;
    //     expect(menu.contains(icon)).toEqual(true);
    // });

    // it('renders button click message', () => {
    //     const wrapper = shallow(<App />);
    //     const nineSign = <p className="App-intro">Nine: 9</p>;
    //     wrapper.find('button.elf').simulate('click');
    //     expect(wrapper.contains(nineSign)).toEqual(true);
    // });
});
