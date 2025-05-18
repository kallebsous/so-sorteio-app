import * as React from 'react';
import { View, TouchableOpacity, Modal, Text, StyleSheet, Pressable } from 'react-native';
import { Check, ChevronRight, CircleDot } from 'lucide-react-native';

interface DropdownMenuProps {
  children: React.ReactNode;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ children }) => {
  return <View>{children}</View>;
};

interface DropdownMenuTriggerProps {
  children: React.ReactNode;
  onPress: () => void;
}

const DropdownMenuTrigger: React.FC<DropdownMenuTriggerProps> = ({ children, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.trigger}>
      {children}
    </TouchableOpacity>
  );
};

interface DropdownMenuContentProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const DropdownMenuContent: React.FC<DropdownMenuContentProps> = ({ visible, onClose, children }) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <View style={styles.content}>
          {children}
        </View>
      </Pressable>
    </Modal>
  );
};

interface DropdownMenuItemProps {
  onPress?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

const DropdownMenuItem: React.FC<DropdownMenuItemProps> = ({ onPress, children, disabled }) => {
  return (
    <TouchableOpacity
      style={[styles.item, disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.itemText}>{children}</Text>
    </TouchableOpacity>
  );
};

interface DropdownMenuSeparatorProps {
  style?: any;
}

const DropdownMenuSeparator: React.FC<DropdownMenuSeparatorProps> = ({ style }) => {
  return <View style={[styles.separator, style]} />;
};

// Exemplo de uso com estado
const DropdownMenuExample: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger onPress={() => setIsOpen(true)}>
        <Text style={styles.triggerText}>Abrir Menu</Text>
      </DropdownMenuTrigger>
      <DropdownMenuContent visible={isOpen} onClose={() => setIsOpen(false)}>
        <DropdownMenuItem onPress={() => { console.log('Item 1'); setIsOpen(false); }}>
          Item 1
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onPress={() => { console.log('Item 2'); setIsOpen(false); }}>
          Item 2
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          Item Desativado
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const styles = StyleSheet.create({
  trigger: {
    padding: 10,
    backgroundColor: '#6200EE',
    borderRadius: 6,
  },
  triggerText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    padding: 8,
    minWidth: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  item: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  itemText: {
    fontSize: 14,
    color: '#374151',
  },
  disabled: {
    opacity: 0.5,
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 4,
  },
});

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuExample, // Para testar
};