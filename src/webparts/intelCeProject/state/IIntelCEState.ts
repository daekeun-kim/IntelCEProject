// Represents a purchase request
export interface IIntelCEMainState{
    requestid:string;
    reqeuestdate:Date;
    title:string;
    corp_tracker:string;
    ecn: string;
    division :string;
    eco:string;
    affected_models:string;
    class_change:string;
    change_type:string;
    IntelBOMState:IIntelBOMState[];
    sys_cut_in_number :string;
    field_spares_cut_in_date :Date;
    por_part_no_longer_avail:string;
    implementation_plan :string;
    process_node:string;
    cost_impact:string;
}


// Represents one purchase item in the purchase request.
export interface IIntelBOMState{
    requestid:string;
    model:string;
    old_pn:string;
    new_pn:string;
    part_description:string;
    impacts_ccl_yn:string;
}

export interface IIntelBOMStateList{
    IntelBOMState : IIntelBOMState[]
}

