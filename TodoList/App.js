import { useState } from 'react';
import { StyleSheet, View, FlatList, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [courseGoal, setCourseGoal] = useState([]);

  function startAddGoalHandler() {
    setModalIsVisible(true);
  }


  function endAddGoalHandler() {
    setModalIsVisible(false);
  }

  function addGoalHandler(enteredGoalText) {
    setCourseGoal(currentCourseGoals =>
      [...currentCourseGoals,
      { text: enteredGoalText, id: Math.random().toString() },
      ])
    endAddGoalHandler();
  }

  function DeleteItemHandler(id) {
    setCourseGoal(currentCourseGoals => {
      return currentCourseGoals.filter((goal) => goal.id !== id)
    })
  }

  return (
    <>
      <StatusBar style='light' />
      <View style={styles.appContainer}>
        <Button
          title='הכנס\י משימה חדשה'
          color="#5e0acc"
          onPress={startAddGoalHandler}
        />
        <GoalInput
          visible={modalIsVisible}
          onAddGoal={addGoalHandler}
          onCancel={endAddGoalHandler}
        />

        <View style={styles.goalsContainer} >
          <FlatList
            data={courseGoal}
            renderItem={itemData => {
              return (
                <GoalItem
                  text={itemData.item.text}
                  id={itemData.item.id}
                  onDelete={DeleteItemHandler}
                />
              );
            }}
            keyExtractor={(item, index) => { return item.id; }}
            alwaysBounceVertical={false}
          />

        </View>

      </View >
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16
  },
  goalsContainer: {
    flex: 5,
  }
});
