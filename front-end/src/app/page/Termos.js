import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';

const Termos = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Termos de Uso e Política de Privacidade</Text>
            <Text style={styles.content}>
                {/* Adicione o texto dos termos de uso e política de privacidade aqui */}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget congue turpis, posuere fringilla nulla. Sed condimentum cursus metus, at laoreet arcu finibus non. Praesent malesuada felis augue, quis egestas velit dignissim in. Pellentesque vulputate augue a elit ultrices gravida. Praesent tempor malesuada scelerisque. Donec et justo a ligula dignissim feugiat at et velit. Aliquam quis tortor scelerisque, mattis felis vitae, ornare lectus. Suspendisse dapibus in ex ac pellentesque. Ut congue, augue id tempor lacinia, odio sapien vehicula arcu, fringilla porttitor nisi lectus a mi. Quisque tincidunt magna sapien, placerat elementum mauris dapibus at. Nunc sollicitudin turpis et facilisis tempor. Curabitur volutpat lacus eget nisi suscipit ullamcorper. Ut non sollicitudin orci. In placerat, nunc vel vehicula posuere, erat est tristique lectus, non viverra orci quam at neque. Nunc imperdiet, erat sed lacinia porta, arcu mauris egestas augue, eu tristique augue libero ut ante. Fusce suscipit neque sed pulvinar tristique. Pellentesque ac sem et neque porta suscipit vitae vulputate tellus. Donec ultrices a erat quis facilisis. Mauris eget velit sit amet odio blandit tincidunt ut in est. Praesent molestie pretium tellus et dapibus. Morbi ac fermentum diam, ut lacinia nisi. Curabitur aliquam lorem vel iaculis tristique. Sed sed aliquet magna. Nullam interdum dui nisl, id porta tortor tempus et. Duis posuere nulla sed dolor dictum accumsan. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In porta nisl vel leo aliquam, vitae vehicula metus sollicitudin. Aenean auctor, neque id convallis ornare, lectus quam pulvinar lorem, a vestibulum erat mauris quis massa. Donec ac leo id libero rhoncus semper. Donec ut eleifend eros. Mauris dictum, orci et mollis bibendum, lorem risus posuere metus, et fermentum arcu ipsum sed arcu. Morbi ultricies nisl vel porta viverra. Integer non mi fermentum, blandit tellus ac, feugiat risus. Curabitur hendrerit libero ac magna sollicitudin pellentesque. Praesent porta efficitur ipsum, eget dictum nulla. Fusce suscipit neque sed pulvinar tristique. Pellentesque ac sem et neque porta suscipit vitae vulputate tellus. Donec ultrices a erat quis facilisis. Mauris eget velit sit amet odio blandit tincidunt ut in est. Praesent molestie pretium tellus et dapibus. Morbi ac fermentum diam, ut lacinia nisi. Curabitur aliquam lorem vel iaculis tristique. Sed sed aliquet magna. Nullam interdum dui nisl, id porta tortor tempus et. Duis posuere nulla sed dolor dictum accumsan. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In porta nisl vel leo aliquam, vitae vehicula metus sollicitudin. Aenean auctor, neque id convallis ornare, lectus quam pulvinar lorem, a vestibulum erat mauris quis massa. Donec ac leo id libero rhoncus semper. Donec ut eleifend eros. Mauris dictum, orci et mollis bibendum, lorem risus posuere metus, et fermentum arcu ipsum sed arcu. Morbi ultricies nisl vel porta viverra. Integer non mi fermentum, blandit tellus ac, feugiat risus. Curabitur hendrerit libero ac magna sollicitudin pellentesque. Praesent porta efficitur ipsum, eget dictum nulla. Curabitur at condimentum eros.            </Text>
            <TouchableOpacity style={styles.button}>
                <LinearGradient
                    colors={['#E83378', '#F47920']}
                    style={styles.button}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                >
                    <Link
                        style={styles.buttonText}
                        href="/page/Cadastro">Li e estou de acordo.
                    </Link>
                </LinearGradient>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: 'white',
        padding: 20,
    },
    title: {
        color: '#0d47a1',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    content: {
        color: 'black',
        fontSize: 16,
        marginBottom: 20,
    },
    button: {
        width: 300,
        borderRadius: 200,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignSelf: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default Termos;
