import pnp, { ODataParserBase } from "sp-pnp-js";
import { ItemAddResult,Web } from "sp-pnp-js";
import IintelCEDataService from "./IintelCEDataService";
import { IIntelCEMainState , } from "../state/IIntelCEState";


// CRUD method for sharepoint list using sp-pnp-js
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

    getIntelCEList(pageIndex:number,itemCount:number):Promise<any>{

        let skipNum = pageIndex * itemCount;

        console.log(skipNum);

        return  pnp.sp.web.lists.getByTitle("tmpIntelCEMain").items.select("requestid","ecn","division","corp_tracker","eco","affected_models","class_change","change_type","reqeuestdate")
        .skip(skipNum).top(itemCount).orderBy("reqeuestdate").get().then(p => {             

            let resultItemList: {
                requestid:string,
                reqeuestdate:string,
                corp_tracker:string,
                ecn:string,
                division : string,
                eco:string,
                affected_models: string,
                class_change: string,
                change_type:string, 
              }[] = [];

            p.map(p1 => { 
                resultItemList.push(
                    {
                        requestid: p1.requestid,
                        ecn : p1.ecn,
                        division : p1.division,
                        corp_tracker : p1.corp_tracker,
                        eco : p1.eco,
                        affected_models : p1.affected_models,
                        class_change : p1.class_change,
                        change_type : p1.change_type,
                        reqeuestdate : p1.reqeuestdate
                    }
                );       
             } );         

            console.log(resultItemList);
            return resultItemList;
        });

    }

    getIntelCEListTotalCount():Promise<any>{

        return  pnp.sp.web.lists.getByTitle("tmpIntelCEMain").items.select("Title").filter("").get().then(p => {
            console.log(p.length);             
            return p.length; 
         });
     }

    getIntelCEDetails(intelceID:string):Promise<any>{

        console.log("getIntelCEDetails");

        let newFormControlsState = {} as IIntelCEMainState;

        return pnp.sp.web.lists.getByTitle("tmpIntelCEMain").items.filter("requestid eq '"+intelceID+"'").get().then( r => {
            
            console.log("tmpIntelCEMain");

            console.log(newFormControlsState);

            newFormControlsState = {                 
                
                affectedModelsList : [],
                isShowchange_type_freetext: true,
                change_type_freetext:"",
                requestid:r[0].requestid,
                reqeuestdate:r[0].reqeuestdate,
                title:r[0].title,
                corp_tracker:r[0].corp_tracker,
                ecn:r[0].ecn,
                division:r[0].division,
                eco:r[0].eco,
                affected_models:r[0].affected_models,
                class_change:r[0].class_change,
                change_type:r[0].change_type,
                sys_cut_in_number:r[0].sys_cut_in_number,
                field_spares_cut_in_date:r[0].field_spares_cut_in_date,
                por_part_no_longer_avail:r[0].por_part_no_longer_avail,
                implementation_plan:r[0].implementation_plan,
                process_node:r[0].process_node,
                cost_impact:r[0].cost_impact,

                IntelBOMState:[] 
            };

            console.log(newFormControlsState);

            return pnp.sp.web.lists.getByTitle("tmpIntelBOMItem").items.filter("requestid eq '"+intelceID+"'").get().then( r => {

                console.log("tmpIntelBOMItem");

                newFormControlsState.IntelBOMState = r.map(

                    p=> { return {
                        requestid :p.requestid,
                        seq :p.seq,
                        old_pn :p.old_pn,
                        new_pn :p.new_pn,
                        part_description :p.part_description,
                        impacts_ccl_yn : p.impacts_ccl_yn
                    }    
                }

                );

                console.log(newFormControlsState);   

                return newFormControlsState;
            });
        });
    }

    createIntelCERequest(IntelCERequestData:IIntelCEMainState,siteUrl) : Promise<any>{

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