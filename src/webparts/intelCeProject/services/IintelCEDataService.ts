
// Represents the service to interact with SharePoint to work with purchase request.
export default interface IintelCEDataService{
    getProductModelList() : Promise<any>;
    //createNewPurchaseRequest(purchaseRequestData:INewFormState,siteUrl) : Promise<any>;
}