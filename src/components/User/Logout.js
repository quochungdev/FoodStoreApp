import { useContext } from "react"
import { Button } from "react-native"
import MyContext from "../../MyContext"
import AsyncStorage from "@react-native-async-storage/async-storage";

export default Logout = ()=>{
    const [user, dispatch] = useContext(MyContext);

    const logout = async () => {
        await AsyncStorage.removeItem('token-access');
        dispatch({
            'type': 'logout'
        })
    }

    return <Button title="Logout" onPress={logout}></Button>
}