import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';

export default function App() {
  const [showForm, setShowForm] = useState(false);
  const [activityName, setActivityName] = useState('');
  const [cost, setCost] = useState('');
  const [schedule, setSchedule] = useState('');
  const [activities, setActivities] = useState([]);

  function saveActivity() {
    if (!activityName.trim()) return;

    const newActivity = {
      id: Date.now(),
      name: activityName,
      cost,
      schedule,
    };

    setActivities([...activities, newActivity]);
    setActivityName('');
    setCost('');
    setSchedule('');
    setShowForm(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ActivityTrack Family</Text>
      <Text style={styles.subtitle}>Track kids activities, schedules, and budget.</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Landon</Text>

        {activities.length === 0 ? (
          <Text style={styles.cardText}>No activities added yet.</Text>
        ) : (
          activities.map((activity) => (
            <View key={activity.id} style={styles.activityItem}>
              <Text style={styles.activityName}>{activity.name}</Text>
              <Text style={styles.cardText}>{activity.schedule}</Text>
              <Text style={styles.cardText}>${activity.cost}</Text>
            </View>
          ))
        )}
      </View>

      {showForm && (
        <View style={styles.form}>
          <Text style={styles.formTitle}>Add Activity</Text>

          <TextInput
            style={styles.input}
            placeholder="Activity name"
            value={activityName}
            onChangeText={setActivityName}
          />

          <TextInput
            style={styles.input}
            placeholder="Cost"
            value={cost}
            onChangeText={setCost}
            keyboardType="numeric"
          />

          <TextInput
            style={styles.input}
            placeholder="Day/time"
            value={schedule}
            onChangeText={setSchedule}
          />

          <TouchableOpacity style={styles.saveButton} onPress={saveActivity}>
            <Text style={styles.buttonText}>Save Activity</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity style={styles.button} onPress={() => setShowForm(!showForm)}>
        <Text style={styles.buttonText}>
          {showForm ? 'Cancel' : '+ Add Activity'}
        </Text>
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
    marginTop: 2,
  },
  activityItem: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  activityName: {
    fontSize: 17,
    fontWeight: '700',
  },
  form: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 18,
    marginBottom: 20,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#222',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#222',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '700',
  },
});
