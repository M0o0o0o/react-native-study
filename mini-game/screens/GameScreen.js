import { StyleSheet, View, Alert, Text, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Title from "../components/ui/title";
import { useState, useEffect } from "react";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";

import Card from "../components/ui/Card";
import InstrunctionText from "../components/ui/InstructionText";
import GuessLogItem from "../components/game/GuessLogItem";

function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({ userNumber, onGameOver }) {
  const initialGuess = generateRandomBetween(
    // error
    1, // minBoundary,
    100, // maxBoundary,
    userNumber
  );
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState([initialGuess]);

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver(guessRounds.lenght);
    }
  }, [currentGuess, userNumber, onGameOver]);

  useEffect(() => {
    // 새 게임이 시작되는 경우 minBoundary와 maxBoundary를 다시 설정하기 위함
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  function nextGuessHandler(direction) {
    // 'lower', 'greater'

    if (
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === "greater" && currentGuess > userNumber)
    ) {
      Alert.alert("Don't lie", "you know that this is wrong", [
        {
          test: "sorry!",
          styles: "cancel",
        },
      ]);
      return;
    }

    if (direction === "lower") {
      maxBoundary = currentGuess - 1;
    } else {
      minBoundary = currentGuess + 1;
    }

    const newRndNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );

    setCurrentGuess(newRndNumber);
    setGuessRounds((prevGuessRounds) => [...prevGuessRounds, newRndNumber]);
  }

  const guessRoundsListLength = guessRounds.length;

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstrunctionText style={styles.instructionText}>
          High Or low
        </InstrunctionText>
        <View>
          <View style={styles.buttonsContainer}>
            <View style={styles.buttonContainer}>
              <PrimaryButton onPress={nextGuessHandler.bind(this, "greater")}>
                <Ionicons name="md-add" size={24} color="white" />
              </PrimaryButton>
            </View>
            <View style={styles.buttonContainer}>
              <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
                <Ionicons name="md-remove" size={24} color="white" />
              </PrimaryButton>
            </View>
          </View>
        </View>
      </Card>
      <View style={styles.listContainer}>
        <FlatList
          data={guessRounds}
          renderItem={(itemData) => (
            <GuessLogItem
              roundNumber={guessRoundsListLength - itemData.index}
              guess={itemData.item}
            />
          )}
          keyExtractor={(item) => item}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
  },
  instructionText: {
    marginBottom: 12,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonConatiner: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
});

export default GameScreen;

/**
 * FlatList는 기본적으로 높이를 무한으로 가질 수 있기 때문에 가질 수 있는 height를 View로 감싸서 제어
 */
