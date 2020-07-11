import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import DataProviderFactory from "lib/DataProvider";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

const useStyles = makeStyles(styles);
const title = 'サングレース大和高田';

export default function UserTable() {
  const classes = useStyles();
  const [thead, setThead] = useState({ name: [
    '部屋番号',
    '姓',
    '名',
    '店名',
    'セイ',
    'メイ',
    '携帯',
    '組',
    '性別',
    '生年月日',
    '備考'
  ] });
  const [count, setCount] = useState(0);
  const [tdataDefault, setTdatadDefault] = useState([]);
  const [tdata, setTdata] = useState([]);
  const [searchWord, setSearchWord] = useState("");

  useEffect(() => {
    const tbody = (async () => {
      const dbPath = "C:\\db\\db.xls";
      const dp = new DataProviderFactory(dbPath);
      const result = await dp.getAllUser();

      let i = 0;

      let users = [];
      for (let row of result) {
        let userInfo = [];
        for(let name in row){
          userInfo.push(row[name]);
        }
        users.push(userInfo);
        i++;
      }
      setCount(i);
      setTdata(users);
      setTdatadDefault(users);
      return users;
    })();
  }, []);

  const onChangeSearchWord = (e) => {
    const word = e.target.value;
    let filterTdata = [];
    let i = 0;
    for(let row of tdataDefault){
      const res = row.filter(r => r.match(word));
      if(res.length > 0){
        filterTdata.push(row);
        i++;
      }
    }
    setCount(i);
    setTdata(filterTdata);
    setSearchWord(word);
  } 

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>{ title }</h4>
            <p>該当件数 { count } 件</p>
            <CustomInput
              labelText="検索"
              id="search-enabled"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                disabled: false,
                defaultValue: "test",
                value: searchWord,
                onChange: onChangeSearchWord
              }}
            />
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={thead.name}
              tableData={tdata}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}