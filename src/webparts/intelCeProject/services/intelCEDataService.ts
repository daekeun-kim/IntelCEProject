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

    // Creates a new purchase request. The request is created in two list. One where the master data is stored and one
    // where the purchase items are stored with a reference of the ID of master request.
    async createIntelCERequest(IntelCERequestData:IIntelCEMainState,siteUrl) : Promise<any>{

        let sRequestid = this.newGuid();

        console.log(IntelCERequestData);

        return pnp.sp.web.lists.getByTitle("tmpIntelCEMain").items.add({
                
                requestid:sRequestid,
                reqeuestdate:IntelCERequestData.reqeuestdate,
                Title:IntelCERequestData.title,
                corp_tracker:IntelCERequestData.corp_tracker,
                ecn: IntelCERequestData.ecn,
                division :IntelCERequestData.division,
                eco:IntelCERequestData.eco,
                affected_models:IntelCERequestData.affected_models,
                class_change:IntelCERequestData.class_change,
                change_type:IntelCERequestData.change_type,
                sys_cut_in_number :IntelCERequestData.sys_cut_in_number,
                field_spares_cut_in_date :IntelCERequestData.field_spares_cut_in_date,
                por_part_no_longer_avail:IntelCERequestData.por_part_no_longer_avail,
                implementation_plan :IntelCERequestData.implementation_plan,
                process_node:IntelCERequestData.process_node,
                cost_impact:IntelCERequestData.cost_impact
              
            })

            .then((result:ItemAddResult)=>{
                let IntelCERequestID = sRequestid;
                console.log("Intece request created : " + IntelCERequestID);
                if(IntelCERequestData.IntelBOMState != null && IntelCERequestData.IntelBOMState.length > 0){

                    // Creates the multiple purchase items in batch.
                    let web = new Web(siteUrl);
                    let batch = web.createBatch();
                    
                    IntelCERequestData.IntelBOMState.forEach(Item => {
                        web.lists.getByTitle("tmpIntelBOMItem").items.inBatch(batch).add({
                        //pnp.sp.web.lists.getByTitle("tmpIntelBOMItem").items.inBatch(batch).add({
                            Title:IntelCERequestID,
                            requestid:IntelCERequestID,                            
                            seq:Item.seq,
                            model:Item.model,
                            old_pn:Item.old_pn,
                            new_pn:Item.new_pn,
                            part_description:Item.part_description,
                            impacts_ccl_yn : Item.impacts_ccl_yn
                        });
                        console.log(Item);
                    });

                    batch.execute().then(()=>{
                        console.log("Purchase items added to the list....");
                        alert("!!");
                    });
                }
                else{
                    alert('Select atleast one purchase item.');
                }
        });
    }

    private newGuid()
    {
       let  guid = (this.S4() + this.S4() + "-" + this.S4() + "-4" + this.S4().substr(0,3) + "-" + this.S4() + "-" + this.S4() + this.S4() + this.S4()).toLowerCase();

       return guid;

    }

    private S4(){
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
    }

}