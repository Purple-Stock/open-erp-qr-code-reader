import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import {
  Header,
  UserInfo,
  UserImage,
  UserHello,
  Container,
  OptionsList,
  Option,
  OptionLabel,
} from './styles';

const Home: React.FC = () => {
  const navigation = useNavigation();

  return (
    <>
      <Header>
        <UserInfo>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <UserImage
              source={{
                uri: 'https://api.adorable.io/avatars/285/john.png',
              }}
            />
            <UserHello>Olá, John Doe</UserHello>
          </View>

          <Feather name="bell" size={24} color="#fff" />
        </UserInfo>

        <Text
          style={{
            color: 'white',
            fontSize: 24,
            fontWeight: 'bold',
            fontStyle: 'italic',
            textAlign: 'center',
            textDecorationLine: 'underline',
          }}
        >
          TEMPLATE
        </Text>
      </Header>

      <Container>
        <OptionsList>
          <Option
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Reader')}
          >
            <Feather name="maximize" size={36} color="#2d3436" />
            <OptionLabel>Ler produto</OptionLabel>
          </Option>

          <Option
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Register')}
          >
            <Feather name="plus-circle" size={36} color="#2d3436" />
            <OptionLabel>Cadastrar entrada</OptionLabel>
          </Option>

          <Option
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Inventory')}
          >
            <Feather name="archive" size={36} color="#2d3436" />
            <OptionLabel>Inventário</OptionLabel>
          </Option>
        </OptionsList>
      </Container>
    </>
  );
};

export default Home;
