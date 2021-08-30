import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native';
import { Table, TableWrapper, Row } from 'react-native-table-component';
import * as Colors from '../res/color';
import styles from '../res/styles/PivotTable.style';
 
class PivotTable extends Component {
  constructor(props) {
    super(props);
    this.width = 60;
    this.widthArr = []
  }
 
  render() {
    console.log(this.props.tableHead);
    if(this.props.tableHead) {
      for (let i = 0; i < this.props.tableHead.length; i += 1) {
          this.widthArr.push(this.width);
      }
    }
 
    return (
      <View style={styles.container}>
        <ScrollView horizontal={true}>
          <View style = {{width: this.width* this.props.tableHead.length}}>
            <Table borderStyle={styles.headerBorder}>
              <Row 
                data={this.props.tableHead} 
                widthArr={this.widthArr} 
                style={styles.header} 
                textStyle={styles.headerText}
            />
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={styles.bodyBorder}>
                {
                  this.props.data && this.props.data.map((rowData, index) => (
                    <Row
                      key={index}
                      data={rowData}
                      widthArr={this.widthArr}
                      style={[styles.row, index%2 && {backgroundColor: Colors.ECRU_WHITE}]}
                      textStyle={styles.text}
                    />
                  ))
                }
              </Table>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    )
  }
}
 


export default PivotTable;