/* global ActiveXObject */
export default class ResourceConnector {
    ado = null;
    resourceConfigs = [];

    /**
     *
     * @param resourcePath
     */
    constructor(resourceConfigs) {
        this.resourceConfigs = resourceConfigs;
        this.ado = new ActiveXObject("ADODB.Connection");
    }

    /**
     *
     */
    close() {
        try {
            this.ado.Close();
        } catch (e) {
            new Error();
        }
    }

    /**
     *
     * @param filepath
     * @param readonly
     * @param hdr
     */
    open() {
        this.close(); // 再読み込み対応
        for (let config of this.resourceConfigs) {
            try {
                this.ado.Open(config);
                break;
            } catch (e) {
                new Error();
            }
        }
    }

    executeSQL(sql) {
        try {
            return this.ado.Execute(sql);
        } catch (e) {
            alert(e.message);
        }
    }

    convertToJson(rs) {
        const max = rs.Fields.Count;
        let jsonStr = '[';
        if (!rs.Eof) {
            while (!rs.Eof) {
                jsonStr += "{";
                for (let i = 0; i < max; i++) {
                    let v = String(rs.Fields(i).value).replace(
                        "null",
                        "---"
                    );
                    jsonStr += '"' + rs.Fields(i).name + '" : ';
                    if(rs.Fields(i).name === "birthday" && v !== "---"){
                        jsonStr += '"' + this.formatDate(v) + '"';
                    }else{
                        jsonStr += '"' + v + '"';
                    }
                    jsonStr += ',';
                }
                jsonStr = jsonStr.replace(/,$/g,"");
                jsonStr += "},";
                rs.MoveNext();
            }
            jsonStr = jsonStr.replace(/,$/g,"");
            jsonStr += "]";
        }
        return JSON.parse(jsonStr);
    }

    formatDate(utcDate){
        const date = new Date(utcDate);
        return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    }
}
