import { supabase } from '@/lib/supabase';
import { View, Text, Button } from 'react-native'

const ProfileScreen = () => {
  return (
    <View>
      <Button 
        title='Sign out' 
        onPress={async () => await supabase.auth.signOut()}
       />
    </View>
  );
}

export default ProfileScreen;