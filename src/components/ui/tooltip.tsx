import * as React from 'react';
import { View, Text, Modal, Pressable, StyleSheet } from 'react-native';

interface TooltipProviderProps {
  children: React.ReactNode;
}

const TooltipProvider: React.FC<TooltipProviderProps> = ({ children }) => {
  return <View>{children}</View>;
};

interface TooltipProps {
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ children }) => {
  return <View>{children}</View>;
};

interface TooltipTriggerProps {
  children: React.ReactNode;
  onOpen: () => void;
}

const TooltipTrigger: React.FC<TooltipTriggerProps> = ({ children, onOpen }) => {
  return (
    <Pressable onLongPress={onOpen}>
      {children}
    </Pressable>
  );
};

interface TooltipContentProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  style?: any;
}

const TooltipContent: React.FC<TooltipContentProps> = ({ visible, onClose, children, style }) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <View style={[styles.content, style]}>
          <Text style={styles.contentText}>{children}</Text>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: '#6200EE', // Cor primária (ajuste ao tema)
    paddingHorizontal: 12, // px-3
    paddingVertical: 6, // py-1.5
    borderRadius: 6, // rounded-md
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  contentText: {
    fontSize: 12, // text-xs
    color: '#FFFFFF', // text-primary-foreground
    fontWeight: '500',
  },
});

// Exemplo de uso
const TooltipExample: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger onOpen={() => setIsOpen(true)}>
          <Text style={{ color: '#374151' }}>Toque e segure</Text>
        </TooltipTrigger>
        <TooltipContent visible={isOpen} onClose={() => setIsOpen(false)}>
          Esta é uma dica!
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider, TooltipExample };