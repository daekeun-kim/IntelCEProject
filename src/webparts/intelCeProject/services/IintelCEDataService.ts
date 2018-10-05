import { IIntelCEMainState } from "../state/IIntelCEState";

// Represents the service to interact with SharePoint to work with
export default interface IintelCEDataService{
    getProductModelList() : Promise<any>;    
    createIntelCERequest(IntelCERequestData:IIntelCEMainState,siteUrl) : Promise<any>;
    getIntelCEDetails(intelceID:string):Promise<any>;
    getIntelCEList(pageIndex:number,itemCount:number):Promise<any>;
    getIntelCEListTotalCount():Promise<any>;
}