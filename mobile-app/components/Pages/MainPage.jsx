import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native"
//import { db } from "../../services/firebase/config";

import db from "../../services/firebase/config";

export const MainPage = () => {

    const [text, setText] = useState('');
    const [limit, setLimit] = useState(10);
    const [passArr, setPassArr] = useState([]);
    const [isLoad, setIsLoad] = useState(false);
    const passSym = 'qwertyuiopasdfghjklzxcvbnm1234567890!@$_'

    
    const generatePass = async () => {
        setIsLoad(false);
        let res = '';
        for (let i = 0, len = passSym.length; i < limit; ++i) {
          res += passSym.charAt(Math.floor(Math.random() * len));
        }
        if (res[0] === '!' || res[0] === '@' || res[0] === '$' || res[0] === '_') {
          generatePass();
        } else {
          setText(res);
          const currentTime = new Date().toISOString();
          const passData = { pass: res, created_at: currentTime };
          const addRef = await addDoc(collection(db, 'pass'), passData);
          getDB().then(() => setIsLoad(true));
        }
      };
    
      const getDB = async () => {
        const arr = [];
        const getCollection = await getDocs(collection(db, 'pass'));
        await getCollection.forEach((doc) => {
          arr.push({ id: doc.id, pass: doc.data().pass, created_at: doc.data().created_at });
        });
        await setPassArr(arr);
      };
    
      useEffect(() => {
        getDB().then(() => {
          setIsLoad(true);
        });
      }, []);
    
      const DeletePass = async (id) => {
        await setIsLoad(false);
        await deleteDoc(doc(db, 'pass', id));
        await getDB().then(() => {
          setIsLoad(true);
        });
      };
    
      //не работает
      
      const UpdatePass = async (id) => {
        setIsLoad(false);
        const docRef = doc(db, "pass", id);
        const newPass = genPass();
    
        const newPassDoc = { pass: newPass };
    
        try {
          await updateDoc(docRef, newPassDoc);
          setIsLoad(true);
        } catch (error) {
          setIsLoad(true);
          console.error("Error updating document: ", error);
        }
      };
    
      const UpdateDoc = async (id, newData) => {
        setIsLoad(false);
        const docRef = doc(db, "pass", id);
    
        try {
          await updateDoc(docRef, newData);
          setIsLoad(true);
        } catch (error) {
          setIsLoad(true);
          console.error("Error updating document: ", error);
        }
      };

      //не работает endblock 

   return (
    <View style={styles.page}>
      {!isLoad ? (
        <Text style={styles.text}>Loading...</Text>
      ) : (
        <>
          <Text style={styles.title}>Password Generator</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.text}>Limit password length</Text>
            <TextInput
              keyboardType="numeric"
              value={limit}
              onChangeText={setLimit}
              style={styles.input}
              placeholder="Enter length"
            />
            <Button onPress={generatePass} title="Generate" />
          </View>
          <View>
            <Text style={styles.title}>Password History</Text>
            {passArr.map((data) => (
              <View key={data.id} style={styles.passwordItem}>
                <Text style={styles.text}>{data.pass } {"\n"}</Text> 
                <Text style={styles.passwordTime}>{data.created_at}</Text>
                <Button onPress={() => DeletePass(data.id)} title="Delete" />
              </View>
            ))}
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    color: 'black',
    marginBottom: 5,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    marginBottom: 10,
  },

passwordItem: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    backgroundColor: '#d0d0d0',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    width: '100%',
  },
  passwordTime: {
    fontStyle: 'italic',
    color: 'gray',
    marginTop: 5,
  },
});