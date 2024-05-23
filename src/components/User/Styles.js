import { StyleSheet } from "react-native";

export default Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2BC2BC'
      },
      backgroundContainer: {
        flex: 1,
      },
      formContainer: {
        flex: 1,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: '#fff', // Màu nền cho phần dưới
        padding: 25,
        marginLeft: 5,
        marginRight: 5,
      },
      input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
      },
      buttonContainer: {
        backgroundColor: '#2BC2BC',
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
      },
      buttonText: {
        color: '#fff',
        fontWeight: 'bold',
      },
      dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
      },
      dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#ccc',
      },
      dividerText: {
        marginHorizontal: 10,
        color: '#ccc',
      },
    });