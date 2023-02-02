

export const filesUpload = async(file) => {

    if (!file) throw new Error('El file del usuario no existe');

    //aca colocamos la url que usamos en postman
    const cloudURL = 'https://api.cloudinary.com/v1_1/dapqienlw/upload';

    //aca recreamos el form data del postaman
    const formData = new FormData();

    //aca recreamos los campos de la key y el value 
    formData.append('upload_preset', 'journal-app-react');
    formData.append('file', file);

    try {
        const resp = await fetch(cloudURL, {
            method: 'POST',
            body: formData
        });

        // console.log(resp);
        if (!resp.ok) throw new Error('El archivo no se pudo subir');

        const cloudResp = await resp.json();
        // console.log({ cloudResp })

        return cloudResp.secure_url;

        
        
    } catch (error) {
        console.log(error)
        throw new Error( error.mesage )
    }

}
