import { IIntelCEMainState } from "../state/IIntelCEState";

// Represents the service to interact with SharePoint to work with purchase request.
export default interface IintelCEDataService{
    getProductModelList() : Promise<any>;    
    createIntelCERequest(IntelCERequestData:IIntelCEMainState,siteUrl) : Promise<any>;
}