import * as React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar as RNCalendar } from 'react-native-calendars';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { buttonVariants } from '@/components/ui/button';

export interface CalendarProps {
  selected?: string; // Data selecionada no formato 'YYYY-MM-DD'
  onDayPress?: (date: { dateString: string }) => void;
  style?: any; // Estilos adicionais para o container
  markedDates?: { [date: string]: { selected?: boolean; disabled?: boolean; dotColor?: string } };
}

const Calendar: React.FC<CalendarProps> = ({
  selected,
  onDayPress,
  style,
  markedDates,
}) => {
  return (
    <View style={[styles.container, style]}>
      <RNCalendar
        current={selected}
        onDayPress={onDayPress}
        markedDates={markedDates}
        renderArrow={(direction) => (
          <TouchableOpacity
            style={[
              buttonVariants.variant.outline,
              styles.navButton,
              direction === 'left' ? styles.navButtonPrevious : styles.navButtonNext,
            ]}
          >
            {direction === 'left' ? (
              <ChevronLeft size={16} color="#374151" />
            ) : (
              <ChevronRight size={16} color="#374151" />
            )}
          </TouchableOpacity>
        )}
        theme={{
          calendarBackground: '#FFFFFF',
          textSectionTitleColor: '#6B7280',
          selectedDayBackgroundColor: '#6200EE',
          selectedDayTextColor: '#FFFFFF',
          todayTextColor: '#2DD4BF',
          dayTextColor: '#374151',
          textDisabledColor: '#D1D5DB',
          arrowColor: '#374151',
          monthTextColor: '#374151',
          textDayFontSize: 14,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 12,
        }}
        style={styles.calendar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12, // Equivalente a p-3
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
  },
  calendar: {
    width: '100%',
  },
  navButton: {
    width: 28, // h-7
    height: 28, // w-7
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    opacity: 0.5,
  },
  navButtonPrevious: {
    position: 'absolute',
    left: 4,
  },
  navButtonNext: {
    position: 'absolute',
    right: 4,
  },
});

Calendar.displayName = 'Calendar';

export { Calendar };