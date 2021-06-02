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
  Animated,
  Modal,
} from 'react-native';

const chwidth = Dimensions.get('window').width
const chheight = Dimensions.get('window').height

import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios'

import client from './client'

import { Switch } from 'react-native-switch';

import messaging from '@react-native-firebase/messaging';

import AutoHeightImage from 'react-native-auto-height-image';
import { RecoilRoot, useRecoilState, waitForAll } from 'recoil';
import { saltstate, saltTest } from './atom';


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
    <RecoilRoot>
      <NavigationContainer>
        <Stack.Navigator headerMode={"none"}>
          <Stack.Screen name="메인스위치" component={MainSwitch} />
        </Stack.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  )
}

const oceanImg = require('./img/ocean.png')

const MainSwitch = () => {
  const navigation = useNavigation()

  //스타일 
  const [circlewidth, setCirclewidth] = useState(0)

  const styles = StyleSheet.create({
    smallcontainer: {
      width: chwidth - 20, height: 70, backgroundColor: 'rgba(13, 13, 13, 0.25)', flexDirection: "row", borderRadius: 10, alignItems: "center", marginBottom: 10
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

  const [salt, setsalt] = useState([{
    id: 1,
    state: true,
    s1: '0',
    s2: '0',
    s3: '0',
    s4: '0',
  },
  {
    id: 2,
    state: true,
    s1: '0',
    s2: '0',
    s3: '0',
    s4: '0',
  },
  {
    id: 3,
    state: true,
    s1: '0',
    s2: '0',
    s3: '0',
    s4: '0',
  },
  {
    id: 4,
    state: true,
    s1: '0',
    s2: '0',
    s3: '0',
    s4: '0',
  },
  {
    id: 5,
    state: true,
    s1: '0',
    s2: '0',
    s3: '0',
    s4: '0',
  },
  {
    id: 6,
    state: true,
    s1: '0',
    s2: '0',
    s3: '0',
    s4: '0',
  },
  {
    id: 7,
    state: true,
    s1: '0',
    s2: '0',
    s3: '0',
    s4: '0',
  },
  {
    id: 8,
    state: true,
    s1: '0',
    s2: '0',
    s3: '0',
    s4: '0',
  },
  {
    id: 9,
    state: true,
    s1: '0',
    s2: '0',
    s3: '0',
    s4: '0',
  },
  {
    id: 10,
    state: true,
    s1: '0',
    s2: '0',
    s3: '0',
    s4: '0',
  },
  {
    id: 11,
    state: true,
    s1: '0',
    s2: '0',
    s3: '0',
    s4: '0',
  },
  {
    id: 12,
    state: true,
    s1: '0',
    s2: '0',
    s3: '0',
    s4: '0',
  },
  {
    id: 13,
    state: true,
    s1: '0',
    s2: '0',
    s3: '0',
    s4: '0',
  },
  {
    id: 14,
    state: true,
    s1: '0',
    s2: '0',
    s3: '0',
    s4: '0',
  },
  {
    id: 15,
    state: true,
    s1: '0',
    s2: '0',
    s3: '0',
    s4: '0',
  },
  {
    id: 16,
    state: true,
    s1: '0',
    s2: '0',
    s3: '0',
    s4: '0',
  },
  {
    id: 17,
    state: true,
    s1: '0',
    s2: '0',
    s3: '0',
    s4: '0',
  },
  {
    id: 18,
    state: true,
    s1: '0',
    s2: '0',
    s3: '0',
    s4: '0',
  },
  {
    id: 19,
    state: true,
    s1: '0',
    s2: '0',
    s3: '0',
    s4: '0',
  },
  {
    id: 20,
    state: true,
    s1: '0',
    s2: '0',
    s3: '0',
    s4: '0',
  },])

  ///
  function reqState() {
    try {
      client.write('$C,O,0,0')
      console.log('전송!')
    } catch (error) {
      console.log(error)
      Alert.alert('서버와 연결이 끊겼습니다.', '앱을 재부팅해주세요.')
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
          fadin()
          setMainAlarm(true)
          console.log('알람 켜짐 확인')
        }

        for (var i = 1; i <= 20; i++) {
          console.log('체크 확인')
          match(JSON.stringify(JSON.parse(command)[i]), i)
        }

      }


    })



  }, [])

  function match(json, ss) {

    var state = true;

    if (JSON.parse(json).power == '1') {
      state = false;
    }

    setsalt(perv => [...perv.slice(0, ss - 1),
    {
      ...perv[ss - 1],
      id: ss,
      state: state,
      s1: JSON.parse(json).state.split(':')[0],
      s2: JSON.parse(json).state.split(':')[1],
      s3: JSON.parse(json).state.split(':')[2],
      s4: JSON.parse(json).state.split(':')[3]
    },
    ...perv.slice(ss, 20)
    ])

    console.log('확인 : ' + ss)

  }





  const [switchValue, setSwitchValue] = useState(false)

  useEffect(() => {
    // Alert.alert('스위치 값 변경')
    if (switchValue == false) {

      setsalt(perv => [
        {
          ...perv[0],
          state: true,
        },
        {
          ...perv[1],
          state: true
        },
        {
          ...perv[2],
          state: true
        },
        {
          ...perv[3],
          state: true
        },
        {
          ...perv[4],
          state: true
        },
        {
          ...perv[5],
          state: true
        },
        {
          ...perv[6],
          state: true
        },
        {
          ...perv[7],
          state: true
        },
        {
          ...perv[8],
          state: true
        },
        {
          ...perv[9],
          state: true
        },
        {
          ...perv[10],
          state: true
        },
        {
          ...perv[11],
          state: true
        },
        {
          ...perv[12],
          state: true
        },
        {
          ...perv[13],
          state: true
        },
        {
          ...perv[14],
          state: true
        },
        {
          ...perv[15],
          state: true
        },
        {
          ...perv[16],
          state: true
        },
        {
          ...perv[17],
          state: true
        },
        {
          ...perv[18],
          state: true
        },
        {
          ...perv[19],
          state: true
        }
      ])


      console.log('염판 오프 확인')
    } else if (switchValue == true) {
      // reqState()
      console.log('req 확인')
    }
  }, [switchValue])


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

  ////


  ////

  const TestPush = () => {
    var List = []

    for (var i = 0; i < 20; i++) {
      List.push(<Test index={i} id={salt[i].id} state={salt[i].state} s1={salt[i].s1} s2={salt[i].s2} s3={salt[i].s3} s4={salt[i].s4}></Test>)
    }

    return (List)
  }

  ////

  const Test = (prop) => {
    return (
      <View style={styles.smallcontainer}>

        <TouchableWithoutFeedback onPress={() => {
          setsalt(prev => [...prev.slice(0, prop.index),
          {
            ...prev[prop.index],
            state: true,
          },
          ...prev.slice(prop.index + 1, salt.length)
          ])
          try {
            client.write('$S,O,' + prop.id + ',0')
            console.log('염판 ' + prop.id + ' 전송')
          } catch (error) {
            Alert.alert('서버와 연결이 끊겼습니다.', '앱을 종료 후 다시 실행해주세요.')
          }

          setTimeout(() => {
            reqState()
          }, 1000);
        }}>
          <View style={{ justifyContent: "center", alignItems: "center", marginTop: 15, marginBottom: 15, marginLeft: 5 }}>
            <View style={{ justifyContent: "center", alignItems: "center", margin: 5, marginLeft: 15, marginRight: 15, width: 70 }}>
              <Text style={{ color: 'white', fontSize: 20 }}>염판 {prop.id}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>

        <View style={{ flex: 0.3 }}></View>

        <View style={{ flexDirection: 'row', flex: 2 }}>
          {prop.s1 == '0' ?
            <View onLayout={(data) => { setCirclewidth(data.nativeEvent.layout.width) }} style={styles.circleStateGreen}></View> :
            <View onLayout={(data) => { setCirclewidth(data.nativeEvent.layout.width) }} style={styles.circleStateRed}></View>
          }
          <View style={{ flex: 1 }}></View>
          {prop.s2 == '0' ?
            <View style={styles.circleStateGreen}></View> :
            <View style={styles.circleStateRed}></View>
          }
          <View style={{ flex: 1 }}></View>
          {prop.s3 == '0' ?
            <View style={styles.circleStateGreen}></View> :
            <View style={styles.circleStateRed}></View>
          }
          <View style={{ flex: 1 }}></View>
          {prop.s4 == '0' ?
            <View style={styles.circleStateGreen}></View> :
            <View style={styles.circleStateRed}></View>
          }
        </View>

        <View style={{ flex: 0.3 }}></View>

        {prop.state && <View style={{ width: chwidth - 20, position: 'absolute', backgroundColor: 'rgba(13, 13, 13, 0.6)', borderRadius: 10 }}>
          <TouchableWithoutFeedback onPress={() => {
            console.log('클릭확인')
            if (switchValue == true) {
              setsalt(prev => [...prev.slice(0, prop.index),
              {
                ...prev[prop.index],
                state: false,
              },
              ...prev.slice(prop.index + 1, salt.length)
              ])
              try {
                client.write('$S,O,' + prop.id + ',1')
                console.log('염판 ' + prop.id + ' 전송')
              } catch (error) {
                Alert.alert('서버와 연결이 끊겼습니다.', '앱을 종료 후 다시 실행해주세요.')
              }
              setTimeout(() => {
                reqState()
              }, 1000);
            } else {
              Alert.alert('먼저 스위치를 켜주세요')
            }


          }}>
            <View style={{ width: chwidth - 20, height: 70 }}></View>
          </TouchableWithoutFeedback>
        </View>}

      </View>
    )
  }


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

            <TestPush></TestPush>


            <View style={{ height: 20 }}></View>


          </ScrollView>




          {/* <View style={{ flex: 0.2 }}></View> */}

          {/* <Modal visible={circlewidth == 0} transparent={true}>
            <View style={{ width: chwidth, height: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
              <View style={{ width: chwidth / 2, height: chwidth / 2 - 50, borderRadius: chwidth / 10, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>로딩중 입니다.</Text>
              </View>
            </View>
          </Modal> */}


        </ImageBackground>
      </View>

    </SafeAreaView>
  )
}


// const SaltPan = () =>{
//   return(

//   )
// }





export default App;