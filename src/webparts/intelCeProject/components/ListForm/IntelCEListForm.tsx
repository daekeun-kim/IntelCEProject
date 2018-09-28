import * as React from 'react';

import styles from '../Assets/IntelCeProject.module.scss'



export default class IntelCEListForm extends React.Component<any,any>{

    constructor(props){
        super(props);


    }

    public render(){
        
        return(            
        <div>           
            
            <table className={styles.tableW3c}>  
            <tr>
                <th colSpan={6}>
                Impact to Intel BOM: <br></br>
                    (if more than one model is affected, list new/old PNs separately)
                </th>
            </tr>
            <tr>
                <td colSpan={6}>
                    Add impact intel BOM
        
            </td>
            </tr>        
            <tr> 
                <th>Model</th>
                <th>Old P/N</th>
                <th>New P/N</th>         
                <th>Part <br></br> descdription</th>         
                <th>Impacts <br></br> CCL <br></br> (Y/N)</th>        
                <th></th> 
            </tr>
            </table>
        </div>
        );
    }

}