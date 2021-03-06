import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput
} from "react-native";
import Modal from "react-native-modal";
import { Table, TableWrapper, Row, Cell } from "react-native-table-component";
import { MaterialIcons } from "@expo/vector-icons";

import Note from "../components/note";

export default class ExampleFour extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ordered: false,
      modalNote: false,
      valueNote: "",
      row: -1,
      tableHead: ["Dish", "Ordered", "Note", "Total", "Action"],
      tableData: [
        ["Cơm chiên", 0, "", 10, "action"],
        ["Cá kho", 0, "", 10, "action"],
        ["Canh chua", 0, "", 10, "action"],
        ["Bún", 0, "", 10, "action"]
      ]
    };
  }

  handleAction(index, type) {
    const data = this.state.tableData;
    if (type === "+" && !this.state.ordered) {
      data[index][1]++;
      this.setState({
        ordered: true,
        row: index
      });
    }
    if (type === "-" && this.state.ordered && this.state.row === index) {
      data[index][1]--;
      this.setState({
        ordered: false,
        row: -1
      });
    }
    this.setState({
      tableData: data
    });
  }

  handleNote(index) {
    if (index === this.state.row) {
      this.setState({
        modalNote: true
      });
    }
  }

  handeEnter() {
    const data = this.state.tableData;
    data[this.state.row][2] = this.state.valueNote;
    this.setState({
      tableData: data
    });

    this.setState({
      modalNote: false
    });
  }

  render() {
    const state = this.state;
    const element = (data, index) => (
      <View style={styles.action}>
        <TouchableOpacity onPress={() => this.handleAction(index, "+")}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>+</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.handleAction(index, "-")}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>-</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.handleNote(index)}>
          <View style={styles.btn}>
            <MaterialIcons style={styles.icon} name="note" color="white" />
          </View>
        </TouchableOpacity>
      </View>
    );

    return (
      <View style={styles.container}>
        <Modal isVisible={this.state.modalNote}>
          <TextInput
            multiline
            style={styles.input}
            placeholder="Note ..."
            onChangeText={val => this.setState({ valueNote: val })}
          />
          <TouchableOpacity
            onPress={() => this.handeEnter(this.state.valueNote)}
          >
            <View style={styles.button}>
              <Text>Enter</Text>
            </View>
          </TouchableOpacity>
        </Modal>

        <Table borderStyle={{ borderColor: "transparent" }}>
          <Row
            data={state.tableHead}
            style={styles.head}
            textStyle={styles.text}
          />
          {state.tableData.map((rowData, index) => (
            <TableWrapper key={index} style={styles.row}>
              {rowData.map((cellData, cellIndex) => (
                <Cell
                  key={cellIndex}
                  data={cellIndex === 4 ? element(cellData, index) : cellData}
                  textStyle={styles.text}
                />
              ))}
            </TableWrapper>
          ))}
        </Table>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: "#fff"
  },
  head: {
    height: 50,
    backgroundColor: "#808B97"
  },
  text: {
    margin: 6
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF1C1"
  },
  btn: {
    width: 20,
    height: 20,
    backgroundColor: "#78B7BB",
    borderRadius: 2,
    marginLeft: 3
  },
  btnText: {
    textAlign: "center",
    color: "#fff"
  },
  icon: {
    textAlign: "center",
    justifyContent: "center",
    marginTop: 3
  },
  action: {
    flexDirection: "row"
  },
  modal: {
    backgroundColor: "coral",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    // borderColor: "rgba(0, 0, 0, 0.1)",
    margin: 0
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    color: "white"
  },
  button: {
    backgroundColor: "lightblue",
    padding: 12,
    margin: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  }
});
