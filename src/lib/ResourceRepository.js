export default class ResourceRepository {
    getConfig(
        ext,
        filepath,
        hdr,
        readonly
    ) {
        if (ext === "xls") {
            return [
                `Driver={Microsoft Excel Driver (*.xls)}; DBQ=${filepath};HDR=${hdr};ReadOnly=${readonly};"`,
                `Provider=Microsoft.Jet.OLEDB.4.0;Excel 8.0;DATABASE=${filepath};HDR=${hdr};ReadOnly=${readonly};"`,
                `Provider=Microsoft.ACE.OLEDB.12.0;Data Source=${filepath};Extended Properties="Excel 8.0;HDR=${hdr};ReadOnly=${readonly};"`,
                `Provider=MSDASQL.1;Extended Properties="DBQ=${filepath};DefaultDir=C:\;Driver={Microsoft Excel Driver (*.xls)};DriverId=790;"`,
            ];
        }

        if (ext === "xlsx") {
            return [
                `Provider=Microsoft.ACE.OLEDB.12.0; Data Source=${filepath}; Extended Properties="Excel 12.0;HDR=${hdr};ReadOnly=${readonly};"`,
                `Provider=Microsoft.ACE.OLEDB.12.0; Data Source=${filepath}; Extended Properties="Excel 12.0 Xml;HDR=${hdr};ReadOnly=${readonly};"`,
                `Provider=Microsoft.ACE.OLEDB.12.0; Data Source=${filepath}; Extended Properties="Excel 12.0 Macro;HDR=${hdr};ReadOnly=${readonly};"`,
                `Provider=Microsoft.ACE.OLEDB.12.0; Data Source=${filepath}; Extended Properties="Excel 12.0;IMEX=1;HDR=${hdr};ReadOnly=${readonly};"`,
                `Provider=Microsoft.ACE.OLEDB.12.0; Data Source=${filepath}; Extended Properties="Excel 14.0;HDR=${hdr};ReadOnly=${readonly};"`,
                `Provider=Microsoft.ACE.OLEDB.12.0; Data Source=${filepath}; Extended Properties="Excel 14.0;IMEX=1;HDR=${hdr};ReadOnly=${readonly};"`,
                `Driver={Microsoft Excel Driver (*.xls, *.xlsx, *.xlsm, *.xlsb)}; DBQ=${filepath};ReadOnly=${readonly}`,
            ];
        }
        return "";
    }
}
