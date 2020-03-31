import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
//prevent warnings
window.HTMLCanvasElement.prototype.getContext = () => {}

Enzyme.configure({ adapter: new Adapter() });