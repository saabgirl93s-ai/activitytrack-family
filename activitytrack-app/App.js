import { useState } from 'react';
export default function App() {
  const [showMessage, setShowMessage] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ActivityTrack Family</Text>
      <Text style={styles.subtitle}>Track kids activities, schedules, and budget.</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Landon</Text>
        <Text style={styles.cardText}>No activities added yet.</Text>
      </View>

      {showMessage && (
        <Text style={{ marginBottom: 20 }}>Add Activity coming next 👇</Text>
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