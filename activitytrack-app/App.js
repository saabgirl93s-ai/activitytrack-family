import { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [showForm, setShowForm] = useState(false);
  const [activityName, setActivityName] = useState('');
  const [cost, setCost] = useState('');
  const [schedule, setSchedule] = useState('');
  const [category, setCategory] = useState('');
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    loadActivities();
  }, []);

  async function loadActivities() {
    const data = await AsyncStorage.getItem('activities');

    if (data) {
      setActivities(JSON.parse(data));
    }
  }

  async function saveActivities(updatedActivities) {
    setActivities(updatedActivities);
    await AsyncStorage.setItem('activities', JSON.stringify(updatedActivities));
  }

  async function saveActivity() {
    if (!activityName.trim()) return;

    const newActivity = {
      id: Date.now(),
      name: activityName,
      cost,
      schedule,
      category,
    };

    const updated = [...activities, newActivity];

    await saveActivities(updated);

    setActivityName('');
    setCost('');
    setSchedule('');
    setCategory('');
    setShowForm(false);
  }

  async function deleteActivity(id) {
    const updated = activities.filter((activity) => activity.id !== id);
    await saveActivities(updated);
  }

  const monthlyTotal = activities.reduce((total, activity) => {
    return total + Number(activity.cost || 0);
  }, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ActivityTrack Family</Text>

      <Text style={styles.subtitle}>
        Track kids activities, schedules, and budget.
      </Text>

      <View style={styles.totalCard}>
        <Text style={styles.totalLabel}>Monthly Activity Total</Text>
        <Text style={styles.totalAmount}>${monthlyTotal}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Landon</Text>

        {activities.length === 0 ? (
          <Text style={styles.cardText}>No activities added yet.</Text>
        ) : (
          activities.map((activity) => (
            <View key={activity.id} style={styles.activityItem}>
              <View style={styles.activityHeader}>
                <View>
                  <Text style={styles.activityName}>{activity.name}</Text>
                  <Text style={styles.cardText}>{activity.schedule}</Text>
                  <Text style={styles.cardText}>${activity.cost}</Text>

                  {activity.category ? (
                    <Text style={styles.categoryText}>{activity.category}</Text>
                  ) : null}
                </View>

                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => deleteActivity(activity.id)}
                >
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
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
            placeholder="Monthly cost"
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

          <TextInput
            style={styles.input}
            placeholder="Category (Sports, Arts, Camp...)"
            value={category}
            onChangeText={setCategory}
          />

          <TouchableOpacity style={styles.saveButton} onPress={saveActivity}>
            <Text style={styles.buttonText}>Save Activity</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={() => setShowForm(!showForm)}
      >
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
    marginBottom: 24,
  },
  totalCard: {
    backgroundColor: '#222',
    padding: 20,
    borderRadius: 18,
    marginBottom: 20,
  },
  totalLabel: {
    color: '#bbb',
    fontSize: 14,
    marginBottom: 4,
  },
  totalAmount: {
    color: 'white',
    fontSize: 32,
    fontWeight: '700',
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
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activityName: {
    fontSize: 17,
    fontWeight: '700',
  },
  categoryText: {
    marginTop: 6,
    alignSelf: 'flex-start',
    backgroundColor: '#d9e8d4',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    fontSize: 13,
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: '#d9534f',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  deleteButtonText: {
    color: 'white',
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