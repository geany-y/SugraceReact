import ResourceConnector from "./ResourceConnector";
import ResourceRepository from "./ResourceRepository";

export default class DataProviderFactory {
    constructor(filePath) {
        const repository = new ResourceRepository();
        const ext = String(filePath.split(".").pop());
        const configs = repository.getConfig(ext, filePath, "Yes", 0);
        const connector =  new ResourceConnector(configs);
        return new DataProvider(connector);
    }
}

class DataProvider {
    resourceConnector;

    constructor(resourceConnector) {
        this.resourceConnector = resourceConnector;
    }

    execSql(sql) {
        this.resourceConnector.open();
        const rs = this.resourceConnector.executeSQL(sql);
        const res = this.resourceConnector.convertToJson(rs);
        this.resourceConnector.close();
        return res;
    }

    getAllUser() {
        return new Promise((resolve, reject) => {
            const sql =
                "SELECT RM.room_no,U.second_name,U.first_name,T.tenant_name,U.jp_s_name,U.jp_f_name,U.handy_phone,GM.jp_group_name,U.gender,U.birthday,U.marks FROM ((((([Rooms$] AS R INNER JOIN [RoomsMaster$] AS RM ON R.rooms_id = RM.id) LEFT JOIN [Users$] AS U ON R.users_id = U.id) LEFT JOIN [UserStateMaster$] AS UM ON U.state = UM.id) LEFT JOIN [Tenants$] AS T ON R.tenants_id = T.id) LEFT JOIN [Groups$] AS G ON R.rooms_id = G.room_id) LEFT JOIN [Groups_Master$] AS GM ON G.group_id = GM.id";
            try {
                const res = this.execSql(sql);
                resolve(res);
            }catch(e){
                reject([]);
            }
        })
    }

    getAllOfficer() {
        return new Promise((resolve, reject) => {
            const basesql =
                //"SELECT RM.room_no,U.second_name,U.first_name,CM.contract_name,CM.marks,U.handy_phone FROM ((([Contracts$] AS C INNER JOIN [Contracts_Master$] AS CM ON C.contract = CM.id) INNER JOIN [Users$] AS U ON C.user_id = U.id) INNER JOIN [Rooms$] AS R ON C.user_id = R.users_id) INNER JOIN [RoomsMaster$] AS RM ON R.rooms_id = RM.id";
                "SELECT RM.room_no,U.second_name,U.first_name,CM.contract_name,GM.jp_group_name,CM.marks,U.handy_phone FROM ((((([Contracts$] AS C INNER JOIN [Contracts_Master$] AS CM ON C.contract = CM.id) INNER JOIN [Users$] AS U ON C.user_id = U.id) INNER JOIN [Rooms$] AS R ON C.user_id = R.users_id) INNER JOIN [RoomsMaster$] AS RM ON R.rooms_id = RM.id) INNER JOIN [Groups$] AS G ON R.room_id = G.room_id) INNER JOIN [Groups_Master$] AS GM ON G.group_id = GM.id";
            try {
                const res = this.execSql(`${basesql} ORDER BY C.id ASC;`);
                resolve(res);
            }catch(e){
                reject([]);
            }
        })
    }
}
