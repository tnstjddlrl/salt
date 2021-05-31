import React, { useState, useEffect, useRef } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  ImageBackground,
  Alert,
  Image,
  Animated
} from 'react-native';

const chwidth = Dimensions.get('window').width

import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios'

import client from './client'

import { Switch } from 'react-native-switch';

import messaging from '@react-native-firebase/messaging';

import AutoHeightImage from 'react-native-auto-height-image';

const alarmbtn = require('./img/alambtn.png')
const redKo = require('./img/redKo.png')


const Stack = createStackNavigator();
const App = () => {

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode={"none"}>
        <Stack.Screen name="메인스위치" component={MainSwitch} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const oceanImg = require('./img/ocean.png')

const MainSwitch = () => {
  const navigation = useNavigation()

  //스타일 
  const [circlewidth, setCirclewidth] = useState(0)

  const styles = StyleSheet.create({
    smallcontainer: {
      width: chwidth - 20, backgroundColor: 'rgba(13, 13, 13, 0.25)', flexDirection: "row", borderRadius: 10, alignItems: "center"
    },
    soltbackONOFFBTN: {
      marginLeft: 4, marginRight: 4, marginTop: 4, alignItems: "center", justifyContent: "center"
    },
    circleStateGreen: {
      flex: 1, height: circlewidth, borderRadius: circlewidth / 2, borderWidth: circlewidth / 6, borderColor: 'white', backgroundColor: '#10DC9E'
    },
    circleStateRed: {
      flex: 1, height: circlewidth, borderRadius: circlewidth / 2, borderWidth: circlewidth / 6, borderColor: 'white', backgroundColor: '#ED1C4E'
    },
  });
  //스타일 끝


  //
  const axiTest = async () => {

    await axios.get('/users')
      .then((res) => {
        console.log(res)
      }).catch((err) => {
        console.log('에러' + err)
      })
  }
  //

  function reqState() {
    try {
      client.write('$C,O,0,0')
      console.log('전송!')
    } catch (error) {
      console.log(error)
      Alert.alert('서버와 연결이 끊겼습니다.', '앱을 재부팅해주세요.')
      // client.destroy()

      // setTimeout(() => {

      //   client.connect({ port: 3600, host: '116.122.157.170' })
      //   client.write('$C,O,0,0')
      //   console.log('전송!')

      // }, 1000);
    }
  }

  function sendpp(pp) {
    try {
      client.write(pp)
      console.log(pp + ' 전송!')
    } catch (error) {
      console.log(error)
      Alert.alert('서버와 연결이 끊겼습니다.', '앱을 재부팅해주세요.')
      // client.destroy()

      // setTimeout(() => {

      //   client.connect({ port: 3600, host: '116.122.157.170' })
      //   client.write('$C,O,0,0')
      //   console.log('전송!')

      // }, 1000);
    }
  }

  const focusis = navigation.addListener('focus', () => {
    reqState()
    // setInterval(() => {
    //   reqState()
    // }, 5000);
  })
  useEffect(() => {
    return () => {
      focusis()
    }
  })

  //
  useEffect(() => {
    client.on('data', (res) => {
      var command = '' + res
      var ccmd = command.split('_')
      var tt = JSON.stringify(command)

      console.log('데이터 받기 : ' + command)
      if ('' + res == 'main_power_off') {
        setSwitchValue(false)
        Alert.alert('메인 전원이 꺼져있습니다.', '전원을 켜주세요!')
      } else if (ccmd[0] + ccmd[1] + ccmd[2] == 'saltpoweroff') {
        Alert.alert(ccmd[3] + '번 염판 꺼짐 확인')
      } else if (JSON.parse(command)[0].power == 1) {

        setSwitchValue(true)

        //알람확인
        if (JSON.parse(command)[0].state == 0) {
          setMainAlarm(false)
          console.log('알람 꺼짐 확인')
        } else if (JSON.parse(command)[0].state == 1) {
          setMainAlarm(true)
          console.log('알람 켜짐 확인')
        }

        //염판 확인
        if (JSON.parse(command)[1].power == 1) {
          setsolt1(false)
        }
        if (JSON.parse(command)[2].power == 1) {
          setsolt2(false)
        }
        if (JSON.parse(command)[3].power == 1) {
          setsolt3(false)
        }
        if (JSON.parse(command)[4].power == 1) {
          setsolt4(false)
        }
        if (JSON.parse(command)[5].power == 1) {
          setsolt5(false)
        }
        if (JSON.parse(command)[6].power == 1) {
          setsolt6(false)
        }
        if (JSON.parse(command)[7].power == 1) {
          setsolt7(false)
        }
        if (JSON.parse(command)[8].power == 1) {
          setsolt8(false)
        }
        if (JSON.parse(command)[9].power == 1) {
          setsolt9(false)
        }
        if (JSON.parse(command)[10].power == 1) {
          setsolt10(false)
        }
        if (JSON.parse(command)[11].power == 1) {
          setsolt11(false)
        }
        if (JSON.parse(command)[12].power == 1) {
          setsolt12(false)
        }
        if (JSON.parse(command)[13].power == 1) {
          setsolt13(false)
        }
        if (JSON.parse(command)[14].power == 1) {
          setsolt14(false)
        }
        if (JSON.parse(command)[15].power == 1) {
          setsolt15(false)
        }
        if (JSON.parse(command)[16].power == 1) {
          setsolt16(false)
        }
        if (JSON.parse(command)[17].power == 1) {
          setsolt17(false)
        }
        if (JSON.parse(command)[18].power == 1) {
          setsolt18(false)
        }
        if (JSON.parse(command)[19].power == 1) {
          setsolt19(false)
        }
        if (JSON.parse(command)[20].power == 1) {
          setsolt20(false)
        }

        //염판 수문 확인
        if (JSON.parse(command)[1].state.split(':')[0] == 1) {
          setsolt1_1(false)
        } else if (JSON.parse(command)[1].state.split(':')[0] == 0) {
          setsolt1_1(true)
        }
        if (JSON.parse(command)[1].state.split(':')[1] == 1) {
          setsolt1_2(false)
        } else if (JSON.parse(command)[1].state.split(':')[1] == 0) {
          setsolt1_2(true)
        }
        if (JSON.parse(command)[1].state.split(':')[2] == 1) {
          setsolt1_3(false)
        } else if (JSON.parse(command)[1].state.split(':')[2] == 0) {
          setsolt1_3(true)
        }
        if (JSON.parse(command)[1].state.split(':')[3] == 1) {
          setsolt1_4(false)
        } else if (JSON.parse(command)[1].state.split(':')[3] == 0) {
          setsolt1_4(true)
        }

        // console.log(JSON.parse(command)[2].state)

        if (JSON.parse(command)[2].state.split(':')[0] == 1) {
          setsolt2_1(false)
        } else if (JSON.parse(command)[2].state.split(':')[0] == 0) {
          setsolt2_1(true)
        }
        if (JSON.parse(command)[2].state.split(':')[1] == 1) {
          setsolt2_2(false)
        } else if (JSON.parse(command)[2].state.split(':')[1] == 0) {
          setsolt2_2(true)
        }
        if (JSON.parse(command)[2].state.split(':')[2] == 1) {
          setsolt2_3(false)
        } else if (JSON.parse(command)[2].state.split(':')[2] == 0) {
          setsolt2_3(true)
        }
        if (JSON.parse(command)[3].state.split(':')[3] == 1) {
          setsolt2_4(false)
        } else if (JSON.parse(command)[3].state.split(':')[3] == 0) {
          setsolt2_4(true)
        }

        if (JSON.parse(command)[3].state.split(':')[0] == 1) {
          setsolt3_1(false)
        } else if (JSON.parse(command)[3].state.split(':')[0] == 0) {
          setsolt3_1(true)
        }
        if (JSON.parse(command)[3].state.split(':')[1] == 1) {
          setsolt3_2(false)
        } else if (JSON.parse(command)[3].state.split(':')[1] == 0) {
          setsolt3_2(true)
        }
        if (JSON.parse(command)[3].state.split(':')[2] == 1) {
          setsolt3_3(false)
        } else if (JSON.parse(command)[3].state.split(':')[2] == 0) {
          setsolt3_3(true)
        }
        if (JSON.parse(command)[3].state.split(':')[3] == 1) {
          setsolt3_4(false)
        } else if (JSON.parse(command)[3].state.split(':')[3] == 0) {
          setsolt3_4(true)
        }

        if (JSON.parse(command)[4].state.split(':')[0] == 1) {
          setsolt4_1(false)
        } else if (JSON.parse(command)[4].state.split(':')[0] == 0) {
          setsolt4_1(true)
        }
        if (JSON.parse(command)[4].state.split(':')[1] == 1) {
          setsolt4_2(false)
        } else if (JSON.parse(command)[4].state.split(':')[1] == 0) {
          setsolt4_2(true)
        }
        if (JSON.parse(command)[4].state.split(':')[2] == 1) {
          setsolt4_3(false)
        } else if (JSON.parse(command)[4].state.split(':')[2] == 0) {
          setsolt4_3(true)
        }
        if (JSON.parse(command)[4].state.split(':')[3] == 1) {
          setsolt4_4(false)
        } else if (JSON.parse(command)[4].state.split(':')[3] == 0) {
          setsolt4_4(true)
        }

        if (JSON.parse(command)[5].state.split(':')[0] == 1) {
          setsolt5_1(false)
        } else if (JSON.parse(command)[5].state.split(':')[0] == 0) {
          setsolt5_1(true)
        }
        if (JSON.parse(command)[5].state.split(':')[1] == 1) {
          setsolt5_2(false)
        } else if (JSON.parse(command)[5].state.split(':')[1] == 0) {
          setsolt5_2(true)
        }
        if (JSON.parse(command)[5].state.split(':')[2] == 1) {
          setsolt5_3(false)
        } else if (JSON.parse(command)[5].state.split(':')[2] == 0) {
          setsolt5_3(true)
        }
        if (JSON.parse(command)[5].state.split(':')[3] == 1) {
          setsolt5_4(false)
        } else if (JSON.parse(command)[5].state.split(':')[3] == 0) {
          setsolt5_4(true)
        }

        if (JSON.parse(command)[6].state.split(':')[0] == 1) {
          setsolt6_1(false)
        } else if (JSON.parse(command)[6].state.split(':')[0] == 0) {
          setsolt6_1(true)
        }
        if (JSON.parse(command)[6].state.split(':')[1] == 1) {
          setsolt6_2(false)
        } else if (JSON.parse(command)[6].state.split(':')[1] == 0) {
          setsolt6_2(true)
        }
        if (JSON.parse(command)[6].state.split(':')[2] == 1) {
          setsolt6_3(false)
        } else if (JSON.parse(command)[6].state.split(':')[2] == 0) {
          setsolt6_3(true)
        }
        if (JSON.parse(command)[6].state.split(':')[3] == 1) {
          setsolt6_4(false)
        } else if (JSON.parse(command)[6].state.split(':')[3] == 0) {
          setsolt6_4(true)
        }

        if (JSON.parse(command)[7].state.split(':')[0] == 1) {
          setsolt7_1(false)
        } else if (JSON.parse(command)[7].state.split(':')[0] == 0) {
          setsolt7_1(true)
        }
        if (JSON.parse(command)[7].state.split(':')[1] == 1) {
          setsolt7_2(false)
        } else if (JSON.parse(command)[7].state.split(':')[1] == 0) {
          setsolt7_2(true)
        }
        if (JSON.parse(command)[7].state.split(':')[2] == 1) {
          setsolt7_3(false)
        } else if (JSON.parse(command)[7].state.split(':')[2] == 0) {
          setsolt7_3(true)
        }
        if (JSON.parse(command)[7].state.split(':')[3] == 1) {
          setsolt7_4(false)
        } else if (JSON.parse(command)[7].state.split(':')[3] == 0) {
          setsolt7_4(true)
        }

        if (JSON.parse(command)[8].state.split(':')[0] == 1) {
          setsolt8_1(false)
        } else if (JSON.parse(command)[8].state.split(':')[0] == 0) {
          setsolt8_1(true)
        }
        if (JSON.parse(command)[8].state.split(':')[1] == 1) {
          setsolt8_2(false)
        } else if (JSON.parse(command)[8].state.split(':')[1] == 0) {
          setsolt8_2(true)
        }
        if (JSON.parse(command)[8].state.split(':')[2] == 1) {
          setsolt8_3(false)
        } else if (JSON.parse(command)[8].state.split(':')[2] == 0) {
          setsolt8_3(true)
        }
        if (JSON.parse(command)[8].state.split(':')[3] == 1) {
          setsolt8_4(false)
        } else if (JSON.parse(command)[8].state.split(':')[3] == 0) {
          setsolt8_4(true)
        }

        if (JSON.parse(command)[9].state.split(':')[0] == 1) {
          setsolt9_1(false)
        } else if (JSON.parse(command)[9].state.split(':')[0] == 0) {
          setsolt9_1(true)
        }
        if (JSON.parse(command)[9].state.split(':')[1] == 1) {
          setsolt9_2(false)
        } else if (JSON.parse(command)[9].state.split(':')[1] == 0) {
          setsolt9_2(true)
        }
        if (JSON.parse(command)[9].state.split(':')[2] == 1) {
          setsolt9_3(false)
        } else if (JSON.parse(command)[9].state.split(':')[2] == 0) {
          setsolt9_3(true)
        }
        if (JSON.parse(command)[9].state.split(':')[3] == 1) {
          setsolt9_4(false)
        } else if (JSON.parse(command)[9].state.split(':')[3] == 0) {
          setsolt9_4(true)
        }

        if (JSON.parse(command)[10].state.split(':')[0] == 1) {
          setsolt10_1(false)
        } else if (JSON.parse(command)[10].state.split(':')[0] == 0) {
          setsolt10_1(true)
        }
        if (JSON.parse(command)[10].state.split(':')[1] == 1) {
          setsolt10_2(false)
        } else if (JSON.parse(command)[10].state.split(':')[1] == 0) {
          setsolt10_2(true)
        }
        if (JSON.parse(command)[10].state.split(':')[2] == 1) {
          setsolt10_3(false)
        } else if (JSON.parse(command)[10].state.split(':')[2] == 0) {
          setsolt10_3(true)
        }
        if (JSON.parse(command)[10].state.split(':')[3] == 1) {
          setsolt10_4(false)
        } else if (JSON.parse(command)[10].state.split(':')[3] == 0) {
          setsolt10_4(true)
        }

        if (JSON.parse(command)[11].state.split(':')[0] == 1) {
          setsolt11_1(false)
        } else if (JSON.parse(command)[11].state.split(':')[0] == 0) {
          setsolt11_1(true)
        }
        if (JSON.parse(command)[11].state.split(':')[1] == 1) {
          setsolt11_2(false)
        } else if (JSON.parse(command)[11].state.split(':')[1] == 0) {
          setsolt11_2(true)
        }
        if (JSON.parse(command)[11].state.split(':')[2] == 1) {
          setsolt11_3(false)
        } else if (JSON.parse(command)[11].state.split(':')[2] == 0) {
          setsolt11_3(true)
        }
        if (JSON.parse(command)[11].state.split(':')[3] == 1) {
          setsolt11_4(false)
        } else if (JSON.parse(command)[11].state.split(':')[3] == 0) {
          setsolt11_4(true)
        }

        if (JSON.parse(command)[12].state.split(':')[0] == 1) {
          setsolt12_1(false)
        } else if (JSON.parse(command)[12].state.split(':')[0] == 0) {
          setsolt12_1(true)
        }
        if (JSON.parse(command)[12].state.split(':')[1] == 1) {
          setsolt12_2(false)
        } else if (JSON.parse(command)[12].state.split(':')[1] == 0) {
          setsolt12_2(true)
        }
        if (JSON.parse(command)[12].state.split(':')[2] == 1) {
          setsolt12_3(false)
        } else if (JSON.parse(command)[12].state.split(':')[2] == 0) {
          setsolt12_3(true)
        }
        if (JSON.parse(command)[12].state.split(':')[3] == 1) {
          setsolt12_4(false)
        } else if (JSON.parse(command)[12].state.split(':')[3] == 0) {
          setsolt12_4(true)
        }

        if (JSON.parse(command)[13].state.split(':')[0] == 1) {
          setsolt13_1(false)
        } else if (JSON.parse(command)[13].state.split(':')[0] == 0) {
          setsolt13_1(true)
        }
        if (JSON.parse(command)[13].state.split(':')[1] == 1) {
          setsolt13_2(false)
        } else if (JSON.parse(command)[13].state.split(':')[1] == 0) {
          setsolt13_2(true)
        }
        if (JSON.parse(command)[13].state.split(':')[2] == 1) {
          setsolt13_3(false)
        } else if (JSON.parse(command)[13].state.split(':')[2] == 0) {
          setsolt13_3(true)
        }
        if (JSON.parse(command)[13].state.split(':')[3] == 1) {
          setsolt13_4(false)
        } else if (JSON.parse(command)[13].state.split(':')[3] == 0) {
          setsolt13_4(true)
        }

        if (JSON.parse(command)[14].state.split(':')[0] == 1) {
          setsolt14_1(false)
        } else if (JSON.parse(command)[14].state.split(':')[0] == 0) {
          setsolt14_1(true)
        }
        if (JSON.parse(command)[14].state.split(':')[1] == 1) {
          setsolt14_2(false)
        } else if (JSON.parse(command)[14].state.split(':')[1] == 0) {
          setsolt14_2(true)
        }
        if (JSON.parse(command)[14].state.split(':')[2] == 1) {
          setsolt14_3(false)
        } else if (JSON.parse(command)[14].state.split(':')[2] == 0) {
          setsolt14_3(true)
        }
        if (JSON.parse(command)[14].state.split(':')[3] == 1) {
          setsolt14_4(false)
        } else if (JSON.parse(command)[14].state.split(':')[3] == 0) {
          setsolt14_4(true)
        }

        if (JSON.parse(command)[15].state.split(':')[0] == 1) {
          setsolt15_1(false)
        } else if (JSON.parse(command)[15].state.split(':')[0] == 0) {
          setsolt15_1(true)
        }
        if (JSON.parse(command)[15].state.split(':')[1] == 1) {
          setsolt15_2(false)
        } else if (JSON.parse(command)[15].state.split(':')[1] == 0) {
          setsolt15_2(true)
        }
        if (JSON.parse(command)[15].state.split(':')[2] == 1) {
          setsolt15_3(false)
        } else if (JSON.parse(command)[15].state.split(':')[2] == 0) {
          setsolt15_3(true)
        }
        if (JSON.parse(command)[15].state.split(':')[3] == 1) {
          setsolt15_4(false)
        } else if (JSON.parse(command)[15].state.split(':')[3] == 0) {
          setsolt15_4(true)
        }

        if (JSON.parse(command)[16].state.split(':')[0] == 1) {
          setsolt16_1(false)
        } else if (JSON.parse(command)[16].state.split(':')[0] == 0) {
          setsolt16_1(true)
        }
        if (JSON.parse(command)[16].state.split(':')[1] == 1) {
          setsolt16_2(false)
        } else if (JSON.parse(command)[16].state.split(':')[1] == 0) {
          setsolt16_2(true)
        }
        if (JSON.parse(command)[16].state.split(':')[2] == 1) {
          setsolt16_3(false)
        } else if (JSON.parse(command)[16].state.split(':')[2] == 0) {
          setsolt16_3(true)
        }
        if (JSON.parse(command)[16].state.split(':')[3] == 1) {
          setsolt16_4(false)
        } else if (JSON.parse(command)[16].state.split(':')[3] == 0) {
          setsolt16_4(true)
        }

        if (JSON.parse(command)[17].state.split(':')[0] == 1) {
          setsolt17_1(false)
        } else if (JSON.parse(command)[17].state.split(':')[0] == 0) {
          setsolt17_1(true)
        }
        if (JSON.parse(command)[17].state.split(':')[1] == 1) {
          setsolt17_2(false)
        } else if (JSON.parse(command)[17].state.split(':')[1] == 0) {
          setsolt17_2(true)
        }
        if (JSON.parse(command)[17].state.split(':')[2] == 1) {
          setsolt17_3(false)
        } else if (JSON.parse(command)[17].state.split(':')[2] == 0) {
          setsolt17_3(true)
        }
        if (JSON.parse(command)[17].state.split(':')[3] == 1) {
          setsolt17_4(false)
        } else if (JSON.parse(command)[17].state.split(':')[3] == 0) {
          setsolt17_4(true)
        }

        if (JSON.parse(command)[18].state.split(':')[0] == 1) {
          setsolt18_1(false)
        } else if (JSON.parse(command)[18].state.split(':')[0] == 0) {
          setsolt18_1(true)
        }
        if (JSON.parse(command)[18].state.split(':')[1] == 1) {
          setsolt18_2(false)
        } else if (JSON.parse(command)[18].state.split(':')[1] == 0) {
          setsolt18_2(true)
        }
        if (JSON.parse(command)[18].state.split(':')[2] == 1) {
          setsolt18_3(false)
        } else if (JSON.parse(command)[18].state.split(':')[2] == 0) {
          setsolt18_3(true)
        }
        if (JSON.parse(command)[18].state.split(':')[3] == 1) {
          setsolt18_4(false)
        } else if (JSON.parse(command)[18].state.split(':')[3] == 0) {
          setsolt18_4(true)
        }

        if (JSON.parse(command)[19].state.split(':')[0] == 1) {
          setsolt19_1(false)
        } else if (JSON.parse(command)[19].state.split(':')[0] == 0) {
          setsolt19_1(true)
        }
        if (JSON.parse(command)[19].state.split(':')[1] == 1) {
          setsolt19_2(false)
        } else if (JSON.parse(command)[19].state.split(':')[1] == 0) {
          setsolt19_2(true)
        }
        if (JSON.parse(command)[19].state.split(':')[2] == 1) {
          setsolt19_3(false)
        } else if (JSON.parse(command)[19].state.split(':')[2] == 0) {
          setsolt19_3(true)
        }
        if (JSON.parse(command)[19].state.split(':')[3] == 1) {
          setsolt19_4(false)
        } else if (JSON.parse(command)[19].state.split(':')[3] == 0) {
          setsolt19_4(true)
        }


        if (JSON.parse(command)[20].state.split(':')[0] == 1) {
          setsolt20_1(false)
        } else if (JSON.parse(command)[20].state.split(':')[0] == 0) {
          setsolt20_1(true)
        }
        if (JSON.parse(command)[20].state.split(':')[1] == 1) {
          setsolt20_2(false)
        } else if (JSON.parse(command)[20].state.split(':')[1] == 0) {
          setsolt20_2(true)
        }
        if (JSON.parse(command)[20].state.split(':')[2] == 1) {
          setsolt20_3(false)
        } else if (JSON.parse(command)[20].state.split(':')[2] == 0) {
          setsolt20_3(true)
        }
        if (JSON.parse(command)[20].state.split(':')[3] == 1) {
          setsolt20_4(false)
        } else if (JSON.parse(command)[20].state.split(':')[3] == 0) {
          setsolt20_4(true)
        }







      }


      // var tt = JSON.stringify([{ type: "main", name: "main", power: "1", state: "1" }, { "type": "salt", "name": "1", "power": "1", "state": "0,0,0,0" }, { "type": "salt", "name": "2", "power": "0", "state": "0,0,0,0" }, { "type": "salt", "name": "3", "power": "0", "state": "0,0,0,0" }, { "type": "salt", "name": "4", "power": "0", "state": "0,0,0,0" }, { "type": "salt", "name": "5", "power": "0", "state": "0,0,0,0" }, { "type": "salt", "name": "6", "power": "0", "state": "0,0,0,0" }, { "type": "salt", "name": "7", "power": "0", "state": "0,0,0,0" }, { "type": "salt", "name": "8", "power": "0", "state": "0,0,0,0" }, { "type": "salt", "name": "9", "power": "0", "state": "0,0,0,0" }, { "type": "salt", "name": "10", "power": "0", "state": "0,0,0,0" }, { "type": "salt", "name": "11", "power": "0", "state": "0,0,0,0" }, { "type": "salt", "name": "12", "power": "0", "state": "0,0,0,0" }, { "type": "salt", "name": "13", "power": "0", "state": "0,0,0,0" }, { "type": "salt", "name": "14", "power": "0", "state": "0,0,0,0" }, { "type": "salt", "name": "15", "power": "0", "state": "0,0,0,0" }, { "type": "salt", "name": "16", "power": "0", "state": "0,0,0,0" }, { "type": "salt", "name": "17", "power": "0", "state": "0,0,0,0" }, { "type": "salt", "name": "18", "power": "0", "state": "0,0,0,0" }, { "type": "salt", "name": "19", "power": "0", "state": "0,0,0,0" }, { "type": "salt", "name": "20", "power": "0", "state": "0,0,0,0" }])
      // console.log(JSON.parse(command)[0])

    })


    fadin()
  }, [])



  const [switchValue, setSwitchValue] = useState(false)

  useEffect(() => {
    // Alert.alert('스위치 값 변경')
    if (switchValue == false) {
      setsolt1(true)
      setsolt2(true)
      setsolt3(true)
      setsolt4(true)
      setsolt5(true)
      setsolt6(true)
      setsolt7(true)
      setsolt8(true)
      setsolt9(true)
      setsolt10(true)
      setsolt11(true)
      setsolt12(true)
      setsolt13(true)
      setsolt14(true)
      setsolt15(true)
      setsolt16(true)
      setsolt17(true)
      setsolt18(true)
      setsolt19(true)
      setsolt20(true)
      console.log('염판 오프 확인')
    } else if (switchValue == true) {
      // reqState()
      console.log('req 확인')
    }
  }, [switchValue])


  const [offOkayW, setOffOkayW] = useState(0)
  const [offOkayH, setOffOkayH] = useState(0)

  //염판
  const [solt1, setsolt1] = useState(false)
  const [solt2, setsolt2] = useState(false)
  const [solt3, setsolt3] = useState(false)
  const [solt4, setsolt4] = useState(false)
  const [solt5, setsolt5] = useState(false)
  const [solt6, setsolt6] = useState(false)
  const [solt7, setsolt7] = useState(false)
  const [solt8, setsolt8] = useState(false)
  const [solt9, setsolt9] = useState(false)
  const [solt10, setsolt10] = useState(false)
  const [solt11, setsolt11] = useState(false)
  const [solt12, setsolt12] = useState(false)
  const [solt13, setsolt13] = useState(false)
  const [solt14, setsolt14] = useState(false)
  const [solt15, setsolt15] = useState(false)
  const [solt16, setsolt16] = useState(false)
  const [solt17, setsolt17] = useState(false)
  const [solt18, setsolt18] = useState(false)
  const [solt19, setsolt19] = useState(false)
  const [solt20, setsolt20] = useState(false)

  //염판 수문
  const [solt1_1, setsolt1_1] = useState(false)
  const [solt1_2, setsolt1_2] = useState(false)
  const [solt1_3, setsolt1_3] = useState(false)
  const [solt1_4, setsolt1_4] = useState(false)

  const [solt2_1, setsolt2_1] = useState(false)
  const [solt2_2, setsolt2_2] = useState(false)
  const [solt2_3, setsolt2_3] = useState(false)
  const [solt2_4, setsolt2_4] = useState(false)

  const [solt3_1, setsolt3_1] = useState(false)
  const [solt3_2, setsolt3_2] = useState(false)
  const [solt3_3, setsolt3_3] = useState(false)
  const [solt3_4, setsolt3_4] = useState(false)

  const [solt4_1, setsolt4_1] = useState(false)
  const [solt4_2, setsolt4_2] = useState(false)
  const [solt4_3, setsolt4_3] = useState(false)
  const [solt4_4, setsolt4_4] = useState(false)

  const [solt5_1, setsolt5_1] = useState(false)
  const [solt5_2, setsolt5_2] = useState(false)
  const [solt5_3, setsolt5_3] = useState(false)
  const [solt5_4, setsolt5_4] = useState(false)


  const [solt6_1, setsolt6_1] = useState(false)
  const [solt6_2, setsolt6_2] = useState(false)
  const [solt6_3, setsolt6_3] = useState(false)
  const [solt6_4, setsolt6_4] = useState(false)

  const [solt7_1, setsolt7_1] = useState(false)
  const [solt7_2, setsolt7_2] = useState(false)
  const [solt7_3, setsolt7_3] = useState(false)
  const [solt7_4, setsolt7_4] = useState(false)

  const [solt8_1, setsolt8_1] = useState(false)
  const [solt8_2, setsolt8_2] = useState(false)
  const [solt8_3, setsolt8_3] = useState(false)
  const [solt8_4, setsolt8_4] = useState(false)

  const [solt9_1, setsolt9_1] = useState(false)
  const [solt9_2, setsolt9_2] = useState(false)
  const [solt9_3, setsolt9_3] = useState(false)
  const [solt9_4, setsolt9_4] = useState(false)


  const [solt10_1, setsolt10_1] = useState(false)
  const [solt10_2, setsolt10_2] = useState(false)
  const [solt10_3, setsolt10_3] = useState(false)
  const [solt10_4, setsolt10_4] = useState(false)

  const [solt11_1, setsolt11_1] = useState(false)
  const [solt11_2, setsolt11_2] = useState(false)
  const [solt11_3, setsolt11_3] = useState(false)
  const [solt11_4, setsolt11_4] = useState(false)

  const [solt12_1, setsolt12_1] = useState(false)
  const [solt12_2, setsolt12_2] = useState(false)
  const [solt12_3, setsolt12_3] = useState(false)
  const [solt12_4, setsolt12_4] = useState(false)

  const [solt13_1, setsolt13_1] = useState(false)
  const [solt13_2, setsolt13_2] = useState(false)
  const [solt13_3, setsolt13_3] = useState(false)
  const [solt13_4, setsolt13_4] = useState(false)

  const [solt14_1, setsolt14_1] = useState(false)
  const [solt14_2, setsolt14_2] = useState(false)
  const [solt14_3, setsolt14_3] = useState(false)
  const [solt14_4, setsolt14_4] = useState(false)

  const [solt15_1, setsolt15_1] = useState(false)
  const [solt15_2, setsolt15_2] = useState(false)
  const [solt15_3, setsolt15_3] = useState(false)
  const [solt15_4, setsolt15_4] = useState(false)

  const [solt16_1, setsolt16_1] = useState(false)
  const [solt16_2, setsolt16_2] = useState(false)
  const [solt16_3, setsolt16_3] = useState(false)
  const [solt16_4, setsolt16_4] = useState(false)

  const [solt17_1, setsolt17_1] = useState(false)
  const [solt17_2, setsolt17_2] = useState(false)
  const [solt17_3, setsolt17_3] = useState(false)
  const [solt17_4, setsolt17_4] = useState(false)

  const [solt18_1, setsolt18_1] = useState(false)
  const [solt18_2, setsolt18_2] = useState(false)
  const [solt18_3, setsolt18_3] = useState(false)
  const [solt18_4, setsolt18_4] = useState(false)

  const [solt19_1, setsolt19_1] = useState(false)
  const [solt19_2, setsolt19_2] = useState(false)
  const [solt19_3, setsolt19_3] = useState(false)
  const [solt19_4, setsolt19_4] = useState(false)

  const [solt20_1, setsolt20_1] = useState(false)
  const [solt20_2, setsolt20_2] = useState(false)
  const [solt20_3, setsolt20_3] = useState(false)
  const [solt20_4, setsolt20_4] = useState(false)



  const [mainAlarm, setMainAlarm] = useState(false)

  /// 애니메이션 속성

  const fadeAnim = useRef(new Animated.Value(0)).current

  function fadin() {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }
    ).start();

    setTimeout(() => {
      fadout()
    }, 1100);
  }

  function fadout() {
    Animated.timing(
      fadeAnim,
      {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true
      }
    ).start();

    setTimeout(() => {
      fadin()
    }, 1100);
  }

  ///


  return (
    <SafeAreaView style={{ backgroundColor: 'white' }}>
      <View style={{ width: chwidth, height: '100%', backgroundColor: 'white' }}>
        <ImageBackground source={oceanImg} style={{ width: '100%', height: '100%' }}>

          {/* 헤더 */}
          <View style={{ marginTop: 20, marginLeft: 15, marginBottom: 20, width: chwidth - 25, flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
              <View style={{ width: 15, height: 5, backgroundColor: 'red', marginBottom: 5 }}></View>
              <TouchableWithoutFeedback onPress={() => { if (mainAlarm == false) setMainAlarm(true); else setMainAlarm(false) }}>
                <Text style={{ color: 'white', fontSize: 25, fontFamily: 'Arita-buriB' }}>염전</Text>
              </TouchableWithoutFeedback>
              <Text style={{ color: 'white', fontSize: 25, fontFamily: 'Arita-buriB' }}>스마트 ON, OFF</Text>
            </View>

            <View style={{ marginTop: '5%' }}>
              <Switch
                value={switchValue}
                onValueChange={(val) => {
                  if (val == true) {
                    console.log('메인 트ㄹ루')
                    client.write('$P,O,1,0')

                    setTimeout(() => {
                      reqState()

                    }, 1000);
                  } else if (val == false) {
                    console.log('메인 폴스')
                    client.write('$P,O,0,0')

                  }
                  setSwitchValue(val)
                }}
                disabled={false}
                activeText={'On'}
                inActiveText={'Off'}
                circleSize={40}
                barHeight={55}
                circleBorderWidth={0}
                backgroundActive={'rgb(23,223,162)'}
                backgroundInactive={'red'}
                circleActiveColor={'white'}
                circleInActiveColor={'white'}
                changeValueImmediately={true}
                innerCircleStyle={{ alignItems: "center", justifyContent: "space-between" }}
                outerCircleStyle={{}}
                renderActiveText={true}
                renderInActiveText={true}
                switchLeftPx={5}
                switchRightPx={5}
                switchWidthMultiplier={2.5}
                switchBorderRadius={30}
              />
            </View>
          </View>
          {/* 헤더 끝 */}


          {/* 상태알람  */}
          {
            mainAlarm &&

            <View style={{ marginLeft: 10, width: chwidth - 20, backgroundColor: 'white', borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 15 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <AutoHeightImage source={alarmbtn} width={40} style={{ margin: 10 }}></AutoHeightImage>
                <Text style={{ fontWeight: 'bold' }}>상태 알람</Text>
                <Animated.View style={{ opacity: fadeAnim }}>
                  <AutoHeightImage source={redKo} width={40}></AutoHeightImage>
                </Animated.View>
              </View>
              <TouchableWithoutFeedback onPress={() => {
                console.log('확인')
                client.write('$E,O,0,0')
                setTimeout(() => {
                  reqState()
                }, 1000);
                setMainAlarm(false)
              }}>
                <View style={{ width: 70, borderRadius: 8, backgroundColor: 'rgb(221,221,221)', alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
                  <Text style={{ margin: 7 }}>확인</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>

          }
          {/* 상태알람 끝  */}

          <ScrollView style={{ marginLeft: 10 }} showsVerticalScrollIndicator={false}>

            {/* 염판 1 */}
            <View onLayout={(data) => { setOffOkayH(data.nativeEvent.layout.height), setOffOkayW(data.nativeEvent.layout.width) }} style={styles.smallcontainer}>

              <TouchableWithoutFeedback onPress={() => {
                setsolt1(true)
                try {
                  client.write('$S,O,1,1')
                  console.log('염판 1 전송')
                } catch (error) {
                  Alert.alert('서버와 연결이 끊겼습니다.', '앱을 종료 후 다시 실행해주세요.')

                }
              }}>
                <View style={{ justifyContent: "center", alignItems: "center", marginTop: 15, marginBottom: 15, marginLeft: 5 }}>
                  <View style={{ justifyContent: "center", alignItems: "center", margin: 5, marginLeft: 15, marginRight: 15 }}>
                    <Text style={{ color: 'white', fontSize: 20 }}>염판 1  </Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>

              <View style={{ flex: 0.3 }}></View>

              <View style={{ flexDirection: 'row', flex: 2 }}>
                {solt1_1 ?
                  <View onLayout={(data) => { setCirclewidth(data.nativeEvent.layout.width) }} style={styles.circleStateGreen}></View> :
                  <View onLayout={(data) => { setCirclewidth(data.nativeEvent.layout.width) }} style={styles.circleStateRed}></View>
                }
                <View style={{ flex: 1 }}></View>
                {solt1_2 ?
                  <View style={styles.circleStateGreen}></View> :
                  <View style={styles.circleStateRed}></View>
                }
                <View style={{ flex: 1 }}></View>
                {solt1_3 ?
                  <View style={styles.circleStateGreen}></View> :
                  <View style={styles.circleStateRed}></View>
                }
                <View style={{ flex: 1 }}></View>
                {solt1_4 ?
                  <View style={styles.circleStateGreen}></View> :
                  <View style={styles.circleStateRed}></View>
                }
              </View>

              <View style={{ flex: 0.3 }}></View>

              {solt1 && <View style={{ width: offOkayW, height: offOkayH, position: 'absolute', backgroundColor: 'rgba(13, 13, 13, 0.6)', borderRadius: 10 }}>
                <TouchableWithoutFeedback onPress={() => {
                  if (switchValue == true) {
                    setsolt1(false)
                    try {
                      client.write('$S,O,1,0')
                      console.log('염판 1 전송')
                    } catch (error) {
                      Alert.alert('서버와 연결이 끊겼습니다.', '앱을 종료 후 다시 실행해주세요.')
                    }
                  } else {
                    Alert.alert('먼저 스위치를 켜주세요')
                  }

                }}>
                  <View style={{ width: offOkayW, height: offOkayH }}></View>
                </TouchableWithoutFeedback>
              </View>}

            </View>
            {/* 염판 1 */}

            <View style={{ height: 10 }}></View>

            {/* 염판 2 */}
            <View style={styles.smallcontainer}>

              <TouchableWithoutFeedback onPress={() => {
                setsolt2(true)
                try {
                  client.write('$S,O,2,1')
                  console.log('염판 2 전송')
                } catch (error) {
                  Alert.alert('서버와 연결이 끊겼습니다.', '앱을 종료 후 다시 실행해주세요.')
                }
              }}>
                <View style={{ justifyContent: "center", alignItems: "center", marginTop: 15, marginBottom: 15, marginLeft: 5 }}>
                  <View style={{ justifyContent: "center", alignItems: "center", margin: 5, marginLeft: 15, marginRight: 15 }}>
                    <Text style={{ color: 'white', fontSize: 20 }}>염판 2  </Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>

              <View style={{ flex: 0.3 }}></View>

              <View style={{ flexDirection: 'row', flex: 2 }}>
                {solt2_1 ?
                  <View style={styles.circleStateGreen}></View> :
                  <View style={styles.circleStateRed}></View>
                }
                <View style={{ flex: 1 }}></View>
                {solt2_2 ?
                  <View style={styles.circleStateGreen}></View> :
                  <View style={styles.circleStateRed}></View>
                }
                <View style={{ flex: 1 }}></View>
                {solt2_3 ?
                  <View style={styles.circleStateGreen}></View> :
                  <View style={styles.circleStateRed}></View>
                }
                <View style={{ flex: 1 }}></View>
                {solt2_4 ?
                  <View style={styles.circleStateGreen}></View> :
                  <View style={styles.circleStateRed}></View>
                }
              </View>

              <View style={{ flex: 0.3 }}></View>

              {solt2 && <View style={{ width: offOkayW, height: offOkayH, position: 'absolute', backgroundColor: 'rgba(13, 13, 13, 0.6)', borderRadius: 10 }}>
                <TouchableWithoutFeedback onPress={() => {
                  if (switchValue == true) {
                    setsolt2(false)
                    try {
                      client.write('$S,O,2,0')
                      console.log('염판 2 전송')
                    } catch (error) {
                      Alert.alert('서버와 연결이 끊겼습니다.', '앱을 종료 후 다시 실행해주세요.')
                    }
                  } else {
                    Alert.alert('먼저 스위치를 켜주세요')
                  }

                }}>
                  <View style={{ width: offOkayW, height: offOkayH }}></View>
                </TouchableWithoutFeedback>
              </View>}
            </View>
            {/* 염판 2 */}

            <View style={{ height: 10 }}></View>

            {/* 염판 3 */}
            <View style={styles.smallcontainer}>

              <TouchableWithoutFeedback onPress={() => {
                setsolt3(true)
                try {
                  client.write('$S,O,3,1')
                  console.log('염판 3 전송')
                } catch (error) {
                  Alert.alert('서버와 연결이 끊겼습니다.', '앱을 종료 후 다시 실행해주세요.')
                }
              }}>
                <View style={{ justifyContent: "center", alignItems: "center", marginTop: 15, marginBottom: 15, marginLeft: 5 }}>
                  <View style={{ justifyContent: "center", alignItems: "center", margin: 5, marginLeft: 15, marginRight: 15 }}>
                    <Text style={{ color: 'white', fontSize: 20 }}>염판 3  </Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>

              <View style={{ flex: 0.3 }}></View>

              <View style={{ flexDirection: 'row', flex: 2 }}>
                {solt3_1 ?
                  <View style={styles.circleStateGreen}></View> :
                  <View style={styles.circleStateRed}></View>
                }
                <View style={{ flex: 1 }}></View>
                {solt3_2 ?
                  <View style={styles.circleStateGreen}></View> :
                  <View style={styles.circleStateRed}></View>
                }
                <View style={{ flex: 1 }}></View>
                {solt3_3 ?
                  <View style={styles.circleStateGreen}></View> :
                  <View style={styles.circleStateRed}></View>
                }
                <View style={{ flex: 1 }}></View>
                {solt3_4 ?
                  <View style={styles.circleStateGreen}></View> :
                  <View style={styles.circleStateRed}></View>
                }
              </View>

              <View style={{ flex: 0.3 }}></View>

              {solt3 && <View style={{ width: offOkayW, height: offOkayH, position: 'absolute', backgroundColor: 'rgba(13, 13, 13, 0.6)', borderRadius: 10 }}>
                <TouchableWithoutFeedback onPress={() => {
                  if (switchValue == true) {
                    setsolt3(false)
                    try {
                      client.write('$S,O,3,0')
                      console.log('염판 3 전송')
                    } catch (error) {
                      Alert.alert('서버와 연결이 끊겼습니다.', '앱을 종료 후 다시 실행해주세요.')
                    }
                  } else {
                    Alert.alert('먼저 스위치를 켜주세요')
                  }

                }}>
                  <View style={{ width: offOkayW, height: offOkayH }}></View>
                </TouchableWithoutFeedback>
              </View>}
            </View>
            {/* 염판 3 */}

            <View style={{ height: 10 }}></View>

            {/* 염판 4 */}
            <View style={styles.smallcontainer}>

              <TouchableWithoutFeedback onPress={() => {
                setsolt4(true)
                try {
                  client.write('$S,O,4,1')
                  console.log('염판 4 전송')
                } catch (error) {
                  Alert.alert('서버와 연결이 끊겼습니다.', '앱을 종료 후 다시 실행해주세요.')
                }
              }}>
                <View style={{ justifyContent: "center", alignItems: "center", marginTop: 15, marginBottom: 15, marginLeft: 5 }}>
                  <View style={{ justifyContent: "center", alignItems: "center", margin: 5, marginLeft: 15, marginRight: 15 }}>
                    <Text style={{ color: 'white', fontSize: 20 }}>염판 4  </Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>

              <View style={{ flex: 0.3 }}></View>

              <View style={{ flexDirection: 'row', flex: 2 }}>
                {solt4_1 ?
                  <View style={styles.circleStateGreen}></View> :
                  <View style={styles.circleStateRed}></View>
                }
                <View style={{ flex: 1 }}></View>
                {solt4_2 ?
                  <View style={styles.circleStateGreen}></View> :
                  <View style={styles.circleStateRed}></View>
                }
                <View style={{ flex: 1 }}></View>
                {solt4_3 ?
                  <View style={styles.circleStateGreen}></View> :
                  <View style={styles.circleStateRed}></View>
                }
                <View style={{ flex: 1 }}></View>
                {solt4_4 ?
                  <View style={styles.circleStateGreen}></View> :
                  <View style={styles.circleStateRed}></View>
                }
              </View>

              <View style={{ flex: 0.3 }}></View>

              {solt4 && <View style={{ width: offOkayW, height: offOkayH, position: 'absolute', backgroundColor: 'rgba(13, 13, 13, 0.6)', borderRadius: 10 }}>
                <TouchableWithoutFeedback onPress={() => {
                  if (switchValue == true) {
                    setsolt4(false)
                    try {
                      client.write('$S,O,4,0')
                      console.log('염판 4 전송')
                    } catch (error) {
                      Alert.alert('서버와 연결이 끊겼습니다.', '앱을 종료 후 다시 실행해주세요.')
                    }
                  } else {
                    Alert.alert('먼저 스위치를 켜주세요')
                  }

                }}>
                  <View style={{ width: offOkayW, height: offOkayH }}></View>
                </TouchableWithoutFeedback>
              </View>}
            </View>
            {/* 염판 4 */}

            <View style={{ height: 10 }}></View>

            {/* 염판 5 */}
            <View style={styles.smallcontainer}>

              <TouchableWithoutFeedback onPress={() => {
                setsolt5(true)
                try {
                  client.write('$S,O,5,1')
                  console.log('염판 1 전송')
                } catch (error) {
                  Alert.alert('서버와 연결이 끊겼습니다.', '앱을 종료 후 다시 실행해주세요.')
                }
              }}>
                <View style={{ justifyContent: "center", alignItems: "center", marginTop: 15, marginBottom: 15, marginLeft: 5 }}>
                  <View style={{ justifyContent: "center", alignItems: "center", margin: 5, marginLeft: 15, marginRight: 15 }}>
                    <Text style={{ color: 'white', fontSize: 20 }}>염판 5  </Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>

              <View style={{ flex: 0.3 }}></View>

              <View style={{ flexDirection: 'row', flex: 2 }}>
                {solt5_1 ?
                  <View style={styles.circleStateGreen}></View> :
                  <View style={styles.circleStateRed}></View>
                }
                <View style={{ flex: 1 }}></View>
                {solt5_2 ?
                  <View style={styles.circleStateGreen}></View> :
                  <View style={styles.circleStateRed}></View>
                }
                <View style={{ flex: 1 }}></View>
                {solt5_3 ?
                  <View style={styles.circleStateGreen}></View> :
                  <View style={styles.circleStateRed}></View>
                }
                <View style={{ flex: 1 }}></View>
                {solt5_4 ?
                  <View style={styles.circleStateGreen}></View> :
                  <View style={styles.circleStateRed}></View>
                }
              </View>

              <View style={{ flex: 0.3 }}></View>

              {solt5 && <View style={{ width: offOkayW, height: offOkayH, position: 'absolute', backgroundColor: 'rgba(13, 13, 13, 0.6)', borderRadius: 10 }}>
                <TouchableWithoutFeedback onPress={() => {
                  if (switchValue == true) {
                    setsolt5(false)
                    try {
                      client.write('$S,O,5,0')
                      console.log('염판 5 전송')
                    } catch (error) {
                      Alert.alert('서버와 연결이 끊겼습니다.', '앱을 종료 후 다시 실행해주세요.')
                    }
                  } else {
                    Alert.alert('먼저 스위치를 켜주세요')
                  }

                }}>
                  <View style={{ width: offOkayW, height: offOkayH }}></View>
                </TouchableWithoutFeedback>
              </View>}
            </View>
            {/* 염판 5 */}

            <View style={{ height: 10 }}></View>

            {/* 염판 6 */}
            <View style={styles.smallcontainer}>

              <TouchableWithoutFeedback onPress={() => {
                setsolt6(true)
                try {
                  client.write('$S,O,6,1')
                  console.log('염판 6 전송')
                } catch (error) {
                  Alert.alert('서버와 연결이 끊겼습니다.', '앱을 종료 후 다시 실행해주세요.')
                }
              }}>
                <View style={{ justifyContent: "center", alignItems: "center", marginTop: 15, marginBottom: 15, marginLeft: 5 }}>
                  <View style={{ justifyContent: "center", alignItems: "center", margin: 5, marginLeft: 15, marginRight: 15 }}>
                    <Text style={{ color: 'white', fontSize: 20 }}>염판 6  </Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>

              <View style={{ flex: 0.3 }}></View>

              <View style={{ flexDirection: 'row', flex: 2 }}>
                {solt6_1 ?
                  <View style={styles.circleStateGreen}></View> :
                  <View style={styles.circleStateRed}></View>
                }
                <View style={{ flex: 1 }}></View>
                {solt6_2 ?
                  <View style={styles.circleStateGreen}></View> :
                  <View style={styles.circleStateRed}></View>
                }
                <View style={{ flex: 1 }}></View>
                {solt6_3 ?
                  <View style={styles.circleStateGreen}></View> :
                  <View style={styles.circleStateRed}></View>
                }
                <View style={{ flex: 1 }}></View>
                {solt6_4 ?
                  <View style={styles.circleStateGreen}></View> :
                  <View style={styles.circleStateRed}></View>
                }
              </View>

              <View style={{ flex: 0.3 }}></View>

              {solt6 && <View style={{ width: offOkayW, height: offOkayH, position: 'absolute', backgroundColor: 'rgba(13, 13, 13, 0.6)', borderRadius: 10 }}>
                <TouchableWithoutFeedback onPress={() => {
                  if (switchValue == true) {
                    setsolt6(false)
                    try {
                      client.write('$S,O,6,0')
                      console.log('염판 6 전송')
                    } catch (error) {
                      Alert.alert('서버와 연결이 끊겼습니다.', '앱을 종료 후 다시 실행해주세요.')
                    }
                  } else {
                    Alert.alert('먼저 스위치를 켜주세요')
                  }

                }}>
                  <View style={{ width: offOkayW, height: offOkayH }}></View>
                </TouchableWithoutFeedback>
              </View>}
            </View>
            {/* 염판 6 */}

            <View style={{ height: 10 }}></View>

            {/* 염판 7 */}
            <View style={styles.smallcontainer}>

              <TouchableWithoutFeedback onPress={() => {
                setsolt7(true)
                try {
                  client.write('$S,O,1,1')
                  console.log('염판 7 전송')
                } catch (error) {
                  Alert.alert('서버와 연결이 끊겼습니다.', '앱을 종료 후 다시 실행해주세요.')
                }
              }}>
                <View style={{ justifyContent: "center", alignItems: "center", marginTop: 15, marginBottom: 15, marginLeft: 5 }}>
                  <View style={{ justifyContent: "center", alignItems: "center", margin: 5, marginLeft: 15, marginRight: 15 }}>
                    <Text style={{ color: 'white', fontSize: 20 }}>염판 7  </Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>

              <View style={{ flex: 0.3 }}></View>

              <View style={{ flexDirection: 'row', flex: 2 }}>
                {solt7_1 ?
                  <View style={styles.circleStateGreen}></View> :
                  <View style={styles.circleStateRed}></View>
                }
                <View style={{ flex: 1 }}></View>
                {solt7_2 ?
                  <View style={styles.circleStateGreen}></View> :
                  <View style={styles.circleStateRed}></View>
                }
                <View style={{ flex: 1 }}></View>
                {solt7_3 ?
                  <View style={styles.circleStateGreen}></View> :
                  <View style={styles.circleStateRed}></View>
                }
                <View style={{ flex: 1 }}></View>
                {solt7_4 ?
                  <View style={styles.circleStateGreen}></View> :
                  <View style={styles.circleStateRed}></View>
                }
              </View>

              <View style={{ flex: 0.3 }}></View>

              {solt7 && <View style={{ width: offOkayW, height: offOkayH, position: 'absolute', backgroundColor: 'rgba(13, 13, 13, 0.6)', borderRadius: 10 }}>
                <TouchableWithoutFeedback onPress={() => {
                  if (switchValue == true) {
                    setsolt7(false)
                    try {
                      client.write('$S,O,7,0')
                      console.log('염판 7 전송')
                    } catch (error) {
                      Alert.alert('서버와 연결이 끊겼습니다.', '앱을 종료 후 다시 실행해주세요.')
                    }
                  } else {
                    Alert.alert('먼저 스위치를 켜주세요')
                  }

                }}>
                  <View style={{ width: offOkayW, height: offOkayH }}></View>
                </TouchableWithoutFeedback>
              </View>}
            </View>
            {/* 염판 7 */}

            <View style={{ height: 10 }}></View>

            {/* 염판 8 */}
            <View style={styles.smallcontainer}>

              <TouchableWithoutFeedback onPress={() => {
                setsolt8(true)
                try {
                  client.write('$S,O,8,1')
                  console.log('염판 8 전송')
                } catch (error) {
                  Alert.alert('서버와 연결이 끊겼습니다.', '앱을 종료 후 다시 실행해주세요.')
                }
              }}>
                <View style={{ justifyContent: "center", alignItems: "center", marginTop: 15, marginBottom: 15, marginLeft: 5 }}>
                  <View style={{ justifyContent: "center", alignItems: "center", margin: 5, marginLeft: 15, marginRight: 15 }}>
                    <Text style={{ color: 'white', fontSize: 20 }}>염판 8  </Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>

              <View style={{ flex: 0.3 }}></View>

              <View style={{ flexDirection: 'row', flex: 2 }}>
                {solt8_1 ?
                  <View style={styles.circleStateGreen}></View> :
                  <View style={styles.circleStateRed}></View>
                }
                <View style={{ flex: 1 }}></View>
                {solt8_2 ?
                  <View style={styles.circleStateGreen}></View> :
                  <View style={styles.circleStateRed}></View>
                }
                <View style={{ flex: 1 }}></View>
                {solt8_3 ?
                  <View style={styles.circleStateGreen}></View> :
                  <View style={styles.circleStateRed}></View>
                }
                <View style={{ flex: 1 }}></View>
                {solt8_4 ?
                  <View style={styles.circleStateGreen}></View> :
                  <View style={styles.circleStateRed}></View>
                }
              </View>

              <View style={{ flex: 0.3 }}></View>

              {solt8 && <View style={{ width: offOkayW, height: offOkayH, position: 'absolute', backgroundColor: 'rgba(13, 13, 13, 0.6)', borderRadius: 10 }}>
                <TouchableWithoutFeedback onPress={() => {
                  if (switchValue == true) {
                    setsolt8(false)
                    try {
                      client.write('$S,O,8,0')
                      console.log('염판 8 전송')
                    } catch (error) {
                      Alert.alert('서버와 연결이 끊겼습니다.', '앱을 종료 후 다시 실행해주세요.')
                    }
                  } else {
                    Alert.alert('먼저 스위치를 켜주세요')
                  }

                }}>
                  <View style={{ width: offOkayW, height: offOkayH }}></View>
                </TouchableWithoutFeedback>
              </View>}
            </View>
            {/* 염판 8 */}

            <View style={{ height: 10 }}></View>

            {/* 염판 9 */}
            <View style={styles.smallcontainer}>

              <TouchableWithoutFeedback onPress={() => {
                setsolt9(true)
                try {
                  client.write('$S,O,9,1')
                  console.log('염판 9 전송')
                } catch (error) {
                  Alert.alert('서버와 연결이 끊겼습니다.', '앱을 종료 후 다시 실행해주세요.')
                }
              }}>
                <View style={{ justifyContent: "center", alignItems: "center", marginTop: 15, marginBottom: 15, marginLeft: 5 }}>
                  <View style={{ justifyContent: "center", alignItems: "center", margin: 5, marginLeft: 15, marginRight: 15 }}>
                    <Text style={{ color: 'white', fontSize: 20 }}>염판 9  </Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>

              <View style={{ flex: 0.3 }}></View>

              <View style={{ flexDirection: 'row', flex: 2 }}>
                {solt9_1 ?
                  <View style={styles.circleStateGreen}></View> :
                  <View style={styles.circleStateRed}></View>
                }
                <View style={{ flex: 1 }}></View>
                {solt9_2 ?
                  <View style={styles.circleStateGreen}></View> :
                  <View style={styles.circleStateRed}></View>
                }
                <View style={{ flex: 1 }}></View>
                {solt9_3 ?
                  <View style={styles.circleStateGreen}></View> :
                  <View style={styles.circleStateRed}></View>
                }
                <View style={{ flex: 1 }}></View>
                {solt9_4 ?
                  <View style={styles.circleStateGreen}></View> :
                  <View style={styles.circleStateRed}></View>
                }
              </View>

              <View style={{ flex: 0.3 }}></View>

              {solt9 && <View style={{ width: offOkayW, height: offOkayH, position: 'absolute', backgroundColor: 'rgba(13, 13, 13, 0.6)', borderRadius: 10 }}>
                <TouchableWithoutFeedback onPress={() => {
                  if (switchValue == true) {
                    setsolt9(false)
                    try {
                      client.write('$S,O,9,0')
                      console.log('염판 9 전송')
                    } catch (error) {
                      Alert.alert('서버와 연결이 끊겼습니다.', '앱을 종료 후 다시 실행해주세요.')
                    }
                  } else {
                    Alert.alert('먼저 스위치를 켜주세요')
                  }

                }}>
                  <View style={{ width: offOkayW, height: offOkayH }}></View>
                </TouchableWithoutFeedback>
              </View>}
            </View>
            {/* 염판 9 */}

            <View style={{ height: 10 }}></View>

            {/* 염판 10 */}
            <View style={styles.smallcontainer}>

              <TouchableWithoutFeedback onPress={() => {
                setsolt10(true)
                try {
                  client.write('$S,O,10,1')
                  console.log('염판 10 전송')
                } catch (error) {
                  Alert.alert('서버와 연결이 끊겼습니다.', '앱을 종료 후 다시 실행해주세요.')
                }
              }}>
                <View style={{ justifyContent: "center", alignItems: "center", marginTop: 15, marginBottom: 15, marginLeft: 5 }}>
                  <View style={{ justifyContent: "center", alignItems: "center", margin: 5, marginLeft: 15, marginRight: 15 }}>
                    <Text style={{ color: 'white', fontSize: 20 }}>염판 10</Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>

              <View style={{ flex: 0.3 }}></View>

              <View style={{ flexDirection: 'row', flex: 2 }}>
                {solt10_1 ?
                  <View style={styles.circleStateGreen}></View> :
                  <View style={styles.circleStateRed}></View>
                }
                <View style={{ flex: 1 }}></View>
                {solt10_2 ?
                  <View style={styles.circleStateGreen}></View> :
                  <View style={styles.circleStateRed}></View>
                }
                <View style={{ flex: 1 }}></View>
                {solt10_3 ?
                  <View style={styles.circleStateGreen}></View> :
                  <View style={styles.circleStateRed}></View>
                }
                <View style={{ flex: 1 }}></View>
                {solt10_4 ?
                  <View style={styles.circleStateGreen}></View> :
                  <View style={styles.circleStateRed}></View>
                }
              </View>

              <View style={{ flex: 0.3 }}></View>

              {solt10 && <View style={{ width: offOkayW, height: offOkayH, position: 'absolute', backgroundColor: 'rgba(13, 13, 13, 0.6)', borderRadius: 10 }}>
                <TouchableWithoutFeedback onPress={() => {
                  if (switchValue == true) {
                    setsolt1(false)
                    try {
                      client.write('$S,O,10,0')
                      console.log('염판 10 전송')
                    } catch (error) {
                      Alert.alert('서버와 연결이 끊겼습니다.', '앱을 종료 후 다시 실행해주세요.')
                    }
                  } else {
                    Alert.alert('먼저 스위치를 켜주세요')
                  }

                }}>
                  <View style={{ width: offOkayW, height: offOkayH }}></View>
                </TouchableWithoutFeedback>
              </View>}
            </View>
            {/* 염판 10 */}

            <View style={{ height: 10 }}></View>

            {/* 염판 11 */}
            <View style={styles.smallcontainer}>

              <TouchableWithoutFeedback onPress={() => {
                setsolt11(true)
                try {
                  client.write('$S,O,11,1')
                  console.log('염판 11 전송')
                } catch (error) {
                  Alert.alert('서버와 연결이 끊겼습니다.', '앱을 종료 후 다시 실행해주세요.')
                }
              }}>
                <View style={{ justifyContent: "center", alignItems: "center", marginTop: 15, marginBottom: 15, marginLeft: 5 }}>
                  <View style={{ justifyContent: "center", alignItems: "center", margin: 5, marginLeft: 15, marginRight: 15 }}>
                    <Text style={{ color: 'white', fontSize: 20 }}>염판 11</Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>

              <View style={{ flex: 0.3 }}></View>

              <View style={{ flexDirection: 'row', flex: 2 }}>
                {solt11_1 ?
                  <View style={styles.circleStateGreen}></View> :
                  <View style={styles.circleStateRed}></View>
                }
                <View style={{ flex: 1 }}></View>
                {solt11_2 ?
                  <View style={styles.circleStateGreen}></View> :
                  <View style={styles.circleStateRed}></View>
                }
                <View style={{ flex: 1 }}></View>
                {solt11_3 ?
                  <View style={styles.circleStateGreen}></View> :
                  <View style={styles.circleStateRed}></View>
                }
                <View style={{ flex: 1 }}></View>
                {solt11_4 ?
                  <View style={styles.circleStateGreen}></View> :
                  <View style={styles.circleStateRed}></View>
                }
              </View>

              <View style={{ flex: 0.3 }}></View>

              {solt11 && <View style={{ width: offOkayW, height: offOkayH, position: 'absolute', backgroundColor: 'rgba(13, 13, 13, 0.6)', borderRadius: 10 }}>
                <TouchableWithoutFeedback onPress={() => {
                  if (switchValue == true) {
                    setsolt11(false)
                    try {
                      client.write('$S,O,11,0')
                      console.log('염판 11 전송')
                    } catch (error) {
                      Alert.alert('서버와 연결이 끊겼습니다.', '앱을 종료 후 다시 실행해주세요.')
                    }
                  } else {
                    Alert.alert('먼저 스위치를 켜주세요')
                  }

                }}>
                  <View style={{ width: offOkayW, height: offOkayH }}></View>
                </TouchableWithoutFeedback>
              </View>}
            </View>
            {/* 염판 11 */}

            <View style={{ height: 10 }}></View>

            {/* 염판 12 */}
            <View style={styles.smallcontainer}>

              <TouchableWithoutFeedback onPress={() => {
                setsolt12(true)
                try {
                  client.write('$S,O,12,1')
                  console.log('염판 12 전송')
                } catch (error) {
                  Alert.alert('서버와 연결이 끊겼습니다.', '앱을 종료 후 다시 실행해주세요.')
                }
              }}>
                <View style={{ justifyContent: "center", alignItems: "center", marginTop: 15, marginBottom: 15, marginLeft: 5 }}>
                  <View style={{ justifyContent: "center", alignItems: "center", margin: 5, marginLeft: 15, marginRight: 15 }}>
                    <Text style={{ color: 'white', fontSize: 20 }}>염판 12</Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>

              <View style={{ flex: 0.3 }}></View>

              <View style={{ flexDirection: 'row', flex: 2 }}>
                {solt12_1 ?
                  <View style={styles.circleStateGreen}></View> :
                  <View style={styles.circleStateRed}></View>
                }
                <View style={{ flex: 1 }}></View>
                {solt12_2 ?
                  <View style={styles.circleStateGreen}></View> :
                  <View style={styles.circleStateRed}></View>
                }
                <View style={{ flex: 1 }}></View>
                {solt12_3 ?
                  <View style={styles.circleStateGreen}></View> :
                  <View style={styles.circleStateRed}></View>
                }
                <View style={{ flex: 1 }}></View>
                {solt12_4 ?
                  <View style={styles.circleStateGreen}></View> :
                  <View style={styles.circleStateRed}></View>
                }
              </View>

              <View style={{ flex: 0.3 }}></View>

              {solt12 && <View style={{ width: offOkayW, height: offOkayH, position: 'absolute', backgroundColor: 'rgba(13, 13, 13, 0.6)', borderRadius: 10 }}>
                <TouchableWithoutFeedback onPress={() => {
                  if (switchValue == true) {
                    setsolt12(false)
                    try {
                      client.write('$S,O,12,0')
                      console.log('염판 12 전송')
                    } catch (error) {
                      Alert.alert('서버와 연결이 끊겼습니다.', '앱을 종료 후 다시 실행해주세요.')
                    }
                  } else {
                    Alert.alert('먼저 스위치를 켜주세요')
                  }

                }}>
                  <View style={{ width: offOkayW, height: offOkayH }}></View>
                </TouchableWithoutFeedback>
              </View>}
            </View>
            {/* 염판 12 */}

            <View style={{ height: 10 }}></View>

            {/* 염판 13 */}
            <View style={styles.smallcontainer}>

              <TouchableWithoutFeedback onPress={() => {
                setsolt13(true)
                try {
                  client.write('$S,O,13,1')
                  console.log('염판 13 전송')
                } catch (error) {
                  Alert.alert('서버와 연결이 끊겼습니다.', '앱을 종료 후 다시 실행해주세요.')
                }
              }}>
                <View style={{ justifyContent: "center", alignItems: "center", marginTop: 15, marginBottom: 15, marginLeft: 5 }}>
                  <View style={{ justifyContent: "center", alignItems: "center", margin: 5, marginLeft: 15, marginRight: 15 }}>
                    <Text style={{ color: 'white', fontSize: 20 }}>염판 13</Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>

              <View style={{ flex: 0.3 }}></View>

              <View style={{ flexDirection: 'row', flex: 2 }}>
                {solt13_1 ?
                  <View style={styles.circleStateGreen}></View> :
                  <View style={styles.circleStateRed}></View>
                }
                <View style={{ flex: 1 }}></View>
                {solt13_2 ?
                  <View style={styles.circleStateGreen}></View> :
                  <View style={styles.circleStateRed}></View>
                }
                <View style={{ flex: 1 }}></View>
                {solt13_3 ?
                  <View style={styles.circleStateGreen}></View> :
                  <View style={styles.circleStateRed}></View>
                }
                <View style={{ flex: 1 }}></View>
                {solt13_4 ?
                  <View style={styles.circleStateGreen}></View> :
                  <View style={styles.circleStateRed}></View>
                }
              </View>

              <View style={{ flex: 0.3 }}></View>

              {solt13 && <View style={{ width: offOkayW, height: offOkayH, position: 'absolute', backgroundColor: 'rgba(13, 13, 13, 0.6)', borderRadius: 10 }}>
                <TouchableWithoutFeedback onPress={() => {
                  if (switchValue == true) {
                    setsolt13(false)
                    try {
                      client.write('$S,O,13,0')
                      console.log('염판 13 전송')
                    } catch (error) {
                      Alert.alert('서버와 연결이 끊겼습니다.', '앱을 종료 후 다시 실행해주세요.')
                    }
                  } else {
                    Alert.alert('먼저 스위치를 켜주세요')
                  }

                }}>
                  <View style={{ width: offOkayW, height: offOkayH }}></View>
                </TouchableWithoutFeedback>
              </View>}
            </View>
            {/* 염판 13 */}

            <View style={{ height: 10 }}></View>

            {/* 염판 14 */}
            <View style={styles.smallcontainer}>

              <TouchableWithoutFeedback onPress={() => {
                setsolt14(true)
                try {
                  client.write('$S,O,14,1')
                  console.log('염판 14 전송')
                } catch (error) {
                  Alert.alert('서버와 연결이 끊겼습니다.', '앱을 종료 후 다시 실행해주세요.')
                }
              }}>
                <View style={{ justifyContent: "center", alignItems: "center", marginTop: 15, marginBottom: 15, marginLeft: 5 }}>
                  <View style={{ justifyContent: "center", alignItems: "center", margin: 5, marginLeft: 15, marginRight: 15 }}>
                    <Text style={{ color: 'white', fontSize: 20 }}>염판 14</Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>

              <View style={{ flex: 0.3 }}></View>

              <View style={{ flexDirection: 'row', flex: 2 }}>
                {solt14_1 ?
                  <View style={styles.circleStateGreen}></View> :
                  <View style={styles.circleStateRed}></View>
                }
                <View style={{ flex: 1 }}></View>
                {solt14_2 ?
                  <View style={styles.circleStateGreen}></View> :
                  <View style={styles.circleStateRed}></View>
                }
                <View style={{ flex: 1 }}></View>
                {solt14_3 ?
                  <View style={styles.circleStateGreen}></View> :
                  <View style={styles.circleStateRed}></View>
                }
                <View style={{ flex: 1 }}></View>
                {solt14_4 ?
                  <View style={styles.circleStateGreen}></View> :
                  <View style={styles.circleStateRed}></View>
                }
              </View>

              <View style={{ flex: 0.3 }}></View>

              {solt14 && <View style={{ width: offOkayW, height: offOkayH, position: 'absolute', backgroundColor: 'rgba(13, 13, 13, 0.6)', borderRadius: 10 }}>
                <TouchableWithoutFeedback onPress={() => {
                  if (switchValue == true) {
                    setsolt14(false)
                    try {
                      client.write('$S,O,14,0')
                      console.log('염판 14 전송')
                    } catch (error) {
                      Alert.alert('서버와 연결이 끊겼습니다.', '앱을 종료 후 다시 실행해주세요.')
                    }
                  } else {
                    Alert.alert('먼저 스위치를 켜주세요')
                  }

                }}>
                  <View style={{ width: offOkayW, height: offOkayH }}></View>
                </TouchableWithoutFeedback>
              </View>}
            </View>
            {/* 염판 14 */}

            <View style={{ height: 10 }}></View>

            {/* 염판 15 */}
            <View style={styles.smallcontainer}>

              <TouchableWithoutFeedback onPress={() => {
                setsolt15(true)
                try {
                  client.write('$S,O,15,1')
                  console.log('염판 15 전송')
                } catch (error) {
                  Alert.alert('서버와 연결이 끊겼습니다.', '앱을 종료 후 다시 실행해주세요.')
                }
              }}>
                <View style={{ justifyContent: "center", alignItems: "center", marginTop: 15, marginBottom: 15, marginLeft: 5 }}>
                  <View style={{ justifyContent: "center", alignItems: "center", margin: 5, marginLeft: 15, marginRight: 15 }}>
                    <Text style={{ color: 'white', fontSize: 20 }}>염판 15</Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>

              <View style={{ flex: 0.3 }}></View>

              <View style={{ flexDirection: 'row', flex: 2 }}>
                {solt15_1 ?
                  <View style={styles.circleStateGreen}></View> :
                  <View style={styles.circleStateRed}></View>
                }
                <View style={{ flex: 1 }}></View>
                {solt15_2 ?
                  <View style={styles.circleStateGreen}></View> :
                  <View style={styles.circleStateRed}></View>
                }
                <View style={{ flex: 1 }}></View>
                {solt15_3 ?
                  <View style={styles.circleStateGreen}></View> :
                  <View style={styles.circleStateRed}></View>
                }
                <View style={{ flex: 1 }}></View>
                {solt15_4 ?
                  <View style={styles.circleStateGreen}></View> :
                  <View style={styles.circleStateRed}></View>
                }
              </View>

              <View style={{ flex: 0.3 }}></View>

              {solt15 && <View style={{ width: offOkayW, height: offOkayH, position: 'absolute', backgroundColor: 'rgba(13, 13, 13, 0.6)', borderRadius: 10 }}>
                <TouchableWithoutFeedback onPress={() => {
                  if (switchValue == true) {
                    setsolt15(false)
                    try {
                      client.write('$S,O,15,0')
                      console.log('염판 1 5전송')
                    } catch (error) {
                      Alert.alert('서버와 연결이 끊겼습니다.', '앱을 종료 후 다시 실행해주세요.')
                    }
                  } else {
                    Alert.alert('먼저 스위치를 켜주세요')
                  }

                }}>
                  <View style={{ width: offOkayW, height: offOkayH }}></View>
                </TouchableWithoutFeedback>
              </View>}
            </View>
            {/* 염판 15 */}

            <View style={{ height: 10 }}></View>

            {/* 염판 16 */}
            <View style={styles.smallcontainer}>

              <TouchableWithoutFeedback onPress={() => {
                setsolt16(true)
                try {
                  client.write('$S,O,16,1')
                  console.log('염판 16 전송')
                } catch (error) {
                  Alert.alert('서버와 연결이 끊겼습니다.', '앱을 종료 후 다시 실행해주세요.')
                }
              }}>
                <View style={{ justifyContent: "center", alignItems: "center", marginTop: 15, marginBottom: 15, marginLeft: 5 }}>
                  <View style={{ justifyContent: "center", alignItems: "center", margin: 5, marginLeft: 15, marginRight: 15 }}>
                    <Text style={{ color: 'white', fontSize: 20 }}>염판 16</Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>

              <View style={{ flex: 0.3 }}></View>

              <View style={{ flexDirection: 'row', flex: 2 }}>
                {solt16_1 ?
                  <View style={styles.circleStateGreen}></View> :
                  <View style={styles.circleStateRed}></View>
                }
                <View style={{ flex: 1 }}></View>
                {solt16_2 ?
                  <View style={styles.circleStateGreen}></View> :
                  <View style={styles.circleStateRed}></View>
                }
                <View style={{ flex: 1 }}></View>
                {solt16_3 ?
                  <View style={styles.circleStateGreen}></View> :
                  <View style={styles.circleStateRed}></View>
                }
                <View style={{ flex: 1 }}></View>
                {solt16_4 ?
                  <View style={styles.circleStateGreen}></View> :
                  <View style={styles.circleStateRed}></View>
                }
              </View>

              <View style={{ flex: 0.3 }}></View>

              {solt16 && <View style={{ width: offOkayW, height: offOkayH, position: 'absolute', backgroundColor: 'rgba(13, 13, 13, 0.6)', borderRadius: 10 }}>
                <TouchableWithoutFeedback onPress={() => {
                  if (switchValue == true) {
                    setsolt16(false)
                    try {
                      client.write('$S,O,16,0')
                      console.log('염판 16 전송')
                    } catch (error) {
                      Alert.alert('서버와 연결이 끊겼습니다.', '앱을 종료 후 다시 실행해주세요.')
                    }
                  } else {
                    Alert.alert('먼저 스위치를 켜주세요')
                  }

                }}>
                  <View style={{ width: offOkayW, height: offOkayH }}></View>
                </TouchableWithoutFeedback>
              </View>}
            </View>
            {/* 염판 16 */}

            <View style={{ height: 10 }}></View>

            {/* 염판 17 */}
            <View style={styles.smallcontainer}>

              <TouchableWithoutFeedback onPress={() => {
                setsolt17(true)
                try {
                  client.write('$S,O,17,1')
                  console.log('염판 17 전송')
                } catch (error) {
                  Alert.alert('서버와 연결이 끊겼습니다.', '앱을 종료 후 다시 실행해주세요.')
                }
              }}>
                <View style={{ justifyContent: "center", alignItems: "center", marginTop: 15, marginBottom: 15, marginLeft: 5 }}>
                  <View style={{ justifyContent: "center", alignItems: "center", margin: 5, marginLeft: 15, marginRight: 15 }}>
                    <Text style={{ color: 'white', fontSize: 20 }}>염판 17</Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>

              <View style={{ flex: 0.3 }}></View>

              <View style={{ flexDirection: 'row', flex: 2 }}>
                {solt17_1 ?
                  <View style={styles.circleStateGreen}></View> :
                  <View style={styles.circleStateRed}></View>
                }
                <View style={{ flex: 1 }}></View>
                {solt17_2 ?
                  <View style={styles.circleStateGreen}></View> :
                  <View style={styles.circleStateRed}></View>
                }
                <View style={{ flex: 1 }}></View>
                {solt17_3 ?
                  <View style={styles.circleStateGreen}></View> :
                  <View style={styles.circleStateRed}></View>
                }
                <View style={{ flex: 1 }}></View>
                {solt17_4 ?
                  <View style={styles.circleStateGreen}></View> :
                  <View style={styles.circleStateRed}></View>
                }
              </View>

              <View style={{ flex: 0.3 }}></View>

              {solt17 && <View style={{ width: offOkayW, height: offOkayH, position: 'absolute', backgroundColor: 'rgba(13, 13, 13, 0.6)', borderRadius: 10 }}>
                <TouchableWithoutFeedback onPress={() => {
                  if (switchValue == true) {
                    setsolt17(false)
                    try {
                      client.write('$S,O,17,0')
                      console.log('염판 17 전송')
                    } catch (error) {
                      Alert.alert('서버와 연결이 끊겼습니다.', '앱을 종료 후 다시 실행해주세요.')
                    }
                  } else {
                    Alert.alert('먼저 스위치를 켜주세요')
                  }

                }}>
                  <View style={{ width: offOkayW, height: offOkayH }}></View>
                </TouchableWithoutFeedback>
              </View>}
            </View>
            {/* 염판 17 */}

            <View style={{ height: 10 }}></View>

            {/* 염판 18 */}
            <View style={styles.smallcontainer}>

              <TouchableWithoutFeedback onPress={() => {
                setsolt18(true)
                try {
                  client.write('$S,O,18,1')
                  console.log('염판 18 전송')
                } catch (error) {
                  Alert.alert('서버와 연결이 끊겼습니다.', '앱을 종료 후 다시 실행해주세요.')
                }
              }}>
                <View style={{ justifyContent: "center", alignItems: "center", marginTop: 15, marginBottom: 15, marginLeft: 5 }}>
                  <View style={{ justifyContent: "center", alignItems: "center", margin: 5, marginLeft: 15, marginRight: 15 }}>
                    <Text style={{ color: 'white', fontSize: 20 }}>염판 18</Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>

              <View style={{ flex: 0.3 }}></View>

              <View style={{ flexDirection: 'row', flex: 2 }}>
                {solt18_1 ?
                  <View style={styles.circleStateGreen}></View> :
                  <View style={styles.circleStateRed}></View>
                }
                <View style={{ flex: 1 }}></View>
                {solt18_2 ?
                  <View style={styles.circleStateGreen}></View> :
                  <View style={styles.circleStateRed}></View>
                }
                <View style={{ flex: 1 }}></View>
                {solt18_3 ?
                  <View style={styles.circleStateGreen}></View> :
                  <View style={styles.circleStateRed}></View>
                }
                <View style={{ flex: 1 }}></View>
                {solt18_4 ?
                  <View style={styles.circleStateGreen}></View> :
                  <View style={styles.circleStateRed}></View>
                }
              </View>

              <View style={{ flex: 0.3 }}></View>

              {solt18 && <View style={{ width: offOkayW, height: offOkayH, position: 'absolute', backgroundColor: 'rgba(13, 13, 13, 0.6)', borderRadius: 10 }}>
                <TouchableWithoutFeedback onPress={() => {
                  if (switchValue == true) {
                    setsolt18(false)
                    try {
                      client.write('$S,O,18,0')
                      console.log('염판 18전송')
                    } catch (error) {
                      Alert.alert('서버와 연결이 끊겼습니다.', '앱을 종료 후 다시 실행해주세요.')
                    }
                  } else {
                    Alert.alert('먼저 스위치를 켜주세요')
                  }

                }}>
                  <View style={{ width: offOkayW, height: offOkayH }}></View>
                </TouchableWithoutFeedback>
              </View>}
            </View>
            {/* 염판 18 */}

            <View style={{ height: 10 }}></View>

            {/* 염판 19 */}
            <View style={styles.smallcontainer}>

              <TouchableWithoutFeedback onPress={() => {
                setsolt19(true)
                try {
                  client.write('$S,O,19,1')
                  console.log('염판 19 전송')
                } catch (error) {
                  Alert.alert('서버와 연결이 끊겼습니다.', '앱을 종료 후 다시 실행해주세요.')
                }
              }}>
                <View style={{ justifyContent: "center", alignItems: "center", marginTop: 15, marginBottom: 15, marginLeft: 5 }}>
                  <View style={{ justifyContent: "center", alignItems: "center", margin: 5, marginLeft: 15, marginRight: 15 }}>
                    <Text style={{ color: 'white', fontSize: 20 }}>염판 19</Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>

              <View style={{ flex: 0.3 }}></View>

              <View style={{ flexDirection: 'row', flex: 2 }}>
                {solt19_1 ?
                  <View style={styles.circleStateGreen}></View> :
                  <View style={styles.circleStateRed}></View>
                }
                <View style={{ flex: 1 }}></View>
                {solt19_2 ?
                  <View style={styles.circleStateGreen}></View> :
                  <View style={styles.circleStateRed}></View>
                }
                <View style={{ flex: 1 }}></View>
                {solt19_3 ?
                  <View style={styles.circleStateGreen}></View> :
                  <View style={styles.circleStateRed}></View>
                }
                <View style={{ flex: 1 }}></View>
                {solt19_4 ?
                  <View style={styles.circleStateGreen}></View> :
                  <View style={styles.circleStateRed}></View>
                }
              </View>

              <View style={{ flex: 0.3 }}></View>

              {solt19 && <View style={{ width: offOkayW, height: offOkayH, position: 'absolute', backgroundColor: 'rgba(13, 13, 13, 0.6)', borderRadius: 10 }}>
                <TouchableWithoutFeedback onPress={() => {
                  if (switchValue == true) {
                    setsolt19(false)
                    try {
                      client.write('$S,O,19,0')
                      console.log('염판 19 전송')
                    } catch (error) {
                      Alert.alert('서버와 연결이 끊겼습니다.', '앱을 종료 후 다시 실행해주세요.')
                    }
                  } else {
                    Alert.alert('먼저 스위치를 켜주세요')
                  }

                }}>
                  <View style={{ width: offOkayW, height: offOkayH }}></View>
                </TouchableWithoutFeedback>
              </View>}
            </View>
            {/* 염판 19 */}

            <View style={{ height: 10 }}></View>

            {/* 염판 20 */}
            <View style={styles.smallcontainer}>

              <TouchableWithoutFeedback onPress={() => {
                setsolt20(true)
                try {
                  client.write('$S,O,20,1')
                  console.log('염판 20 전송')
                } catch (error) {
                  Alert.alert('서버와 연결이 끊겼습니다.', '앱을 종료 후 다시 실행해주세요.')
                }
              }}>
                <View style={{ justifyContent: "center", alignItems: "center", marginTop: 15, marginBottom: 15, marginLeft: 5 }}>
                  <View style={{ justifyContent: "center", alignItems: "center", margin: 5, marginLeft: 15, marginRight: 15 }}>
                    <Text style={{ color: 'white', fontSize: 20 }}>염판 20</Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>

              <View style={{ flex: 0.3 }}></View>

              <View style={{ flexDirection: 'row', flex: 2 }}>
                {solt20_1 ?
                  <View style={styles.circleStateGreen}></View> :
                  <View style={styles.circleStateRed}></View>
                }
                <View style={{ flex: 1 }}></View>
                {solt20_2 ?
                  <View style={styles.circleStateGreen}></View> :
                  <View style={styles.circleStateRed}></View>
                }
                <View style={{ flex: 1 }}></View>
                {solt20_3 ?
                  <View style={styles.circleStateGreen}></View> :
                  <View style={styles.circleStateRed}></View>
                }
                <View style={{ flex: 1 }}></View>
                {solt20_4 ?
                  <View style={styles.circleStateGreen}></View> :
                  <View style={styles.circleStateRed}></View>
                }
              </View>

              <View style={{ flex: 0.3 }}></View>

              {solt20 && <View style={{ width: offOkayW, height: offOkayH, position: 'absolute', backgroundColor: 'rgba(13, 13, 13, 0.6)', borderRadius: 10 }}>
                <TouchableWithoutFeedback onPress={() => {
                  if (switchValue == true) {
                    setsolt20(false)
                    try {
                      client.write('$S,O,20,0')
                      console.log('염판 1 전송')
                    } catch (error) {
                      Alert.alert('서버와 연결이 끊겼습니다.', '앱을 종료 후 다시 실행해주세요.')
                    }
                  } else {
                    Alert.alert('먼저 스위치를 켜주세요')
                  }

                }}>
                  <View style={{ width: offOkayW, height: offOkayH }}></View>
                </TouchableWithoutFeedback>
              </View>}
            </View>
            {/* 염판 20 */}

            <View style={{ height: 20 }}></View>


          </ScrollView>




          {/* <View style={{ flex: 0.2 }}></View> */}


        </ImageBackground>
      </View>

    </SafeAreaView>
  )
}





export default App;
