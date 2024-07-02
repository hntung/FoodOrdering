import Button from '@/components/Button';
import { View, Text, StyleSheet, TextInput, Image, Alert } from 'react-native'
import { useEffect, useState } from 'react';
import { defaultPizzaImage } from '@/components/ProductListItem';
import Colors from '@/constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useInsertProduct, useProduct, useUpdateProduct, useDeleteProduct } from '@/api/products';


const CreateProductScreen = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [error, setError] = useState('');
    const [image, setImage] = useState< string | null>(null);

    const { id: idString } = useLocalSearchParams();
    const id = parseFloat(typeof idString === 'string' ? idString : idString?.[0] ?? '');
    const isUpdating = !!idString;

    const { mutate: insertProduct } = useInsertProduct();
    const { mutate: updateProduct } = useUpdateProduct();
    const { data: updatingProduct } = useProduct(id);
    const { mutate: deleteProduct } = useDeleteProduct();
    console.log('updatingProduct', idString, updatingProduct);
    const router = useRouter();

    useEffect(() => {
        if(updatingProduct){
            setName(updatingProduct.name);
            setPrice(updatingProduct.price.toString());
            setImage(updatingProduct.image);
        }
    },[updatingProduct])

    const resetFields = () => {
        setName('');
        setPrice('');
    };
    const validateInputs = () => {
        if(!name) {
            setError('Name is required');
            return false;
        }
        if(!price) {
            setError('Price is required');
            return false;
        }
        if(isNaN(parseFloat(price))) {
            setError('Price must be a number');
            return false;
        }
        return true;
    };

    const onsubmit = () => {
        if(isUpdating) {
            onUpdate();
        } else {
            onCreate();
        }
    };
    const onCreate = () => {
        if(!validateInputs()) {
            return;
        }
        console.warn('Create product: ',name);
        insertProduct({ name, price: parseFloat(price), image },{
            onSuccess: () => {
                resetFields();
                router.back();
            }
        });
        resetFields();
    };

    const onUpdate = () => {
        if (!validateInputs()) {
            return;
        }
        updateProduct({id, name, price: parseFloat(price), image },{
            onSuccess: () => {
                resetFields();
                router.back();
            }
        })
    };

    const onDelete = () => {
        deleteProduct(id, {
            onSuccess: () => {
                resetFields();
                router.replace('/(admin)');
            },
        });
    };
    const confirmDelete = () => {
        Alert.alert("Delete Product", "Are you sure you want to delete this product?", [
            {
                text: "Cancel", 
                
            },
            {
                text: "Delete", 
                style: "destructive",
                onPress: onDelete,
            },
        ]);
    };

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      };

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: isUpdating ? 'Update Product' : 'Create Product' }} />
            <Image source={{ uri: image || defaultPizzaImage }} style={styles.image}/>
            <Text onPress={pickImage} style={styles.textButton}>Select Image</Text>

            <Text style={styles.label}>Name</Text>
            <TextInput
                value={name}
                onChangeText={setName} 
                placeholder='Nane' 
                style={styles.input}
            />

            <Text style={styles.label}>Price ($)</Text>
            <TextInput 
                value={price}
                onChangeText={setPrice}
                placeholder='9.99' 
                style={styles.input} 
                keyboardType='numeric'
            />
            <Text style={{color: 'red'}}>{error}</Text>
            <Button onPress = {onsubmit} text={isUpdating ? 'Update' : 'Create'}/>
            {isUpdating && <Text onPress={confirmDelete} style={styles.textButton}>Delete</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 10,
        justifyContent: 'center',
    },
    input: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        color: 'gray',
    },
    image: {
        width: '50%',
        aspectRatio: 1,
        alignSelf: 'center',
    },
    textButton: {
        color: Colors.light.tint,
        alignSelf: 'center',
        fontWeight: 'bold',
        marginVertical: 10, 
    },
});


export default CreateProductScreen;