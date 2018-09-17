import pnp from "sp-pnp-js";
import { ItemAddResult,Web } from "sp-pnp-js";
import IintelCEDataService from "./IintelCEDataService";
import { IIntelCEMainState } from "../state/IIntelCEState";



export default class intelCEDataService implements IintelCEDataService{

    private getProductModelListValues():Promise<any>{

        let ListName:string = "IntelCEModelList";
        let getColumn:string = "ModelName";

        return pnp.sp.web.lists.getByTitle(ListName).items.select(getColumn).get().then(response => {
            console.log("test");
            console.log(response);
            return response;
        });
    }

    getProductModelList():Promise<IIntelCEMainState>{

        let newFormControlsState = {} as IIntelCEMainState;

        return this.getProductModelListValues().then(Response => {
            newFormControlsState.affectedModelsList = Response.map( p=> { return p.ModelName});    
            console.log("testaffectedmodel");
            console.log(newFormControlsState.affectedModelsList);
            return newFormControlsState;    
        });
    }

}