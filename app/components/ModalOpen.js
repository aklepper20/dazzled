import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";
import React, { useState } from "react";

const ModalOpen = ({ post, visible, setVisible }) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.modalBackground}>
        <View style={[styles.modalContainer]}>
          <TouchableOpacity onPress={() => setVisible(false)}>
            <Text style={styles.closeButton}>X</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalOpen;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    height: 200,
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 20,
    elevation: 20,
  },
  closeButton: {
    textAlign: "right",
    fontSize: 20,
    fontWeight: "500",
  },
});
