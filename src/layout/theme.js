import { defaultTheme } from 'evergreen-ui'
import _ from 'lodash'

export const headerHeight = 65
export const sidebarWidth = 160;
export const footerHeight = 80;

function applyToAllSizes(props){
    //100 to 900
    return Object.assign({},...Array(9).fill(null).map((_,i)=>({[(i + 1) * 100] : props})))
}
const theme = _.merge(defaultTheme, {
    typography : {
        headings : applyToAllSizes({color : '#C6D3E7'}),
        paragraph : applyToAllSizes({color : '#95A4BE'}),
    }
});

export default theme