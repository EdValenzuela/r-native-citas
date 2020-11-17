import React, {useState} from 'react';
import { Text, StyleSheet, View, TextInput, Button, Alert, ScrollView, TouchableHighlight } from 'react-native'; 
import DateTimePickerModal from "react-native-modal-datetime-picker";
import shortid from 'shortid';

const Formulario = ({citas, setCitas, guardarForm}) => {

    const [paciente, setPaciente] = useState('');
    const [propietario, setPropietario] = useState('');
    const [telefono, setTelefono] = useState('');
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');
    const [sintomas, setSintomas] = useState('');

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const confirmarFecha = date => {
        const opciones = { year: 'numeric', month: 'long', day: '2-digit' };
        setFecha(date.toLocaleDateString('es-ES', opciones));
        hideDatePicker();
    };

    //Muetra u ocula el time picker
    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const confirmarHora = hora => {
        const opciones = {hour:'numeric', minute:'2-digit'};
        setHora(hora.toLocaleString('en-US', opciones));
        hideTimePicker();
    };

    const crearNuevaCita = () =>{
        //validar
        if(paciente.trim() === '' || 
            propietario.trim() === '' || 
            telefono.trim() === '' || 
            fecha.trim() === '' || 
            hora.trim() === '' ||
            sintomas.trim() === ''){
                mostrarAlerta();
                return;
            }

            //crear una nueva cita
            const cita = {paciente, propietario, telefono, fecha, hora, sintomas};
            cita.id = shortid.generate();

            //agregar al state
            const citasNuevo = [...citas, cita];
            setCitas(citasNuevo);

            //ocultar
            guardarForm(false);

            //resetear
    }

    // muestra la alerta si falla la validación
    const mostrarAlerta = () =>{
        Alert.alert(
            'Error', //titulo
            'Todos los campos son obligatorios', //mensaje
            [{ 
                text: 'OK'  //arr de btn
            }]
        )
    }

    return(
        <>
            <ScrollView style={styles.formulario}>
                <View>
                    <Text style={styles.label}>Paciente: </Text>
                    <TextInput 
                        style={styles.input}
                        onChangeText={ (texto) => setPaciente(texto) }
                    />
                </View>
                <View>
                    <Text style={styles.label}>Dueño: </Text>
                    <TextInput 
                        style={styles.input}
                        onChangeText={ (texto) => setPropietario(texto) }
                    />
                </View>
                <View>
                    <Text style={styles.label}>Teléfono contacto: </Text>
                    <TextInput 
                        style={styles.input}
                        onChangeText={ (texto) => setTelefono(texto) }
                        keyboardType='numeric'
                    />
                </View>
                <View>
                    <Text style={styles.label}>Fecha: </Text>
                    <Button title="Seleccionar fecha" onPress={showDatePicker} />
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={confirmarFecha}
                        onCancel={hideDatePicker}
                        locale='es_ES'
                    />
                    <Text>{fecha}</Text>
                </View>
                <View>
                    <Text style={styles.label}>Hora: </Text>
                    <Button title="Seleccionar hora" onPress={showTimePicker} />
                    <DateTimePickerModal
                        isVisible={isTimePickerVisible}
                        mode="time"
                        onConfirm={confirmarHora}
                        onCancel={hideTimePicker}
                        headerTextIOS = 'elige la fecha'
                        cancelTextIOS = 'cancelar'
                        confirmTextIOS = 'confirmar'
                        is24Hour
                    />
                    <Text>{hora}</Text>
                    </View>
                <View>
                    <Text style={styles.label}>Síntomas: </Text>
                    <TextInput
                        multiline
                        style={styles.input}
                        onChangeText={ (texto) => setSintomas(texto) }
                        locale='es_ES'
                        headerTextIOS = 'elige una hora'
                        cancelTextIOS = 'cancelar'
                        confirmTextIOS = 'confirmar'

                    />
                </View>
                <View>
                    <TouchableHighlight onPress={ () => crearNuevaCita() } style={styles.btnSubmit}>
                        <Text style={styles.textoSubmit}>Crear nueva cita</Text>
                    </TouchableHighlight>
                </View>
            </ScrollView>
        </>

    );
}

const styles = StyleSheet.create({
    formulario:{
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    label:{
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 20
    },
    input:{
        marginTop: 10,
        height: 50,
        borderColor: '#e1e1e1',
        borderWidth: 1,
        borderStyle: 'solid'
    },
    btnSubmit:{
        padding:10,
        backgroundColor: '#7d024e',
        marginVertical: 10
    },
    textoSubmit:{
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center'
    }

})

export default Formulario;