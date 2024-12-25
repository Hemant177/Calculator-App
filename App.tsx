import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
  Image,
} from 'react-native';

export default function App() {
  const [input, setInput] = useState<string>('0');
  const [result, setResult] = useState<string>('');
  const [history, setHistory] = useState<string[]>([]);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  const handlePress = (value: string) => {
    if (value === 'AC') {
      setInput('0');
      setResult('');
    } else if (value === '←') {
      setInput((prev) => (prev.length > 1 ? prev.slice(0, -1) : '0'));
    } else if (value === 'H') {
      setModalVisible(true);
    } else if (value === '=') {
      try {
        const evalResult = eval(input);
        setResult(evalResult.toString());
        setHistory((prevHistory) => [...prevHistory, `${input} = ${evalResult}`]);
      } catch (error) {
        setResult('Error');
      }
    } else {
      setInput((prev) => (prev === '0' ? value : prev + value));
    }
  };

  const buttons = [
    'AC', '←', '%', '/',
    '7', '8', '9', '*',
    '4', '5', '6', '-',
    '1', '2', '3', '+',
    'H', '0', '.', '=',
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('./assets/calci.png')} // Path to your image
          style={styles.calculatorImage}
        />
        <Text style={styles.calculatorName}>Calculator</Text>
      </View>

      <View style={styles.resultContainer}>
        <Text style={styles.input}>{input}</Text>
        {result !== '' && <Text style={styles.result}>= {result}</Text>}
      </View>

      <View style={styles.buttonsContainer}>
        {buttons.map((button) => (
          <TouchableOpacity
            key={button}
            style={[
              styles.button,
              button === 'AC' ? styles.acButton : null,
              button === '←' || ['%', '/', '*', '-', '+'].includes(button)
                ? styles.deleteButton
                : null,
              button === 'H' ? styles.historyButton : null,
              button === '=' ? styles.equalButton : null,
            ]}
            onPress={() => handlePress(button)}
          >
            <Text
              style={[
                styles.buttonText,
                button === 'AC' || button === '←' || button === 'H' || button === '='
                  ? styles.specialButtonText
                  : null,
              ]}
            >
              {button}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>History</Text>
            {history.length > 0 ? (
              <FlatList
                data={history}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <Text style={styles.historyItem}>{item}</Text>
                )}
              />
            ) : (
              <Text style={styles.noHistory}>No history yet</Text>
            )}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Calc by Hemant Patil</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 40,
  },
  calculatorImage: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  calculatorName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginBottom: 10,
  },
  input: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
  },
  result: {
    fontSize: 24,
    color: '#888',
    marginTop: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  button: {
    width: '22%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    borderRadius: 10,
    margin: '1%',
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  acButton: {
    backgroundColor: '#FF3B30',
  },
  deleteButton: {
    backgroundColor: '#FF9500', // Style for %, /, *, -, +
  },
  historyButton: {
    backgroundColor: '#34C759',
  },
  equalButton: {
    backgroundColor: '#28a745',
  },
  specialButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  historyItem: {
    fontSize: 18,
    marginVertical: 5,
    color: '#333',
  },
  noHistory: {
    fontSize: 18,
    color: '#888',
    marginBottom: 20,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#FF3B30',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  footer: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
  footerText: {
    fontSize: 16,
    color: '#000',
  },
});
