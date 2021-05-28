import React, { useState, useEffect } from 'react';
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
  Image
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

  const focusis = navigation.addListener('focus', () => {
    // reqState()
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
      console.log('' + res)
      if ('' + res == 'main_power_off') {
        setSwitchValue(false)
        Alert.alert('메인 전원이 꺼져있습니다.', '전원을 켜주세요!')
      } else if (ccmd[0] + ccmd[1] + ccmd[2] == 'saltpoweroff') {
        Alert.alert(ccmd[3] + '번 염판 꺼짐 확인')
      }

    })
  }, [])

  const [switchValue, setSwitchValue] = useState(false)


  const [offOkayW, setOffOkayW] = useState(0)
  const [offOkayH, setOffOkayH] = useState(0)

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

  const [mainAlarm, setMainAlarm] = useState(true)


  return (
    <SafeAreaView style={{ backgroundColor: 'white' }}>
      <View style={{ width: chwidth, height: '100%', backgroundColor: 'white' }}>
        <ImageBackground source={oceanImg} style={{ width: '100%', height: '100%' }}>

          {/*  */}
          <View style={{ marginTop: 20, marginLeft: 15, marginBottom: 20, width: chwidth - 25, flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
              <View style={{ width: 15, height: 5, backgroundColor: 'red', marginBottom: 5 }}></View>
              <TouchableWithoutFeedback onPress={() => { reqState() }}>
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
                  } else if (val == false) {
                    console.log('메인 폴스')
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
                innerCircleStyle={{ alignItems: "center", justifyContent: "space-between" }} // style for inner animated circle for what you (may) be rendering inside the circle
                outerCircleStyle={{}} // style for outer animated circle
                renderActiveText={true}
                renderInActiveText={true}
                switchLeftPx={5} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
                switchRightPx={5} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
                switchWidthMultiplier={2.5} // multipled by the `circleSize` prop to calculate total width of the Switch
                switchBorderRadius={30} // Sets the border Radius of the switch slider. If unset, it remains the circleSize.
              />
            </View>
          </View>
          {/*  */}


          {/* 상태알람  */}
          {
            mainAlarm &&

            <View style={{ marginLeft: 10, width: chwidth - 20, backgroundColor: 'white', borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 15 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <AutoHeightImage source={alarmbtn} width={40} style={{ margin: 10 }}></AutoHeightImage>
                <Text style={{ fontWeight: 'bold' }}>상태 알람</Text>
                <AutoHeightImage source={redKo} width={40}></AutoHeightImage>
              </View>
              <TouchableWithoutFeedback onPress={() => console.log('확인')}>
                <View style={{ width: 70, borderRadius: 8, backgroundColor: 'rgb(221,221,221)', alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
                  <Text style={{ margin: 7 }}>확인</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>

          }
          {/*  */}

          <ScrollView style={{ marginLeft: 10 }} showsVerticalScrollIndicator={false}>

            {/* 염판 1 */}
            <View onLayout={(data) => { setOffOkayH(data.nativeEvent.layout.height), setOffOkayW(data.nativeEvent.layout.width) }} style={styles.smallcontainer}>
              <TouchableWithoutFeedback onPress={() => { setsolt1(true) }}>
                <View style={{ justifyContent: "center", alignItems: "center", marginTop: 15, marginBottom: 15, marginLeft: 5 }}>
                  <View style={{ justifyContent: "center", alignItems: "center", margin: 5, marginLeft: 15, marginRight: 15 }}>
                    <Text style={{ color: 'white', fontSize: 20 }}>염판 1  </Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>

              <View style={{ flex: 0.3 }}></View>

              <View style={{ flexDirection: 'row', flex: 2 }}>
                <View onLayout={(data) => { setCirclewidth(data.nativeEvent.layout.width) }} style={styles.circleStateGreen}></View>
                <View style={{ flex: 1 }}></View>
                <View style={styles.circleStateGreen}></View>
                <View style={{ flex: 1 }}></View>
                <View style={styles.circleStateGreen}></View>
                <View style={{ flex: 1 }}></View>
                <View style={styles.circleStateRed}></View>
              </View>

              <View style={{ flex: 0.3 }}></View>

              {solt1 && <View style={{ width: offOkayW, height: offOkayH, position: 'absolute', backgroundColor: 'rgba(13, 13, 13, 0.6)', borderRadius: 10 }}>
                <TouchableWithoutFeedback onPress={() => setsolt1(false)}>
                  <View style={{ width: offOkayW, height: offOkayH }}></View>
                </TouchableWithoutFeedback>
              </View>}

            </View>
            {/* 염판 1 */}

            <View style={{ height: 10 }}></View>

            {/* 염판 2 */}
            <View style={styles.smallcontainer}>

              <TouchableWithoutFeedback onPress={() => { setsolt2(true) }}>
                <View style={{ justifyContent: "center", alignItems: "center", marginTop: 15, marginBottom: 15, marginLeft: 5 }}>
                  <View style={{ justifyContent: "center", alignItems: "center", margin: 5, marginLeft: 15, marginRight: 15 }}>
                    <Text style={{ color: 'white', fontSize: 20 }}>염판 2  </Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>

              <View style={{ flex: 0.3 }}></View>

              <View style={{ flexDirection: 'row', flex: 2 }}>
                <View style={styles.circleStateGreen}></View>
                <View style={{ flex: 1 }}></View>
                <View style={styles.circleStateGreen}></View>
                <View style={{ flex: 1 }}></View>
                <View style={styles.circleStateGreen}></View>
                <View style={{ flex: 1 }}></View>
                <View style={styles.circleStateRed}></View>
              </View>

              <View style={{ flex: 0.3 }}></View>

              {solt2 && <View style={{ width: offOkayW, height: offOkayH, position: 'absolute', backgroundColor: 'rgba(13, 13, 13, 0.6)', borderRadius: 10 }}>
                <TouchableWithoutFeedback onPress={() => setsolt2(false)}>
                  <View style={{ width: offOkayW, height: offOkayH }}></View>
                </TouchableWithoutFeedback>
              </View>}
            </View>
            {/* 염판 2 */}

            <View style={{ height: 10 }}></View>

            {/* 염판 3 */}
            <View style={styles.smallcontainer}>

              <TouchableWithoutFeedback onPress={() => { setsolt3(true) }}>
                <View style={{ justifyContent: "center", alignItems: "center", marginTop: 15, marginBottom: 15, marginLeft: 5 }}>
                  <View style={{ justifyContent: "center", alignItems: "center", margin: 5, marginLeft: 15, marginRight: 15 }}>
                    <Text style={{ color: 'white', fontSize: 20 }}>염판 3  </Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>

              <View style={{ flex: 0.3 }}></View>

              <View style={{ flexDirection: 'row', flex: 2 }}>
                <View style={styles.circleStateGreen}></View>
                <View style={{ flex: 1 }}></View>
                <View style={styles.circleStateGreen}></View>
                <View style={{ flex: 1 }}></View>
                <View style={styles.circleStateGreen}></View>
                <View style={{ flex: 1 }}></View>
                <View style={styles.circleStateRed}></View>
              </View>

              <View style={{ flex: 0.3 }}></View>

              {solt3 && <View style={{ width: offOkayW, height: offOkayH, position: 'absolute', backgroundColor: 'rgba(13, 13, 13, 0.6)', borderRadius: 10 }}>
                <TouchableWithoutFeedback onPress={() => setsolt3(false)}>
                  <View style={{ width: offOkayW, height: offOkayH }}></View>
                </TouchableWithoutFeedback>
              </View>}
            </View>
            {/* 염판 3 */}

            <View style={{ height: 10 }}></View>

            {/* 염판 4 */}
            <View style={styles.smallcontainer}>

              <TouchableWithoutFeedback onPress={() => { setsolt4(true) }}>
                <View style={{ justifyContent: "center", alignItems: "center", marginTop: 15, marginBottom: 15, marginLeft: 5 }}>
                  <View style={{ justifyContent: "center", alignItems: "center", margin: 5, marginLeft: 15, marginRight: 15 }}>
                    <Text style={{ color: 'white', fontSize: 20 }}>염판 4  </Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>

              <View style={{ flex: 0.3 }}></View>

              <View style={{ flexDirection: 'row', flex: 2 }}>
                <View style={styles.circleStateGreen}></View>
                <View style={{ flex: 1 }}></View>
                <View style={styles.circleStateGreen}></View>
                <View style={{ flex: 1 }}></View>
                <View style={styles.circleStateGreen}></View>
                <View style={{ flex: 1 }}></View>
                <View style={styles.circleStateRed}></View>
              </View>

              <View style={{ flex: 0.3 }}></View>

              {solt4 && <View style={{ width: offOkayW, height: offOkayH, position: 'absolute', backgroundColor: 'rgba(13, 13, 13, 0.6)', borderRadius: 10 }}>
                <TouchableWithoutFeedback onPress={() => setsolt4(false)}>
                  <View style={{ width: offOkayW, height: offOkayH }}></View>
                </TouchableWithoutFeedback>
              </View>}
            </View>
            {/* 염판 4 */}

            <View style={{ height: 10 }}></View>

            {/* 염판 5 */}
            <View style={styles.smallcontainer}>

              <TouchableWithoutFeedback onPress={() => { setsolt5(true) }}>
                <View style={{ justifyContent: "center", alignItems: "center", marginTop: 15, marginBottom: 15, marginLeft: 5 }}>
                  <View style={{ justifyContent: "center", alignItems: "center", margin: 5, marginLeft: 15, marginRight: 15 }}>
                    <Text style={{ color: 'white', fontSize: 20 }}>염판 5  </Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>

              <View style={{ flex: 0.3 }}></View>

              <View style={{ flexDirection: 'row', flex: 2 }}>
                <View style={styles.circleStateGreen}></View>
                <View style={{ flex: 1 }}></View>
                <View style={styles.circleStateGreen}></View>
                <View style={{ flex: 1 }}></View>
                <View style={styles.circleStateGreen}></View>
                <View style={{ flex: 1 }}></View>
                <View style={styles.circleStateRed}></View>
              </View>

              <View style={{ flex: 0.3 }}></View>

              {solt5 && <View style={{ width: offOkayW, height: offOkayH, position: 'absolute', backgroundColor: 'rgba(13, 13, 13, 0.6)', borderRadius: 10 }}>
                <TouchableWithoutFeedback onPress={() => setsolt5(false)}>
                  <View style={{ width: offOkayW, height: offOkayH }}></View>
                </TouchableWithoutFeedback>
              </View>}
            </View>
            {/* 염판 5 */}

            <View style={{ height: 10 }}></View>

            {/* 염판 6 */}
            <View style={styles.smallcontainer}>

              <TouchableWithoutFeedback onPress={() => { setsolt6(true) }}>
                <View style={{ justifyContent: "center", alignItems: "center", marginTop: 15, marginBottom: 15, marginLeft: 5 }}>
                  <View style={{ justifyContent: "center", alignItems: "center", margin: 5, marginLeft: 15, marginRight: 15 }}>
                    <Text style={{ color: 'white', fontSize: 20 }}>염판 6  </Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>

              <View style={{ flex: 0.3 }}></View>

              <View style={{ flexDirection: 'row', flex: 2 }}>
                <View style={styles.circleStateGreen}></View>
                <View style={{ flex: 1 }}></View>
                <View style={styles.circleStateGreen}></View>
                <View style={{ flex: 1 }}></View>
                <View style={styles.circleStateGreen}></View>
                <View style={{ flex: 1 }}></View>
                <View style={styles.circleStateRed}></View>
              </View>

              <View style={{ flex: 0.3 }}></View>

              {solt6 && <View style={{ width: offOkayW, height: offOkayH, position: 'absolute', backgroundColor: 'rgba(13, 13, 13, 0.6)', borderRadius: 10 }}>
                <TouchableWithoutFeedback onPress={() => setsolt6(false)}>
                  <View style={{ width: offOkayW, height: offOkayH }}></View>
                </TouchableWithoutFeedback>
              </View>}
            </View>
            {/* 염판 6 */}

            <View style={{ height: 10 }}></View>

            {/* 염판 7 */}
            <View style={styles.smallcontainer}>

              <TouchableWithoutFeedback onPress={() => { setsolt7(true) }}>
                <View style={{ justifyContent: "center", alignItems: "center", marginTop: 15, marginBottom: 15, marginLeft: 5 }}>
                  <View style={{ justifyContent: "center", alignItems: "center", margin: 5, marginLeft: 15, marginRight: 15 }}>
                    <Text style={{ color: 'white', fontSize: 20 }}>염판 7  </Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>

              <View style={{ flex: 0.3 }}></View>

              <View style={{ flexDirection: 'row', flex: 2 }}>
                <View style={styles.circleStateGreen}></View>
                <View style={{ flex: 1 }}></View>
                <View style={styles.circleStateGreen}></View>
                <View style={{ flex: 1 }}></View>
                <View style={styles.circleStateGreen}></View>
                <View style={{ flex: 1 }}></View>
                <View style={styles.circleStateRed}></View>
              </View>

              <View style={{ flex: 0.3 }}></View>

              {solt7 && <View style={{ width: offOkayW, height: offOkayH, position: 'absolute', backgroundColor: 'rgba(13, 13, 13, 0.6)', borderRadius: 10 }}>
                <TouchableWithoutFeedback onPress={() => setsolt7(false)}>
                  <View style={{ width: offOkayW, height: offOkayH }}></View>
                </TouchableWithoutFeedback>
              </View>}
            </View>
            {/* 염판 7 */}

            <View style={{ height: 10 }}></View>

            {/* 염판 8 */}
            <View style={styles.smallcontainer}>

              <TouchableWithoutFeedback onPress={() => { setsolt8(true) }}>
                <View style={{ justifyContent: "center", alignItems: "center", marginTop: 15, marginBottom: 15, marginLeft: 5 }}>
                  <View style={{ justifyContent: "center", alignItems: "center", margin: 5, marginLeft: 15, marginRight: 15 }}>
                    <Text style={{ color: 'white', fontSize: 20 }}>염판 8  </Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>

              <View style={{ flex: 0.3 }}></View>

              <View style={{ flexDirection: 'row', flex: 2 }}>
                <View style={styles.circleStateGreen}></View>
                <View style={{ flex: 1 }}></View>
                <View style={styles.circleStateGreen}></View>
                <View style={{ flex: 1 }}></View>
                <View style={styles.circleStateGreen}></View>
                <View style={{ flex: 1 }}></View>
                <View style={styles.circleStateRed}></View>
              </View>

              <View style={{ flex: 0.3 }}></View>

              {solt8 && <View style={{ width: offOkayW, height: offOkayH, position: 'absolute', backgroundColor: 'rgba(13, 13, 13, 0.6)', borderRadius: 10 }}>
                <TouchableWithoutFeedback onPress={() => setsolt8(false)}>
                  <View style={{ width: offOkayW, height: offOkayH }}></View>
                </TouchableWithoutFeedback>
              </View>}
            </View>
            {/* 염판 8 */}

            <View style={{ height: 10 }}></View>

            {/* 염판 9 */}
            <View style={styles.smallcontainer}>

              <TouchableWithoutFeedback onPress={() => { setsolt9(true) }}>
                <View style={{ justifyContent: "center", alignItems: "center", marginTop: 15, marginBottom: 15, marginLeft: 5 }}>
                  <View style={{ justifyContent: "center", alignItems: "center", margin: 5, marginLeft: 15, marginRight: 15 }}>
                    <Text style={{ color: 'white', fontSize: 20 }}>염판 9  </Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>

              <View style={{ flex: 0.3 }}></View>

              <View style={{ flexDirection: 'row', flex: 2 }}>
                <View style={styles.circleStateGreen}></View>
                <View style={{ flex: 1 }}></View>
                <View style={styles.circleStateGreen}></View>
                <View style={{ flex: 1 }}></View>
                <View style={styles.circleStateGreen}></View>
                <View style={{ flex: 1 }}></View>
                <View style={styles.circleStateRed}></View>
              </View>

              <View style={{ flex: 0.3 }}></View>

              {solt9 && <View style={{ width: offOkayW, height: offOkayH, position: 'absolute', backgroundColor: 'rgba(13, 13, 13, 0.6)', borderRadius: 10 }}>
                <TouchableWithoutFeedback onPress={() => setsolt9(false)}>
                  <View style={{ width: offOkayW, height: offOkayH }}></View>
                </TouchableWithoutFeedback>
              </View>}
            </View>
            {/* 염판 9 */}

            <View style={{ height: 10 }}></View>

            {/* 염판 10 */}
            <View style={styles.smallcontainer}>

              <TouchableWithoutFeedback onPress={() => { setsolt10(true) }}>
                <View style={{ justifyContent: "center", alignItems: "center", marginTop: 15, marginBottom: 15, marginLeft: 5 }}>
                  <View style={{ justifyContent: "center", alignItems: "center", margin: 5, marginLeft: 15, marginRight: 15 }}>
                    <Text style={{ color: 'white', fontSize: 20 }}>염판 10</Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>

              <View style={{ flex: 0.3 }}></View>

              <View style={{ flexDirection: 'row', flex: 2 }}>
                <View style={styles.circleStateGreen}></View>
                <View style={{ flex: 1 }}></View>
                <View style={styles.circleStateGreen}></View>
                <View style={{ flex: 1 }}></View>
                <View style={styles.circleStateGreen}></View>
                <View style={{ flex: 1 }}></View>
                <View style={styles.circleStateRed}></View>
              </View>

              <View style={{ flex: 0.3 }}></View>

              {solt10 && <View style={{ width: offOkayW, height: offOkayH, position: 'absolute', backgroundColor: 'rgba(13, 13, 13, 0.6)', borderRadius: 10 }}>
                <TouchableWithoutFeedback onPress={() => setsolt10(false)}>
                  <View style={{ width: offOkayW, height: offOkayH }}></View>
                </TouchableWithoutFeedback>
              </View>}
            </View>
            {/* 염판 10 */}

            <View style={{ height: 10 }}></View>

            {/* 염판 11 */}
            <View style={styles.smallcontainer}>

              <TouchableWithoutFeedback onPress={() => { setsolt11(true) }}>
                <View style={{ justifyContent: "center", alignItems: "center", marginTop: 15, marginBottom: 15, marginLeft: 5 }}>
                  <View style={{ justifyContent: "center", alignItems: "center", margin: 5, marginLeft: 15, marginRight: 15 }}>
                    <Text style={{ color: 'white', fontSize: 20 }}>염판 11</Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>

              <View style={{ flex: 0.3 }}></View>

              <View style={{ flexDirection: 'row', flex: 2 }}>
                <View style={styles.circleStateGreen}></View>
                <View style={{ flex: 1 }}></View>
                <View style={styles.circleStateGreen}></View>
                <View style={{ flex: 1 }}></View>
                <View style={styles.circleStateGreen}></View>
                <View style={{ flex: 1 }}></View>
                <View style={styles.circleStateRed}></View>
              </View>

              <View style={{ flex: 0.3 }}></View>

              {solt11 && <View style={{ width: offOkayW, height: offOkayH, position: 'absolute', backgroundColor: 'rgba(13, 13, 13, 0.6)', borderRadius: 10 }}>
                <TouchableWithoutFeedback onPress={() => setsolt11(false)}>
                  <View style={{ width: offOkayW, height: offOkayH }}></View>
                </TouchableWithoutFeedback>
              </View>}
            </View>
            {/* 염판 11 */}

            <View style={{ height: 10 }}></View>

            {/* 염판 12 */}
            <View style={styles.smallcontainer}>

              <TouchableWithoutFeedback onPress={() => { setsolt12(true) }}>
                <View style={{ justifyContent: "center", alignItems: "center", marginTop: 15, marginBottom: 15, marginLeft: 5 }}>
                  <View style={{ justifyContent: "center", alignItems: "center", margin: 5, marginLeft: 15, marginRight: 15 }}>
                    <Text style={{ color: 'white', fontSize: 20 }}>염판 12</Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>

              <View style={{ flex: 0.3 }}></View>

              <View style={{ flexDirection: 'row', flex: 2 }}>
                <View style={styles.circleStateGreen}></View>
                <View style={{ flex: 1 }}></View>
                <View style={styles.circleStateGreen}></View>
                <View style={{ flex: 1 }}></View>
                <View style={styles.circleStateGreen}></View>
                <View style={{ flex: 1 }}></View>
                <View style={styles.circleStateRed}></View>
              </View>

              <View style={{ flex: 0.3 }}></View>

              {solt12 && <View style={{ width: offOkayW, height: offOkayH, position: 'absolute', backgroundColor: 'rgba(13, 13, 13, 0.6)', borderRadius: 10 }}>
                <TouchableWithoutFeedback onPress={() => setsolt12(false)}>
                  <View style={{ width: offOkayW, height: offOkayH }}></View>
                </TouchableWithoutFeedback>
              </View>}
            </View>
            {/* 염판 12 */}

            <View style={{ height: 10 }}></View>

            {/* 염판 13 */}
            <View style={styles.smallcontainer}>

              <TouchableWithoutFeedback onPress={() => { setsolt13(true) }}>
                <View style={{ justifyContent: "center", alignItems: "center", marginTop: 15, marginBottom: 15, marginLeft: 5 }}>
                  <View style={{ justifyContent: "center", alignItems: "center", margin: 5, marginLeft: 15, marginRight: 15 }}>
                    <Text style={{ color: 'white', fontSize: 20 }}>염판 13</Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>

              <View style={{ flex: 0.3 }}></View>

              <View style={{ flexDirection: 'row', flex: 2 }}>
                <View style={styles.circleStateGreen}></View>
                <View style={{ flex: 1 }}></View>
                <View style={styles.circleStateGreen}></View>
                <View style={{ flex: 1 }}></View>
                <View style={styles.circleStateGreen}></View>
                <View style={{ flex: 1 }}></View>
                <View style={styles.circleStateRed}></View>
              </View>

              <View style={{ flex: 0.3 }}></View>

              {solt13 && <View style={{ width: offOkayW, height: offOkayH, position: 'absolute', backgroundColor: 'rgba(13, 13, 13, 0.6)', borderRadius: 10 }}>
                <TouchableWithoutFeedback onPress={() => setsolt13(false)}>
                  <View style={{ width: offOkayW, height: offOkayH }}></View>
                </TouchableWithoutFeedback>
              </View>}
            </View>
            {/* 염판 13 */}

            <View style={{ height: 10 }}></View>

            {/* 염판 14 */}
            <View style={styles.smallcontainer}>

              <TouchableWithoutFeedback onPress={() => { setsolt14(true) }}>
                <View style={{ justifyContent: "center", alignItems: "center", marginTop: 15, marginBottom: 15, marginLeft: 5 }}>
                  <View style={{ justifyContent: "center", alignItems: "center", margin: 5, marginLeft: 15, marginRight: 15 }}>
                    <Text style={{ color: 'white', fontSize: 20 }}>염판 14</Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>

              <View style={{ flex: 0.3 }}></View>

              <View style={{ flexDirection: 'row', flex: 2 }}>
                <View style={styles.circleStateGreen}></View>
                <View style={{ flex: 1 }}></View>
                <View style={styles.circleStateGreen}></View>
                <View style={{ flex: 1 }}></View>
                <View style={styles.circleStateGreen}></View>
                <View style={{ flex: 1 }}></View>
                <View style={styles.circleStateRed}></View>
              </View>

              <View style={{ flex: 0.3 }}></View>

              {solt14 && <View style={{ width: offOkayW, height: offOkayH, position: 'absolute', backgroundColor: 'rgba(13, 13, 13, 0.6)', borderRadius: 10 }}>
                <TouchableWithoutFeedback onPress={() => setsolt14(false)}>
                  <View style={{ width: offOkayW, height: offOkayH }}></View>
                </TouchableWithoutFeedback>
              </View>}
            </View>
            {/* 염판 14 */}

            <View style={{ height: 10 }}></View>

            {/* 염판 15 */}
            <View style={styles.smallcontainer}>

              <TouchableWithoutFeedback onPress={() => { setsolt15(true) }}>
                <View style={{ justifyContent: "center", alignItems: "center", marginTop: 15, marginBottom: 15, marginLeft: 5 }}>
                  <View style={{ justifyContent: "center", alignItems: "center", margin: 5, marginLeft: 15, marginRight: 15 }}>
                    <Text style={{ color: 'white', fontSize: 20 }}>염판 15</Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>

              <View style={{ flex: 0.3 }}></View>

              <View style={{ flexDirection: 'row', flex: 2 }}>
                <View style={styles.circleStateGreen}></View>
                <View style={{ flex: 1 }}></View>
                <View style={styles.circleStateGreen}></View>
                <View style={{ flex: 1 }}></View>
                <View style={styles.circleStateGreen}></View>
                <View style={{ flex: 1 }}></View>
                <View style={styles.circleStateRed}></View>
              </View>

              <View style={{ flex: 0.3 }}></View>

              {solt15 && <View style={{ width: offOkayW, height: offOkayH, position: 'absolute', backgroundColor: 'rgba(13, 13, 13, 0.6)', borderRadius: 10 }}>
                <TouchableWithoutFeedback onPress={() => setsolt15(false)}>
                  <View style={{ width: offOkayW, height: offOkayH }}></View>
                </TouchableWithoutFeedback>
              </View>}
            </View>
            {/* 염판 15 */}

            <View style={{ height: 10 }}></View>

            {/* 염판 16 */}
            <View style={styles.smallcontainer}>

              <TouchableWithoutFeedback onPress={() => { setsolt16(true) }}>
                <View style={{ justifyContent: "center", alignItems: "center", marginTop: 15, marginBottom: 15, marginLeft: 5 }}>
                  <View style={{ justifyContent: "center", alignItems: "center", margin: 5, marginLeft: 15, marginRight: 15 }}>
                    <Text style={{ color: 'white', fontSize: 20 }}>염판 16</Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>

              <View style={{ flex: 0.3 }}></View>

              <View style={{ flexDirection: 'row', flex: 2 }}>
                <View style={styles.circleStateGreen}></View>
                <View style={{ flex: 1 }}></View>
                <View style={styles.circleStateGreen}></View>
                <View style={{ flex: 1 }}></View>
                <View style={styles.circleStateGreen}></View>
                <View style={{ flex: 1 }}></View>
                <View style={styles.circleStateRed}></View>
              </View>

              <View style={{ flex: 0.3 }}></View>

              {solt16 && <View style={{ width: offOkayW, height: offOkayH, position: 'absolute', backgroundColor: 'rgba(13, 13, 13, 0.6)', borderRadius: 10 }}>
                <TouchableWithoutFeedback onPress={() => setsolt16(false)}>
                  <View style={{ width: offOkayW, height: offOkayH }}></View>
                </TouchableWithoutFeedback>
              </View>}
            </View>
            {/* 염판 16 */}

            <View style={{ height: 10 }}></View>

            {/* 염판 17 */}
            <View style={styles.smallcontainer}>

              <TouchableWithoutFeedback onPress={() => { setsolt17(true) }}>
                <View style={{ justifyContent: "center", alignItems: "center", marginTop: 15, marginBottom: 15, marginLeft: 5 }}>
                  <View style={{ justifyContent: "center", alignItems: "center", margin: 5, marginLeft: 15, marginRight: 15 }}>
                    <Text style={{ color: 'white', fontSize: 20 }}>염판 17</Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>

              <View style={{ flex: 0.3 }}></View>

              <View style={{ flexDirection: 'row', flex: 2 }}>
                <View style={styles.circleStateGreen}></View>
                <View style={{ flex: 1 }}></View>
                <View style={styles.circleStateGreen}></View>
                <View style={{ flex: 1 }}></View>
                <View style={styles.circleStateGreen}></View>
                <View style={{ flex: 1 }}></View>
                <View style={styles.circleStateRed}></View>
              </View>

              <View style={{ flex: 0.3 }}></View>

              {solt17 && <View style={{ width: offOkayW, height: offOkayH, position: 'absolute', backgroundColor: 'rgba(13, 13, 13, 0.6)', borderRadius: 10 }}>
                <TouchableWithoutFeedback onPress={() => setsolt17(false)}>
                  <View style={{ width: offOkayW, height: offOkayH }}></View>
                </TouchableWithoutFeedback>
              </View>}
            </View>
            {/* 염판 17 */}

            <View style={{ height: 10 }}></View>

            {/* 염판 18 */}
            <View style={styles.smallcontainer}>

              <TouchableWithoutFeedback onPress={() => { setsolt18(true) }}>
                <View style={{ justifyContent: "center", alignItems: "center", marginTop: 15, marginBottom: 15, marginLeft: 5 }}>
                  <View style={{ justifyContent: "center", alignItems: "center", margin: 5, marginLeft: 15, marginRight: 15 }}>
                    <Text style={{ color: 'white', fontSize: 20 }}>염판 18</Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>

              <View style={{ flex: 0.3 }}></View>

              <View style={{ flexDirection: 'row', flex: 2 }}>
                <View style={styles.circleStateGreen}></View>
                <View style={{ flex: 1 }}></View>
                <View style={styles.circleStateGreen}></View>
                <View style={{ flex: 1 }}></View>
                <View style={styles.circleStateGreen}></View>
                <View style={{ flex: 1 }}></View>
                <View style={styles.circleStateRed}></View>
              </View>

              <View style={{ flex: 0.3 }}></View>

              {solt18 && <View style={{ width: offOkayW, height: offOkayH, position: 'absolute', backgroundColor: 'rgba(13, 13, 13, 0.6)', borderRadius: 10 }}>
                <TouchableWithoutFeedback onPress={() => setsolt18(false)}>
                  <View style={{ width: offOkayW, height: offOkayH }}></View>
                </TouchableWithoutFeedback>
              </View>}
            </View>
            {/* 염판 18 */}

            <View style={{ height: 10 }}></View>

            {/* 염판 19 */}
            <View style={styles.smallcontainer}>

              <TouchableWithoutFeedback onPress={() => { setsolt19(true) }}>
                <View style={{ justifyContent: "center", alignItems: "center", marginTop: 15, marginBottom: 15, marginLeft: 5 }}>
                  <View style={{ justifyContent: "center", alignItems: "center", margin: 5, marginLeft: 15, marginRight: 15 }}>
                    <Text style={{ color: 'white', fontSize: 20 }}>염판 19</Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>

              <View style={{ flex: 0.3 }}></View>

              <View style={{ flexDirection: 'row', flex: 2 }}>
                <View style={styles.circleStateGreen}></View>
                <View style={{ flex: 1 }}></View>
                <View style={styles.circleStateGreen}></View>
                <View style={{ flex: 1 }}></View>
                <View style={styles.circleStateGreen}></View>
                <View style={{ flex: 1 }}></View>
                <View style={styles.circleStateRed}></View>
              </View>

              <View style={{ flex: 0.3 }}></View>

              {solt19 && <View style={{ width: offOkayW, height: offOkayH, position: 'absolute', backgroundColor: 'rgba(13, 13, 13, 0.6)', borderRadius: 10 }}>
                <TouchableWithoutFeedback onPress={() => setsolt19(false)}>
                  <View style={{ width: offOkayW, height: offOkayH }}></View>
                </TouchableWithoutFeedback>
              </View>}
            </View>
            {/* 염판 19 */}

            <View style={{ height: 10 }}></View>

            {/* 염판 20 */}
            <View style={styles.smallcontainer}>

              <TouchableWithoutFeedback onPress={() => { setsolt20(true) }}>
                <View style={{ justifyContent: "center", alignItems: "center", marginTop: 15, marginBottom: 15, marginLeft: 5 }}>
                  <View style={{ justifyContent: "center", alignItems: "center", margin: 5, marginLeft: 15, marginRight: 15 }}>
                    <Text style={{ color: 'white', fontSize: 20 }}>염판 20</Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>

              <View style={{ flex: 0.3 }}></View>

              <View style={{ flexDirection: 'row', flex: 2 }}>
                <View style={styles.circleStateGreen}></View>
                <View style={{ flex: 1 }}></View>
                <View style={styles.circleStateGreen}></View>
                <View style={{ flex: 1 }}></View>
                <View style={styles.circleStateGreen}></View>
                <View style={{ flex: 1 }}></View>
                <View style={styles.circleStateRed}></View>
              </View>

              <View style={{ flex: 0.3 }}></View>

              {solt20 && <View style={{ width: offOkayW, height: offOkayH, position: 'absolute', backgroundColor: 'rgba(13, 13, 13, 0.6)', borderRadius: 10 }}>
                <TouchableWithoutFeedback onPress={() => setsolt20(false)}>
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
