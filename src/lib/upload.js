import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from './firebase';
import { toast } from 'react-toastify';

export const upload = async file => {
  const date = new Date();
  const storageRef = ref(storage, 'images/' + file.name + date.getTime());

  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      snapshot => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (progress === 100) toast.success('Image uploaded successfully');

        switch (snapshot.state) {
          case 'paused':
            toast.warning('Upload is paused');
            break;
          case 'running':
            break;
        }
      },
      error => {
        reject('Something went wrong, ' + error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
          resolve(downloadURL);
        });
      }
    );
  });
};
