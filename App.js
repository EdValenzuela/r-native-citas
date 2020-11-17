import React, {useState} from 'react';
import { Text, StyleSheet, View, FlatList, TouchableHighlight, Platform, TouchableWithoutFeedback, Keyboard, } from 'react-native';
import Cita from './components/Cita';
import Formulario from './components/Formulario';

const App = () => {

  const [mostrarForm, guardarForm] = useState(false);

  const [citas, setCitas] = useState([
    {
      id: '1',
      paciente: 'eduardo',
      propietario: 'lalogicaweb',
      sintomas: 'no duerme'
    }
  ]);

  //Elimina los pacientes del state
  const eliminarPaciente = (id) =>{
    setCitas( (citaActuales) =>{
      return citaActuales.filter( cita => cita.id !== id )
    })
  }

  //muestra u oculta el formulario
  const mostrarFormulario = ()=>{
     guardarForm(!mostrarForm);
  }

  const cerrarTeclado = () =>{
    Keyboard.dismiss();
  }

  return (
    <TouchableWithoutFeedback onPress={() => cerrarTeclado() }>
      <View style={styles.contenedor}>
        <Text style={styles.titulo}>Administrador de Citas</Text>
        <View>
          <TouchableHighlight onPress={ () => mostrarFormulario() } style={styles.btnMostrarForm}>
              <Text style={styles.textoMostrar}>{
                mostrarForm ? 'Cancelar crear cita' : 'Crear nueva cita'
              }</Text>
          </TouchableHighlight>
        </View>
        
        <View style={styles.contenido}>
          {
            mostrarForm ? (
              <>
                <Text style={styles.titulo}>Crear nueva cita</Text>
                <Formulario citas={citas} setCitas={setCitas} guardarForm={guardarForm} />
              </>
            ): (
              <>
                <Text style={styles.titulo}>{ citas.length > 0 ? 'Administra tus citas': 'No hay citas' }</Text>
                <FlatList 
                  style={styles.listado}
                  data={citas}
                  renderItem={ ({item}) => <Cita cita={item} eliminarPaciente={eliminarPaciente} />}
                  keyExtractor={ cita => cita.id}
                />
              </>
            )
          }
        </View>
        
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({

  contenedor:{
    backgroundColor: '#AA076B',
    flex: 1
  },

  titulo: {
    color: '#fff',
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  contenido:{
    flex: 1,
    marginHorizontal: '2.5%'
  },
  listado:{
    flex: 1
  },
  btnMostrarForm:{
    padding:10,
    backgroundColor: '#7d024e',
    marginVertical: 10
  },
  textoMostrar:{
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
 
export default App;
