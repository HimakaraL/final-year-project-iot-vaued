import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  // deleteUserStart,
  // deleteUserSuccess,
  // deleteUserFailure,
  signOut,
} from '../redux/user/userSlice';

export default function Profile() {
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const { currentUser, error } = useSelector((state) => state.user);
  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);
  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        console.error('Error uploading image:', error);
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }
    );
  };
  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.id]: e.target.value });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/backend/user/update/${currentUser.userDetails._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  };

  // const handleDeleteAccount = async () => {
  //   try {
  //     dispatch(deleteUserStart());
  //     const res = await fetch(`/backend/user/delete/${currentUser.userDetails._id}`, {
  //       method: 'DELETE',
  //     });
  //     const data = await res.json();
  //     if (data.success === false) {
  //       dispatch(deleteUserFailure(data));
  //       return;
  //     }
  //     dispatch(deleteUserSuccess(data));
  //   } catch (error) {
  //     dispatch(deleteUserFailure(error));
  //   }
  // };

  const handleSignOut = async () => {
    try {
      await fetch('/backend/auth/signout');
      dispatch(signOut())
    } catch (error) {
      console.log(error);
    }
  };
  // return (
  //   <div className='p-3 max-w-lg mx-auto'>
  //     <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
  //     <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
  //       <input
  //         type='file'
  //         ref={fileRef}
  //         hidden
  //         accept='image/*'
  //         onChange={(e) => setImage(e.target.files[0])}
  //       />
  //       {/* 
  //     firebase storage rules:  
  //     allow read;
  //     allow write: if
  //     request.resource.size < 2 * 1024 * 1024 &&
  //     request.resource.contentType.matches('image/.*') */}
  //       <img
  //         src={formData.profilePicture || currentUser.userDetails.profilePicture}
  //         alt='profile'
  //         className='h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2'
  //         onClick={() => fileRef.current.click()}
  //       />
  //       <p className='text-sm self-center'>
  //         {imageError ? (
  //           <span className='text-red-700'>
  //             Error uploading image (file size must be less than 2 MB)
  //           </span>
  //         ) : imagePercent > 0 && imagePercent < 100 ? (
  //           <span className='text-slate-700'>{`Uploading: ${imagePercent} %`}</span>
  //         ) : imagePercent === 100 ? (
  //           <span className='text-green-700'>Image uploaded successfully</span>
  //         ) : (
  //           ''
  //         )}
  //       </p>
  //       <input
  //         defaultValue={currentUser.userDetails.username}
  //         type='text'
  //         id='username'
  //         placeholder='Username'
  //         className='bg-slate-100 rounded-lg p-3'
  //         onChange={handleChange}
  //         readOnly
  //       />
  //       <input
  //         defaultValue={currentUser.userDetails.email}
  //         type='email'
  //         id='email'
  //         placeholder='Email'
  //         className='bg-slate-100 rounded-lg p-3'
  //         onChange={handleChange}
  //         readOnly
  //       />
  //       {/* <input
  //         type='password'
  //         id='password'
  //         placeholder='Password'
  //         className='bg-slate-100 rounded-lg p-3'
  //         onChange={handleChange}
  //       /> */}
  //       {/* <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
  //         {loading ? 'Loading...' : 'Update'}
  //       </button> */}
  //     </form>
  //     <div className='flex justify-between mt-5'>
  //       {/* <span
  //         className='text-red-700 cursor-pointer'
  //         onClick={handleDeleteAccount}
  //       >
  //         Delete Account
  //       </span> */}
  //       <span className='text-red-700 cursor-pointer' onClick={handleSignOut}>
  //         Sign out
  //       </span>
  //     </div>
  //     <p className='text-red-700 mt-5'>{error && 'Something went wrong!'}</p>
  //     <p className='text-green-700 mt-5'>
  //       {updateSuccess && 'User is updated successfully!'}
  //     </p>
  //   </div>
  // );

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex justify-center items-center p-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">

        <h1 className="text-2xl font-bold text-center text-[#1E3A8A] mb-6">
          Profile
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input
            type="file"
            ref={fileRef}
            hidden
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />

          {/* Profile Image */}
          <div className="flex justify-center">
            <img
              src={formData.profilePicture || currentUser.userDetails.profilePicture}
              alt="profile"
              className="h-24 w-24 rounded-full object-cover cursor-pointer border-4 border-[#3B82F6]"
              // onClick={() => fileRef.current.click()}
            />
          </div>

          {/* Upload Status */}
          <p className="text-sm text-center">
            {imageError ? (
              <span className="text-red-500">
                File must be less than 2MB
              </span>
            ) : imagePercent > 0 && imagePercent < 100 ? (
              <span className="text-gray-500">{`Uploading: ${imagePercent}%`}</span>
            ) : imagePercent === 100 ? (
              <span className="text-green-500">Upload complete</span>
            ) : null}
          </p>

          {/* Inputs */}
          <input
            defaultValue={currentUser.userDetails.username}
            type="text"
            className="p-3 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
            readOnly
          />

          <input
            defaultValue={currentUser.userDetails.email}
            type="email"
            className="p-3 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
            readOnly
          />
        </form>

        {/* Actions */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleSignOut}
            className="text-red-500 font-medium hover:underline"
          >
            Sign out
          </button>
        </div>

        {/* Messages */}
        {error && (
          <p className="text-red-500 text-center mt-4">
            Something went wrong
          </p>
        )}
        {updateSuccess && (
          <p className="text-green-500 text-center mt-4">
            Updated successfully
          </p>
        )}
      </div>
    </div>
  );
}