import { useState } from 'react';
import { View,Text, Modal, ModalProps, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { CheckCircle, CopySimple } from 'phosphor-react-native';

import * as Clipboard from 'expo-clipboard';

import { styles } from './styles';
import { THEME } from '../../theme';
import { Heading } from '../Heading';

interface Props extends ModalProps {
    discord: string
    onClose: () => void
}

export function DuoMatch({ discord, onClose, ...rest}: Props) {
  const [isCopping, setIsCopping] = useState(false);

  async function handleCopyDiscordToClipboard() {
    setIsCopping(true)
    await Clipboard.setStringAsync(discord)

    setTimeout(() => {
      setIsCopping(false)
    }, 5000)
    
  }

  return (
    <Modal 
      transparent 
      statusBarTranslucent 
      animationType="fade" 
      {...rest}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity
            style={styles.closeIcon}
            onPress={onClose}
          >
            <MaterialIcons 
              name="close" 
              size={20} 
              color={THEME.COLORS.CAPTION_500}
            />
          </TouchableOpacity>
          <CheckCircle 
            size={64}
            color={THEME.COLORS.SUCCESS}
            weight="bold"
          />

          <Heading 
            title="Let's play!"
            subtitle="Agora é só começar a jogar!"
            style={{alignItems: 'center', marginTop: 24}}
          />

          <Text style={styles.label}>
            Adicione no discord
          </Text>

          <TouchableOpacity 
            style={styles.discordButton}
            onPress={handleCopyDiscordToClipboard}
            disabled={isCopping}
          >
            <Text style={styles.discord}>
              { discord }              
            </Text>            
              { isCopping 
                ? <CheckCircle size={16} weight="fill" color={THEME.COLORS.SUCCESS} />
                : <CopySimple size={16} color={THEME.COLORS.CAPTION_400} /> 
              }          
          </TouchableOpacity>
        </View>        
      </View>
    </Modal>
  );
}