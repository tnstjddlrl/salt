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

  const [switchValue, setSwitchValue] = useState(false)

  const [mainAlarm, setMainAlarm] = useState(false)

  const [salt, setsalt] = useState([{
    id: 1,
    state: '0',
    s1: '0',
    s2: '0',
    s3: '0',
    s4: '0',
  },
  {
    id: 2,
    state: '0',
    s1: '0',
    s2: '0',
    s3: '0',
    s4: '0',
  },
  {
    id: 3,
    state: '0',
    s1: '0',
    s2: '0',
    s3: '0',
    s4: '0',
  },
  {
    id: 4,
    state: '0',
    s1: '0',
    s2: '0',
    s3: '0',
    s4: '0',
  },
  {
    id: 5,
    state: '0',
    s1: '0',
    s2: '0',
    s3: '0',
    s4: '0',
  },
  {
    id: 6,
    state: '0',
    s1: '0',
    s2: '0',
    s3: '0',
    s4: '0',
  },
  {
    id: 7,
    state: '0',
    s1: '0',
    s2: '0',
    s3: '0',
    s4: '0',
  },
  {
    id: 8,
    state: '0',
    s1: '0',
    s2: '0',
    s3: '0',
    s4: '0',
  },
  {
    id: 9,
    state: '0',
    s1: '0',
    s2: '0',
    s3: '0',
    s4: '0',
  },
  {
    id: 10,
    state: '0',
    s1: '0',
    s2: '0',
    s3: '0',
    s4: '0',
  },
  {
    id: 11,
    state: '0',
    s1: '0',
    s2: '0',
    s3: '0',
    s4: '0',
  },
  {
    id: 12,
    state: '0',
    s1: '0',
    s2: '0',
    s3: '0',
    s4: '0',
  },
  {
    id: 13,
    state: '0',
    s1: '0',
    s2: '0',
    s3: '0',
    s4: '0',
  },
  {
    id: 14,
    state: '0',
    s1: '0',
    s2: '0',
    s3: '0',
    s4: '0',
  },
  {
    id: 15,
    state: '0',
    s1: '0',
    s2: '0',
    s3: '0',
    s4: '0',
  },
  {
    id: 16,
    state: '0',
    s1: '0',
    s2: '0',
    s3: '0',
    s4: '0',
  },
  {
    id: 17,
    state: '0',
    s1: '0',
    s2: '0',
    s3: '0',
    s4: '0',
  },
  {
    id: 18,
    state: '0',
    s1: '0',
    s2: '0',
    s3: '0',
    s4: '0',
  },
  {
    id: 19,
    state: '0',
    s1: '0',
    s2: '0',
    s3: '0',
    s4: '0',
  },
  {
    id: 20,
    state: '0',
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


      console.log('데이터 받기 : ' + command)

      //메인전원확인,전원켜져있음 데이터 받기
      if ('' + res == 'main_power_off') {
        setSwitchValue(false)
        Alert.alert('메인 전원이 꺼져있습니다.', '전원을 켜주세요!')
      } else if (JSON.parse(command)[0].power == 1) {
        var parsecmd = JSON.parse(command);
        setSwitchValue(true)

        //알람확인
        if (parsecmd[0].state == 0) {
          setMainAlarm(false)
          console.log('알람 꺼짐 확인')
        } else if (parsecmd[0].state == 1) {
          fadin()
          setMainAlarm(true)
          console.log('알람 켜짐 확인')
        }

        //데이터 배열에 집어넣기
        match(JSON.stringify(parsecmd))
      }
    })//클라온 끝
  }, [])//useeffect 끝

  function match(json) {
    var parsejson = JSON.parse(json)

    setsalt(perv => [
      {
        ...perv[0],

        state: parsejson[1].power,
        s1: parsejson[1].state.split(':')[0],
        s2: parsejson[1].state.split(':')[1],
        s3: parsejson[1].state.split(':')[2],
        s4: parsejson[1].state.split(':')[3]
      },
      {
        ...perv[1],
        state: parsejson[2].power,
        s1: parsejson[2].state.split(':')[0],
        s2: parsejson[2].state.split(':')[1],
        s3: parsejson[2].state.split(':')[2],
        s4: parsejson[2].state.split(':')[3]
      },
      {
        ...perv[2],
        state: parsejson[3].power,
        s1: parsejson[3].state.split(':')[0],
        s2: parsejson[3].state.split(':')[1],
        s3: parsejson[3].state.split(':')[2],
        s4: parsejson[3].state.split(':')[3]
      },
      {
        ...perv[3],
        state: parsejson[4].power,
        s1: parsejson[4].state.split(':')[0],
        s2: parsejson[4].state.split(':')[1],
        s3: parsejson[4].state.split(':')[2],
        s4: parsejson[4].state.split(':')[3]
      },
      {
        ...perv[4],
        state: parsejson[5].power,
        s1: parsejson[5].state.split(':')[0],
        s2: parsejson[5].state.split(':')[1],
        s3: parsejson[5].state.split(':')[2],
        s4: parsejson[5].state.split(':')[3]
      },
      {
        ...perv[5],
        state: parsejson[6].power,
        s1: parsejson[6].state.split(':')[0],
        s2: parsejson[6].state.split(':')[1],
        s3: parsejson[6].state.split(':')[2],
        s4: parsejson[6].state.split(':')[3]
      },
      {
        ...perv[6],
        state: parsejson[7].power,
        s1: parsejson[7].state.split(':')[0],
        s2: parsejson[7].state.split(':')[1],
        s3: parsejson[7].state.split(':')[2],
        s4: parsejson[7].state.split(':')[3]
      },
      {
        ...perv[7],
        state: parsejson[8].power,
        s1: parsejson[8].state.split(':')[0],
        s2: parsejson[8].state.split(':')[1],
        s3: parsejson[8].state.split(':')[2],
        s4: parsejson[8].state.split(':')[3]
      },
      {
        ...perv[8],
        state: parsejson[9].power,
        s1: parsejson[9].state.split(':')[0],
        s2: parsejson[9].state.split(':')[1],
        s3: parsejson[9].state.split(':')[2],
        s4: parsejson[9].state.split(':')[3]
      },
      {
        ...perv[9],
        state: parsejson[10].power,
        s1: parsejson[10].state.split(':')[0],
        s2: parsejson[10].state.split(':')[1],
        s3: parsejson[10].state.split(':')[2],
        s4: parsejson[10].state.split(':')[3]
      },
      {
        ...perv[10],
        state: parsejson[11].power,
        s1: parsejson[11].state.split(':')[0],
        s2: parsejson[11].state.split(':')[1],
        s3: parsejson[11].state.split(':')[2],
        s4: parsejson[11].state.split(':')[3]
      },
      {
        ...perv[11],
        state: parsejson[12].power,
        s1: parsejson[12].state.split(':')[0],
        s2: parsejson[12].state.split(':')[1],
        s3: parsejson[12].state.split(':')[2],
        s4: parsejson[12].state.split(':')[3]
      },
      {
        ...perv[12],
        state: parsejson[13].power,
        s1: parsejson[13].state.split(':')[0],
        s2: parsejson[13].state.split(':')[1],
        s3: parsejson[13].state.split(':')[2],
        s4: parsejson[13].state.split(':')[3]
      },
      {
        ...perv[13],
        state: parsejson[14].power,
        s1: parsejson[14].state.split(':')[0],
        s2: parsejson[14].state.split(':')[1],
        s3: parsejson[14].state.split(':')[2],
        s4: parsejson[14].state.split(':')[3]
      },
      {
        ...perv[14],
        state: parsejson[15].power,
        s1: parsejson[15].state.split(':')[0],
        s2: parsejson[15].state.split(':')[1],
        s3: parsejson[15].state.split(':')[2],
        s4: parsejson[15].state.split(':')[3]
      },
      {
        ...perv[15],
        state: parsejson[16].power,
        s1: parsejson[16].state.split(':')[0],
        s2: parsejson[16].state.split(':')[1],
        s3: parsejson[16].state.split(':')[2],
        s4: parsejson[16].state.split(':')[3]
      },
      {
        ...perv[16],
        state: parsejson[17].power,
        s1: parsejson[17].state.split(':')[0],
        s2: parsejson[17].state.split(':')[1],
        s3: parsejson[17].state.split(':')[2],
        s4: parsejson[17].state.split(':')[3]
      },
      {
        ...perv[17],
        state: parsejson[18].power,
        s1: parsejson[18].state.split(':')[0],
        s2: parsejson[18].state.split(':')[1],
        s3: parsejson[18].state.split(':')[2],
        s4: parsejson[18].state.split(':')[3]
      },
      {
        ...perv[18],
        state: parsejson[19].power,
        s1: parsejson[19].state.split(':')[0],
        s2: parsejson[19].state.split(':')[1],
        s3: parsejson[19].state.split(':')[2],
        s4: parsejson[19].state.split(':')[3]
      },
      {
        ...perv[19],
        state: parsejson[20].power,
        s1: parsejson[20].state.split(':')[0],
        s2: parsejson[20].state.split(':')[1],
        s3: parsejson[20].state.split(':')[2],
        s4: parsejson[20].state.split(':')[3]
      },
    ])
    console.log('확인 : ')
  }//match 끝 //json형태로 서버에서 들어온 값을 배열에 넣어주는 역활

  useEffect(() => {
    if (switchValue == false) {
      setsalt(perv => [{ ...perv[0], state: '0', }, { ...perv[1], state: '0' }, { ...perv[2], state: '0' }, { ...perv[3], state: '0' }, { ...perv[4], state: '0' }, { ...perv[5], state: '0' }, { ...perv[6], state: '0' }, { ...perv[7], state: '0' }, { ...perv[8], state: '0' }, { ...perv[9], state: '0' }, { ...perv[10], state: '0' }, { ...perv[11], state: '0' }, { ...perv[12], state: '0' }, { ...perv[13], state: '0' }, { ...perv[14], state: '0' }, { ...perv[15], state: '0' }, { ...perv[16], state: '0' }, { ...perv[17], state: '0' }, { ...perv[18], state: '0' }, { ...perv[19], state: '0' }])
    } else if (switchValue == true) {
      reqState()
    }
  }, [switchValue]) //메인 스위치 변경시 실행 함수들, useeffect
  //스위치가 off가 되면 모든 염판을 off상태로 바꾸어줌

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
  //// 애니메이션 속성 끝

  //염판 정보를 jsx로 변환하여 뿌려주기
  const SaltPush = () => {
    var List = []

    for (var i = 0; i < 20; i++) {
      List.push(<SoltPan index={i} id={salt[i].id} state={salt[i].state} s1={salt[i].s1} s2={salt[i].s2} s3={salt[i].s3} s4={salt[i].s4}></SoltPan>)
    }

    return List
  }//SaltPush 끝

  //염판 jsx, 프롭으로 받아서 정보 표현하기// 자동으로 값들이 변경되어 보임
  const SoltPan = (prop) => {
    return (
      <View style={styles.smallcontainer}>

        {/* 염판 글자부분 */}
        <TouchableWithoutFeedback onPress={() => {
          setsalt(prev => [...prev.slice(0, prop.index),
          {
            ...prev[prop.index],
            state: '0',
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
          <View style={{ justifyContent: "center", alignItems: "center", marginTop: 15, marginBottom: 15, marginLeft: 5, flex: 1, }}>
            <View style={{ justifyContent: "center", alignItems: "center", margin: 5, marginLeft: 15, marginRight: 15 }}>
              <Text style={{ color: 'white', fontSize: 20 }}>염판 {prop.id}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        {/* 염판 글자부분 끝 */}

        <View style={{ flex: 0.3 }}></View>

        {/* 수문 확인 부분 */}
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
        {/* 수문 확인 부분 끝 */}

        <View style={{ flex: 0.3 }}></View>

        {/* off상태 표현창 */}
        {prop.state == '0' && <View style={{ width: chwidth - 20, position: 'absolute', backgroundColor: 'rgba(13, 13, 13, 0.6)', borderRadius: 10 }}>
          <TouchableWithoutFeedback onPress={() => {
            console.log('클릭확인')
            if (switchValue == true) {
              setsalt(prev => [...prev.slice(0, prop.index),
              {
                ...prev[prop.index],
                state: '1',
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
        {/* off상태 표현창 끝 */}

      </View>
    )
  }// saltpan 끝

  //메인스위치 return //
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
                    try {
                      client.write('$P,O,1,0')
                    } catch (error) {
                      Alert.alert('서버와 연결이 끊겼습니다.', '앱을 재부팅해주세요.')
                    }

                    setTimeout(() => {
                      reqState()

                    }, 1000);
                  } else if (val == false) {
                    console.log('메인 폴스')
                    try {
                      client.write('$P,O,0,0')
                    } catch (error) {
                      Alert.alert('서버와 연결이 끊겼습니다.', '앱을 재부팅해주세요.')
                    }

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

            {/* 염판 */}
            <SaltPush></SaltPush>

          </ScrollView>

          {/* 로딩창 */}
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
  )//메인스위치 return 끝

}

export default App;