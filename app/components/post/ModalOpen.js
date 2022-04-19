import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import React from "react";

const ModalOpen = ({ post, visible, setVisible }) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            accessible={true}
            accessibilityLabel="See Post's Likes!"
            onPress={() => setVisible(false)}
          >
            <Text style={styles.closeButton}>X</Text>
            <Text style={styles.title}>Likes</Text>
            {post.likes_by_users.length === 0 ? (
              <Text>There are no likes yet...</Text>
            ) : (
              <ScrollView style={styles.likeFeed}>
                {post.likes_by_users.map((like, index) => (
                  <Text key={index} style={styles.userLiked}>
                    {like}
                  </Text>
                ))}
              </ScrollView>
            )}
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
    width: "60%",
    height: 150,
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
  userLiked: {
    paddingVertical: 3,
    fontWeight: "400",
  },
  title: {
    textAlign: "center",
    paddingBottom: 5,
    fontSize: 18,
    fontWeight: "600",
  },
});
