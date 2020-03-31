// import React from 'react'
// import { shallow } from 'enzyme';
// import Element from '../components/Element'

// const setUp = (props={}) => {
//     const component = shallow(<Element {...props} />);
//     return component;
// };

// describe('Element Component', () => {
    
//     it('Props Basicas', () => {
//         let element = {
//             name : 'Hidrogeno',
//             num : 1,
//             symbol : 'H'
//         }
//         let wrapped = setUp(element);
//         expect(wrapped.find('.name').text()).toEqual('Hidrogeno');
//         expect(wrapped.find('.number').text()).toEqual('1');
//         expect(wrapped.find('.symbol').text()).toEqual('H');
//     });

// });