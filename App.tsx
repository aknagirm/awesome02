import {
  GestureResponderEvent,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {number, object} from 'yup';
import {Formik} from 'formik';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const passwordSchema = object().shape({
  passwordLength: number()
    .min(4, 'Should have min length of 4')
    .max(16, 'Should have max length of 16')
    .required('Length is required'),
});

export default function App(): JSX.Element {
  const [password, setPassword] = useState('');
  const [isPasswordGenerated, setIsPasswordGenerated] = useState(false);
  const [lowerCase, setlowerCase] = useState(true);
  const [upperCase, setupperCase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);

  const generatePasswordString = (passwordLength: number) => {
    let characterList = '';
    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '~!@#$%^&*()_+.';

    if (upperCase) {
      characterList += upperCaseChars;
    }
    if (lowerCase) {
      characterList += lowerCaseChars;
    }
    if (numbers) {
      characterList += numberChars;
    }
    if (symbols) {
      characterList += symbolChars;
    }

    const passwordResult = createPassword(characterList, passwordLength);

    setPassword(passwordResult);
    setIsPasswordGenerated(true);
  };

  const createPassword = (characters: string, passwordlength: number) => {
    console.log('hi');
    let result = '';
    for (let i = 0; i < passwordlength; i++) {
      const characterIndex = Math.round(Math.random() * characters.length);
      result += characters.charAt(characterIndex);
    }
    return result;
  };

  const resetPassword = () => {
    setPassword('');
    setIsPasswordGenerated(false);
    setlowerCase(true);
    setupperCase(false);
    setNumbers(false);
    setSymbols(false);
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.appContainer}>
        <View>
          <Text style={styles.title}>Password Generator</Text>
          <Formik
            initialValues={{passwordLength: ''}}
            validationSchema={passwordSchema}
            onSubmit={values => generatePasswordString(+values.passwordLength)}>
            {({
              values,
              errors,
              touched,
              isValid,
              handleChange,
              handleSubmit,
              handleReset,
              /* and other goodies */
            }) => (
              <>
                <View style={styles.inputWrapper}>
                  <View style={styles.leftColumn}>
                    <Text style={styles.lengthHeading}>Password Length</Text>
                    {touched.passwordLength && errors.passwordLength && (
                      <Text style={styles.errorText}>
                        {errors.passwordLength}
                      </Text>
                    )}
                  </View>
                  <TextInput
                    style={styles.inputStyle}
                    value={values.passwordLength}
                    onChangeText={handleChange('passwordLength')}
                    keyboardType="numeric"
                    placeholder="Ex. 8"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include lowercase</Text>
                  <BouncyCheckbox
                    isChecked={lowerCase}
                    onPress={() => setlowerCase(!lowerCase)}
                    fillColor="#29AB87"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include uppercase</Text>
                  <BouncyCheckbox
                    isChecked={upperCase}
                    onPress={() => setupperCase(!upperCase)}
                    fillColor="#FED85D"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include numbers</Text>
                  <BouncyCheckbox
                    isChecked={numbers}
                    onPress={() => setNumbers(!numbers)}
                    fillColor="#C9A0DC"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include symbols</Text>
                  <BouncyCheckbox
                    isChecked={symbols}
                    onPress={() => setSymbols(!symbols)}
                    fillColor="#FC80A5"
                  />
                </View>

                <View style={styles.formActions}>
                  <TouchableOpacity
                    disabled={!isValid}
                    style={styles.primaryBtn}
                    onPress={
                      handleSubmit as unknown as (
                        e: GestureResponderEvent,
                      ) => void
                    }>
                    <Text style={styles.btnTxt}>Generate Password</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.secodaryBtn}
                    onPress={() => {
                      handleReset();
                      resetPassword();
                    }}>
                    <Text style={styles.btnTxt}>Reset</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>
        {isPasswordGenerated ? (
          <View style={styles.card}>
            <Text style={styles.subTitle}>Result:</Text>
            <Text style={styles.description}>Long press to copy the code</Text>
            <Text selectable style={styles.generatedPassword}>
              {password}
            </Text>
          </View>
        ) : null}
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  leftColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  lengthHeading: {
    fontSize: 18,
    fontWeight: '600',
  },
  heading: {
    fontSize: 16,
  },
  errorText: {
    fontSize: 12,
    color: 'red',
  },
  inputWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    height: 30,
  },
  formActions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  inputStyle: {
    borderColor: '#000000',
    borderWidth: 1,
    width: 100,
    height: 40,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 18,
  },
  primaryBtn: {
    height: 60,
    width: 120,
    borderRadius: 5,
    backgroundColor: '#4169E1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTxt: {
    fontSize: 16,
    fontWeight: '600',
  },
  secodaryBtn: {
    height: 60,
    width: 120,
    borderRadius: 5,
    backgroundColor: 'grey',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    marginTop: 30,
    flex: 1,
    backgroundColor: '#ffffff',
    elevation: 4,
    borderRadius: 4,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subTitle: {
    color: '#000000',
    fontSize: 24,
    fontWeight: '700',
  },
  description: {
    color: '#000000',
    fontSize: 12,
  },
  generatedPassword: {
    marginTop: 10,
    color: '#000000',
    fontSize: 26,
    fontWeight: '900',
  },
});
