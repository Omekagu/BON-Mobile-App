import { View, Text, TouchableOpacity } from 'react-native';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TabBar({ state, descriptors, navigation }) {
  const icons = {
    Home: (props) => (
      <SimpleLineIcons name="home" size={24} color={grayColor} {...props} />
    ),
    Bookings: (props) => (
      <MaterialIcons
        name="library-books"
        size={24}
        color={grayColor}
        {...props}
      />
    ),
    Saved: (props) => (
      <MaterialCommunityIcons
        name="content-save-check-outline"
        size={24}
        color={grayColor}
        {...props}
      />
    ),

    More: (props) => (
      <MaterialIcons name="more-horiz" size={24} color={grayColor} {...props} />
    ),
  };
  const primaryColor = '#a63932';
  const grayColor = '#a3a195';
  return (
    <View
      style={{
        position: 'absolute',
        bottom: 40,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 25,
        borderCurve: 'continuous',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 10,
        shadowOpacity: 0.1,
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        if (['_sitemap', '+not-found'].includes(route.name)) return null;
        // console.log('root name:', route.name);

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.name}
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
          >
            {icons[route.name]({
              color: isFocused ? primaryColor : grayColor,
            })}
            <Text style={{ color: isFocused ? primaryColor : grayColor }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
