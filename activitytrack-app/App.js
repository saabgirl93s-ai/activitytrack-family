import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {
  const [showMessage, setShowMessage] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ActivityTrack Family</Text>
      <Text style={styles.subtitle}>
        Track kids activities, schedules, and budget.
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Landon</Text>
        <Text style={styles.cardText}>No activities added yet.</Text>
      </View>

      {showMessage && (
        <Text style={{ marginBottom: 20 }}>
          Add Activity coming next 👇
        </Text>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={() => setShowMessage(true)}
      >
        <Text style={styles.buttonText}>+ Add Activity</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#f7f3ed',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 32,
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 18,
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 6,
  },
  cardText: {
    fontSize: 15,
  },
  button: {
    backgroundColor: '#222',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '700',
  },
});