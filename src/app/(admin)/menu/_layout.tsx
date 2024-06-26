import { Stack, Link } from 'expo-router';
import { Pressable } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '@/constants/Colors';


export default function MenuStack(){
    return  (
    <Stack>
      <Stack.Screen 
          name = "index" 
          options={{ 
           title: 'Menu',
            headerRight: () => (
              <Link href="/" asChild>
               <Pressable>
                 {({ pressed }) => (
                   <FontAwesome
                     name="plus-square-o"
                      size={25}
                      color={Colors.light.tint}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
               </Pressable>
              </Link>
            ),    
          }
        }
      />

    <Stack.Screen 
          name = "[id]" 
          options={{ 
           title: 'Menu',
            headerRight: () => (
              <Link href="/" asChild>
               <Pressable>
                 {({ pressed }) => (
                   <FontAwesome
                     name="pencil"
                      size={25}
                      color={Colors.light.tint}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
               </Pressable>
              </Link>
            ),    
          }
        }
      />

    </Stack>
    );
}